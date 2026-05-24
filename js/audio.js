// ============================================================
// audio.js — tiny Web Audio synth for sound effects
// ============================================================
(function () {
    let ac = null;
    function ctx() {
        if (!ac) {
            try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
        }
        return ac;
    }
    function beep(freq, dur, type, vol) {
        const a = ctx(); if (!a) return;
        const o = a.createOscillator();
        const g = a.createGain();
        o.type = type || 'square';
        o.frequency.value = freq;
        g.gain.setValueAtTime(vol == null ? 0.06 : vol, a.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
        o.connect(g).connect(a.destination);
        o.start();
        o.stop(a.currentTime + dur);
    }
    window.SFX = {
        ensure() { ctx(); },
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
    };
})();
