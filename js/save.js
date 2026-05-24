// ============================================================
// save.js — persistence: wallet, owned skins, daily streak,
//          best times, stats, achievements.
// ============================================================
(function () {
    const KEY = 'stickman_parkour_save_v2';

    function todayKey() {
        const d = new Date();
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }
    function yesterdayKey() {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }

    let data;
    try { data = JSON.parse(localStorage.getItem(KEY)); } catch { data = null; }
    if (!data) data = {};

    // Schema with defaults
    data.coins         = data.coins         || 0;
    data.bestTimes     = data.bestTimes     || {};
    data.completed     = data.completed     || {};
    data.deaths        = data.deaths        || 0;
    data.ownedSkins    = data.ownedSkins    || { hero: true };
    data.equippedSkin  = data.equippedSkin  || 'hero';
    data.dailyLast     = data.dailyLast     || null;
    data.dailyStreak   = data.dailyStreak   || 0;
    data.stats         = data.stats         || {};
    data.stats.coinsEver     = data.stats.coinsEver     || 0;
    data.stats.doubleJumps   = data.stats.doubleJumps   || 0;
    data.stats.wallJumps     = data.stats.wallJumps     || 0;
    data.stats.bounces       = data.stats.bounces       || 0;
    data.stats.boosts        = data.stats.boosts        || 0;
    data.stats.maxCombo      = data.stats.maxCombo      || 0;
    data.stats.perfectLevels = data.stats.perfectLevels || {};
    data.achievements  = data.achievements  || {};
    data.ownedPets     = data.ownedPets     || { none: true };
    data.equippedPet   = data.equippedPet   || 'none';
    data.settings      = data.settings      || {};
    if (data.settings.musicOn === undefined) data.settings.musicOn = true;
    if (data.settings.sfxOn   === undefined) data.settings.sfxOn   = true;

    // Migrate legacy v1 save if present
    try {
        const v1 = JSON.parse(localStorage.getItem('stickman_parkour_save_v1'));
        if (v1) {
            if (!Object.keys(data.bestTimes).length && v1.bestTimes) data.bestTimes = v1.bestTimes;
            if (!Object.keys(data.completed).length && v1.completed) data.completed = v1.completed;
            if (!data.deaths && v1.deaths) data.deaths = v1.deaths;
        }
    } catch {}

    function persist() {
        try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
    }

    // Listener for newly-unlocked achievements (set by game.js to show toast)
    let onAchievement = null;

    function snapshotForCheck() {
        return {
            coins: data.coins,
            bestTimes: data.bestTimes,
            completed: data.completed,
            deaths: data.deaths,
            ownedSkins: data.ownedSkins,
            ownedPets: data.ownedPets,
            stats: data.stats,
        };
    }

    function checkAchievements() {
        if (!window.ACHIEVEMENTS) return;
        const snap = snapshotForCheck();
        const newly = [];
        for (const a of ACHIEVEMENTS) {
            if (data.achievements[a.id]) continue;
            try {
                if (a.check(snap)) {
                    data.achievements[a.id] = true;
                    newly.push(a);
                }
            } catch {}
        }
        if (newly.length) {
            persist();
            if (onAchievement) for (const a of newly) onAchievement(a);
        }
        return newly;
    }

    window.Save = {
        get data() { return data; },

        // Coins ----------------------------------------------
        coins() { return data.coins; },
        addCoins(n) {
            data.coins = Math.max(0, data.coins + n);
            persist();
            checkAchievements();
        },
        spend(n) {
            if (data.coins < n) return false;
            data.coins -= n;
            persist();
            return true;
        },

        // Levels ---------------------------------------------
        getBest(idx) { return data.bestTimes[idx]; },
        recordResult(idx, time, perfect) {
            const prev = data.bestTimes[idx];
            const isBest = !prev || time < prev;
            if (isBest) data.bestTimes[idx] = time;
            data.completed[idx] = true;
            if (perfect) data.stats.perfectLevels[idx] = true;
            persist();
            checkAchievements();
            return isBest;
        },
        isCompleted(idx) { return !!data.completed[idx]; },
        isUnlocked(idx) { return idx === 0 || !!data.completed[idx - 1]; },
        incDeaths() { data.deaths++; persist(); checkAchievements(); },
        deaths() { return data.deaths; },

        // Skins ----------------------------------------------
        own(id) { return !!data.ownedSkins[id]; },
        equipped() { return data.equippedSkin; },
        equip(id) {
            if (!data.ownedSkins[id]) return false;
            data.equippedSkin = id;
            persist();
            return true;
        },
        buy(id, cost) {
            if (data.ownedSkins[id]) return 'owned';
            if (data.coins < cost) return 'broke';
            data.coins -= cost;
            data.ownedSkins[id] = true;
            persist();
            checkAchievements();
            return 'ok';
        },

        // Stats ----------------------------------------------
        incStat(key, n) {
            data.stats[key] = (data.stats[key] || 0) + (n || 1);
            persist();
            checkAchievements();
        },
        stat(key) { return data.stats[key] || 0; },
        stats() { return data.stats; },

        // Achievements ---------------------------------------
        achievements() { return data.achievements; },
        hasAchievement(id) { return !!data.achievements[id]; },
        onAchievementUnlocked(fn) { onAchievement = fn; },
        forceAchievementCheck() { return checkAchievements(); },

        // Pets -----------------------------------------------
        ownPet(id) { return !!data.ownedPets[id]; },
        equippedPet() { return data.equippedPet; },
        equipPet(id) {
            if (!data.ownedPets[id]) return false;
            data.equippedPet = id;
            persist();
            return true;
        },
        buyPet(id, cost) {
            if (data.ownedPets[id]) return 'owned';
            if (data.coins < cost) return 'broke';
            data.coins -= cost;
            data.ownedPets[id] = true;
            persist();
            checkAchievements();
            return 'ok';
        },

        // Settings -------------------------------------------
        settings() { return data.settings; },
        setSetting(key, val) {
            data.settings[key] = val;
            persist();
        },

        // Reset (with confirmation in UI) --------------------
        resetAll() {
            localStorage.removeItem(KEY);
            localStorage.removeItem('stickman_parkour_save_v1');
            location.reload();
        },

        // Daily reward ---------------------------------------
        dailyStatus() {
            const t = todayKey();
            const canClaim = data.dailyLast !== t;
            const continued = data.dailyLast === yesterdayKey();
            const nextStreakIndex = canClaim
                ? (continued ? (data.dailyStreak % 7) : 0)
                : ((data.dailyStreak - 1 + 7) % 7);
            return {
                canClaim,
                nextDay: nextStreakIndex + 1,
                streak: data.dailyStreak,
                lastClaim: data.dailyLast,
            };
        },
        claimDaily() {
            const status = this.dailyStatus();
            if (!status.canClaim) return null;
            const continued = data.dailyLast === yesterdayKey();
            const streakIndex = continued ? (data.dailyStreak % 7) : 0;
            const reward = window.DAILY_REWARDS[streakIndex] || 10;
            data.coins += reward;
            data.dailyStreak = streakIndex + 1;
            data.dailyLast = todayKey();
            persist();
            checkAchievements();
            return { reward, day: streakIndex + 1 };
        },
    };
})();
