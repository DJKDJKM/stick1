// ============================================================
// data.js — palettes, skins, daily rewards, level definitions
// ============================================================
// All identifiers attached to window so other scripts can use them.

window.PALETTES = {
    sunset:  { sky1: '#ff7a59', sky2: '#3b1c54', plat: '#2a1a3e', platTop: '#7c4dff', accent: '#ffd166' },
    night:   { sky1: '#0e1a3a', sky2: '#000814', plat: '#1c2541', platTop: '#5bc0eb', accent: '#a3ffd8' },
    cave:    { sky1: '#2c1810', sky2: '#0a0500', plat: '#3a2516', platTop: '#c97b3f', accent: '#ffd166' },
    cyber:   { sky1: '#0d0221', sky2: '#000000', plat: '#240046', platTop: '#ff0a78', accent: '#00f5d4' },
    forest:  { sky1: '#08394d', sky2: '#021a25', plat: '#1a3a2a', platTop: '#5bc97f', accent: '#ffe066' },
    arctic:  { sky1: '#7fc7ff', sky2: '#1a3a5c', plat: '#2d4666', platTop: '#a9e9ff', accent: '#ffffff' },
    candy:   { sky1: '#ffaee8', sky2: '#6b2d8a', plat: '#5a2a6e', platTop: '#ff6dcb', accent: '#fff5a8' },
    desert:  { sky1: '#ffb56b', sky2: '#5c2e1f', plat: '#6e3c20', platTop: '#ffd28c', accent: '#ffe066' },
    cosmic:  { sky1: '#240046', sky2: '#000000', plat: '#3d1a73', platTop: '#c77dff', accent: '#fff7c2' },
};

// ------ Skins ----------------------------------------------
// fill: body / outline color, eye color, optional accent color
// perks: speedMult, jumpMult, gravityMult (lower = floaty), coyoteBonus (frames),
//        wallSlideFallMult (lower = slower slide), airJumps (extra mid-air jumps,
//        default 1 means standard double jump), trail (color or null)
window.SKINS = [
    {
        id: 'hero', name: 'Hero', cost: 0, unlock: 'default',
        fill: '#ffe066', outline: '#0a0a14', eye: '#1a1132',
        desc: 'The classic. No perks, no fuss.',
        perks: {},
    },
    {
        id: 'crimson', name: 'Crimson', cost: 10,
        fill: '#ff5d5d', outline: '#3a0d0d', eye: '#fff',
        desc: '+10% movement speed',
        perks: { speedMult: 1.10 },
    },
    {
        id: 'aqua', name: 'Aqua', cost: 15,
        fill: '#5bc0eb', outline: '#0a2236', eye: '#fff',
        desc: '+10% jump power',
        perks: { jumpMult: 1.10 },
    },
    {
        id: 'ghost', name: 'Ghost', cost: 25,
        fill: '#f4f0ff', outline: '#222',  eye: '#222',
        desc: '+6 frames coyote time',
        perks: { coyoteBonus: 6 },
    },
    {
        id: 'slime', name: 'Slime', cost: 35,
        fill: '#7fff8b', outline: '#0d3a10', eye: '#0d3a10',
        desc: '-15% gravity (floaty jumps)',
        perks: { gravityMult: 0.85 },
    },
    {
        id: 'sage', name: 'Sage', cost: 45,
        fill: '#b5ffd9', outline: '#1d3a2a', eye: '#1d3a2a',
        desc: '+5% to every stat',
        perks: { speedMult: 1.05, jumpMult: 1.05, gravityMult: 0.95, coyoteBonus: 2 },
    },
    {
        id: 'shadow', name: 'Shadow', cost: 60,
        fill: '#21202e', outline: '#9c9bb0', eye: '#ff3a3a',
        desc: '40% slower wall slide',
        perks: { wallSlideFallMult: 0.6 },
    },
    {
        id: 'lightning', name: 'Lightning', cost: 85,
        fill: '#ffe066', outline: '#0a0a14', eye: '#1a1132',
        accent: '#9be7ff',
        desc: '+20% speed · electric trail',
        perks: { speedMult: 1.20, trail: '#9be7ff' },
    },
    {
        id: 'trijet', name: 'Tri-Jet', cost: 110,
        fill: '#c98aff', outline: '#1a0d2a', eye: '#fff',
        accent: '#fff',
        desc: 'TRIPLE JUMP · +5% jump',
        perks: { airJumps: 2, jumpMult: 1.05 },
    },
    {
        id: 'mythic', name: 'Mythic', cost: 175,
        fill: '#ffd166', outline: '#0a0a14', eye: '#0a0a14',
        accent: '#ff5d5d',
        desc: '+15% speed · +15% jump · -15% gravity · rainbow trail',
        perks: {
            speedMult: 1.15, jumpMult: 1.15, gravityMult: 0.85,
            coyoteBonus: 4, wallSlideFallMult: 0.7, trail: 'rainbow',
        },
    },
    // ---- Chapter-5+ unlock skins ---------------------------
    {
        id: 'sprinter', name: 'Sprinter', cost: 30,
        fill: '#ff9847', outline: '#3a1a0d', eye: '#fff',
        desc: '+18% movement speed',
        perks: { speedMult: 1.18 },
    },
    {
        id: 'iron', name: 'Iron', cost: 55,
        fill: '#9aa6b8', outline: '#1a1d22', eye: '#ff3a3a',
        desc: '-10% gravity · 30% slower wall slide',
        perks: { gravityMult: 0.90, wallSlideFallMult: 0.7 },
    },
    {
        id: 'wizard', name: 'Wizard', cost: 80,
        fill: '#9d8cff', outline: '#1a0f3a', eye: '#fff', accent: '#ffe066',
        desc: '+15% jump · +6 coyote frames',
        perks: { jumpMult: 1.15, coyoteBonus: 6 },
    },
    {
        id: 'vortex', name: 'Vortex', cost: 130,
        fill: '#5bf0d4', outline: '#06363a', eye: '#1a1132', accent: '#ff5d5d',
        desc: '+10% speed · triple jump · cyan trail',
        perks: { speedMult: 1.10, airJumps: 2, trail: '#5bf0d4' },
    },
    {
        id: 'cosmic', name: 'Cosmic', cost: 220,
        fill: '#ffe9f6', outline: '#1a0d2a', eye: '#1a0d2a', accent: '#ff5d5d',
        desc: 'TRIPLE jump · +20% speed · +20% jump · -20% gravity · rainbow trail',
        perks: {
            speedMult: 1.20, jumpMult: 1.20, gravityMult: 0.80,
            coyoteBonus: 6, wallSlideFallMult: 0.6, airJumps: 2, trail: 'rainbow',
        },
    },
    // ---- Late-game skins -----------------------------------
    {
        id: 'frost', name: 'Frost', cost: 60,
        fill: '#cfeeff', outline: '#1a3a5c', eye: '#1a3a5c',
        desc: '+30% boost regen · -10% gravity',
        perks: { boostRegenMult: 1.3, gravityMult: 0.90 },
    },
    {
        id: 'phantomlord', name: 'Phantom Lord', cost: 95,
        fill: '#dcd6ff', outline: '#1a0d2a', eye: '#1a0d2a',
        desc: '+10 coyote frames · +5% speed · ghost trail',
        perks: { coyoteBonus: 10, speedMult: 1.05, trail: '#cfc7ff' },
    },
    {
        id: 'inferno', name: 'Inferno', cost: 140,
        fill: '#ff7a3a', outline: '#3a0a00', eye: '#fff', accent: '#ffd166',
        desc: '+25% speed · +15% jump · fire trail',
        perks: { speedMult: 1.25, jumpMult: 1.15, trail: '#ff7a3a' },
    },
    {
        id: 'stardust', name: 'Stardust', cost: 200,
        fill: '#fff7c2', outline: '#1a1132', eye: '#1a1132', accent: '#5bc0eb',
        desc: '+10% all · +50% boost regen · subtle elegance',
        perks: {
            speedMult: 1.10, jumpMult: 1.10, gravityMult: 0.90,
            boostRegenMult: 1.5, coyoteBonus: 4,
        },
    },
];

// ------ Pets (Roblox-style followers, stack with skins) -----
// shape: 'circle' | 'square' | 'star' | 'triangle' | 'orb'
window.PETS = [
    { id: 'none',   name: 'None',         cost: 0,   shape: 'none',   color: '#888', outline: '#000',
      desc: 'No pet equipped.', perks: {} },
    { id: 'cube',   name: 'Cube Pal',     cost: 20,  shape: 'square', color: '#5bc0eb', outline: '#0a2236',
      desc: '+5% jump',                  perks: { jumpMult: 1.05 } },
    { id: 'ghost',  name: 'Mini Ghost',   cost: 35,  shape: 'orb',    color: '#f4f0ff', outline: '#222',
      desc: '+5% movement speed',        perks: { speedMult: 1.05 } },
    { id: 'star',   name: 'Star Pal',     cost: 55,  shape: 'star',   color: '#ffd166', outline: '#a87b1f',
      desc: '+1 wallet coin per pickup', perks: { coinBonus: 1 } },
    { id: 'flame',  name: 'Flame Buddy',  cost: 80,  shape: 'triangle', color: '#ff5d5d', outline: '#3a0d0d',
      desc: '+60% boost regen',          perks: { boostRegenMult: 1.6 } },
    { id: 'crystal',name: 'Crystal',      cost: 110, shape: 'star',   color: '#00f5d4', outline: '#06363a',
      desc: '-10% gravity',              perks: { gravityMult: 0.90 } },
    { id: 'rainbow',name: 'Rainbow Orb',  cost: 180, shape: 'orb',    color: 'rainbow', outline: '#1a1132',
      desc: '+5% all stats · trail',     perks: { speedMult: 1.05, jumpMult: 1.05, boostRegenMult: 1.4, trail: 'rainbow' } },
    { id: 'cloud',  name: 'Cloud Puff',   cost: 25,  shape: 'orb',    color: '#cfe9ff', outline: '#1a3a5c',
      desc: '+2 coyote frames',          perks: { coyoteBonus: 2 } },
    { id: 'dragon', name: 'Dragon Egg',   cost: 90,  shape: 'orb',    color: '#ff5d5d', outline: '#3a0d0d',
      desc: '+30% boost regen',          perks: { boostRegenMult: 1.3 } },
    { id: 'phoenix',name: 'Phoenix',      cost: 160, shape: 'star',   color: '#ff9847', outline: '#3a1a0d',
      desc: '+5% jump · +30% boost regen · fire trail',
      perks: { jumpMult: 1.05, boostRegenMult: 1.3, trail: '#ff9847' } },
];

// ------ Chapters (grouping for level select) ---------------
window.CHAPTERS = [
    { name: 'Beginnings', start: 0, end: 5 },
    { name: 'Skills',     start: 5, end: 10 },
    { name: 'Variety',    start: 10, end: 15 },
    { name: 'Heights',    start: 15, end: 20 },
    { name: 'Bounce',     start: 20, end: 26 },
    { name: 'Mastery',    start: 26, end: 35 },
    { name: 'Precision',  start: 35, end: 45 },
];

// ------ Achievements ---------------------------------------
// Each achievement has an id, name, desc, icon, and check fn taking stats.
window.ACHIEVEMENTS = [
    { id: 'first_steps',    name: 'First Steps',    desc: 'Complete Level 1',                icon: '🏁',
      check: s => s.completed[0] },
    { id: 'survivor',       name: 'Persistent',     desc: 'Die 10 times',                    icon: '💀',
      check: s => s.deaths >= 10 },
    { id: 'collector',      name: 'Coin Collector', desc: 'Collect 100 coins total',         icon: '🪙',
      check: s => s.stats.coinsEver >= 100 },
    { id: 'untouchable',    name: 'Untouchable',    desc: 'Finish any level without dying',  icon: '😎',
      check: s => Object.keys(s.stats.perfectLevels || {}).length > 0 },
    { id: 'speed_demon',    name: 'Speed Demon',    desc: 'Finish any level in under 12s',   icon: '⚡',
      check: s => Object.values(s.bestTimes).some(t => t < 12) },
    { id: 'wall_crawler',   name: 'Wall Crawler',   desc: 'Perform 30 wall jumps',           icon: '🧗',
      check: s => s.stats.wallJumps >= 30 },
    { id: 'sky_high',       name: 'Sky High',       desc: 'Perform 50 double jumps',         icon: '🚀',
      check: s => s.stats.doubleJumps >= 50 },
    { id: 'fashionista',    name: 'Fashionista',    desc: 'Own 5 different skins',           icon: '✨',
      check: s => Object.keys(s.ownedSkins).length >= 5 },
    { id: 'chapter_done',   name: 'Chapter Done',   desc: 'Complete a whole chapter',        icon: '📖',
      check: s => CHAPTERS.some(ch => {
          for (let i = ch.start; i < ch.end; i++) if (!s.completed[i]) return false;
          return true;
      }) },
    { id: 'wallet',         name: 'Loaded',         desc: 'Have 100 coins in your wallet',   icon: '💰',
      check: s => s.coins >= 100 },
    { id: 'bouncy',         name: 'Bouncy Boy',     desc: 'Bounce on a trampoline 25 times', icon: '🪀',
      check: s => s.stats.bounces >= 25 },
    { id: 'boost_master',   name: 'Boost Master',   desc: 'Use boost 25 times',              icon: '⚡',
      check: s => (s.stats.boosts || 0) >= 25 },
    { id: 'all_skins',      name: 'Drip Master',    desc: 'Own all 15 skins',                icon: '👑',
      check: s => Object.keys(s.ownedSkins).length >= SKINS.length },
    { id: 'pet_owner',      name: 'Pet Owner',      desc: 'Own at least one pet',            icon: '🐾',
      check: s => Object.keys(s.ownedPets || {}).filter(k => k !== 'none').length >= 1 },
    { id: 'combo_3',        name: 'On Fire',        desc: 'Reach a x5 coin combo',           icon: '🔥',
      check: s => (s.stats.maxCombo || 0) >= 5 },
    { id: 'combo_king',     name: 'Combo King',     desc: 'Reach a x10 coin combo',          icon: '👑',
      check: s => (s.stats.maxCombo || 0) >= 10 },
    { id: 'speedrunner',    name: 'Speedrunner',    desc: 'Finish any level in under 8s',    icon: '🏎️',
      check: s => Object.values(s.bestTimes).some(t => t < 8) },
    { id: 'rich',           name: 'Tycoon',         desc: 'Hold 250 coins in your wallet',   icon: '💎',
      check: s => s.coins >= 250 },
    { id: 'precision',      name: 'Pixel Perfect',  desc: 'Beat any Precision-chapter level',icon: '🎯',
      check: s => {
          for (let i = 35; i < 45; i++) if (s.completed[i]) return true;
          return false;
      } },
    { id: 'world_master',   name: 'World Master',   desc: 'Complete every level',            icon: '🌟',
      check: s => Object.keys(s.completed).length >= LEVELS.length },
];

// ------ Daily reward cycle ---------------------------------
// 7-day cycle with growing rewards. Streak resets if you miss a day.
window.DAILY_REWARDS = [10, 15, 25, 40, 60, 80, 150];

// ------ Levels ---------------------------------------------
// platforms:  {x,y,w,h}
// spikes:     {x,y,w,h}                 (collision rect)
// saws:       {x,y,r, ax?,bx?, ay?,by?, speed, phase?}
// lasers:     {x1,y1,x2,y2, period, duty, phase?}
// movers:     {x,y,w,h, dx,dy, period, phase?}
//             oscillates between (x,y) [rest] and (x+dx, y+dy) [extreme]
// crumblers:  {x,y,w,h}
// coins:      {x,y}
// checkpoint: {x,y}
// goal:       {x,y,w,h}
// spawn:      {x,y}
window.LEVELS = [
    // ---------------- 1: Tutorial — run & jump
    {
        bg: 'sunset',
        worldW: 1600, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0,    y: 560, w: 360, h: 60 },
            { x: 420,  y: 510, w: 160, h: 20 },
            { x: 640,  y: 460, w: 160, h: 20 },
            { x: 860,  y: 410, w: 160, h: 20 },
            { x: 1080, y: 460, w: 160, h: 20 },
            { x: 1300, y: 510, w: 300, h: 90 },
        ],
        spikes: [], saws: [], lasers: [], movers: [], crumblers: [],
        coins: [
            { x: 470, y: 470 }, { x: 690, y: 420 }, { x: 910, y: 370 }, { x: 1130, y: 420 },
        ],
        goal: { x: 1520, y: 450, w: 40, h: 60 },
    },

    // ---------------- 2: Spikes & gaps
    {
        bg: 'forest',
        worldW: 1800, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 250, h: 60 },
            { x: 320, y: 540, w: 90, h: 20 },
            { x: 480, y: 500, w: 90, h: 20 },
            { x: 640, y: 440, w: 90, h: 20 },
            { x: 820, y: 380, w: 110, h: 20 },
            { x: 1030, y: 440, w: 90, h: 20 },
            { x: 1220, y: 500, w: 90, h: 20 },
            { x: 1380, y: 460, w: 90, h: 20 },
            { x: 1560, y: 410, w: 240, h: 190 },
        ],
        spikes: [
            { x: 250, y: 545, w: 70, h: 15 },
            { x: 410, y: 545, w: 70, h: 15 },
            { x: 570, y: 545, w: 70, h: 15 },
            { x: 1110, y: 545, w: 110, h: 15 },
            { x: 1310, y: 545, w: 70, h: 15 },
            { x: 1470, y: 545, w: 90, h: 15 },
        ],
        saws: [], lasers: [], movers: [], crumblers: [],
        coins: [
            { x: 365, y: 500 }, { x: 525, y: 460 }, { x: 685, y: 400 }, { x: 875, y: 340 },
            { x: 1075, y: 400 }, { x: 1265, y: 460 }, { x: 1425, y: 420 },
        ],
        goal: { x: 1720, y: 350, w: 40, h: 60 },
    },

    // ---------------- 3: Wall jump intro (relaxed)
    {
        bg: 'night',
        worldW: 1500, worldH: 720,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 280, h: 60 },
            // tall walls — closer together for easier wall-jump
            { x: 380, y: 200, w: 30, h: 400 },
            { x: 500, y: 100, w: 30, h: 500 },
            { x: 660, y: 540, w: 220, h: 80 },
            // landing ledge at top of right wall
            { x: 530, y: 80, w: 270, h: 20 },
            { x: 920, y: 190, w: 130, h: 20 },
            { x: 1100, y: 290, w: 130, h: 20 },
            { x: 1290, y: 390, w: 210, h: 230 },
        ],
        spikes: [
            { x: 280, y: 545, w: 100, h: 15 },
            { x: 880, y: 525, w: 40, h: 15 },
        ],
        saws: [], lasers: [], movers: [], crumblers: [],
        coins: [
            { x: 450, y: 360 }, { x: 450, y: 220 }, { x: 670, y: 40 }, { x: 970, y: 150 }, { x: 1150, y: 250 },
        ],
        checkpoint: { x: 700, y: 460 },
        goal: { x: 1400, y: 330, w: 40, h: 60 },
    },

    // ---------------- 4: Saw gauntlet
    {
        bg: 'cave',
        worldW: 2000, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 1900, h: 60 },
            { x: 250, y: 480, w: 60, h: 20 },
            { x: 500, y: 420, w: 60, h: 20 },
            { x: 800, y: 420, w: 80, h: 20 },
            { x: 1100, y: 460, w: 80, h: 20 },
            { x: 1400, y: 400, w: 80, h: 20 },
            { x: 1650, y: 460, w: 80, h: 20 },
        ],
        spikes: [],
        saws: [
            { x: 400, y: 530, r: 22, ax: 380, bx: 580, speed: 0.010 },
            { x: 700, y: 530, r: 22, ax: 650, bx: 950, speed: 0.012, phase: 0.6 },
            { x: 1000, y: 530, r: 22, ax: 980, bx: 1280, speed: 0.011, phase: 1.2 },
            { x: 1500, y: 380, r: 22, ay: 380, by: 530, speed: 0.010 },
            { x: 1750, y: 530, r: 22, ax: 1700, bx: 1880, speed: 0.013 },
        ],
        lasers: [], movers: [], crumblers: [],
        coins: [
            { x: 270, y: 440 }, { x: 520, y: 380 }, { x: 830, y: 380 }, { x: 1130, y: 420 },
            { x: 1430, y: 360 }, { x: 1680, y: 420 },
        ],
        checkpoint: { x: 880, y: 490 },
        goal: { x: 1840, y: 480, w: 40, h: 60 },
    },

    // ---------------- 5: Slide-under lasers  (FIXED)
    {
        bg: 'cyber',
        worldW: 1900, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 1900, h: 60 },
            // low ceilings that force slide
            { x: 260, y: 505, w: 220, h: 20 },
            { x: 610, y: 505, w: 220, h: 20 },
            { x: 960, y: 505, w: 220, h: 20 },
            { x: 1310, y: 505, w: 220, h: 20 },
            { x: 1660, y: 505, w: 220, h: 20 },
        ],
        spikes: [],
        saws: [],
        lasers: [
            // vertical lasers — bottom at y=530 leaves clearance for sliding player (y_top=538)
            { x1: 540, y1: 460, x2: 540, y2: 530, period: 80, duty: 0.5, phase: 0 },
            { x1: 890, y1: 460, x2: 890, y2: 530, period: 80, duty: 0.5, phase: 20 },
            { x1: 1240, y1: 460, x2: 1240, y2: 530, period: 80, duty: 0.5, phase: 40 },
            { x1: 1590, y1: 460, x2: 1590, y2: 530, period: 80, duty: 0.5, phase: 60 },
        ],
        movers: [], crumblers: [],
        coins: [
            { x: 370, y: 545 }, { x: 720, y: 545 }, { x: 1070, y: 545 }, { x: 1420, y: 545 }, { x: 1770, y: 545 },
            { x: 540, y: 455 }, { x: 890, y: 455 }, { x: 1240, y: 455 },
        ],
        checkpoint: { x: 950, y: 540 },
        goal: { x: 1820, y: 460, w: 40, h: 60 },
    },

    // ---------------- 6: Moving platforms (FIXED — mover semantics + safe rest pos)
    {
        bg: 'sunset',
        worldW: 2050, worldH: 700,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 220, h: 60 },
            { x: 1820, y: 360, w: 220, h: 320 },
            { x: 760, y: 460, w: 100, h: 20 },
            { x: 1240, y: 320, w: 100, h: 20 },
        ],
        spikes: [
            { x: 220, y: 605, w: 1600, h: 15 },
        ],
        saws: [], lasers: [],
        movers: [
            { x: 280, y: 540, w: 110, h: 18, dx: 0,   dy: -160, period: 180, phase: 0 },
            { x: 460, y: 380, w: 110, h: 18, dx: 220, dy: 0,    period: 200, phase: 0.3 },
            { x: 940, y: 360, w: 110, h: 18, dx: 0,   dy: -120, period: 160, phase: 0.5 },
            { x: 1400, y: 240, w: 110, h: 18, dx: 240, dy: 0,    period: 200, phase: 0.2 },
            { x: 1650, y: 400, w: 110, h: 18, dx: 0,   dy: -90,  period: 160, phase: 0 },
        ],
        crumblers: [],
        coins: [
            { x: 340, y: 510 }, { x: 540, y: 350 }, { x: 800, y: 420 }, { x: 1020, y: 320 },
            { x: 1280, y: 280 }, { x: 1480, y: 200 }, { x: 1700, y: 360 },
        ],
        checkpoint: { x: 810, y: 380 },
        goal: { x: 1940, y: 300, w: 40, h: 60 },
    },

    // ---------------- 7: Crumbling pit
    {
        bg: 'forest',
        worldW: 1900, worldH: 700,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 200, h: 60 },
            { x: 1700, y: 400, w: 200, h: 300 },
        ],
        spikes: [
            { x: 200, y: 605, w: 1500, h: 15 },
        ],
        saws: [
            { x: 1100, y: 520, r: 22, ax: 1050, bx: 1380, speed: 0.012 },
        ],
        lasers: [], movers: [],
        crumblers: [
            { x: 240, y: 500, w: 90, h: 16 },
            { x: 380, y: 460, w: 90, h: 16 },
            { x: 520, y: 420, w: 90, h: 16 },
            { x: 660, y: 380, w: 90, h: 16 },
            { x: 800, y: 420, w: 90, h: 16 },
            { x: 940, y: 460, w: 90, h: 16 },
            { x: 1090, y: 420, w: 90, h: 16 },
            { x: 1250, y: 380, w: 90, h: 16 },
            { x: 1410, y: 420, w: 90, h: 16 },
            { x: 1560, y: 460, w: 90, h: 16 },
        ],
        coins: [
            { x: 280, y: 460 }, { x: 420, y: 420 }, { x: 560, y: 380 }, { x: 700, y: 340 },
            { x: 840, y: 380 }, { x: 980, y: 420 }, { x: 1280, y: 340 }, { x: 1590, y: 420 },
        ],
        checkpoint: { x: 720, y: 320 },
        goal: { x: 1820, y: 340, w: 40, h: 60 },
    },

    // ---------------- 8: Vertical climb (wall-jump column)
    {
        bg: 'night',
        worldW: 1100, worldH: 1400,
        spawn: { x: 80, y: 1280 },
        platforms: [
            { x: 0, y: 1360, w: 1100, h: 40 },
            // alternating walls forming wall-jump column (gap 175px center-to-center)
            { x: 200, y: 1140, w: 30, h: 200 },
            { x: 400, y: 980,  w: 30, h: 220 },
            { x: 200, y: 800,  w: 30, h: 200 },
            { x: 400, y: 620,  w: 30, h: 220 },
            { x: 200, y: 460,  w: 30, h: 200 },
            { x: 400, y: 280,  w: 30, h: 220 },
            // rest ledges built off each wall
            { x: 230, y: 1180, w: 60, h: 14 },
            { x: 230, y: 840,  w: 60, h: 14 },
            { x: 230, y: 500,  w: 60, h: 14 },
            { x: 540, y: 220, w: 540, h: 16 },
            { x: 880, y: 140, w: 180, h: 80 },
        ],
        spikes: [],
        saws: [
            { x: 720, y: 1100, r: 22, ax: 600, bx: 900, speed: 0.012 },
            { x: 720, y: 800,  r: 22, ax: 600, bx: 900, speed: 0.014, phase: 0.5 },
            { x: 720, y: 500,  r: 22, ax: 600, bx: 900, speed: 0.016, phase: 1.0 },
        ],
        lasers: [], movers: [], crumblers: [],
        coins: [
            { x: 260, y: 1140 }, { x: 260, y: 800 }, { x: 260, y: 460 },
            { x: 700, y: 180 }, { x: 900, y: 100 },
        ],
        checkpoint: { x: 260, y: 800 },
        goal: { x: 950, y: 80, w: 40, h: 60 },
    },

    // ---------------- 9: Mixed gauntlet
    {
        bg: 'cyber',
        worldW: 2400, worldH: 700,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 320, h: 60 },
            { x: 420, y: 560, w: 60, h: 20 },
            { x: 560, y: 500, w: 100, h: 20 },
            { x: 560, y: 410, w: 100, h: 20 },
            { x: 760, y: 500, w: 60, h: 20 },
            { x: 920, y: 440, w: 200, h: 20 },
            { x: 1240, y: 200, w: 30, h: 400 },
            { x: 1380, y: 100, w: 30, h: 500 },
            { x: 1280, y: 80, w: 200, h: 16 },
            { x: 1560, y: 200, w: 140, h: 16 },
            { x: 1740, y: 300, w: 140, h: 16 },
            { x: 1920, y: 400, w: 140, h: 16 },
            { x: 2100, y: 500, w: 300, h: 200 },
        ],
        spikes: [
            { x: 320, y: 605, w: 100, h: 15 },
            { x: 660, y: 605, w: 100, h: 15 },
            { x: 820, y: 605, w: 100, h: 15 },
            { x: 1120, y: 605, w: 120, h: 15 },
        ],
        saws: [
            { x: 980, y: 410, r: 20, ax: 920, bx: 1120, speed: 0.012 },
            { x: 1800, y: 280, r: 20, ax: 1700, bx: 1900, speed: 0.012 },
        ],
        lasers: [
            { x1: 1990, y1: 500, x2: 1990, y2: 420, period: 80, duty: 0.5, phase: 0 },
            { x1: 2060, y1: 500, x2: 2060, y2: 420, period: 80, duty: 0.5, phase: 40 },
        ],
        movers: [
            { x: 660, y: 540, w: 100, h: 16, dx: 0, dy: -80, period: 140, phase: 0 },
        ],
        crumblers: [],
        coins: [
            { x: 470, y: 520 }, { x: 600, y: 460 }, { x: 800, y: 460 }, { x: 1000, y: 400 },
            { x: 1330, y: 40 }, { x: 1620, y: 160 }, { x: 1800, y: 260 }, { x: 1980, y: 360 },
        ],
        checkpoint: { x: 1000, y: 400 },
        goal: { x: 2330, y: 440, w: 40, h: 60 },
    },

    // ---------------- 10: First chapter finale
    {
        bg: 'cyber',
        worldW: 2600, worldH: 800,
        spawn: { x: 60, y: 640 },
        platforms: [
            { x: 0, y: 720, w: 260, h: 80 },
            { x: 2440, y: 240, w: 160, h: 560 },
            { x: 320, y: 660, w: 90, h: 16 },
            { x: 480, y: 600, w: 90, h: 16 },
            { x: 640, y: 540, w: 90, h: 16 },
            { x: 820, y: 480, w: 90, h: 16 },
            { x: 980, y: 480, w: 320, h: 16 },
            { x: 980, y: 380, w: 320, h: 16 },
            { x: 1380, y: 100, w: 30, h: 480 },
            { x: 1530, y: 0,   w: 30, h: 460 },
            { x: 1440, y: 90,  w: 90, h: 16 },
            { x: 1620, y: 150, w: 120, h: 16 },
            { x: 1820, y: 230, w: 120, h: 16 },
            { x: 2020, y: 310, w: 120, h: 16 },
            { x: 2220, y: 220, w: 80, h: 16 },
        ],
        spikes: [
            { x: 260, y: 705, w: 60,  h: 15 },
            { x: 410, y: 705, w: 70,  h: 15 },
            { x: 570, y: 705, w: 70,  h: 15 },
            { x: 730, y: 705, w: 90,  h: 15 },
            { x: 910, y: 705, w: 1530, h: 15 },
        ],
        saws: [
            { x: 1100, y: 430, r: 20, ax: 1010, bx: 1280, speed: 0.014 },
            { x: 1700, y: 380, r: 22, ay: 380, by: 580, speed: 0.013 },
            { x: 1950, y: 380, r: 22, ay: 380, by: 580, speed: 0.014, phase: 0.7 },
        ],
        lasers: [],
        movers: [
            { x: 2120, y: 280, w: 100, h: 16, dx: 0, dy: -100, period: 130 },
            { x: 2300, y: 400, w: 100, h: 16, dx: 0, dy: -150, period: 150, phase: 0.4 },
        ],
        crumblers: [
            { x: 1320, y: 80, w: 60, h: 14 },
        ],
        coins: [
            { x: 370, y: 620 }, { x: 530, y: 560 }, { x: 690, y: 500 }, { x: 870, y: 440 },
            { x: 1100, y: 340 }, { x: 1200, y: 340 }, { x: 1480, y: 50 }, { x: 1680, y: 110 },
            { x: 1880, y: 190 }, { x: 2080, y: 270 }, { x: 2260, y: 180 },
        ],
        checkpoint: { x: 1140, y: 340 },
        goal: { x: 2500, y: 180, w: 40, h: 60 },
    },

    // ---------------- 11: Sky islands (coins everywhere, gentle)
    {
        bg: 'arctic',
        worldW: 1900, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 160, h: 40 },
            { x: 220, y: 500, w: 80, h: 14 },
            { x: 340, y: 440, w: 80, h: 14 },
            { x: 460, y: 380, w: 80, h: 14 },
            { x: 580, y: 320, w: 80, h: 14 },
            { x: 700, y: 380, w: 80, h: 14 },
            { x: 820, y: 440, w: 80, h: 14 },
            { x: 940, y: 380, w: 80, h: 14 },
            { x: 1060, y: 320, w: 80, h: 14 },
            { x: 1180, y: 260, w: 80, h: 14 },
            { x: 1300, y: 200, w: 80, h: 14 },
            { x: 1420, y: 260, w: 80, h: 14 },
            { x: 1540, y: 320, w: 80, h: 14 },
            { x: 1660, y: 380, w: 80, h: 14 },
            { x: 1780, y: 440, w: 120, h: 160 },
        ],
        spikes: [], saws: [], lasers: [], movers: [], crumblers: [],
        coins: [
            { x: 260, y: 460 }, { x: 380, y: 400 }, { x: 500, y: 340 }, { x: 620, y: 280 },
            { x: 740, y: 340 }, { x: 860, y: 400 }, { x: 980, y: 340 }, { x: 1100, y: 280 },
            { x: 1220, y: 220 }, { x: 1340, y: 160 }, { x: 1460, y: 220 }, { x: 1580, y: 280 },
            { x: 1700, y: 340 },
        ],
        goal: { x: 1810, y: 380, w: 40, h: 60 },
    },

    // ---------------- 12: Double-jump arena (big gaps)
    {
        bg: 'candy',
        worldW: 2200, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 200, h: 60 },
            { x: 380, y: 540, w: 80, h: 16 },
            { x: 640, y: 480, w: 80, h: 16 },
            { x: 900, y: 420, w: 80, h: 16 },
            { x: 1180, y: 380, w: 80, h: 16 },
            { x: 1460, y: 420, w: 80, h: 16 },
            { x: 1720, y: 480, w: 80, h: 16 },
            { x: 1980, y: 440, w: 220, h: 180 },
        ],
        spikes: [
            { x: 200, y: 605, w: 1780, h: 15 },
        ],
        saws: [], lasers: [], movers: [], crumblers: [],
        coins: [
            { x: 420, y: 500 }, { x: 680, y: 440 }, { x: 940, y: 380 }, { x: 1220, y: 340 },
            { x: 1500, y: 380 }, { x: 1760, y: 440 },
            // floating coins between platforms — reward double jumps
            { x: 520, y: 460 }, { x: 780, y: 400 }, { x: 1040, y: 360 }, { x: 1320, y: 340 },
            { x: 1600, y: 380 }, { x: 1860, y: 420 },
        ],
        checkpoint: { x: 950, y: 380 },
        goal: { x: 2100, y: 380, w: 40, h: 60 },
    },

    // ---------------- 13: Saw highway
    {
        bg: 'cave',
        worldW: 2400, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 2400, h: 60 },
            { x: 200, y: 460, w: 60, h: 16 },
            { x: 500, y: 420, w: 60, h: 16 },
            { x: 800, y: 380, w: 60, h: 16 },
            { x: 1100, y: 420, w: 60, h: 16 },
            { x: 1400, y: 380, w: 60, h: 16 },
            { x: 1700, y: 420, w: 60, h: 16 },
            { x: 2000, y: 380, w: 60, h: 16 },
        ],
        spikes: [], lasers: [], movers: [], crumblers: [],
        saws: [
            { x: 330, y: 530, r: 22, ax: 280, bx: 470, speed: 0.012 },
            { x: 620, y: 530, r: 22, ax: 580, bx: 770, speed: 0.012, phase: 0.5 },
            { x: 920, y: 530, r: 22, ax: 880, bx: 1070, speed: 0.012 },
            { x: 1220, y: 530, r: 22, ax: 1180, bx: 1370, speed: 0.012, phase: 0.5 },
            { x: 1520, y: 530, r: 22, ax: 1480, bx: 1670, speed: 0.012 },
            { x: 1820, y: 530, r: 22, ax: 1780, bx: 1970, speed: 0.012, phase: 0.5 },
            { x: 2120, y: 530, r: 22, ax: 2080, bx: 2270, speed: 0.012 },
        ],
        coins: [
            { x: 230, y: 420 }, { x: 530, y: 380 }, { x: 830, y: 340 }, { x: 1130, y: 380 },
            { x: 1430, y: 340 }, { x: 1730, y: 380 }, { x: 2030, y: 340 },
        ],
        checkpoint: { x: 1120, y: 410 },
        goal: { x: 2330, y: 480, w: 40, h: 60 },
    },

    // ---------------- 14: Laser corridor
    {
        bg: 'cyber',
        worldW: 2100, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 2100, h: 60 },
            { x: 300, y: 505, w: 180, h: 20 },
            { x: 580, y: 505, w: 180, h: 20 },
            { x: 860, y: 505, w: 180, h: 20 },
            { x: 1140, y: 505, w: 180, h: 20 },
            { x: 1420, y: 505, w: 180, h: 20 },
            { x: 1700, y: 505, w: 180, h: 20 },
        ],
        saws: [], movers: [], crumblers: [], spikes: [],
        lasers: [
            { x1: 530, y1: 460, x2: 530, y2: 530, period: 70, duty: 0.5, phase: 0 },
            { x1: 810, y1: 460, x2: 810, y2: 530, period: 70, duty: 0.5, phase: 18 },
            { x1: 1090, y1: 460, x2: 1090, y2: 530, period: 70, duty: 0.5, phase: 36 },
            { x1: 1370, y1: 460, x2: 1370, y2: 530, period: 70, duty: 0.5, phase: 54 },
            { x1: 1650, y1: 460, x2: 1650, y2: 530, period: 70, duty: 0.5, phase: 8 },
            { x1: 1930, y1: 460, x2: 1930, y2: 530, period: 70, duty: 0.5, phase: 26 },
        ],
        coins: [
            { x: 390, y: 545 }, { x: 670, y: 545 }, { x: 950, y: 545 }, { x: 1230, y: 545 },
            { x: 1510, y: 545 }, { x: 1790, y: 545 },
            { x: 530, y: 460 }, { x: 1090, y: 460 }, { x: 1650, y: 460 },
        ],
        checkpoint: { x: 1100, y: 540 },
        goal: { x: 2020, y: 460, w: 40, h: 60 },
    },

    // ---------------- 15: Mover relay
    {
        bg: 'sunset',
        worldW: 2400, worldH: 700,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 200, h: 60 },
            { x: 2200, y: 360, w: 200, h: 320 },
        ],
        spikes: [
            { x: 200, y: 605, w: 2000, h: 15 },
        ],
        saws: [], lasers: [], crumblers: [],
        movers: [
            { x: 260, y: 540, w: 100, h: 16, dx: 0, dy: -120, period: 130 },
            { x: 460, y: 460, w: 100, h: 16, dx: 0, dy: -120, period: 130, phase: 0.5 },
            { x: 660, y: 460, w: 100, h: 16, dx: 0, dy: -120, period: 130, phase: 0 },
            { x: 860, y: 460, w: 100, h: 16, dx: 0, dy: -120, period: 130, phase: 0.5 },
            { x: 1080, y: 400, w: 100, h: 16, dx: 200, dy: 0, period: 180 },
            { x: 1380, y: 400, w: 100, h: 16, dx: 200, dy: 0, period: 180, phase: 0.5 },
            { x: 1680, y: 400, w: 100, h: 16, dx: 200, dy: 0, period: 180 },
            { x: 1980, y: 420, w: 100, h: 16, dx: 0, dy: -120, period: 140, phase: 0.3 },
        ],
        coins: [
            { x: 310, y: 480 }, { x: 510, y: 400 }, { x: 710, y: 400 }, { x: 910, y: 400 },
            { x: 1180, y: 340 }, { x: 1480, y: 340 }, { x: 1780, y: 340 }, { x: 2030, y: 360 },
        ],
        checkpoint: { x: 910, y: 420 },
        goal: { x: 2310, y: 300, w: 40, h: 60 },
    },

    // ---------------- 16: Wall jump corridor
    {
        bg: 'forest',
        worldW: 1700, worldH: 1500,
        spawn: { x: 80, y: 1380 },
        platforms: [
            { x: 0, y: 1460, w: 1700, h: 40 },
            // alternating walls climbing up
            { x: 200, y: 1240, w: 30, h: 200 },
            { x: 360, y: 1080, w: 30, h: 220 },
            { x: 200, y: 900, w: 30, h: 200 },
            { x: 360, y: 720, w: 30, h: 220 },
            { x: 200, y: 540, w: 30, h: 200 },
            { x: 360, y: 360, w: 30, h: 220 },
            // top runway
            { x: 200, y: 340, w: 1100, h: 16 },
            // rest ledges
            { x: 230, y: 1280, w: 60, h: 14 },
            { x: 230, y: 940,  w: 60, h: 14 },
            { x: 230, y: 580,  w: 60, h: 14 },
            // goal area
            { x: 1380, y: 280, w: 200, h: 80 },
        ],
        spikes: [],
        saws: [], lasers: [], movers: [], crumblers: [],
        coins: [
            { x: 260, y: 1200 }, { x: 260, y: 860 }, { x: 260, y: 500 },
            { x: 600, y: 300 }, { x: 900, y: 300 }, { x: 1200, y: 300 },
        ],
        checkpoint: { x: 260, y: 860 },
        goal: { x: 1450, y: 220, w: 40, h: 60 },
    },

    // ---------------- 17: Crumble climb
    {
        bg: 'desert',
        worldW: 800, worldH: 1500,
        spawn: { x: 80, y: 1400 },
        platforms: [
            { x: 0, y: 1460, w: 800, h: 40 },
            // wall on each side so player can wall-jump for recovery
            { x: 0, y: 0, w: 30, h: 1460 },
            { x: 770, y: 0, w: 30, h: 1460 },
            // goal platform at top
            { x: 280, y: 60, w: 240, h: 20 },
        ],
        spikes: [],
        saws: [], lasers: [], movers: [],
        crumblers: [
            { x: 120, y: 1340, w: 90, h: 14 },
            { x: 380, y: 1240, w: 90, h: 14 },
            { x: 600, y: 1140, w: 90, h: 14 },
            { x: 380, y: 1040, w: 90, h: 14 },
            { x: 120, y: 940,  w: 90, h: 14 },
            { x: 380, y: 840,  w: 90, h: 14 },
            { x: 600, y: 740,  w: 90, h: 14 },
            { x: 380, y: 640,  w: 90, h: 14 },
            { x: 120, y: 540,  w: 90, h: 14 },
            { x: 380, y: 440,  w: 90, h: 14 },
            { x: 600, y: 340,  w: 90, h: 14 },
            { x: 380, y: 240,  w: 90, h: 14 },
            { x: 120, y: 160,  w: 90, h: 14 },
        ],
        coins: [
            { x: 165, y: 1300 }, { x: 425, y: 1200 }, { x: 645, y: 1100 },
            { x: 425, y: 1000 }, { x: 165, y: 900 }, { x: 425, y: 800 },
            { x: 645, y: 700 }, { x: 425, y: 600 }, { x: 165, y: 500 },
            { x: 425, y: 400 }, { x: 645, y: 300 }, { x: 425, y: 200 },
        ],
        checkpoint: { x: 425, y: 800 },
        goal: { x: 380, y: 0, w: 40, h: 60 },
    },

    // ---------------- 18: Pendulum saw canyon
    {
        bg: 'cave',
        worldW: 2200, worldH: 800,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 280, h: 180 },
            { x: 400, y: 540, w: 100, h: 16 },
            { x: 620, y: 480, w: 100, h: 16 },
            { x: 840, y: 420, w: 100, h: 16 },
            { x: 1060, y: 480, w: 100, h: 16 },
            { x: 1280, y: 420, w: 100, h: 16 },
            { x: 1500, y: 480, w: 100, h: 16 },
            { x: 1720, y: 540, w: 100, h: 16 },
            { x: 1900, y: 480, w: 300, h: 320 },
        ],
        spikes: [
            { x: 280, y: 785, w: 1620, h: 15 },
        ],
        saws: [
            // pendulum-style — sway side to side at fixed y
            { x: 450, y: 300, r: 24, ax: 380, bx: 540, speed: 0.012 },
            { x: 670, y: 260, r: 24, ax: 600, bx: 760, speed: 0.012, phase: 0.5 },
            { x: 890, y: 220, r: 24, ax: 820, bx: 980, speed: 0.012 },
            { x: 1110, y: 260, r: 24, ax: 1040, bx: 1200, speed: 0.012, phase: 0.5 },
            { x: 1330, y: 220, r: 24, ax: 1260, bx: 1420, speed: 0.012 },
            { x: 1550, y: 260, r: 24, ax: 1480, bx: 1640, speed: 0.012, phase: 0.5 },
            { x: 1770, y: 300, r: 24, ax: 1700, bx: 1860, speed: 0.012 },
        ],
        lasers: [], movers: [], crumblers: [],
        coins: [
            { x: 450, y: 500 }, { x: 670, y: 440 }, { x: 890, y: 380 }, { x: 1110, y: 440 },
            { x: 1330, y: 380 }, { x: 1550, y: 440 }, { x: 1770, y: 500 },
        ],
        checkpoint: { x: 1080, y: 460 },
        goal: { x: 2040, y: 420, w: 40, h: 60 },
    },

    // ---------------- 19: Hellscape (all hazards)
    {
        bg: 'cyber',
        worldW: 2600, worldH: 800,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 300, h: 60 },
            { x: 400, y: 560, w: 80, h: 16 },
            { x: 540, y: 500, w: 80, h: 16 },
            // bar to slide under
            { x: 690, y: 445, w: 220, h: 20 },
            { x: 690, y: 560, w: 220, h: 16 },
            // crumble run
            { x: 980, y: 520, w: 80, h: 14 },
            { x: 1120, y: 480, w: 80, h: 14 },
            { x: 1260, y: 440, w: 80, h: 14 },
            { x: 1400, y: 480, w: 80, h: 14 },
            // wall jump section
            { x: 1560, y: 260, w: 30, h: 380 },
            { x: 1700, y: 160, w: 30, h: 480 },
            { x: 1610, y: 140, w: 200, h: 16 },
            // last stretch
            { x: 1880, y: 240, w: 120, h: 16 },
            { x: 2080, y: 320, w: 120, h: 16 },
            { x: 2280, y: 400, w: 320, h: 400 },
        ],
        spikes: [
            { x: 300, y: 605, w: 380, h: 15 },
            { x: 910, y: 605, w: 970, h: 15 },
        ],
        saws: [
            { x: 1300, y: 520, r: 20, ax: 1240, bx: 1380, speed: 0.014 },
            { x: 1950, y: 200, r: 22, ay: 200, by: 380, speed: 0.013 },
        ],
        lasers: [
            { x1: 740, y1: 460, x2: 740, y2: 530, period: 70, duty: 0.5 },
            { x1: 860, y1: 460, x2: 860, y2: 530, period: 70, duty: 0.5, phase: 35 },
        ],
        movers: [
            { x: 2150, y: 360, w: 100, h: 16, dx: 0, dy: -100, period: 130 },
        ],
        crumblers: [
            { x: 980, y: 520, w: 80, h: 14 },
        ],
        coins: [
            { x: 440, y: 520 }, { x: 580, y: 460 }, { x: 800, y: 540 },
            { x: 1020, y: 480 }, { x: 1160, y: 440 }, { x: 1300, y: 400 }, { x: 1440, y: 440 },
            { x: 1660, y: 100 }, { x: 1900, y: 200 }, { x: 2120, y: 280 },
        ],
        checkpoint: { x: 1300, y: 410 },
        goal: { x: 2510, y: 340, w: 40, h: 60 },
    },

    // ---------------- 20: Marathon finale
    {
        bg: 'candy',
        worldW: 3200, worldH: 900,
        spawn: { x: 60, y: 640 },
        platforms: [
            { x: 0, y: 720, w: 260, h: 80 },
            // S1: stair + spikes
            { x: 320, y: 660, w: 80, h: 16 },
            { x: 460, y: 600, w: 80, h: 16 },
            { x: 600, y: 540, w: 80, h: 16 },
            { x: 740, y: 480, w: 80, h: 16 },
            // S2: bar tunnel
            { x: 880, y: 480, w: 280, h: 16 },
            { x: 880, y: 385, w: 280, h: 14 },
            // S3: wall jump shaft
            { x: 1240, y: 100, w: 30, h: 380 },
            { x: 1380, y: 0,   w: 30, h: 460 },
            { x: 1280, y: 90,  w: 90, h: 14 },
            // S4: movers
            { x: 1470, y: 150, w: 100, h: 14, _mover: true }, // visual hint only
            { x: 1700, y: 300, w: 100, h: 14, _mover: true },
            { x: 1900, y: 220, w: 100, h: 14, _mover: true },
            // S5: saw bridge
            { x: 2100, y: 540, w: 600, h: 16 },
            // S6: final climb
            { x: 2740, y: 460, w: 80, h: 16 },
            { x: 2860, y: 380, w: 80, h: 16 },
            { x: 2980, y: 300, w: 220, h: 600 },
        ],
        spikes: [
            { x: 260, y: 705, w: 60,  h: 15 },
            { x: 400, y: 705, w: 60,  h: 15 },
            { x: 540, y: 705, w: 60,  h: 15 },
            { x: 680, y: 705, w: 60,  h: 15 },
            { x: 820, y: 705, w: 1280, h: 15 },
            { x: 2700, y: 705, w: 280, h: 15 },
        ],
        saws: [
            { x: 2300, y: 510, r: 22, ax: 2150, bx: 2650, speed: 0.012 },
            { x: 2400, y: 510, r: 22, ax: 2150, bx: 2650, speed: 0.012, phase: 0.5 },
        ],
        lasers: [
            { x1: 1320, y1: 0, x2: 1320, y2: 90, period: 70, duty: 0.5, phase: 0 },
            { x1: 1400, y1: 0, x2: 1400, y2: 90, period: 70, duty: 0.5, phase: 35 },
        ],
        // Real movers (separate from visual hint platforms above which won't be placed; we remove them)
        movers: [
            { x: 1470, y: 150, w: 100, h: 14, dx: 0, dy: 120, period: 140 },
            { x: 1700, y: 300, w: 100, h: 14, dx: 0, dy: -120, period: 150, phase: 0.4 },
            { x: 1900, y: 220, w: 100, h: 14, dx: 0, dy: 100, period: 140, phase: 0.2 },
        ],
        crumblers: [],
        coins: [
            { x: 370, y: 620 }, { x: 510, y: 560 }, { x: 650, y: 500 }, { x: 790, y: 440 },
            { x: 1020, y: 430 }, { x: 1330, y: 50 }, { x: 1520, y: 210 }, { x: 1750, y: 240 },
            { x: 1950, y: 270 }, { x: 2300, y: 480 }, { x: 2780, y: 420 }, { x: 2900, y: 340 },
        ],
        checkpoint: { x: 1020, y: 470 },
        goal: { x: 3080, y: 240, w: 40, h: 60 },
    },
];

// Strip helper platforms that are only visual hints (_mover marker)
window.LEVELS.forEach(lvl => {
    lvl.platforms = lvl.platforms.filter(p => !p._mover);
});

// ============================================================
// Chapter 5 — Bounce (introduces bouncers and boosters)
// ============================================================
// bouncers: {x,y,w,h,power}      — top contact launches you up
// boosters: {x,y,w,h, dx,dy}     — touch boosts your velocity
window.LEVELS.push(
    // ---- 21: Bouncy Land — bouncer intro
    {
        bg: 'candy',
        worldW: 1900, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 1900, h: 60 },
            { x: 360, y: 380, w: 120, h: 16 },
            { x: 640, y: 320, w: 120, h: 16 },
            { x: 920, y: 260, w: 120, h: 16 },
            { x: 1200, y: 320, w: 120, h: 16 },
            { x: 1480, y: 380, w: 120, h: 16 },
        ],
        spikes: [], saws: [], lasers: [], movers: [], crumblers: [],
        bouncers: [
            { x: 230, y: 540, w: 80, h: 20, power: 18 },
            { x: 500, y: 540, w: 80, h: 20, power: 18 },
            { x: 780, y: 540, w: 80, h: 20, power: 18 },
            { x: 1060, y: 540, w: 80, h: 20, power: 18 },
            { x: 1340, y: 540, w: 80, h: 20, power: 18 },
            { x: 1620, y: 540, w: 80, h: 20, power: 18 },
        ],
        boosters: [],
        coins: [
            { x: 420, y: 340 }, { x: 700, y: 280 }, { x: 980, y: 220 },
            { x: 1260, y: 280 }, { x: 1540, y: 340 },
            { x: 280, y: 460 }, { x: 560, y: 460 }, { x: 840, y: 460 },
        ],
        goal: { x: 1820, y: 480, w: 40, h: 60 },
    },

    // ---- 22: Speed Run — booster intro
    {
        bg: 'cyber',
        worldW: 2400, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 2400, h: 60 },
            { x: 240, y: 470, w: 220, h: 12 },
            { x: 620, y: 410, w: 220, h: 12 },
            { x: 1000, y: 470, w: 220, h: 12 },
            { x: 1380, y: 410, w: 220, h: 12 },
            { x: 1760, y: 470, w: 220, h: 12 },
            { x: 2140, y: 410, w: 220, h: 12 },
        ],
        spikes: [], saws: [], lasers: [], movers: [], crumblers: [],
        bouncers: [],
        boosters: [
            { x: 200, y: 540, w: 60, h: 18, dx: 10, dy: 0 },
            { x: 580, y: 540, w: 60, h: 18, dx: 10, dy: 0 },
            { x: 960, y: 540, w: 60, h: 18, dx: 10, dy: 0 },
            { x: 1340, y: 540, w: 60, h: 18, dx: 10, dy: 0 },
            { x: 1720, y: 540, w: 60, h: 18, dx: 10, dy: 0 },
            { x: 2100, y: 540, w: 60, h: 18, dx: 10, dy: 0 },
        ],
        coins: [
            { x: 340, y: 430 }, { x: 720, y: 370 }, { x: 1100, y: 430 },
            { x: 1480, y: 370 }, { x: 1860, y: 430 }, { x: 2240, y: 370 },
        ],
        goal: { x: 2340, y: 480, w: 40, h: 60 },
    },

    // ---- 23: Bounce & Boost combined
    {
        bg: 'sunset',
        worldW: 2200, worldH: 700,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 220, h: 60 },
            { x: 2020, y: 380, w: 180, h: 300 },
            { x: 500, y: 460, w: 120, h: 14 },
            { x: 800, y: 360, w: 120, h: 14 },
            { x: 1100, y: 280, w: 120, h: 14 },
            { x: 1400, y: 360, w: 120, h: 14 },
            { x: 1700, y: 460, w: 120, h: 14 },
        ],
        spikes: [
            { x: 220, y: 605, w: 1800, h: 15 },
        ],
        saws: [], lasers: [], movers: [], crumblers: [],
        bouncers: [
            { x: 300, y: 600, w: 80, h: 20, power: 20 },
            { x: 1900, y: 440, w: 100, h: 18, power: 22 },
        ],
        boosters: [
            { x: 540, y: 440, w: 50, h: 14, dx: 9, dy: -4 },
            { x: 1140, y: 260, w: 50, h: 14, dx: 9, dy: 0 },
            { x: 1740, y: 440, w: 50, h: 14, dx: 9, dy: -5 },
        ],
        coins: [
            { x: 380, y: 480 }, { x: 560, y: 420 }, { x: 860, y: 320 }, { x: 1160, y: 240 },
            { x: 1460, y: 320 }, { x: 1760, y: 420 }, { x: 1960, y: 380 },
        ],
        checkpoint: { x: 1140, y: 260 },
        goal: { x: 2100, y: 320, w: 40, h: 60 },
    },

    // ---- 24: Sky Bouncers — vertical with trampolines
    {
        bg: 'arctic',
        worldW: 1100, worldH: 1300,
        spawn: { x: 80, y: 1180 },
        platforms: [
            { x: 0, y: 1260, w: 1100, h: 40 },
            { x: 150, y: 1080, w: 120, h: 14 },
            { x: 400, y: 980, w: 120, h: 14 },
            { x: 700, y: 900, w: 120, h: 14 },
            { x: 880, y: 820, w: 120, h: 14 },
            { x: 600, y: 720, w: 120, h: 14 },
            { x: 300, y: 640, w: 120, h: 14 },
            { x: 100, y: 540, w: 120, h: 14 },
            { x: 350, y: 440, w: 120, h: 14 },
            { x: 650, y: 360, w: 120, h: 14 },
            { x: 880, y: 260, w: 220, h: 100 },
        ],
        spikes: [], saws: [], lasers: [], movers: [], crumblers: [],
        bouncers: [
            { x: 350, y: 1240, w: 90, h: 20, power: 22 },
            { x: 560, y: 1240, w: 90, h: 20, power: 22 },
            { x: 780, y: 1240, w: 90, h: 20, power: 22 },
            { x: 230, y: 1060, w: 70, h: 18, power: 20 },
            { x: 770, y: 880, w: 70, h: 18, power: 20 },
            { x: 200, y: 620, w: 70, h: 18, power: 20 },
        ],
        boosters: [],
        coins: [
            { x: 210, y: 1040 }, { x: 460, y: 940 }, { x: 760, y: 860 },
            { x: 940, y: 780 }, { x: 660, y: 680 }, { x: 360, y: 600 },
            { x: 160, y: 500 }, { x: 410, y: 400 }, { x: 710, y: 320 },
        ],
        checkpoint: { x: 660, y: 680 },
        goal: { x: 970, y: 200, w: 40, h: 60 },
    },

    // ---- 25: Speed Maze — boosters through hazards
    {
        bg: 'cyber',
        worldW: 2600, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 2600, h: 60 },
            { x: 380, y: 440, w: 180, h: 14 },
            { x: 720, y: 360, w: 180, h: 14 },
            { x: 1060, y: 440, w: 180, h: 14 },
            { x: 1400, y: 360, w: 180, h: 14 },
            { x: 1740, y: 440, w: 180, h: 14 },
            { x: 2080, y: 360, w: 180, h: 14 },
        ],
        spikes: [
            { x: 600, y: 545, w: 80, h: 15 },
            { x: 940, y: 545, w: 80, h: 15 },
            { x: 1280, y: 545, w: 80, h: 15 },
            { x: 1620, y: 545, w: 80, h: 15 },
            { x: 1960, y: 545, w: 80, h: 15 },
        ],
        saws: [], lasers: [], movers: [], crumblers: [],
        bouncers: [],
        boosters: [
            { x: 240, y: 540, w: 60, h: 18, dx: 11, dy: -6 },
            { x: 580, y: 540, w: 60, h: 18, dx: 11, dy: -6 },
            { x: 920, y: 540, w: 60, h: 18, dx: 11, dy: -6 },
            { x: 1260, y: 540, w: 60, h: 18, dx: 11, dy: -6 },
            { x: 1600, y: 540, w: 60, h: 18, dx: 11, dy: -6 },
            { x: 1940, y: 540, w: 60, h: 18, dx: 11, dy: -6 },
        ],
        coins: [
            { x: 470, y: 400 }, { x: 810, y: 320 }, { x: 1150, y: 400 },
            { x: 1490, y: 320 }, { x: 1830, y: 400 }, { x: 2170, y: 320 },
        ],
        checkpoint: { x: 1290, y: 400 },
        goal: { x: 2450, y: 480, w: 40, h: 60 },
    },

    // ---- 26: Trampoline Climb — vertical bouncers
    {
        bg: 'candy',
        worldW: 800, worldH: 1500,
        spawn: { x: 80, y: 1400 },
        platforms: [
            { x: 0, y: 1460, w: 800, h: 40 },
            // Stationary side walls so player won't fall off easily
            { x: 0, y: 0, w: 30, h: 1460 },
            { x: 770, y: 0, w: 30, h: 1460 },
            // narrow ledges
            { x: 100, y: 1200, w: 100, h: 14 },
            { x: 350, y: 1100, w: 100, h: 14 },
            { x: 600, y: 1000, w: 100, h: 14 },
            { x: 350, y: 900, w: 100, h: 14 },
            { x: 100, y: 800, w: 100, h: 14 },
            { x: 350, y: 700, w: 100, h: 14 },
            { x: 600, y: 600, w: 100, h: 14 },
            { x: 350, y: 500, w: 100, h: 14 },
            { x: 100, y: 400, w: 100, h: 14 },
            { x: 350, y: 300, w: 100, h: 14 },
            { x: 280, y: 80, w: 240, h: 20 },
        ],
        spikes: [], saws: [], lasers: [], movers: [], crumblers: [],
        bouncers: [
            { x: 200, y: 1440, w: 80, h: 20, power: 24 },
            { x: 360, y: 1440, w: 80, h: 20, power: 24 },
            { x: 520, y: 1440, w: 80, h: 20, power: 24 },
            { x: 200, y: 1186, w: 80, h: 14, power: 22 },
            { x: 600, y: 986, w: 80, h: 14, power: 22 },
            { x: 200, y: 786, w: 80, h: 14, power: 22 },
            { x: 600, y: 586, w: 80, h: 14, power: 22 },
            { x: 200, y: 386, w: 80, h: 14, power: 22 },
        ],
        boosters: [],
        coins: [
            { x: 150, y: 1160 }, { x: 400, y: 1060 }, { x: 650, y: 960 },
            { x: 400, y: 860 }, { x: 150, y: 760 }, { x: 400, y: 660 },
            { x: 650, y: 560 }, { x: 400, y: 460 }, { x: 150, y: 360 },
            { x: 400, y: 260 },
        ],
        checkpoint: { x: 400, y: 660 },
        goal: { x: 380, y: 20, w: 40, h: 60 },
    },
);

// ============================================================
// Chapter 6 — Mastery (hardest, combines everything)
// ============================================================
window.LEVELS.push(
    // ---- 27: Triple Threat — needs Tri-Jet or careful play
    {
        bg: 'night',
        worldW: 2400, worldH: 700,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 220, h: 60 },
            { x: 2200, y: 380, w: 200, h: 300 },
            { x: 400, y: 480, w: 80, h: 14 },
            { x: 700, y: 380, w: 80, h: 14 },
            { x: 1000, y: 300, w: 80, h: 14 },
            { x: 1300, y: 230, w: 80, h: 14 },
            { x: 1600, y: 300, w: 80, h: 14 },
            { x: 1900, y: 380, w: 80, h: 14 },
        ],
        spikes: [
            { x: 220, y: 605, w: 1980, h: 15 },
        ],
        saws: [], lasers: [], movers: [], crumblers: [],
        bouncers: [], boosters: [],
        coins: [
            { x: 440, y: 440 }, { x: 740, y: 340 }, { x: 1040, y: 260 },
            { x: 1340, y: 190 }, { x: 1640, y: 260 }, { x: 1940, y: 340 },
            // bonus coins between platforms (needs double or triple jump)
            { x: 560, y: 400 }, { x: 860, y: 320 }, { x: 1160, y: 240 },
            { x: 1460, y: 220 }, { x: 1760, y: 320 },
        ],
        checkpoint: { x: 1040, y: 280 },
        goal: { x: 2300, y: 320, w: 40, h: 60 },
    },

    // ---- 28: The Pit — long bouncer + boost combo
    {
        bg: 'cave',
        worldW: 2600, worldH: 700,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 200, h: 60 },
            { x: 2400, y: 380, w: 200, h: 320 },
            { x: 380, y: 420, w: 80, h: 14 },
            { x: 640, y: 340, w: 80, h: 14 },
            { x: 880, y: 260, w: 80, h: 14 },
            { x: 1120, y: 340, w: 80, h: 14 },
            { x: 1360, y: 420, w: 80, h: 14 },
            { x: 1600, y: 340, w: 80, h: 14 },
            { x: 1840, y: 260, w: 80, h: 14 },
            { x: 2080, y: 340, w: 80, h: 14 },
        ],
        spikes: [
            { x: 200, y: 605, w: 2200, h: 15 },
        ],
        saws: [
            { x: 1240, y: 480, r: 20, ax: 1180, bx: 1340, speed: 0.012 },
            { x: 1720, y: 480, r: 20, ax: 1660, bx: 1820, speed: 0.012, phase: 0.5 },
        ],
        lasers: [], movers: [], crumblers: [],
        bouncers: [
            { x: 270, y: 600, w: 80, h: 20, power: 24 },
            { x: 1010, y: 600, w: 80, h: 20, power: 22 },
            { x: 1970, y: 600, w: 80, h: 20, power: 22 },
        ],
        boosters: [
            { x: 740, y: 320, w: 60, h: 14, dx: 9, dy: -6 },
            { x: 1460, y: 400, w: 60, h: 14, dx: 9, dy: -6 },
            { x: 2180, y: 320, w: 60, h: 14, dx: 8, dy: -4 },
        ],
        coins: [
            { x: 420, y: 380 }, { x: 680, y: 300 }, { x: 920, y: 220 },
            { x: 1160, y: 300 }, { x: 1400, y: 380 }, { x: 1640, y: 300 },
            { x: 1880, y: 220 }, { x: 2120, y: 300 },
        ],
        checkpoint: { x: 1160, y: 320 },
        goal: { x: 2480, y: 320, w: 40, h: 60 },
    },

    // ---- 29: The Climb — tallest tower
    {
        bg: 'arctic',
        worldW: 1100, worldH: 1800,
        spawn: { x: 80, y: 1700 },
        platforms: [
            { x: 0, y: 1760, w: 1100, h: 40 },
            // alternating wall jumps
            { x: 200, y: 1520, w: 30, h: 220 },
            { x: 400, y: 1340, w: 30, h: 240 },
            { x: 200, y: 1140, w: 30, h: 220 },
            { x: 400, y: 940, w: 30, h: 240 },
            { x: 200, y: 740, w: 30, h: 220 },
            { x: 400, y: 540, w: 30, h: 240 },
            // rest ledges
            { x: 230, y: 1560, w: 60, h: 14 },
            { x: 230, y: 1180, w: 60, h: 14 },
            { x: 230, y: 780, w: 60, h: 14 },
            // upper plateau
            { x: 430, y: 380, w: 660, h: 16 },
            { x: 880, y: 280, w: 220, h: 100 },
        ],
        spikes: [],
        saws: [
            { x: 720, y: 1500, r: 22, ax: 600, bx: 900, speed: 0.014 },
            { x: 720, y: 1100, r: 22, ax: 600, bx: 900, speed: 0.016, phase: 0.5 },
            { x: 720, y: 700, r: 22, ax: 600, bx: 900, speed: 0.018, phase: 1.0 },
            { x: 720, y: 340, r: 22, ax: 480, bx: 1040, speed: 0.014 },
        ],
        lasers: [], movers: [], crumblers: [],
        bouncers: [
            { x: 700, y: 1740, w: 90, h: 20, power: 24 },
        ],
        boosters: [],
        coins: [
            { x: 260, y: 1480 }, { x: 260, y: 1100 }, { x: 260, y: 700 },
            { x: 600, y: 340 }, { x: 800, y: 340 }, { x: 1000, y: 340 },
        ],
        checkpoint: { x: 260, y: 1100 },
        goal: { x: 950, y: 220, w: 40, h: 60 },
    },

    // ---- 30: Race the Lasers — timing under pressure
    {
        bg: 'cyber',
        worldW: 2200, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 2200, h: 60 },
            { x: 280, y: 505, w: 180, h: 20 },
            { x: 560, y: 505, w: 180, h: 20 },
            { x: 840, y: 505, w: 180, h: 20 },
            { x: 1120, y: 505, w: 180, h: 20 },
            { x: 1400, y: 505, w: 180, h: 20 },
            { x: 1680, y: 505, w: 180, h: 20 },
        ],
        spikes: [],
        saws: [],
        lasers: [
            { x1: 510, y1: 460, x2: 510, y2: 530, period: 60, duty: 0.5, phase: 0 },
            { x1: 790, y1: 460, x2: 790, y2: 530, period: 60, duty: 0.5, phase: 12 },
            { x1: 1070, y1: 460, x2: 1070, y2: 530, period: 60, duty: 0.5, phase: 24 },
            { x1: 1350, y1: 460, x2: 1350, y2: 530, period: 60, duty: 0.5, phase: 36 },
            { x1: 1630, y1: 460, x2: 1630, y2: 530, period: 60, duty: 0.5, phase: 48 },
            { x1: 1910, y1: 460, x2: 1910, y2: 530, period: 60, duty: 0.5, phase: 0 },
        ],
        movers: [], crumblers: [],
        bouncers: [],
        boosters: [
            { x: 220, y: 540, w: 60, h: 18, dx: 12, dy: 0 },
        ],
        coins: [
            { x: 370, y: 545 }, { x: 650, y: 545 }, { x: 930, y: 545 },
            { x: 1210, y: 545 }, { x: 1490, y: 545 }, { x: 1770, y: 545 },
        ],
        checkpoint: { x: 1130, y: 540 },
        goal: { x: 2060, y: 480, w: 40, h: 60 },
    },

    // ---- 31: Sky Highway — long booster run
    {
        bg: 'sunset',
        worldW: 3000, worldH: 700,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 240, h: 60 },
            { x: 2800, y: 380, w: 200, h: 320 },
            // floating runway
            { x: 320, y: 460, w: 160, h: 14 },
            { x: 560, y: 460, w: 160, h: 14 },
            { x: 800, y: 460, w: 160, h: 14 },
            { x: 1040, y: 460, w: 160, h: 14 },
            { x: 1280, y: 380, w: 160, h: 14 },
            { x: 1520, y: 380, w: 160, h: 14 },
            { x: 1760, y: 300, w: 160, h: 14 },
            { x: 2000, y: 300, w: 160, h: 14 },
            { x: 2240, y: 380, w: 160, h: 14 },
            { x: 2480, y: 460, w: 160, h: 14 },
        ],
        spikes: [
            { x: 240, y: 605, w: 2560, h: 15 },
        ],
        saws: [], lasers: [], movers: [], crumblers: [],
        bouncers: [],
        boosters: [
            { x: 360, y: 446, w: 60, h: 14, dx: 12, dy: 0 },
            { x: 600, y: 446, w: 60, h: 14, dx: 12, dy: 0 },
            { x: 840, y: 446, w: 60, h: 14, dx: 12, dy: 0 },
            { x: 1080, y: 446, w: 60, h: 14, dx: 12, dy: -4 },
            { x: 1320, y: 366, w: 60, h: 14, dx: 12, dy: 0 },
            { x: 1560, y: 366, w: 60, h: 14, dx: 12, dy: -4 },
            { x: 1800, y: 286, w: 60, h: 14, dx: 12, dy: 0 },
            { x: 2040, y: 286, w: 60, h: 14, dx: 12, dy: 4 },
            { x: 2280, y: 366, w: 60, h: 14, dx: 12, dy: 4 },
            { x: 2520, y: 446, w: 60, h: 14, dx: 12, dy: 0 },
        ],
        coins: [
            { x: 400, y: 420 }, { x: 640, y: 420 }, { x: 880, y: 420 }, { x: 1120, y: 420 },
            { x: 1360, y: 340 }, { x: 1600, y: 340 }, { x: 1840, y: 260 }, { x: 2080, y: 260 },
            { x: 2320, y: 340 }, { x: 2560, y: 420 },
        ],
        checkpoint: { x: 1360, y: 380 },
        goal: { x: 2880, y: 320, w: 40, h: 60 },
    },

    // ---- 32: Pendulum Mastery
    {
        bg: 'cave',
        worldW: 2400, worldH: 800,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 280, h: 180 },
            { x: 380, y: 540, w: 90, h: 14 },
            { x: 580, y: 480, w: 90, h: 14 },
            { x: 780, y: 420, w: 90, h: 14 },
            { x: 980, y: 480, w: 90, h: 14 },
            { x: 1180, y: 420, w: 90, h: 14 },
            { x: 1380, y: 480, w: 90, h: 14 },
            { x: 1580, y: 420, w: 90, h: 14 },
            { x: 1780, y: 480, w: 90, h: 14 },
            { x: 1980, y: 540, w: 90, h: 14 },
            { x: 2160, y: 460, w: 240, h: 340 },
        ],
        spikes: [
            { x: 280, y: 785, w: 1880, h: 15 },
        ],
        saws: [
            { x: 425, y: 300, r: 24, ax: 360, bx: 490, speed: 0.014 },
            { x: 625, y: 280, r: 24, ax: 560, bx: 690, speed: 0.014, phase: 0.5 },
            { x: 825, y: 260, r: 24, ax: 760, bx: 890, speed: 0.014 },
            { x: 1025, y: 280, r: 24, ax: 960, bx: 1090, speed: 0.014, phase: 0.5 },
            { x: 1225, y: 260, r: 24, ax: 1160, bx: 1290, speed: 0.014 },
            { x: 1425, y: 280, r: 24, ax: 1360, bx: 1490, speed: 0.014, phase: 0.5 },
            { x: 1625, y: 260, r: 24, ax: 1560, bx: 1690, speed: 0.014 },
            { x: 1825, y: 280, r: 24, ax: 1760, bx: 1890, speed: 0.014, phase: 0.5 },
        ],
        lasers: [], movers: [], crumblers: [],
        bouncers: [],
        boosters: [],
        coins: [
            { x: 425, y: 500 }, { x: 625, y: 440 }, { x: 825, y: 380 },
            { x: 1025, y: 440 }, { x: 1225, y: 380 }, { x: 1425, y: 440 },
            { x: 1625, y: 380 }, { x: 1825, y: 440 }, { x: 2025, y: 500 },
        ],
        checkpoint: { x: 1180, y: 400 },
        goal: { x: 2280, y: 400, w: 40, h: 60 },
    },

    // ---- 33: Hell Refined — all hazards densely packed
    {
        bg: 'cyber',
        worldW: 2800, worldH: 800,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 280, h: 60 },
            { x: 400, y: 560, w: 80, h: 14 },
            { x: 560, y: 500, w: 80, h: 14 },
            // sliding section
            { x: 700, y: 445, w: 240, h: 20 },
            { x: 700, y: 560, w: 240, h: 14 },
            // crumblers
            { x: 1000, y: 520, w: 80, h: 14 },
            { x: 1140, y: 480, w: 80, h: 14 },
            { x: 1280, y: 440, w: 80, h: 14 },
            { x: 1420, y: 480, w: 80, h: 14 },
            // wall jump section
            { x: 1580, y: 260, w: 30, h: 380 },
            { x: 1720, y: 160, w: 30, h: 480 },
            { x: 1630, y: 140, w: 200, h: 16 },
            // booster bridge
            { x: 1900, y: 200, w: 120, h: 14 },
            { x: 2080, y: 280, w: 120, h: 14 },
            { x: 2260, y: 360, w: 120, h: 14 },
            { x: 2440, y: 440, w: 360, h: 360 },
        ],
        spikes: [
            { x: 280, y: 605, w: 420, h: 15 },
            { x: 940, y: 605, w: 1500, h: 15 },
        ],
        saws: [
            { x: 1320, y: 520, r: 20, ax: 1260, bx: 1400, speed: 0.014 },
            { x: 1960, y: 220, r: 22, ay: 220, by: 380, speed: 0.013 },
        ],
        lasers: [
            { x1: 750, y1: 460, x2: 750, y2: 530, period: 70, duty: 0.5 },
            { x1: 880, y1: 460, x2: 880, y2: 530, period: 70, duty: 0.5, phase: 35 },
        ],
        movers: [
            { x: 2150, y: 280, w: 100, h: 16, dx: 0, dy: -100, period: 130 },
        ],
        crumblers: [
            { x: 1000, y: 520, w: 80, h: 14 },
        ],
        bouncers: [
            { x: 380, y: 600, w: 80, h: 20, power: 22 },
        ],
        boosters: [
            { x: 1930, y: 186, w: 50, h: 14, dx: 10, dy: 0 },
            { x: 2110, y: 266, w: 50, h: 14, dx: 10, dy: 0 },
            { x: 2290, y: 346, w: 50, h: 14, dx: 10, dy: 0 },
        ],
        coins: [
            { x: 440, y: 520 }, { x: 600, y: 460 }, { x: 820, y: 540 },
            { x: 1040, y: 480 }, { x: 1180, y: 440 }, { x: 1320, y: 400 }, { x: 1460, y: 440 },
            { x: 1680, y: 100 }, { x: 1960, y: 160 }, { x: 2140, y: 240 }, { x: 2320, y: 320 },
        ],
        checkpoint: { x: 1320, y: 410 },
        goal: { x: 2680, y: 380, w: 40, h: 60 },
    },

    // ---- 34: Marathon II — really long
    {
        bg: 'forest',
        worldW: 3400, worldH: 800,
        spawn: { x: 60, y: 640 },
        platforms: [
            { x: 0, y: 720, w: 260, h: 80 },
            { x: 320, y: 660, w: 80, h: 14 },
            { x: 460, y: 600, w: 80, h: 14 },
            { x: 600, y: 540, w: 80, h: 14 },
            { x: 740, y: 480, w: 80, h: 14 },
            { x: 880, y: 480, w: 280, h: 14 },
            { x: 880, y: 385, w: 280, h: 14 },
            { x: 1240, y: 100, w: 30, h: 380 },
            { x: 1380, y: 0,   w: 30, h: 460 },
            { x: 1280, y: 90,  w: 90, h: 14 },
            { x: 2100, y: 540, w: 600, h: 16 },
            { x: 2740, y: 460, w: 80, h: 14 },
            { x: 2860, y: 380, w: 80, h: 14 },
            { x: 2980, y: 300, w: 80, h: 14 },
            { x: 3100, y: 220, w: 300, h: 580 },
        ],
        spikes: [
            { x: 260, y: 705, w: 60, h: 15 },
            { x: 400, y: 705, w: 60, h: 15 },
            { x: 540, y: 705, w: 60, h: 15 },
            { x: 680, y: 705, w: 60, h: 15 },
            { x: 820, y: 705, w: 1280, h: 15 },
            { x: 2700, y: 705, w: 400, h: 15 },
        ],
        saws: [
            { x: 2300, y: 510, r: 22, ax: 2150, bx: 2650, speed: 0.012 },
            { x: 2400, y: 510, r: 22, ax: 2150, bx: 2650, speed: 0.012, phase: 0.5 },
        ],
        lasers: [
            { x1: 1320, y1: 0, x2: 1320, y2: 90, period: 70, duty: 0.5, phase: 0 },
            { x1: 1400, y1: 0, x2: 1400, y2: 90, period: 70, duty: 0.5, phase: 35 },
        ],
        movers: [
            { x: 1470, y: 150, w: 100, h: 14, dx: 0, dy: 120, period: 140 },
            { x: 1700, y: 300, w: 100, h: 14, dx: 0, dy: -120, period: 150, phase: 0.4 },
            { x: 1900, y: 220, w: 100, h: 14, dx: 0, dy: 100, period: 140, phase: 0.2 },
        ],
        crumblers: [],
        bouncers: [
            { x: 2120, y: 520, w: 80, h: 20, power: 18 },
            { x: 2480, y: 520, w: 80, h: 20, power: 18 },
        ],
        boosters: [],
        coins: [
            { x: 370, y: 620 }, { x: 510, y: 560 }, { x: 650, y: 500 }, { x: 790, y: 440 },
            { x: 1020, y: 430 }, { x: 1330, y: 50 }, { x: 1520, y: 210 }, { x: 1750, y: 240 },
            { x: 1950, y: 270 }, { x: 2300, y: 480 }, { x: 2780, y: 420 }, { x: 2900, y: 340 },
            { x: 3020, y: 260 },
        ],
        checkpoint: { x: 1020, y: 470 },
        goal: { x: 3200, y: 160, w: 40, h: 60 },
    },

    // ---- 35: The Gauntlet — the final test
    {
        bg: 'cyber',
        worldW: 3600, worldH: 1200,
        spawn: { x: 60, y: 1080 },
        platforms: [
            // start floor
            { x: 0, y: 1160, w: 320, h: 40 },
            // S1: bouncer climb
            { x: 80, y: 1000, w: 120, h: 14 },
            { x: 240, y: 920, w: 120, h: 14 },
            { x: 80, y: 840, w: 120, h: 14 },
            // S2: boost run
            { x: 400, y: 800, w: 1000, h: 14 },
            // S3: wall jump up
            { x: 1480, y: 200, w: 30, h: 600 },
            { x: 1620, y: 100, w: 30, h: 700 },
            { x: 1520, y: 80, w: 120, h: 14 },
            // S4: laser tunnel + slide
            { x: 1700, y: 100, w: 800, h: 16 },
            { x: 1700, y: 200, w: 800, h: 14 },
            // S5: pendulum saws + movers
            { x: 2540, y: 220, w: 80, h: 14 },
            { x: 2720, y: 280, w: 80, h: 14 },
            { x: 2900, y: 220, w: 80, h: 14 },
            { x: 3080, y: 280, w: 80, h: 14 },
            { x: 3260, y: 220, w: 80, h: 14 },
            // goal pedestal
            { x: 3400, y: 120, w: 200, h: 1080 },
        ],
        spikes: [
            { x: 320, y: 1145, w: 1080, h: 15 },
            { x: 1400, y: 785, w: 80, h: 15 },
        ],
        saws: [
            { x: 1900, y: 180, r: 18, ax: 1800, bx: 2000, speed: 0.013 },
            { x: 2100, y: 180, r: 18, ax: 2000, bx: 2200, speed: 0.013, phase: 0.5 },
            { x: 2300, y: 180, r: 18, ax: 2200, bx: 2400, speed: 0.013 },
            { x: 2580, y: 380, r: 20, ay: 380, by: 540, speed: 0.012 },
            { x: 2760, y: 380, r: 20, ay: 380, by: 540, speed: 0.012, phase: 0.5 },
            { x: 2940, y: 380, r: 20, ay: 380, by: 540, speed: 0.012 },
        ],
        lasers: [
            { x1: 1750, y1: 116, x2: 1750, y2: 200, period: 60, duty: 0.5, phase: 0 },
            { x1: 1900, y1: 116, x2: 1900, y2: 200, period: 60, duty: 0.5, phase: 15 },
            { x1: 2050, y1: 116, x2: 2050, y2: 200, period: 60, duty: 0.5, phase: 30 },
            { x1: 2200, y1: 116, x2: 2200, y2: 200, period: 60, duty: 0.5, phase: 45 },
            { x1: 2350, y1: 116, x2: 2350, y2: 200, period: 60, duty: 0.5, phase: 0 },
        ],
        movers: [],
        crumblers: [],
        bouncers: [
            { x: 80, y: 1140, w: 60, h: 20, power: 22 },
            { x: 200, y: 1140, w: 60, h: 20, power: 22 },
        ],
        boosters: [
            { x: 440, y: 786, w: 60, h: 14, dx: 12, dy: 0 },
            { x: 700, y: 786, w: 60, h: 14, dx: 12, dy: 0 },
            { x: 960, y: 786, w: 60, h: 14, dx: 12, dy: 0 },
            { x: 1220, y: 786, w: 60, h: 14, dx: 12, dy: -4 },
        ],
        coins: [
            { x: 140, y: 960 }, { x: 300, y: 880 }, { x: 140, y: 800 },
            { x: 600, y: 760 }, { x: 900, y: 760 }, { x: 1200, y: 760 },
            { x: 1570, y: 40 }, { x: 1800, y: 70 }, { x: 2000, y: 70 },
            { x: 2200, y: 70 }, { x: 2400, y: 70 },
            { x: 2580, y: 180 }, { x: 2760, y: 240 }, { x: 2940, y: 180 },
            { x: 3120, y: 240 }, { x: 3300, y: 180 },
        ],
        checkpoint: { x: 1560, y: 70 },
        goal: { x: 3460, y: 60, w: 40, h: 60 },
    },
);

// ============================================================
// Chapter 7 — Precision (tight 1-block-style platforms)
// ============================================================
// Player is 18px wide. "1-block" platforms here are 24-30px wide —
// just enough to stand on but no margin for sloppy landings.
window.LEVELS.push(
    // ---- 36: Stepping Stones — tiny platforms across a pit
    {
        bg: 'arctic',
        worldW: 1800, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 200, h: 40 },
            { x: 1600, y: 460, w: 200, h: 140 },
            { x: 240, y: 500, w: 26, h: 12 },
            { x: 320, y: 470, w: 26, h: 12 },
            { x: 400, y: 440, w: 26, h: 12 },
            { x: 480, y: 410, w: 26, h: 12 },
            { x: 560, y: 380, w: 26, h: 12 },
            { x: 640, y: 410, w: 26, h: 12 },
            { x: 720, y: 440, w: 26, h: 12 },
            { x: 800, y: 410, w: 26, h: 12 },
            { x: 880, y: 380, w: 26, h: 12 },
            { x: 960, y: 410, w: 26, h: 12 },
            { x: 1040, y: 440, w: 26, h: 12 },
            { x: 1120, y: 470, w: 26, h: 12 },
            { x: 1200, y: 440, w: 26, h: 12 },
            { x: 1280, y: 410, w: 26, h: 12 },
            { x: 1360, y: 440, w: 26, h: 12 },
            { x: 1440, y: 470, w: 26, h: 12 },
            { x: 1520, y: 460, w: 26, h: 12 },
        ],
        spikes: [
            { x: 200, y: 580, w: 1400, h: 20 },
        ],
        saws: [], lasers: [], movers: [], crumblers: [], bouncers: [], boosters: [],
        coins: [
            { x: 253, y: 470 }, { x: 413, y: 410 }, { x: 573, y: 350 }, { x: 733, y: 410 },
            { x: 893, y: 350 }, { x: 1053, y: 410 }, { x: 1213, y: 410 }, { x: 1373, y: 410 },
        ],
        checkpoint: { x: 893, y: 380 },
        goal: { x: 1700, y: 400, w: 40, h: 60 },
    },

    // ---- 37: Tight Rope — long line of 1-block platforms
    {
        bg: 'cyber',
        worldW: 2200, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 160, h: 40 },
            { x: 2040, y: 460, w: 160, h: 140 },
        ],
        spikes: [
            { x: 160, y: 580, w: 1880, h: 20 },
        ],
        saws: [], lasers: [], movers: [], crumblers: [], bouncers: [], boosters: [],
        coins: [
            { x: 245, y: 410 }, { x: 365, y: 410 }, { x: 485, y: 410 }, { x: 605, y: 410 },
            { x: 725, y: 410 }, { x: 845, y: 410 }, { x: 965, y: 410 }, { x: 1085, y: 410 },
            { x: 1205, y: 410 }, { x: 1325, y: 410 }, { x: 1445, y: 410 }, { x: 1565, y: 410 },
            { x: 1685, y: 410 }, { x: 1805, y: 410 }, { x: 1925, y: 410 },
        ],
        goal: { x: 2120, y: 400, w: 40, h: 60 },
    },

    // ---- 38: Pixel Perfect — even smaller platforms
    {
        bg: 'candy',
        worldW: 1900, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 140, h: 40 },
            { x: 1760, y: 460, w: 140, h: 140 },
            { x: 200, y: 510, w: 22, h: 10 },
            { x: 290, y: 470, w: 22, h: 10 },
            { x: 380, y: 430, w: 22, h: 10 },
            { x: 470, y: 390, w: 22, h: 10 },
            { x: 560, y: 350, w: 22, h: 10 },
            { x: 650, y: 310, w: 22, h: 10 },
            { x: 740, y: 270, w: 22, h: 10 },
            { x: 850, y: 270, w: 22, h: 10 },
            { x: 950, y: 310, w: 22, h: 10 },
            { x: 1050, y: 350, w: 22, h: 10 },
            { x: 1150, y: 390, w: 22, h: 10 },
            { x: 1250, y: 430, w: 22, h: 10 },
            { x: 1350, y: 470, w: 22, h: 10 },
            { x: 1450, y: 430, w: 22, h: 10 },
            { x: 1550, y: 470, w: 22, h: 10 },
            { x: 1650, y: 470, w: 22, h: 10 },
        ],
        spikes: [ { x: 140, y: 580, w: 1620, h: 20 } ],
        saws: [], lasers: [], movers: [], crumblers: [], bouncers: [], boosters: [],
        coins: [
            { x: 301, y: 440 }, { x: 481, y: 360 }, { x: 661, y: 280 }, { x: 861, y: 240 },
            { x: 1061, y: 320 }, { x: 1261, y: 400 }, { x: 1461, y: 400 }, { x: 1661, y: 440 },
        ],
        checkpoint: { x: 850, y: 250 },
        goal: { x: 1830, y: 400, w: 40, h: 60 },
    },

    // ---- 39: Saw Dance — tiny ledges between patrolling saws
    {
        bg: 'cave',
        worldW: 2200, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 180, h: 40 },
            { x: 2040, y: 460, w: 160, h: 140 },
            { x: 260, y: 460, w: 26, h: 10 },
            { x: 460, y: 420, w: 26, h: 10 },
            { x: 660, y: 380, w: 26, h: 10 },
            { x: 860, y: 340, w: 26, h: 10 },
            { x: 1060, y: 380, w: 26, h: 10 },
            { x: 1260, y: 420, w: 26, h: 10 },
            { x: 1460, y: 380, w: 26, h: 10 },
            { x: 1660, y: 420, w: 26, h: 10 },
            { x: 1860, y: 460, w: 26, h: 10 },
        ],
        spikes: [ { x: 180, y: 580, w: 1860, h: 20 } ],
        saws: [
            { x: 360, y: 530, r: 20, ax: 290, bx: 430, speed: 0.014 },
            { x: 560, y: 530, r: 20, ax: 490, bx: 630, speed: 0.014, phase: 0.5 },
            { x: 760, y: 530, r: 20, ax: 690, bx: 830, speed: 0.014 },
            { x: 960, y: 530, r: 20, ax: 890, bx: 1030, speed: 0.014, phase: 0.5 },
            { x: 1160, y: 530, r: 20, ax: 1090, bx: 1230, speed: 0.014 },
            { x: 1360, y: 530, r: 20, ax: 1290, bx: 1430, speed: 0.014, phase: 0.5 },
            { x: 1560, y: 530, r: 20, ax: 1490, bx: 1630, speed: 0.014 },
            { x: 1760, y: 530, r: 20, ax: 1690, bx: 1830, speed: 0.014, phase: 0.5 },
        ],
        lasers: [], movers: [], crumblers: [], bouncers: [], boosters: [],
        coins: [
            { x: 273, y: 420 }, { x: 473, y: 380 }, { x: 673, y: 340 }, { x: 873, y: 300 },
            { x: 1073, y: 340 }, { x: 1273, y: 380 }, { x: 1473, y: 340 }, { x: 1673, y: 380 },
        ],
        checkpoint: { x: 873, y: 310 },
        goal: { x: 2120, y: 400, w: 40, h: 60 },
    },

    // ---- 40: Hover Spots — needs double jump to chain
    {
        bg: 'sunset',
        worldW: 2000, worldH: 600,
        spawn: { x: 60, y: 480 },
        platforms: [
            { x: 0, y: 560, w: 160, h: 40 },
            { x: 1840, y: 460, w: 160, h: 140 },
            { x: 240, y: 480, w: 24, h: 10 },
            { x: 380, y: 380, w: 24, h: 10 },
            { x: 540, y: 280, w: 24, h: 10 },
            { x: 720, y: 380, w: 24, h: 10 },
            { x: 900, y: 280, w: 24, h: 10 },
            { x: 1080, y: 380, w: 24, h: 10 },
            { x: 1260, y: 280, w: 24, h: 10 },
            { x: 1440, y: 380, w: 24, h: 10 },
            { x: 1620, y: 280, w: 24, h: 10 },
            { x: 1740, y: 380, w: 24, h: 10 },
        ],
        spikes: [ { x: 160, y: 580, w: 1680, h: 20 } ],
        saws: [], lasers: [], movers: [], crumblers: [], bouncers: [], boosters: [],
        coins: [
            { x: 253, y: 440 }, { x: 393, y: 340 }, { x: 553, y: 240 },
            { x: 733, y: 340 }, { x: 913, y: 240 }, { x: 1093, y: 340 },
            { x: 1273, y: 240 }, { x: 1453, y: 340 }, { x: 1633, y: 240 },
        ],
        checkpoint: { x: 913, y: 260 },
        goal: { x: 1920, y: 400, w: 40, h: 60 },
    },

    // ---- 41: Wall Tap — micro wall jumps between thin walls
    {
        bg: 'night',
        worldW: 1200, worldH: 1400,
        spawn: { x: 80, y: 1300 },
        platforms: [
            { x: 0, y: 1360, w: 1200, h: 40 },
            // thin walls forming a tight wall-jump shaft
            { x: 280, y: 1140, w: 20, h: 220 },
            { x: 420, y: 1000, w: 20, h: 220 },
            { x: 280, y: 820,  w: 20, h: 220 },
            { x: 420, y: 660,  w: 20, h: 220 },
            { x: 280, y: 480,  w: 20, h: 220 },
            { x: 420, y: 320,  w: 20, h: 220 },
            // tiny ledge at top
            { x: 460, y: 260, w: 30, h: 10 },
            { x: 600, y: 200, w: 30, h: 10 },
            { x: 760, y: 160, w: 30, h: 10 },
            { x: 920, y: 120, w: 200, h: 100 },
        ],
        spikes: [], saws: [], lasers: [], movers: [], crumblers: [], bouncers: [], boosters: [],
        coins: [
            { x: 360, y: 1080 }, { x: 360, y: 760 }, { x: 360, y: 440 },
            { x: 475, y: 220 }, { x: 615, y: 160 }, { x: 775, y: 120 },
        ],
        checkpoint: { x: 360, y: 780 },
        goal: { x: 990, y: 60, w: 40, h: 60 },
    },

    // ---- 42: Boost Hops — bouncer to 1-block landings
    {
        bg: 'candy',
        worldW: 2100, worldH: 700,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 180, h: 60 },
            { x: 1940, y: 380, w: 160, h: 300 },
            // tiny landings to control direction between bounces
            { x: 360, y: 320, w: 26, h: 10 },
            { x: 600, y: 250, w: 26, h: 10 },
            { x: 840, y: 200, w: 26, h: 10 },
            { x: 1080, y: 250, w: 26, h: 10 },
            { x: 1320, y: 320, w: 26, h: 10 },
            { x: 1560, y: 390, w: 26, h: 10 },
            { x: 1780, y: 380, w: 26, h: 10 },
        ],
        spikes: [ { x: 180, y: 660, w: 1760, h: 20 } ],
        saws: [], lasers: [], movers: [], crumblers: [],
        bouncers: [
            { x: 220, y: 600, w: 60, h: 20, power: 22 },
            { x: 460, y: 600, w: 60, h: 20, power: 22 },
            { x: 700, y: 600, w: 60, h: 20, power: 22 },
            { x: 940, y: 600, w: 60, h: 20, power: 22 },
            { x: 1180, y: 600, w: 60, h: 20, power: 22 },
            { x: 1420, y: 600, w: 60, h: 20, power: 22 },
            { x: 1660, y: 600, w: 60, h: 20, power: 22 },
        ],
        boosters: [],
        coins: [
            { x: 373, y: 280 }, { x: 613, y: 210 }, { x: 853, y: 160 },
            { x: 1093, y: 210 }, { x: 1333, y: 280 }, { x: 1573, y: 350 },
        ],
        checkpoint: { x: 853, y: 170 },
        goal: { x: 2020, y: 320, w: 40, h: 60 },
    },

    // ---- 43: Coin Tower — vertical 1-block climb
    {
        bg: 'forest',
        worldW: 800, worldH: 1600,
        spawn: { x: 80, y: 1500 },
        platforms: [
            { x: 0, y: 1560, w: 800, h: 40 },
            { x: 0, y: 0, w: 24, h: 1560 },
            { x: 776, y: 0, w: 24, h: 1560 },
            { x: 160, y: 1400, w: 26, h: 10 },
            { x: 320, y: 1320, w: 26, h: 10 },
            { x: 480, y: 1240, w: 26, h: 10 },
            { x: 640, y: 1160, w: 26, h: 10 },
            { x: 480, y: 1080, w: 26, h: 10 },
            { x: 320, y: 1000, w: 26, h: 10 },
            { x: 160, y: 920,  w: 26, h: 10 },
            { x: 320, y: 840,  w: 26, h: 10 },
            { x: 480, y: 760,  w: 26, h: 10 },
            { x: 640, y: 680,  w: 26, h: 10 },
            { x: 480, y: 600,  w: 26, h: 10 },
            { x: 320, y: 520,  w: 26, h: 10 },
            { x: 160, y: 440,  w: 26, h: 10 },
            { x: 320, y: 360,  w: 26, h: 10 },
            { x: 480, y: 280,  w: 26, h: 10 },
            { x: 320, y: 200,  w: 26, h: 10 },
            { x: 260, y: 100,  w: 260, h: 60 },
        ],
        spikes: [], saws: [], lasers: [], movers: [], crumblers: [], bouncers: [], boosters: [],
        coins: [
            { x: 173, y: 1360 }, { x: 333, y: 1280 }, { x: 493, y: 1200 },
            { x: 653, y: 1120 }, { x: 493, y: 1040 }, { x: 333, y: 960 },
            { x: 173, y: 880 }, { x: 333, y: 800 }, { x: 493, y: 720 },
            { x: 653, y: 640 }, { x: 493, y: 560 }, { x: 333, y: 480 },
            { x: 173, y: 400 }, { x: 333, y: 320 }, { x: 493, y: 240 },
        ],
        checkpoint: { x: 173, y: 880 },
        goal: { x: 370, y: 40, w: 40, h: 60 },
    },

    // ---- 44: The Maze — winding 1-block path with turns
    {
        bg: 'cyber',
        worldW: 1800, worldH: 800,
        spawn: { x: 60, y: 540 },
        platforms: [
            { x: 0, y: 620, w: 160, h: 60 },
            { x: 1640, y: 360, w: 160, h: 320 },
            // winding path
            { x: 220, y: 560, w: 26, h: 10 },
            { x: 320, y: 500, w: 26, h: 10 },
            { x: 420, y: 440, w: 26, h: 10 },
            { x: 520, y: 380, w: 26, h: 10 },
            { x: 620, y: 320, w: 26, h: 10 },
            { x: 720, y: 380, w: 26, h: 10 },   // turn down
            { x: 820, y: 440, w: 26, h: 10 },
            { x: 920, y: 500, w: 26, h: 10 },
            { x: 1020, y: 560, w: 26, h: 10 },
            { x: 1120, y: 500, w: 26, h: 10 },  // back up
            { x: 1220, y: 440, w: 26, h: 10 },
            { x: 1320, y: 380, w: 26, h: 10 },
            { x: 1420, y: 320, w: 26, h: 10 },
            { x: 1520, y: 380, w: 26, h: 10 },
        ],
        spikes: [ { x: 160, y: 660, w: 1480, h: 20 } ],
        saws: [], lasers: [], movers: [], crumblers: [], bouncers: [], boosters: [],
        coins: [
            { x: 333, y: 460 }, { x: 533, y: 340 }, { x: 633, y: 280 },
            { x: 833, y: 400 }, { x: 1033, y: 520 }, { x: 1233, y: 400 },
            { x: 1433, y: 280 }, { x: 1533, y: 340 },
        ],
        checkpoint: { x: 833, y: 460 },
        goal: { x: 1720, y: 300, w: 40, h: 60 },
    },

    // ---- 45: The Pinnacle — ultimate precision finale
    {
        bg: 'cosmic',
        worldW: 2400, worldH: 900,
        spawn: { x: 60, y: 640 },
        platforms: [
            { x: 0, y: 720, w: 200, h: 80 },
            { x: 2240, y: 300, w: 160, h: 600 },
            // section 1: tiny ledges over saw pit
            { x: 260, y: 660, w: 22, h: 10 },
            { x: 360, y: 600, w: 22, h: 10 },
            { x: 460, y: 540, w: 22, h: 10 },
            { x: 560, y: 480, w: 22, h: 10 },
            // section 2: wall jump tower
            { x: 700, y: 220, w: 20, h: 320 },
            { x: 820, y: 100, w: 20, h: 400 },
            { x: 720, y: 80, w: 100, h: 12 },
            // section 3: hover hops
            { x: 920, y: 200, w: 22, h: 10 },
            { x: 1060, y: 280, w: 22, h: 10 },
            { x: 1200, y: 200, w: 22, h: 10 },
            { x: 1340, y: 280, w: 22, h: 10 },
            { x: 1480, y: 200, w: 22, h: 10 },
            // section 4: bouncer + tiny landings
            { x: 1620, y: 400, w: 24, h: 10 },
            { x: 1780, y: 320, w: 24, h: 10 },
            { x: 1940, y: 240, w: 24, h: 10 },
            { x: 2100, y: 280, w: 24, h: 10 },
        ],
        spikes: [
            { x: 200, y: 780, w: 500, h: 20 },
            { x: 840, y: 780, w: 1400, h: 20 },
        ],
        saws: [
            { x: 400, y: 700, r: 20, ax: 300, bx: 600, speed: 0.014 },
            { x: 1000, y: 380, r: 22, ax: 920, bx: 1500, speed: 0.014, phase: 0.5 },
        ],
        lasers: [
            { x1: 770, y1: 0, x2: 770, y2: 80, period: 60, duty: 0.5, phase: 0 },
            { x1: 870, y1: 0, x2: 870, y2: 80, period: 60, duty: 0.5, phase: 30 },
        ],
        movers: [],
        crumblers: [],
        bouncers: [
            { x: 1500, y: 500, w: 70, h: 18, power: 24 },
        ],
        boosters: [
            { x: 1640, y: 386, w: 50, h: 14, dx: 10, dy: 0 },
        ],
        coins: [
            { x: 273, y: 620 }, { x: 373, y: 560 }, { x: 473, y: 500 }, { x: 573, y: 440 },
            { x: 770, y: 40 }, { x: 933, y: 160 }, { x: 1073, y: 240 }, { x: 1213, y: 160 },
            { x: 1353, y: 240 }, { x: 1493, y: 160 }, { x: 1633, y: 360 }, { x: 1793, y: 280 },
            { x: 1953, y: 200 }, { x: 2113, y: 240 },
        ],
        checkpoint: { x: 770, y: 60 },
        goal: { x: 2320, y: 240, w: 40, h: 60 },
    },
);

// Strip any helper markers in the new levels too (none currently, but keep symmetric)
window.LEVELS.forEach(lvl => {
    lvl.platforms = lvl.platforms.filter(p => !p._mover);
});

// ============================================================
// Build long line of stepping stones for level 37 (Tight Rope)
// programmatically (avoids 30+ near-identical objects in the data).
// ============================================================
(function tightRopeBuild() {
    const lvl = window.LEVELS[36]; // index 36 = level 37
    if (!lvl) return;
    // Sine-wave height between 360 and 480, regular x spacing
    for (let i = 0; i < 22; i++) {
        const x = 220 + i * 85;
        const y = 430 + Math.round(Math.sin(i * 0.55) * 50);
        lvl.platforms.push({ x, y, w: 26, h: 10 });
    }
})();
