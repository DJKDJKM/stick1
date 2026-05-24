// ============================================================
// render.js — all canvas drawing helpers
// ============================================================
(function () {
    function getSkinColors() {
        const id = Save.equipped();
        const s = SKINS.find(k => k.id === id) || SKINS[0];
        return s;
    }

    function drawBackground(g) {
        const ctx = g.ctx, level = g.level;
        const pal = PALETTES[level.bg] || PALETTES.sunset;
        const grad = ctx.createLinearGradient(0, 0, 0, g.VIEW_H);
        grad.addColorStop(0, pal.sky1);
        grad.addColorStop(1, pal.sky2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, g.VIEW_W, g.VIEW_H);

        // Parallax stars
        ctx.fillStyle = 'rgba(255,255,255,0.10)';
        const pX = g.cameraX * 0.2, pY = g.cameraY * 0.2;
        for (let i = 0; i < 40; i++) {
            const sx = ((i * 137) - pX) % g.VIEW_W;
            const sy = ((i * 89)  - pY) % g.VIEW_H;
            const x = (sx + g.VIEW_W) % g.VIEW_W;
            const y = (sy + g.VIEW_H) % g.VIEW_H;
            ctx.fillRect(x, y, 2, 2);
        }
        // Mid layer mountains
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        const mX = g.cameraX * 0.4;
        ctx.beginPath();
        ctx.moveTo(0, g.VIEW_H);
        for (let i = -2; i < 16; i++) {
            const x = i * 200 - (mX % 200);
            ctx.lineTo(x + 100, g.VIEW_H - 180 + Math.sin(i * 2.3) * 30);
            ctx.lineTo(x + 200, g.VIEW_H);
        }
        ctx.closePath();
        ctx.fill();
    }

    function drawLevel(g) {
        const ctx = g.ctx, level = g.level, rt = g.runtime;
        const pal = PALETTES[level.bg] || PALETTES.sunset;
        for (const p of level.platforms) {
            ctx.fillStyle = pal.plat;
            ctx.fillRect(p.x, p.y, p.w, p.h);
            ctx.fillStyle = pal.platTop;
            ctx.fillRect(p.x, p.y, p.w, Math.min(6, p.h));
            ctx.fillStyle = 'rgba(0,0,0,0.25)';
            ctx.fillRect(p.x, p.y + p.h - 3, p.w, 3);
        }
        for (const m of rt.movers) {
            ctx.fillStyle = '#6b3fa0';
            ctx.fillRect(m.cx, m.cy, m.w, m.h);
            ctx.fillStyle = '#c77dff';
            ctx.fillRect(m.cx, m.cy, m.w, 4);
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.lineWidth = 1;
            ctx.strokeRect(m.cx + 0.5, m.cy + 0.5, m.w - 1, m.h - 1);
        }
        for (const c of rt.crumblers) {
            if (c.state === 'gone') continue;
            const sh = c.state === 'touched' ? (Math.random() - 0.5) * 2 : 0;
            ctx.fillStyle = '#5e3a23';
            ctx.fillRect(c.x + sh, c.y + sh, c.w, c.h);
            ctx.fillStyle = '#a06438';
            ctx.fillRect(c.x + sh, c.y + sh, c.w, 4);
            ctx.strokeStyle = 'rgba(0,0,0,0.6)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(c.x + c.w * 0.3, c.y);
            ctx.lineTo(c.x + c.w * 0.5, c.y + c.h);
            ctx.moveTo(c.x + c.w * 0.7, c.y);
            ctx.lineTo(c.x + c.w * 0.6, c.y + c.h);
            ctx.stroke();
        }
    }

    function drawHazards(g) {
        const ctx = g.ctx, level = g.level, rt = g.runtime;
        for (const s of level.spikes) {
            if (s.w <= 0 || s.h <= 0) continue;
            ctx.fillStyle = '#9aa0a8';
            ctx.beginPath();
            const tipCount = Math.max(1, Math.floor(s.w / 14));
            for (let i = 0; i < tipCount; i++) {
                const xL = s.x + i * (s.w / tipCount);
                const xR = s.x + (i + 1) * (s.w / tipCount);
                ctx.moveTo(xL, s.y + s.h);
                ctx.lineTo((xL + xR) / 2, s.y);
                ctx.lineTo(xR, s.y + s.h);
            }
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#3a3f47';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
        for (const s of rt.saws) {
            ctx.save();
            ctx.translate(s.cx, s.cy);
            ctx.rotate(s.rot);
            ctx.fillStyle = '#c0c0c8';
            ctx.beginPath();
            const teeth = 10;
            for (let i = 0; i < teeth; i++) {
                const a = (i / teeth) * Math.PI * 2;
                const a2 = ((i + 0.5) / teeth) * Math.PI * 2;
                ctx.lineTo(Math.cos(a) * s.r, Math.sin(a) * s.r);
                ctx.lineTo(Math.cos(a2) * (s.r + 6), Math.sin(a2) * (s.r + 6));
            }
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#22252b';
            ctx.beginPath();
            ctx.arc(0, 0, s.r * 0.45, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ff4d6d';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-s.r * 0.4, 0); ctx.lineTo(s.r * 0.4, 0);
            ctx.moveTo(0, -s.r * 0.4); ctx.lineTo(0, s.r * 0.4);
            ctx.stroke();
            ctx.restore();
        }
        for (const l of rt.lasers) {
            if (l.active) {
                ctx.strokeStyle = '#ff3a3a';
                ctx.shadowColor = '#ff3a3a';
                ctx.shadowBlur = 12;
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(l.x1, l.y1); ctx.lineTo(l.x2, l.y2);
                ctx.stroke();
                ctx.shadowBlur = 0;
            } else {
                ctx.strokeStyle = 'rgba(255,80,80,0.35)';
                ctx.setLineDash([4, 6]);
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(l.x1, l.y1); ctx.lineTo(l.x2, l.y2);
                ctx.stroke();
                ctx.setLineDash([]);
            }
            ctx.fillStyle = '#444';
            ctx.fillRect(l.x1 - 4, l.y1 - 4, 8, 8);
            ctx.fillRect(l.x2 - 4, l.y2 - 4, 8, 8);
        }
    }

    function drawBouncers(g) {
        const ctx = g.ctx, rt = g.runtime;
        const t = rt.time;
        for (const b of rt.bouncers) {
            const bounce = b._pressed > 0 ? (b._pressed / 8) : 0;
            const sx = b.x, sy = b.y + bounce * 4;
            const sw = b.w, sh = b.h - bounce * 4;
            // pad
            ctx.fillStyle = '#ff5d8f';
            ctx.fillRect(sx, sy, sw, sh);
            ctx.fillStyle = '#ffd9e6';
            ctx.fillRect(sx, sy, sw, 4);
            // springs underneath (zigzag)
            ctx.strokeStyle = '#ff9bbf';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let xx = sx + 6; xx < sx + sw - 4; xx += 8) {
                ctx.moveTo(xx, sy + sh);
                ctx.lineTo(xx + 4, sy + sh + 6);
                ctx.lineTo(xx + 8, sy + sh);
            }
            ctx.stroke();
            // arrow pulse
            const pulse = (Math.sin(t * 0.12) + 1) / 2;
            ctx.globalAlpha = 0.3 + pulse * 0.5;
            ctx.fillStyle = '#ffe5ee';
            ctx.beginPath();
            const cx = sx + sw / 2, cy = sy - 6;
            ctx.moveTo(cx, cy - 6);
            ctx.lineTo(cx - 6, cy + 2);
            ctx.lineTo(cx + 6, cy + 2);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1;

            if (b._pressed > 0) b._pressed--;
        }
    }

    function drawBoosters(g) {
        const ctx = g.ctx, rt = g.runtime;
        for (const b of rt.boosters) {
            const angle = Math.atan2(b.dy || 0, b.dx || 1);
            ctx.save();
            ctx.translate(b.x + b.w / 2, b.y + b.h / 2);
            ctx.rotate(angle);
            // pad rect
            ctx.fillStyle = '#00f5d4';
            ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
            ctx.fillStyle = '#0a0a14';
            ctx.fillRect(-b.w / 2, -b.h / 2, b.w, 3);
            ctx.fillRect(-b.w / 2, b.h / 2 - 3, b.w, 3);
            // arrow chevrons indicating direction
            ctx.fillStyle = '#0a0a14';
            const phase = (rt.time * 0.08) % 1;
            for (let i = -1; i <= 2; i++) {
                const ax = -b.w / 2 + (i + phase) * (b.w / 2.5);
                if (ax < -b.w / 2 || ax > b.w / 2 - 6) continue;
                ctx.beginPath();
                ctx.moveTo(ax, -4); ctx.lineTo(ax + 5, 0); ctx.lineTo(ax, 4);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }
    }

    function drawCoins(g) {
        const ctx = g.ctx, rt = g.runtime;
        for (const c of rt.coins) {
            if (c.taken) continue;
            const bob = Math.sin((rt.time + c.x) * 0.08) * 2;
            ctx.save();
            ctx.translate(c.x, c.y + bob);
            ctx.fillStyle = '#ffd166';
            ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#fff7c2';
            ctx.beginPath(); ctx.arc(-2, -2, 3, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#a87b1f'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
        }
    }

    function drawCheckpoint(g) {
        const ctx = g.ctx, level = g.level, rt = g.runtime;
        if (!level.checkpoint) return;
        const cp = level.checkpoint;
        const hit = rt.checkpointHit;
        ctx.fillStyle = '#7d6f55';
        ctx.fillRect(cp.x - 1, cp.y - 50, 3, 50);
        const flagX = cp.x + 2;
        const flagY = cp.y - 48;
        const wave = Math.sin(rt.time * 0.15) * 3;
        ctx.fillStyle = hit ? '#5bc0eb' : '#777';
        ctx.beginPath();
        ctx.moveTo(flagX, flagY);
        ctx.lineTo(flagX + 22 + wave, flagY + 6);
        ctx.lineTo(flagX, flagY + 14);
        ctx.closePath();
        ctx.fill();
    }

    function drawGoal(g) {
        const ctx = g.ctx, level = g.level, t = g.runtime.time;
        const gl = level.goal;
        ctx.save();
        const pulse = 0.6 + Math.sin(t * 0.08) * 0.2;
        ctx.shadowColor = '#ffd166';
        ctx.shadowBlur = 24 * pulse;
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(gl.x, gl.y, gl.w, gl.h);
        ctx.restore();
        ctx.fillStyle = '#a87b1f';
        ctx.fillRect(gl.x, gl.y, gl.w, 6);
        ctx.fillRect(gl.x, gl.y + gl.h - 6, gl.w, 6);
        ctx.fillStyle = '#1a1132';
        ctx.font = 'bold 14px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText('GOAL', gl.x + gl.w / 2, gl.y + gl.h / 2 + 5);
    }

    function drawParticles(g) {
        const ctx = g.ctx;
        for (const p of g.particles) {
            const a = 1 - p.age / p.life;
            ctx.globalAlpha = a;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    // ---- Stickman pose ------------------------------------
    const HEAD_R = 7;

    function buildPose(player) {
        const f = player.facing;
        const t = player.animT;
        let head = null;
        const strokes = [];
        const seg = (...pts) => strokes.push({ segs: [pts] });
        const multi = (...segs) => strokes.push({ segs });

        if (player.sliding) {
            head = { x: 8 * f, y: -8 };
            seg([8 * f, -8], [-8 * f, -4]);
            seg([0, -6], [-10 * f, -10]);
            seg([-2 * f, -7], [10 * f, -9]);
            multi(
                [[-8 * f, -4], [-16 * f, -2]],
                [[-8 * f, -4], [-14 * f, 1]],
            );
        } else if (!player.grounded && player.wallDir !== 0) {
            const wf = player.wallDir;
            head = { x: 0, y: -30 };
            seg([0, -24], [-2 * wf, -10]);
            seg([0, -22], [8 * wf, -16]);
            seg([0, -22], [-7 * wf, -18]);
            multi(
                [[-2 * wf, -10], [-6 * wf, 0]],
                [[-2 * wf, -10], [2 * wf, 0]],
            );
        } else if (!player.grounded) {
            head = { x: 0, y: -30 };
            seg([0, -24], [0, -10]);
            if (player.vy < 0) {
                multi(
                    [[0, -22], [-7 * f, -28]],
                    [[0, -22], [7 * f, -26]],
                );
            } else {
                multi(
                    [[0, -20], [-9 * f, -14]],
                    [[0, -20], [9 * f, -22]],
                );
            }
            multi(
                [[0, -10], [-5 * f, -2]],
                [[0, -10], [5 * f, 0]],
            );
        } else {
            const moving = Math.abs(player.vx) > 0.6;
            const swing = moving ? Math.sin(t * 1.4) : 0;
            head = { x: 0, y: -30 };
            seg([0, -24], [0, -10]);
            multi(
                [[0, -22], [-7 * f - swing * 4, -18 + swing * 3]],
                [[0, -22], [7 * f - swing * 4, -18 - swing * 3]],
            );
            multi(
                [[0, -10], [-5 + swing * 5, 0]],
                [[0, -10], [5 - swing * 5, 0]],
            );
        }
        return { head, strokes };
    }

    function drawPose(ctx, pose, lineWidth, stroke, fillHead) {
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fillHead;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for (const stk of pose.strokes) {
            ctx.beginPath();
            for (const segPts of stk.segs) {
                ctx.moveTo(segPts[0][0], segPts[0][1]);
                for (let i = 1; i < segPts.length; i++) ctx.lineTo(segPts[i][0], segPts[i][1]);
            }
            ctx.stroke();
        }
        if (pose.head) {
            ctx.beginPath();
            ctx.arc(pose.head.x, pose.head.y, HEAD_R, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawPlayer(g) {
        const ctx = g.ctx, player = g.player;
        const skin = getSkinColors();
        const x = player.x + player.w / 2;
        const baseY = player.y + player.h;

        // ground shadow
        ctx.save();
        ctx.translate(x, baseY);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(0, -1, player.sliding ? 14 : 10, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        const pose = buildPose(player);

        ctx.save();
        ctx.translate(x, baseY);

        // Glow + dark outline pass
        ctx.save();
        ctx.shadowColor = skin.fill;
        ctx.shadowBlur = 14;
        drawPose(ctx, pose, 7, skin.outline, skin.outline);
        ctx.restore();

        // Bright fill pass
        drawPose(ctx, pose, 3.6, skin.fill, skin.fill);

        // Eye (facing)
        if (pose.head) {
            ctx.fillStyle = skin.eye || '#1a1132';
            ctx.beginPath();
            ctx.arc(pose.head.x + player.facing * 2, pose.head.y - 1, 1.4, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    function drawRagdoll(g) {
        const ctx = g.ctx;
        if (!g.ragdoll) return;
        const skin = getSkinColors();
        function piece(stroke, fill, lw) {
            ctx.strokeStyle = stroke;
            ctx.fillStyle = fill;
            ctx.lineWidth = lw;
            ctx.lineCap = 'round';
            for (const p of g.ragdoll.pieces) {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                if (p.type === 'head') {
                    ctx.beginPath();
                    ctx.arc(0, 0, HEAD_R, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.type === 'body') {
                    ctx.beginPath();
                    ctx.moveTo(0, -8); ctx.lineTo(0, 8); ctx.stroke();
                } else if (p.type === 'arm') {
                    ctx.beginPath();
                    ctx.moveTo(0, 0); ctx.lineTo(10, 0); ctx.stroke();
                } else if (p.type === 'leg') {
                    ctx.beginPath();
                    ctx.moveTo(0, 0); ctx.lineTo(0, 12); ctx.stroke();
                }
                ctx.restore();
            }
        }
        piece(skin.outline, skin.outline, 7);
        piece(skin.fill, skin.fill, 3.6);
    }

    function drawPet(g) {
        const ctx = g.ctx;
        const pet = (window.PETS || []).find(p => p.id === Save.equippedPet());
        if (!pet || pet.id === 'none') return;
        if (!g.pet) return;
        const x = g.pet.x, y = g.pet.y;
        const t = g.runtime ? g.runtime.time : 0;

        // glow + main shape
        ctx.save();
        const color = pet.color === 'rainbow'
            ? `hsl(${(t * 6) % 360}, 80%, 65%)`
            : pet.color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = color;
        ctx.strokeStyle = pet.outline || '#000';
        ctx.lineWidth = 2;
        const r = 9;
        if (pet.shape === 'square') {
            ctx.fillRect(x - r, y - r, r * 2, r * 2);
            ctx.strokeRect(x - r, y - r, r * 2, r * 2);
        } else if (pet.shape === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(x, y - r);
            ctx.lineTo(x + r, y + r);
            ctx.lineTo(x - r, y + r);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
        } else if (pet.shape === 'star') {
            ctx.beginPath();
            for (let i = 0; i < 10; i++) {
                const a = -Math.PI / 2 + i * Math.PI / 5;
                const rr = i % 2 === 0 ? r : r * 0.45;
                const px = x + Math.cos(a) * rr;
                const py = y + Math.sin(a) * rr;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill(); ctx.stroke();
        } else { // orb / circle / default
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
        // little eye
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#1a1132';
        ctx.beginPath();
        ctx.arc(x + 2, y - 2, 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // confetti spawn helper (used from game.js at win)
    function spawnConfetti(g, cx, cy) {
        const colors = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#a3ffd8', '#ff9bbf', '#9be7ff'];
        for (let i = 0; i < 80; i++) {
            g.particles.push({
                x: cx + (Math.random() - 0.5) * 80,
                y: cy - 20 - Math.random() * 40,
                vx: (Math.random() - 0.5) * 5,
                vy: -3 - Math.random() * 6,
                life: 60 + Math.random() * 30,
                age: 0,
                r: 2 + Math.random() * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                gravity: 0.2,
            });
        }
    }

    function drawIdleBackdrop(ctx, W, H) {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#2b1d4a');
        grad.addColorStop(1, '#0d0a1a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 4;
        const x = W / 2, y = H / 2 + 60;
        ctx.beginPath(); ctx.arc(x, y - 40, 12, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(x, y - 28); ctx.lineTo(x, y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y - 22); ctx.lineTo(x - 14, y - 28);
        ctx.moveTo(x, y - 22); ctx.lineTo(x + 14, y - 28); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 10, y + 20);
        ctx.moveTo(x, y); ctx.lineTo(x + 10, y + 20); ctx.stroke();
    }

    // Render the stickman onto a small static canvas (for the shop tiles).
    function renderSkinIcon(canvas, skinId) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        const skin = SKINS.find(s => s.id === skinId) || SKINS[0];
        // background tile
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, 'rgba(255,255,255,0.06)');
        grad.addColorStop(1, 'rgba(0,0,0,0.2)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2, cy = h - 8;
        // shadow
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.beginPath();
        ctx.ellipse(cx, cy - 1, 11, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // outline + fill pass
        function paint(stroke, fill, lw) {
            ctx.strokeStyle = stroke; ctx.fillStyle = fill;
            ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            // body
            ctx.beginPath(); ctx.moveTo(cx, cy - 24); ctx.lineTo(cx, cy - 10); ctx.stroke();
            // arms
            ctx.beginPath();
            ctx.moveTo(cx, cy - 22); ctx.lineTo(cx - 8, cy - 18);
            ctx.moveTo(cx, cy - 22); ctx.lineTo(cx + 8, cy - 18);
            ctx.stroke();
            // legs
            ctx.beginPath();
            ctx.moveTo(cx, cy - 10); ctx.lineTo(cx - 5, cy);
            ctx.moveTo(cx, cy - 10); ctx.lineTo(cx + 5, cy);
            ctx.stroke();
            // head
            ctx.beginPath();
            ctx.arc(cx, cy - 30, 7, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.save();
        ctx.shadowColor = skin.fill;
        ctx.shadowBlur = 10;
        paint(skin.outline, skin.outline, 7);
        ctx.restore();
        paint(skin.fill, skin.fill, 3.6);
        // eye
        ctx.fillStyle = skin.eye || '#1a1132';
        ctx.beginPath(); ctx.arc(cx + 2, cy - 31, 1.4, 0, Math.PI * 2); ctx.fill();
    }

    function renderPetIcon(canvas, petId) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        const pet = (window.PETS || []).find(p => p.id === petId) || (window.PETS && PETS[0]);
        if (!pet) return;
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, 'rgba(255,255,255,0.06)');
        grad.addColorStop(1, 'rgba(0,0,0,0.2)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        const x = w / 2, y = h / 2 + 4;
        if (pet.id === 'none') {
            ctx.fillStyle = '#666';
            ctx.font = 'bold 14px Segoe UI';
            ctx.textAlign = 'center';
            ctx.fillText('—', x, y);
            return;
        }
        const color = pet.color === 'rainbow' ? '#ff8ad9' : pet.color;
        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = 14;
        ctx.fillStyle = color;
        ctx.strokeStyle = pet.outline || '#000';
        ctx.lineWidth = 2;
        const r = 18;
        if (pet.shape === 'square') {
            ctx.fillRect(x - r, y - r, r * 2, r * 2);
            ctx.strokeRect(x - r, y - r, r * 2, r * 2);
        } else if (pet.shape === 'triangle') {
            ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x + r, y + r); ctx.lineTo(x - r, y + r); ctx.closePath();
            ctx.fill(); ctx.stroke();
        } else if (pet.shape === 'star') {
            ctx.beginPath();
            for (let i = 0; i < 10; i++) {
                const a = -Math.PI / 2 + i * Math.PI / 5;
                const rr = i % 2 === 0 ? r : r * 0.45;
                const px = x + Math.cos(a) * rr;
                const py = y + Math.sin(a) * rr;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill(); ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
        }
        ctx.restore();
    }

    window.Render = {
        drawBackground, drawLevel, drawHazards, drawCoins, drawCheckpoint, drawGoal,
        drawParticles, drawPlayer, drawRagdoll, drawIdleBackdrop, renderSkinIcon,
        getSkinColors, drawBouncers, drawBoosters, drawPet, spawnConfetti, renderPetIcon,
    };
})();
