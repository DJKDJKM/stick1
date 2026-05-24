# 🏃 Stickman Parkour

A polished browser-based platformer inspired by the popular Stickman Parkour games on CrazyGames — with **Roblox-style** daily rewards, a skin shop, and stat-boosting perks.

Pure vanilla JS — no build step, no dependencies. Open `index.html` and play.

![Stickman Parkour](https://img.shields.io/badge/HTML5-Canvas-orange?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---

## ✨ Features

### Gameplay
- **45 hand-designed levels** organized into **7 chapters** (Beginnings → Skills → Variety → Heights → Bounce → Mastery → **Precision**)
- **Precision chapter** — 10 levels of 1-block-wide platforms (22-30 px) demanding pixel-perfect landings
- **Animated stickman** with distinct poses: running, jumping, falling, sliding, wall-sliding
- **Full move-set**: double jump, **wall slide + wall jump**, **slide-under low ceilings**, **SpeedRunners-style ⚡ boost**
- **Smooth feel**: coyote time, jump buffering, screen shake, parallax background, particle effects
- **Death ragdoll** — your stickman literally falls apart when you die
- **Checkpoints** inside longer levels

### Obstacles & objects
- Stationary spikes, spinning **saws** (patrolling), pulsing **lasers** (timed)
- **Moving platforms** that carry you, **crumbling platforms** that fall after stepping on them
- 🌸 **Bouncers / trampolines** that launch you high
- 💨 **Boosters / speed pads** that hurl you in a direction
- Coins to collect, checkpoint flags, goal beacons

### Roblox-style progression
- 🪙 **Coin wallet** — collect coins in levels, earn completion bonuses (+5), best-time bonuses (+5), perfect-run bonuses (+3)
- 🛍️ **Skin shop** with **19 unlockable characters**, each with passive perks
- 🐾 **Pet shop** with **10 pet companions** that follow you and stack perks with your skin
- ⚡ **Perks per skin** — speed, jump, gravity, triple jump, slower wall slide, coyote bonus, trail effects
- 🎁 **7-day daily reward cycle** — 10/15/25/40/60/80/150 🪙, with pulsing badge on the menu when claimable
- 🏆 **20 Achievements** — coin milestones, perfect runs, speed-run goals, mastery completion, drip master (all skins), combo king, pixel perfect, tycoon, with toast notifications on unlock
- 📊 **Per-level best times** + perfect-run stars + total deaths counter, all persisted to `localStorage`
- 🗺️ **Level select** with chapter dividers, completion ticks, lock progression, and best-time stars

### Polish
- Pause menu (`Esc`) with resume / restart / main menu
- Instant restart (`R`)
- HUD with live coin & timer & best-time chips
- Tiny Web Audio synth — no audio files needed; SFX for jump, double-jump, wall-jump, coin, checkpoint, death, win, coin purchase, denied purchase, daily reward fanfare

---

## 🎮 Controls

| Action | Key |
| --- | --- |
| Move | **A / D** or **← / →** |
| Jump (and double jump) | **Space** / **W** / **↑** |
| Slide (fit under low ceilings) | **S** / **↓** |
| ⚡ Boost (burst of speed) | **Shift** (needs ≥ 50 boost meter) |
| Wall jump | Press jump while sliding down a wall |
| Restart level | **R** |
| Pause | **Esc** |

---

## 🛍️ Skins

| Skin | Cost | Perk |
| --- | ---: | --- |
| **Hero** | Free | Default |
| **Crimson** | 10 🪙 | +10% movement speed |
| **Aqua** | 15 🪙 | +10% jump power |
| **Ghost** | 25 🪙 | +6 frames coyote time |
| **Sprinter** | 30 🪙 | +18% movement speed |
| **Slime** | 35 🪙 | -15% gravity (floaty) |
| **Sage** | 45 🪙 | +5% to every stat |
| **Iron** | 55 🪙 | -10% gravity · 30% slower wall slide |
| **Shadow** | 60 🪙 | 40% slower wall slide |
| **Wizard** | 80 🪙 | +15% jump · +6 coyote frames |
| **Lightning** | 85 🪙 | +20% speed · electric trail |
| **Tri-Jet** | 110 🪙 | **Triple jump** · +5% jump |
| **Vortex** | 130 🪙 | +10% speed · triple jump · cyan trail |
| **Mythic** | 175 🪙 | +15% speed/jump · -15% gravity · rainbow trail |
| **Cosmic** | 220 🪙 | TRIPLE jump · all-stats maxed · rainbow trail |
| **Frost** | 60 🪙 | +30% boost regen · -10% gravity |
| **Phantom Lord** | 95 🪙 | +10 coyote frames · +5% speed · ghost trail |
| **Inferno** | 140 🪙 | +25% speed · +15% jump · fire trail |
| **Stardust** | 200 🪙 | +10% all · +50% boost regen |

## 🏆 Achievements (20)

First Steps · Persistent · Coin Collector · Untouchable · Speed Demon · Wall Crawler · Sky High · Fashionista · Chapter Done · Loaded · Bouncy Boy · Boost Master · Pet Owner · On Fire · Combo King · Speedrunner · Tycoon · Pixel Perfect · Drip Master · World Master.

## 🐾 Pets

7 unlockable pet companions that follow you around the level and grant perks that **stack with your skin**:

| Pet | Cost | Perk |
| --- | ---: | --- |
| None | Free | — |
| Cube Pal | 20 🪙 | +5% jump |
| Mini Ghost | 35 🪙 | +5% speed |
| Star Pal | 55 🪙 | +1 wallet coin per pickup |
| Flame Buddy | 80 🪙 | +60% boost regen |
| Crystal | 110 🪙 | -10% gravity |
| Rainbow Orb | 180 🪙 | +5% everything + rainbow trail |
| Cloud Puff | 25 🪙 | +2 coyote frames |
| Dragon Egg | 90 🪙 | +30% boost regen |
| Phoenix | 160 🪙 | +5% jump · +30% boost regen · fire trail |

## 🎵 Background music + ⚙️ Settings

Procedural chiptune lead + bassline loops while you play. Toggle music and SFX independently from the **Settings** menu. Includes a "Reset all progress" button with confirm prompt.

## 🔥 Combo system

Collect coins in quick succession (under 2.5s between pickups) to build a combo multiplier. Each successive coin gives **+1 bonus wallet coin per combo step**. Combos display in the HUD with a draining timer bar. New achievement: **On Fire** — reach a x5 combo.

## ⚡ The Boost meter

Inspired by SpeedRunners. You have a 0–100 boost meter that charges from:
- collecting coins (+12)
- bouncing on a trampoline (+25)
- hitting a speed pad (+15)
- passive over time (+~10 / second)

Press **Shift** when the meter is at ≥ 50 to consume half and get **~0.5 seconds of 1.7× speed** with a glowing yellow trail and a swoosh sound. Friction is suppressed during the boost so the burst is sustained.

---

## 🚀 Run locally

The game is a single static page — no build step required.

```bash
git clone https://github.com/yourusername/stickman-parkour.git
cd stickman-parkour
```

Then either:
- Double-click `index.html` to open it in your browser, **or**
- Serve it with any static server:
    ```bash
    python -m http.server 8000
    # then visit http://localhost:8000
    ```

Modern Chrome / Firefox / Edge supported. Designed for desktop — the canvas is 960×600.

---

## 📁 Project structure

```
stickman-parkour/
├── index.html          # HTML structure & UI screens
├── style.css           # All styling (menu, HUD, shop, daily, level select)
└── js/
    ├── data.js         # 35 levels, 15 skins, palettes, daily-reward table, achievements
    ├── save.js         # localStorage persistence (wallet, bests, owned skins, streak, stats, achievements)
    ├── audio.js        # Tiny Web Audio synth SFX
    ├── render.js       # All canvas drawing (stickman, level, hazards, particles, bouncers, boosters)
    └── game.js         # Input, physics, game loop, UI wiring, achievement toasts
```

Files are loaded in order via `<script>` tags and share a single global namespace via `window.LEVELS`, `window.SKINS`, `window.CHAPTERS`, `window.ACHIEVEMENTS`, `window.DAILY_REWARDS`, `window.PALETTES`, `window.Save`, `window.SFX`, `window.Render`. No bundler needed.

---

## 🛠️ How it works

### Physics
- Discrete-frame Newtonian: per-frame `vx += accel`, `vy += gravity`, axis-separated AABB collision resolution
- Wall slide capped fall speed when pressing into a wall
- Wall jump kicks vx away from the wall and vy upward
- **Coyote time** lets you jump shortly after leaving a ledge
- **Jump buffering** queues a jump press a few frames before landing

### Perks
`game.js` defines `BASE` physics constants. Each frame, `effectivePhysics()` returns a per-frame copy multiplied by the currently equipped skin's perk modifiers (`speedMult`, `jumpMult`, `gravityMult`, `wallSlideFallMult`, `coyoteBonus`, `airJumps`, `trail`).

### Daily rewards
`Save.dailyStatus()` compares today's date key to the stored `dailyLast` and `dailyStreak`. If yesterday was the last claim, the streak continues; otherwise it resets. Rewards step from 10 🪙 (Day 1) up to 150 🪙 (Day 7), then loop.

### Levels
Each level is plain data: an array of platforms, spikes, saws, lasers, moving platforms, crumblers, and coins, plus a spawn, an optional checkpoint, and a goal. Adding a new level is just appending an object to `LEVELS` in `js/data.js`.

---

## 🎯 Tips for adding content

**New skin** → append to `SKINS` in `js/data.js` with an `id`, colors, cost, description, and perks.

**New level** → append to `LEVELS` in `js/data.js`. The world can be any size; the camera follows the player and clamps to the world bounds.

**New obstacle type** → add a render branch in `js/render.js` and a collision check in `update()` inside `js/game.js`. Use the existing `saws` / `lasers` / `crumblers` as templates.

---

## 📜 License

MIT — see [LICENSE](LICENSE).

---

## 🙏 Credits

Inspired by the original CrazyGames Stickman Parkour series. Sound effects are synthesized live with the Web Audio API. No third-party assets are used.
