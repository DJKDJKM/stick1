// ============================================================
// audio.js — tiny Web Audio synth: SFX + looping chiptune music
// ============================================================
(function () {
    let ac = null;
    function ctx() {
        if (!ac) {
            try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
        }
        return ac;
    }

    // Output buses so we can mute SFX/Music independently
    let sfxBus = null, musicBus = null;
    function getBuses() {
        const a = ctx(); if (!a) return null;
        if (!sfxBus) {
            sfxBus = a.createGain();   sfxBus.gain.value = 1.0; sfxBus.connect(a.destination);
            musicBus = a.createGain(); musicBus.gain.value = 0.7; musicBus.connect(a.destination);
        }
        return { sfx: sfxBus, music: musicBus };
    }
    function applyMute() {
        const b = getBuses(); if (!b) return;
        const s = window.Save && Save.settings ? Save.settings() : { sfxOn: true, musicOn: true };
        b.sfx.gain.value   = s.sfxOn   ? 1.0 : 0.0;
        b.music.gain.value = s.musicOn ? 0.7 : 0.0;
    }

    function beep(freq, dur, type, vol) {
        const a = ctx(); if (!a) return;
        const b = getBuses(); if (!b) return;
        const o = a.createOscillator();
        const g = a.createGain();
        o.type = type || 'square';
        o.frequency.value = freq;
        g.gain.setValueAtTime(vol == null ? 0.06 : vol, a.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
        o.connect(g).connect(b.sfx);
        o.start();
        o.stop(a.currentTime + dur);
    }

    // ---- Looping music ----------------------------------------
    // Simple 16-step lead + bassline; scheduled with Web Audio lookahead
    const LEAD = [
        // [midi, durEighths] — A minor pentatonic, gentle loop
        [69, 1], [72, 1], [76, 1], [72, 1],
        [74, 1], [72, 1], [69, 1], [67, 1],
        [69, 1], [72, 1], [76, 1], [79, 1],
        [76, 1], [72, 1], [69, 2],
    ];
    const BASS = [
        [45, 4], [50, 4], [48, 4], [43, 4],
    ];
    function midiToHz(m) { return 440 * Math.pow(2, (m - 69) / 12); }

    const Music = {
        playing: false,
        eighth: 60 / 110 / 2,    // 110 BPM → seconds per 8th note
        nextLeadTime: 0,
        nextBassTime: 0,
        leadStep: 0,
        bassStep: 0,
        _timer: null,

        start() {
            const a = ctx(); if (!a) return;
            if (this.playing) return;
            const b = getBuses(); if (!b) return;
            this.playing = true;
            const now = a.currentTime + 0.08;
            this.nextLeadTime = now;
            this.nextBassTime = now;
            this.leadStep = 0;
            this.bassStep = 0;
            applyMute();
            this._schedule();
        },
        stop() {
            this.playing = false;
            if (this._timer) { clearTimeout(this._timer); this._timer = null; }
        },
        _schedule() {
            if (!this.playing) return;
            const a = ctx(); if (!a) return;
            const lookAhead = 0.25;
            const horizon = a.currentTime + lookAhead;
            while (this.nextLeadTime < horizon) {
                const [m, dur] = LEAD[this.leadStep];
                this._playNote(midiToHz(m + 12), this.nextLeadTime, this.eighth * dur * 0.95, 'square', 0.05);
                this.nextLeadTime += this.eighth * dur;
                this.leadStep = (this.leadStep + 1) % LEAD.length;
            }
            while (this.nextBassTime < horizon) {
                const [m, dur] = BASS[this.bassStep];
                this._playNote(midiToHz(m), this.nextBassTime, this.eighth * dur * 0.9, 'triangle', 0.10);
                this.nextBassTime += this.eighth * dur;
                this.bassStep = (this.bassStep + 1) % BASS.length;
            }
            this._timer = setTimeout(() => this._schedule(), 90);
        },
        _playNote(freq, when, dur, type, vol) {
            const a = ctx(); if (!a) return;
            const b = getBuses(); if (!b) return;
            const o = a.createOscillator();
            const g = a.createGain();
            o.type = type;
            o.frequency.value = freq;
            g.gain.setValueAtTime(0.0001, when);
            g.gain.linearRampToValueAtTime(vol, when + 0.01);
            g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
            o.connect(g).connect(b.music);
            o.start(when);
            o.stop(when + dur + 0.02);
        },
    };

    window.SFX = {
        ensure() { ctx(); getBuses(); applyMute(); },
        applyMute,
        jump()    { beep(620, 0.09, 'square', 0.05); },
        djump()   { beep(880, 0.10, 'triangle', 0.05); },
        wjump()   { beep(520, 0.10, 'sawtooth', 0.05); },
        land()    { beep(180, 0.05, 'sine', 0.04); },
        coin()    { beep(880, 0.06, 'square', 0.05); setTimeout(() => beep(1320, 0.08, 'square', 0.05), 50); },
        death()   { beep(220, 0.12, 'sawtooth', 0.08); setTimeout(() => beep(110, 0.18, 'sawtooth', 0.08), 100); },
        win()     {
            beep(660, 0.10, 'triangle', 0.06);
            setTimeout(() => beep(880, 0.10, 'triangle', 0.06), 90);
            setTimeout(() => beep(1320, 0.18, 'triangle', 0.07), 180);
        },
        cp()      { beep(740, 0.06, 'sine', 0.05); setTimeout(() => beep(990, 0.08, 'sine', 0.05), 50); },
        buy()     { beep(520, 0.06, 'square', 0.05); setTimeout(() => beep(780, 0.10, 'square', 0.05), 50); },
        deny()    { beep(160, 0.18, 'sawtooth', 0.06); },
        reward()  {
            beep(660, 0.08, 'triangle', 0.06);
            setTimeout(() => beep(880, 0.08, 'triangle', 0.06), 80);
            setTimeout(() => beep(1100, 0.08, 'triangle', 0.06), 160);
            setTimeout(() => beep(1480, 0.18, 'triangle', 0.07), 240);
        },
        boost()   {
            beep(360, 0.06, 'square', 0.06);
            setTimeout(() => beep(620, 0.06, 'square', 0.06), 25);
            setTimeout(() => beep(960, 0.08, 'square', 0.06), 55);
            setTimeout(() => beep(1280, 0.10, 'square', 0.05), 95);
        },
        combo(level) {
            const base = 660 + level * 60;
            beep(base, 0.06, 'square', 0.05);
            setTimeout(() => beep(base + 200, 0.06, 'square', 0.05), 40);
        },
    };
    window.Music = Music;
})();
