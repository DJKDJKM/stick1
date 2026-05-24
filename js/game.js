// ============================================================
// game.js — input, physics, game loop, and UI wiring
// ============================================================
(function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 960;
    canvas.height = 600;
    const VIEW_W = canvas.width, VIEW_H = canvas.height;

    // ---- Input ----------------------------------------------
    const keys = {};
    const pressed = new Set();
    function keyId(e) { return e.key.length === 1 ? e.key.toLowerCase() : e.key; }
    document.addEventListener('keydown', e => {
        const k = keyId(e);
        if (!keys[k]) pressed.add(k);
        keys[k] = true;
        if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
        if (e.key === 'Escape') {
            if (game.state === 'playing') pauseGame();
            else if (game.state === 'paused') resumeGame();
        }
        if (k === 'r' && (game.state === 'playing' || game.state === 'dying')) restartLevel();
    });
    document.addEventListener('keyup', e => { keys[keyId(e)] = false; });
    window.addEventListener('blur', () => { for (const k in keys) keys[k] = false; });
    function held(...ks) { return ks.some(k => keys[k]); }
    function justPressed(...ks) { for (const k of ks) if (pressed.has(k)) return true; return false; }

    // ---- Physics constants (base) ---------------------------
    const BASE = {
        gravity: 0.7,
        maxFall: 14,
        accelGround: 0.9,
        accelAir: 0.45,
        maxSpeed: 5.4,
        frictionGround: 0.78,
        frictionAir: 0.96,
        jump: 12.2,
        doubleJump: 10.8,
        wallJumpVX: 7.4,
        wallJumpVY: 11.6,
        wallSlideFall: 2.6,
        coyote: 6,
        jumpBuffer: 6,
        // SpeedRunners-style boost
        boostMax: 100,
        boostCost: 50,
        boostDuration: 30,       // frames at boosted cap
        boostSpeedMult: 1.7,
        boostRegen: 0.18,        // per frame, passive
        boostFromCoin: 12,
        boostFromBounce: 25,
        boostFromBooster: 15,
    };

    function effectivePhysics() {
        const skin = SKINS.find(s => s.id === Save.equipped()) || SKINS[0];
        const p = skin.perks || {};
        return {
            ...BASE,
            maxSpeed: BASE.maxSpeed * (p.speedMult || 1),
            accelGround: BASE.accelGround * (p.speedMult || 1),
            accelAir: BASE.accelAir * (p.speedMult || 1),
            jump: BASE.jump * (p.jumpMult || 1),
            doubleJump: BASE.doubleJump * (p.jumpMult || 1),
            gravity: BASE.gravity * (p.gravityMult || 1),
            wallSlideFall: BASE.wallSlideFall * (p.wallSlideFallMult || 1),
            coyote: BASE.coyote + (p.coyoteBonus || 0),
            airJumps: p.airJumps || 1,
            trail: p.trail || null,
        };
    }

    // ---- Player ---------------------------------------------
    const player = {
        x: 0, y: 0, w: 18, h: 40,
        vx: 0, vy: 0,
        grounded: false,
        wallDir: 0,
        sliding: false,
        facing: 1,
        airJumpsLeft: 1,
        coyote: 0,
        jumpBuffer: 0,
        animT: 0,
        boost: 0,            // current meter 0..boostMax
        boostFrames: 0,      // remaining frames of active boost
        _lastFallVy: 0,
        _riding: null,
    };

    // ---- Game state ----------------------------------------
    const game = {
        state: 'menu',
        levelIndex: 0,
        startTime: 0,
        elapsedTime: 0,
        coinsThisRun: 0,
        levelDeaths: 0,
        particles: [],
        ragdoll: null,
        cameraX: 0, cameraY: 0,
        shakeT: 0, shakeMag: 0,
        checkpoint: null,
        level: null,
        runtime: null,
        player, ctx, VIEW_W, VIEW_H,
    };

    function buildRuntime(lvl) {
        return {
            time: 0,
            saws: lvl.saws.map(s => ({ ...s, cx: s.x, cy: s.y, rot: 0 })),
            movers: lvl.movers.map(m => ({ ...m, cx: m.x, cy: m.y, prevCx: m.x, prevCy: m.y })),
            crumblers: lvl.crumblers.map(c => ({ ...c, state: 'solid', t: 0 })),
            coins: lvl.coins.map(c => ({ ...c, taken: false })),
            lasers: lvl.lasers.map(l => ({ ...l, active: true })),
            bouncers: (lvl.bouncers || []).map(b => ({ ...b, _pressed: 0 })),
            boosters: (lvl.boosters || []).map(b => ({ ...b, _cooldown: 0 })),
            checkpointHit: false,
        };
    }

    // ---- Helpers --------------------------------------------
    function aabb(a, b) {
        return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }
    function pointInRect(px, py, r) {
        return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
    }
    function circleRect(cx, cy, cr, r) {
        const closestX = Math.max(r.x, Math.min(cx, r.x + r.w));
        const closestY = Math.max(r.y, Math.min(cy, r.y + r.h));
        const dx = cx - closestX, dy = cy - closestY;
        return dx * dx + dy * dy < cr * cr;
    }
    function segIntersectsRect(x1, y1, x2, y2, r) {
        if (pointInRect(x1, y1, r) || pointInRect(x2, y2, r)) return true;
        const steps = Math.max(8, Math.floor(Math.hypot(x2 - x1, y2 - y1) / 6));
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = x1 + (x2 - x1) * t;
            const y = y1 + (y2 - y1) * t;
            if (pointInRect(x, y, r)) return true;
        }
        return false;
    }
    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    // ---- Particles ------------------------------------------
    function spawnParticles(x, y, n, opts = {}) {
        for (let i = 0; i < n; i++) {
            game.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * (opts.spread || 3),
                vy: (Math.random() - 0.5) * (opts.spread || 3) - (opts.up || 0),
                life: opts.life || 30, age: 0,
                r: opts.r || (1 + Math.random() * 2),
                color: opts.color || '#ffd166',
                gravity: opts.gravity == null ? 0.2 : opts.gravity,
            });
        }
    }
    function updateParticles() {
        for (const p of game.particles) {
            p.vy += p.gravity;
            p.x += p.vx; p.y += p.vy;
            p.age++;
        }
        game.particles = game.particles.filter(p => p.age < p.life);
    }

    // ---- Camera ---------------------------------------------
    function updateCamera() {
        const lvl = game.level;
        const targetX = player.x + player.w / 2 - VIEW_W / 2;
        const targetY = player.y + player.h / 2 - VIEW_H / 2;
        game.cameraX += (targetX - game.cameraX) * 0.12;
        game.cameraY += (targetY - game.cameraY) * 0.12;
        game.cameraX = clamp(game.cameraX, 0, Math.max(0, lvl.worldW - VIEW_W));
        game.cameraY = clamp(game.cameraY, 0, Math.max(0, lvl.worldH - VIEW_H));
    }
    function shake(mag, t = 12) {
        game.shakeMag = Math.max(game.shakeMag, mag);
        game.shakeT = Math.max(game.shakeT, t);
    }

    // ---- Lifecycle ------------------------------------------
    function enterLevel(idx) {
        game.levelIndex = idx;
        game.level = LEVELS[idx];
        game.runtime = buildRuntime(game.level);
        game.coinsThisRun = 0;
        game.levelDeaths = 0;
        game.particles.length = 0;
        game.ragdoll = null;
        game.checkpoint = null;
        resetPlayer(game.level.spawn.x, game.level.spawn.y);
        game.cameraX = player.x - VIEW_W / 2;
        game.cameraY = player.y - VIEW_H / 2;
        game.startTime = performance.now();
        game.elapsedTime = 0;
        game.state = 'playing';
        refreshHud();
        showHud(true);
        showMenu(false);
        if (!loopRunning) { loopRunning = true; requestAnimationFrame(loop); }
    }

    function resetPlayer(x, y) {
        const eff = effectivePhysics();
        player.x = x; player.y = y;
        player.vx = 0; player.vy = 0;
        player.grounded = false;
        player.wallDir = 0;
        player.sliding = false;
        player.h = 40;
        player.facing = 1;
        player.airJumpsLeft = eff.airJumps;
        player.coyote = 0;
        player.jumpBuffer = 0;
        // keep boost meter on respawn so deaths don't fully reset progress;
        // active-boost frames clear though
        player.boostFrames = 0;
    }

    function restartLevel() { enterLevel(game.levelIndex); }

    function pauseGame() {
        if (game.state !== 'playing') return;
        game.state = 'paused';
        showMenu(true, 'screen-pause');
    }
    function resumeGame() {
        if (game.state !== 'paused') return;
        game.state = 'playing';
        showMenu(false);
        game.startTime = performance.now() - game.elapsedTime * 1000;
    }

    function makeRagdoll(cx, cy) {
        const r = { pieces: [], age: 0 };
        const v = () => (Math.random() - 0.5) * 8;
        const u = () => -Math.random() * 6 - 2;
        r.pieces.push({ type: 'head', x: cx, y: cy - 30, vx: v(), vy: u(), rot: 0, vr: (Math.random() - 0.5) * 0.3 });
        r.pieces.push({ type: 'body', x: cx, y: cy - 16, vx: v(), vy: u(), rot: 0, vr: (Math.random() - 0.5) * 0.3 });
        r.pieces.push({ type: 'arm',  x: cx - 6, y: cy - 18, vx: v(), vy: u(), rot: 0, vr: (Math.random() - 0.5) * 0.4 });
        r.pieces.push({ type: 'arm',  x: cx + 6, y: cy - 18, vx: v(), vy: u(), rot: 0, vr: (Math.random() - 0.5) * 0.4 });
        r.pieces.push({ type: 'leg',  x: cx - 3, y: cy - 4, vx: v(), vy: u(), rot: 0, vr: (Math.random() - 0.5) * 0.4 });
        r.pieces.push({ type: 'leg',  x: cx + 3, y: cy - 4, vx: v(), vy: u(), rot: 0, vr: (Math.random() - 0.5) * 0.4 });
        return r;
    }
    function updateRagdoll() {
        if (!game.ragdoll) return;
        for (const p of game.ragdoll.pieces) {
            p.vy += 0.5;
            p.x += p.vx; p.y += p.vy;
            p.rot += p.vr;
        }
        game.ragdoll.age++;
    }

    function killPlayer() {
        if (game.state !== 'playing') return;
        game.state = 'dying';
        game.levelDeaths++;
        Save.incDeaths();
        SFX.death();
        shake(8, 18);
        game.ragdoll = makeRagdoll(player.x + player.w / 2, player.y + player.h - 20);
        spawnParticles(player.x + player.w / 2, player.y + player.h / 2, 14,
            { spread: 6, life: 50, color: '#ff3344', gravity: 0.3, up: 2 });
        setTimeout(() => {
            if (game.state !== 'dying') return;
            const sp = game.checkpoint || game.level.spawn;
            game.runtime = buildRuntime(game.level);
            // coins picked up so far this attempt stay banked in wallet,
            // but the in-level counter resets for clarity
            game.coinsThisRun = 0;
            resetPlayer(sp.x, sp.y);
            game.ragdoll = null;
            game.state = 'playing';
            refreshHud();
        }, 750);
    }

    function levelComplete() {
        if (game.state !== 'playing') return;
        game.state = 'result';
        SFX.win();
        const t = game.elapsedTime;
        const idx = game.levelIndex;
        const perfect = game.levelDeaths === 0;
        const isBest = Save.recordResult(idx, t, perfect);

        // Rewards: +5 for completion, +5 bonus if new best, +3 if perfect
        let bonus = 5;
        if (isBest) bonus += 5;
        if (perfect) bonus += 3;
        Save.addCoins(bonus);
        refreshHud();

        spawnParticles(game.level.goal.x + game.level.goal.w / 2, game.level.goal.y, 30,
            { spread: 6, life: 60, color: '#ffd166', up: 4, gravity: 0.1, r: 2 });

        const isFinal = idx >= LEVELS.length - 1;
        document.getElementById('result-title').textContent =
            isFinal ? 'You finished the game!' : 'Level Complete!';
        document.getElementById('result-stats').innerHTML = `
            <div class="row"><span>Time</span><b>${t.toFixed(2)}s${isBest ? ' (NEW BEST!)' : ''}</b></div>
            <div class="row"><span>Best</span><b>${(Save.getBest(idx) || t).toFixed(2)}s</b></div>
            <div class="row"><span>Coins this run</span><b>${game.coinsThisRun} / ${game.level.coins.length}</b></div>
            <div class="row"><span>Completion bonus</span><b>+${bonus} 🪙</b></div>
            <div class="row"><span>Deaths this level</span><b>${game.levelDeaths}</b></div>
            <div class="row"><span>Wallet</span><b>${Save.coins()} 🪙</b></div>
        `;
        document.getElementById('next-level-btn').textContent = isFinal ? 'Finish' : 'Next Level';
        showMenu(true, 'screen-result');
    }

    // ---- Main loop ------------------------------------------
    let loopRunning = false;
    function loop() {
        if (game.state === 'playing') update();
        else if (game.state === 'dying') { updateRagdoll(); updateParticles(); }

        if (game.shakeT > 0) {
            game.shakeT--;
            if (game.shakeT === 0) game.shakeMag = 0;
        }

        draw();
        pressed.clear();

        if (game.state === 'playing' || game.state === 'dying' || game.state === 'paused') {
            requestAnimationFrame(loop);
        } else {
            loopRunning = false;
        }
    }

    // ---- Update ---------------------------------------------
    function update() {
        const eff = effectivePhysics();
        game.elapsedTime = (performance.now() - game.startTime) / 1000;
        document.getElementById('time').textContent = game.elapsedTime.toFixed(2);
        game.runtime.time++;

        const wantLeft = held('a', 'ArrowLeft');
        const wantRight = held('d', 'ArrowRight');
        const wantDown = held('s', 'ArrowDown');
        const jumpEdge = justPressed(' ', 'w', 'ArrowUp');
        const boostEdge = justPressed('Shift');

        // Boost activation (consume meter, kick the player forward)
        if (boostEdge && player.boost >= BASE.boostCost && player.boostFrames <= 0) {
            player.boost -= BASE.boostCost;
            player.boostFrames = BASE.boostDuration;
            const dir = (wantLeft && !wantRight) ? -1 : (wantRight && !wantLeft ? 1 : player.facing);
            player.facing = dir;
            const boostSpeed = eff.maxSpeed * BASE.boostSpeedMult;
            player.vx = dir * boostSpeed;
            if (player.vy > 0) player.vy = Math.min(player.vy, 0); // tiny upward correction
            SFX.boost();
            Save.incStat('boosts', 1);
            for (let i = 0; i < 12; i++) {
                game.particles.push({
                    x: player.x + player.w / 2 - dir * 6,
                    y: player.y + player.h / 2 + (Math.random() - 0.5) * 14,
                    vx: -dir * (1.5 + Math.random() * 1.5), vy: (Math.random() - 0.5),
                    life: 22, age: 0, r: 2 + Math.random() * 2,
                    color: '#ffd166', gravity: 0,
                });
            }
        }

        const inBoost = player.boostFrames > 0;
        if (inBoost) player.boostFrames--;

        let accel = player.grounded ? eff.accelGround : eff.accelAir;
        if (player.sliding) accel *= 0.2;

        if (wantLeft)  { player.vx -= accel; player.facing = -1; }
        if (wantRight) { player.vx += accel; player.facing = 1; }

        // Friction (suppressed during active boost so speed sustains)
        if (!inBoost) {
            if (!wantLeft && !wantRight && player.grounded && !player.sliding) {
                player.vx *= eff.frictionGround;
            } else if (!player.grounded) {
                player.vx *= eff.frictionAir;
            }
        }

        // Passive boost-meter regen
        if (player.boost < BASE.boostMax) {
            player.boost = Math.min(BASE.boostMax, player.boost + BASE.boostRegen);
        }

        // Slide start
        if (wantDown && player.grounded && Math.abs(player.vx) > 1 && !player.sliding) {
            player.sliding = true;
            player.h = 22;
            player.y += 18;
            player.vx *= 1.15;
        }
        // Slide end
        const ceilingClear = () => {
            const test = { x: player.x, y: player.y - 18, w: player.w, h: 18 };
            for (const p of game.level.platforms) if (aabb(test, p)) return false;
            for (const m of game.runtime.movers) if (aabb(test, { x: m.cx, y: m.cy, w: m.w, h: m.h })) return false;
            for (const c of game.runtime.crumblers) if (c.state !== 'gone' && aabb(test, c)) return false;
            return true;
        };
        if (player.sliding && !wantDown && ceilingClear()) {
            player.sliding = false;
            player.y -= 18;
            player.h = 40;
        }
        if (player.sliding && player.grounded) player.vx *= 0.96;

        const baseCap = player.sliding ? eff.maxSpeed * 1.35 : eff.maxSpeed;
        const cap = baseCap * (inBoost ? BASE.boostSpeedMult : 1);
        player.vx = clamp(player.vx, -cap, cap);

        if (jumpEdge) player.jumpBuffer = BASE.jumpBuffer;
        else if (player.jumpBuffer > 0) player.jumpBuffer--;

        if (player.grounded) {
            player.coyote = eff.coyote;
            player.airJumpsLeft = eff.airJumps; // reset air jumps when grounded
        } else if (player.coyote > 0) player.coyote--;

        // Wall slide also refreshes air jumps
        if (!player.grounded && player.wallDir !== 0) {
            player.airJumpsLeft = Math.max(player.airJumpsLeft, eff.airJumps);
        }

        // Process jump from buffer
        if (player.jumpBuffer > 0) {
            if (player.coyote > 0 && !player.sliding) {
                player.vy = -eff.jump;
                player.grounded = false;
                player.coyote = 0;
                player.jumpBuffer = 0;
                player.airJumpsLeft = eff.airJumps;
                SFX.jump();
                spawnParticles(player.x + player.w / 2, player.y + player.h, 6,
                    { spread: 3, life: 22, color: '#cfc7ff', gravity: 0.1 });
            } else if (player.wallDir !== 0 && !player.grounded) {
                player.vy = -eff.wallJumpVY;
                player.vx = -player.wallDir * eff.wallJumpVX;
                player.facing = -player.wallDir;
                player.airJumpsLeft = eff.airJumps;
                player.jumpBuffer = 0;
                player.wallDir = 0;
                SFX.wjump();
                Save.incStat('wallJumps', 1);
                spawnParticles(player.x + player.w / 2, player.y + player.h / 2, 6,
                    { spread: 4, life: 22, color: '#9be7ff', gravity: 0.05 });
            } else if (player.airJumpsLeft > 0 && !player.grounded) {
                player.vy = -eff.doubleJump;
                player.airJumpsLeft--;
                player.jumpBuffer = 0;
                SFX.djump();
                Save.incStat('doubleJumps', 1);
                for (let i = 0; i < 12; i++) {
                    const a = (i / 12) * Math.PI * 2;
                    game.particles.push({
                        x: player.x + player.w / 2, y: player.y + player.h,
                        vx: Math.cos(a) * 2, vy: Math.sin(a) * 2,
                        life: 20, age: 0, r: 2, color: '#a3ffd8', gravity: 0
                    });
                }
            }
        }

        player.vy += eff.gravity;

        // Wall slide
        if (!player.grounded && player.wallDir !== 0 && player.vy > 0) {
            const intoWall = (player.wallDir === -1 && wantLeft) || (player.wallDir === 1 && wantRight);
            if (intoWall) player.vy = Math.min(player.vy, eff.wallSlideFall);
        }
        player.vy = Math.min(player.vy, BASE.maxFall);

        // Movers
        for (const m of game.runtime.movers) {
            m.prevCx = m.cx; m.prevCy = m.cy;
            const t = ((game.runtime.time / m.period) + (m.phase || 0)) * Math.PI * 2;
            const ph = (1 - Math.cos(t)) / 2; // 0..1..0
            m.cx = m.x + (m.dx || 0) * ph;
            m.cy = m.y + (m.dy || 0) * ph;
        }
        // Saws
        for (const s of game.runtime.saws) {
            const t = (game.runtime.time * s.speed + (s.phase || 0)) % 1;
            const tri = 1 - Math.abs(2 * t - 1);
            s.cx = (s.ax !== undefined) ? (s.ax + (s.bx - s.ax) * tri) : s.x;
            s.cy = (s.ay !== undefined) ? (s.ay + (s.by - s.ay) * tri) : s.y;
            s.rot = (s.rot || 0) + 0.4;
        }
        // Lasers
        for (const l of game.runtime.lasers) {
            const ph = (game.runtime.time + (l.phase || 0)) % l.period;
            l.active = ph < l.period * l.duty;
        }

        const wasGrounded = player.grounded;

        // Horizontal
        player.x += player.vx;
        player.wallDir = 0;
        resolveHorizontal();
        if (player.grounded && player._riding) {
            const m = player._riding;
            player.x += (m.cx - m.prevCx);
        }

        // Vertical
        player.y += player.vy;
        player.grounded = false;
        player._riding = null;
        resolveVertical();

        // Bouncers — launch upward when landing on top
        for (const b of game.runtime.bouncers) {
            const prevBottom = player.y + player.h - player.vy;
            if (player.vy >= 0 &&
                player.x + player.w > b.x && player.x < b.x + b.w &&
                player.y + player.h >= b.y && player.y + player.h <= b.y + b.h + 4 &&
                prevBottom <= b.y + 4) {
                player.y = b.y - player.h;
                player.vy = -(b.power || 18);
                player.grounded = false;
                player.airJumpsLeft = eff.airJumps;
                b._pressed = 8;
                player.boost = Math.min(BASE.boostMax, player.boost + BASE.boostFromBounce);
                SFX.djump();
                Save.incStat('bounces', 1);
                spawnParticles(b.x + b.w / 2, b.y, 12,
                    { spread: 5, life: 22, color: '#ff9bbf', up: 3 });
            }
        }

        // Boosters — apply velocity on touch (with cooldown)
        for (const bo of game.runtime.boosters) {
            if (bo._cooldown > 0) { bo._cooldown--; continue; }
            const pbBox = { x: player.x, y: player.y, w: player.w, h: player.h };
            if (aabb(pbBox, bo)) {
                if (bo.dx) player.vx = bo.dx;
                if (bo.dy) player.vy = bo.dy;
                player.airJumpsLeft = eff.airJumps;
                bo._cooldown = 12;
                player.boost = Math.min(BASE.boostMax, player.boost + BASE.boostFromBooster);
                SFX.wjump();
                spawnParticles(bo.x + bo.w / 2, bo.y + bo.h / 2, 10,
                    { spread: 4, life: 22, color: '#00f5d4', gravity: 0 });
            }
        }

        // Crumblers timing
        for (const c of game.runtime.crumblers) {
            if (c.state === 'touched') {
                c.t++;
                if (c.t > 24) { c.state = 'falling'; c.t = 0; }
            } else if (c.state === 'falling') {
                c.y += 4 + c.t * 0.4;
                c.t++;
                if (c.t > 30) c.state = 'gone';
            }
        }

        const pb = { x: player.x, y: player.y, w: player.w, h: player.h };
        for (const s of game.level.spikes) {
            if (s.h <= 0 || s.w <= 0) continue;
            if (aabb(pb, s)) { killPlayer(); return; }
        }
        for (const s of game.runtime.saws) {
            if (circleRect(s.cx, s.cy, s.r * 0.85, pb)) { killPlayer(); return; }
        }
        for (const l of game.runtime.lasers) {
            if (!l.active) continue;
            if (segIntersectsRect(l.x1, l.y1, l.x2, l.y2, pb)) { killPlayer(); return; }
        }

        for (const c of game.runtime.coins) {
            if (c.taken) continue;
            const dx = (player.x + player.w / 2) - c.x;
            const dy = (player.y + player.h / 2) - c.y;
            if (dx * dx + dy * dy < 22 * 22) {
                c.taken = true;
                game.coinsThisRun++;
                Save.addCoins(1);
                Save.incStat('coinsEver', 1);
                player.boost = Math.min(BASE.boostMax, player.boost + BASE.boostFromCoin);
                SFX.coin();
                refreshHud();
                spawnParticles(c.x, c.y, 8, { spread: 4, life: 24, color: '#ffd166', gravity: -0.05, r: 2 });
            }
        }

        if (game.level.checkpoint && !game.runtime.checkpointHit) {
            const cp = { x: game.level.checkpoint.x - 16, y: game.level.checkpoint.y - 40, w: 32, h: 50 };
            if (aabb(pb, cp)) {
                game.runtime.checkpointHit = true;
                game.checkpoint = { x: game.level.checkpoint.x - player.w / 2, y: game.level.checkpoint.y - player.h };
                SFX.cp();
                spawnParticles(game.level.checkpoint.x, game.level.checkpoint.y - 30, 16,
                    { spread: 3, life: 30, color: '#5bc0eb', up: 2, gravity: 0.1 });
            }
        }

        if (aabb(pb, game.level.goal)) { levelComplete(); return; }
        if (player.y > game.level.worldH + 50) { killPlayer(); return; }

        // Landing dust
        if (!wasGrounded && player.grounded && Math.abs(player._lastFallVy || 0) > 6) {
            spawnParticles(player.x + player.w / 2, player.y + player.h, 8,
                { spread: 3, life: 18, color: '#bfb8d0', gravity: 0.1 });
            SFX.land();
        }
        player._lastFallVy = player.vy;

        // Running dust
        if (player.grounded && Math.abs(player.vx) > 3 && game.runtime.time % 6 === 0) {
            game.particles.push({
                x: player.x + player.w / 2 - player.facing * 6, y: player.y + player.h,
                vx: -player.facing * 0.6, vy: -0.4,
                life: 14, age: 0, r: 1.5, color: '#9b9bb0', gravity: 0.05
            });
        }

        // Trail (skin perk)
        if (eff.trail && game.runtime.time % 3 === 0) {
            const col = eff.trail === 'rainbow'
                ? `hsl(${(game.runtime.time * 8) % 360}, 80%, 65%)`
                : eff.trail;
            game.particles.push({
                x: player.x + player.w / 2, y: player.y + player.h / 2,
                vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
                life: 24, age: 0, r: 3, color: col, gravity: 0,
            });
        }

        // Active-boost streak particles
        if (inBoost && game.runtime.time % 2 === 0) {
            game.particles.push({
                x: player.x + player.w / 2 - player.facing * 4,
                y: player.y + player.h / 2 + (Math.random() - 0.5) * 24,
                vx: -player.facing * (1 + Math.random()), vy: 0,
                life: 14, age: 0, r: 2 + Math.random() * 2,
                color: '#ffd166', gravity: 0,
            });
        }

        // Update HUD boost bar each frame (cheap DOM write)
        const fill = $('boost-fill');
        if (fill) {
            const pct = (player.boost / BASE.boostMax) * 100;
            fill.style.width = pct + '%';
            const chip = $('boost-chip');
            if (chip) chip.classList.toggle('full', player.boost >= BASE.boostCost);
        }

        player.animT += Math.abs(player.vx) * 0.07 + 0.04;

        updateParticles();
        updateCamera();
    }

    function getSolidRects() {
        const arr = game.level.platforms.slice();
        for (const c of game.runtime.crumblers) if (c.state !== 'gone') arr.push(c);
        for (const m of game.runtime.movers) arr.push({ x: m.cx, y: m.cy, w: m.w, h: m.h, _mover: m });
        return arr;
    }
    function resolveHorizontal() {
        const rects = getSolidRects();
        const pb = { x: player.x, y: player.y, w: player.w, h: player.h };
        for (const r of rects) {
            if (!aabb(pb, r)) continue;
            if (player.vx > 0) {
                player.x = r.x - player.w; player.wallDir = 1; player.vx = 0;
            } else if (player.vx < 0) {
                player.x = r.x + r.w; player.wallDir = -1; player.vx = 0;
            }
            pb.x = player.x;
        }
        if (player.x < 0) { player.x = 0; player.vx = 0; }
        if (player.x + player.w > game.level.worldW) { player.x = game.level.worldW - player.w; player.vx = 0; }
    }
    function resolveVertical() {
        const rects = getSolidRects();
        const pb = { x: player.x, y: player.y, w: player.w, h: player.h };
        for (const r of rects) {
            if (!aabb(pb, r)) continue;
            if (player.vy > 0) {
                player.y = r.y - player.h;
                player.vy = 0;
                player.grounded = true;
                if (r._mover) player._riding = r._mover;
                for (const c of game.runtime.crumblers) {
                    if (c === r && c.state === 'solid') c.state = 'touched';
                }
            } else if (player.vy < 0) {
                player.y = r.y + r.h; player.vy = 0;
            }
            pb.y = player.y;
        }
    }

    // ---- Draw -----------------------------------------------
    function draw() {
        let ox = 0, oy = 0;
        if (game.shakeT > 0) {
            ox = (Math.random() - 0.5) * game.shakeMag;
            oy = (Math.random() - 0.5) * game.shakeMag;
        }
        ctx.save();
        if (game.level) {
            Render.drawBackground(game);
            ctx.translate(-Math.round(game.cameraX) + ox, -Math.round(game.cameraY) + oy);
            Render.drawLevel(game);
            Render.drawBouncers(game);
            Render.drawBoosters(game);
            Render.drawCoins(game);
            Render.drawCheckpoint(game);
            Render.drawGoal(game);
            Render.drawHazards(game);
            Render.drawParticles(game);
            if (game.state === 'dying') Render.drawRagdoll(game);
            else Render.drawPlayer(game);
        } else {
            Render.drawIdleBackdrop(ctx, VIEW_W, VIEW_H);
        }
        ctx.restore();
    }

    // ---- UI -------------------------------------------------
    const $ = id => document.getElementById(id);

    function showHud(on) { $('hud').classList.toggle('hidden', !on); }
    function showMenu(on, screenId = null) {
        $('menu').classList.toggle('hidden', !on);
        for (const s of ['screen-main', 'screen-levels', 'screen-controls',
                         'screen-result', 'screen-pause', 'screen-win',
                         'screen-shop', 'screen-daily', 'screen-achievements']) {
            $(s).classList.toggle('hidden', s !== screenId);
        }
    }

    function refreshHud() {
        $('current-level').textContent = (game.levelIndex + 1);
        $('coins-total').textContent = game.level ? game.level.coins.length : 0;
        $('coins').textContent = game.coinsThisRun;
        $('deaths').textContent = Save.deaths();
        $('wallet').textContent = Save.coins();
        const best = Save.getBest(game.levelIndex);
        $('best-time').textContent = best ? best.toFixed(2) + 's' : '—';
    }

    function buildLevelGrid() {
        const grid = $('level-grid');
        grid.innerHTML = '';
        const chapters = window.CHAPTERS || [{ name: 'Levels', start: 0, end: LEVELS.length }];
        for (const ch of chapters) {
            // chapter header
            const header = document.createElement('div');
            header.className = 'chapter-header';
            const done = (() => {
                let n = 0;
                for (let i = ch.start; i < ch.end; i++) if (Save.isCompleted(i)) n++;
                return n;
            })();
            header.innerHTML = `<span class="chapter-name">${ch.name}</span>
                                <span class="chapter-progress">${done} / ${ch.end - ch.start}</span>`;
            grid.appendChild(header);
            const row = document.createElement('div');
            row.className = 'chapter-row';
            for (let i = ch.start; i < ch.end && i < LEVELS.length; i++) {
                const unlocked = Save.isUnlocked(i);
                const completed = Save.isCompleted(i);
                const perfect = Save.data.stats.perfectLevels[i];
                const tile = document.createElement('div');
                tile.className = 'level-tile' + (completed ? ' completed' : '') + (unlocked ? '' : ' locked') + (perfect ? ' perfect' : '');
                const best = Save.getBest(i);
                tile.innerHTML = `<div class="num">${i + 1}${perfect ? '<span class="star">★</span>' : ''}</div>
                                  <div class="best">${best ? best.toFixed(2) + 's' : (unlocked ? '—' : '🔒')}</div>`;
                if (unlocked) tile.addEventListener('click', () => { SFX.ensure(); enterLevel(i); });
                row.appendChild(tile);
            }
            grid.appendChild(row);
        }
    }

    function buildAchievements() {
        const list = $('achievements-list');
        list.innerHTML = '';
        const unlockedCount = Object.keys(Save.achievements()).length;
        $('ach-summary').textContent = `${unlockedCount} / ${ACHIEVEMENTS.length} unlocked`;
        for (const a of ACHIEVEMENTS) {
            const unlocked = Save.hasAchievement(a.id);
            const row = document.createElement('div');
            row.className = 'ach-row' + (unlocked ? ' unlocked' : '');
            row.innerHTML = `
                <div class="ach-icon">${a.icon}</div>
                <div class="ach-text">
                    <div class="ach-name">${a.name}</div>
                    <div class="ach-desc">${a.desc}</div>
                </div>
                <div class="ach-state">${unlocked ? '✅' : '🔒'}</div>
            `;
            list.appendChild(row);
        }
    }

    // ---- Achievement toast ----------------------------------
    function showAchievementToast(a) {
        const t = $('toast');
        t.innerHTML = `
            <div class="toast-icon">${a.icon}</div>
            <div class="toast-body">
                <div class="toast-title">Achievement unlocked!</div>
                <div class="toast-name">${a.name}</div>
                <div class="toast-desc">${a.desc}</div>
            </div>
        `;
        t.classList.remove('hidden');
        t.classList.add('show');
        SFX.reward();
        setTimeout(() => {
            t.classList.remove('show');
            setTimeout(() => t.classList.add('hidden'), 400);
        }, 3200);
    }
    Save.onAchievementUnlocked(showAchievementToast);

    function buildShop() {
        $('wallet-shop').textContent = Save.coins();
        const grid = $('shop-grid');
        grid.innerHTML = '';
        for (const s of SKINS) {
            const owned = Save.own(s.id);
            const equipped = Save.equipped() === s.id;
            const tile = document.createElement('div');
            tile.className = 'shop-tile' + (equipped ? ' equipped' : '') + (owned ? ' owned' : '');

            const canvasEl = document.createElement('canvas');
            canvasEl.width = 80; canvasEl.height = 80;
            canvasEl.className = 'skin-canvas';
            tile.appendChild(canvasEl);

            const name = document.createElement('div');
            name.className = 'skin-name';
            name.textContent = s.name;
            tile.appendChild(name);

            const desc = document.createElement('div');
            desc.className = 'skin-desc';
            desc.textContent = s.desc;
            tile.appendChild(desc);

            const action = document.createElement('button');
            action.className = 'skin-action';
            if (equipped) { action.textContent = 'EQUIPPED'; action.disabled = true; }
            else if (owned) action.textContent = 'Equip';
            else action.textContent = `Buy · ${s.cost} 🪙`;
            tile.appendChild(action);

            action.addEventListener('click', e => {
                e.stopPropagation();
                if (Save.equipped() === s.id) return;
                if (Save.own(s.id)) {
                    Save.equip(s.id);
                    SFX.buy();
                    buildShop();
                    refreshHud();
                    return;
                }
                const r = Save.buy(s.id, s.cost);
                if (r === 'ok') {
                    Save.equip(s.id);
                    SFX.buy();
                    buildShop();
                    refreshHud();
                } else if (r === 'broke') {
                    SFX.deny();
                    action.textContent = 'Not enough 🪙';
                    setTimeout(() => buildShop(), 700);
                }
            });

            grid.appendChild(tile);
            Render.renderSkinIcon(canvasEl, s.id);
        }
    }

    function buildDaily() {
        const status = Save.dailyStatus();
        $('daily-status').textContent = status.canClaim
            ? `Day ${status.nextDay} ready!`
            : `Already claimed today. Come back tomorrow.`;
        const days = $('daily-days');
        days.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            const reward = DAILY_REWARDS[i];
            const isToday = status.canClaim && (i + 1) === status.nextDay;
            const claimedThisCycle = !status.canClaim
                ? ((i + 1) <= status.streak)
                : (i < status.streak);
            const cell = document.createElement('div');
            cell.className = 'day-cell' + (isToday ? ' today' : '') + (claimedThisCycle ? ' claimed' : '');
            cell.innerHTML = `<div class="day-label">Day ${i + 1}</div>
                              <div class="day-coin">${reward} 🪙</div>`;
            days.appendChild(cell);
        }
        $('claim-btn').disabled = !status.canClaim;
        $('claim-btn').textContent = status.canClaim ? `Claim Day ${status.nextDay}` : 'Already Claimed';
    }

    // ---- Wire up screens ------------------------------------
    $('start-btn').addEventListener('click', () => { SFX.ensure(); enterLevel(0); });
    $('levels-btn').addEventListener('click', () => { buildLevelGrid(); showMenu(true, 'screen-levels'); });
    $('controls-btn').addEventListener('click', () => showMenu(true, 'screen-controls'));
    $('shop-btn').addEventListener('click', () => { buildShop(); showMenu(true, 'screen-shop'); });
    $('daily-btn').addEventListener('click', () => { buildDaily(); showMenu(true, 'screen-daily'); });
    $('achievements-btn').addEventListener('click', () => { buildAchievements(); showMenu(true, 'screen-achievements'); });
    $('back-from-achievements').addEventListener('click', () => showMenu(true, 'screen-main'));

    $('back-from-levels').addEventListener('click', () => showMenu(true, 'screen-main'));
    $('back-from-controls').addEventListener('click', () => showMenu(true, 'screen-main'));
    $('back-from-shop').addEventListener('click', () => showMenu(true, 'screen-main'));
    $('back-from-daily').addEventListener('click', () => showMenu(true, 'screen-main'));

    $('claim-btn').addEventListener('click', () => {
        const r = Save.claimDaily();
        if (!r) return;
        SFX.reward();
        $('daily-status').textContent = `+${r.reward} 🪙 earned! Come back tomorrow.`;
        buildDaily();
    });

    $('next-level-btn').addEventListener('click', () => {
        const next = game.levelIndex + 1;
        if (next >= LEVELS.length) {
            game.state = 'win';
            $('win-stats').innerHTML = `
                <p>You completed all ${LEVELS.length} levels!</p>
                <p>Total deaths: <b>${Save.deaths()}</b></p>
                <p>Coins in wallet: <b>${Save.coins()} 🪙</b></p>
            `;
            showMenu(true, 'screen-win');
            showHud(false);
        } else enterLevel(next);
    });
    $('restart-btn').addEventListener('click', () => enterLevel(game.levelIndex));
    $('result-menu-btn').addEventListener('click', () => {
        buildLevelGrid(); showMenu(true, 'screen-levels'); showHud(false); game.state = 'menu';
    });
    $('resume-btn').addEventListener('click', resumeGame);
    $('pause-restart-btn').addEventListener('click', () => enterLevel(game.levelIndex));
    $('pause-menu-btn').addEventListener('click', () => { game.state = 'menu'; showHud(false); showMenu(true, 'screen-main'); });
    $('win-again-btn').addEventListener('click', () => enterLevel(0));

    function refreshDailyBadge() {
        const btn = $('daily-btn');
        const status = Save.dailyStatus();
        btn.classList.toggle('has-badge', status.canClaim);
    }

    // ---- Boot -----------------------------------------------
    showMenu(true, 'screen-main');
    showHud(false);
    Render.drawIdleBackdrop(ctx, VIEW_W, VIEW_H);
    refreshDailyBadge();

    // Refresh the badge after claim / closing the daily screen
    $('claim-btn').addEventListener('click', refreshDailyBadge);
    $('back-from-daily').addEventListener('click', refreshDailyBadge);
})();
