/* World Field background: streamlines of a divergence-free flow filling the viewport.
   Each frame draws short segments and fades the canvas slightly, which leaves soft trails.
   Slow, low contrast; pauses when the tab is hidden. Remove the <script> tag to disable. */
(function () {
    var cv = document.getElementById('world-field');
    if (!cv) return;
    var ctx = cv.getContext('2d');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var SPEED = 0.002;     // flow advection per frame (normalized units)
    var EVOLVE = 0.0045;    // how fast the field itself changes
    var FADE = 0.035;      // trail fade strength, applied every FADE_EVERY frames
    var FADE_EVERY = 8;

    var W, H, dpr, cx, cy, R, hw, hh, P = [];
    var mx = 0, my = 0, tmx = 0, tmy = 0, minf = 0, tinf = 0;
    var t = 0, last = 0, acc = 0, fc = 0, running = false;
    var v = [0, 0];

    function spawn(p) {
        p.x = (Math.random() * 2 - 1) * hw; p.y = (Math.random() * 2 - 1) * hh;
        p.px = p.x; p.py = p.y;                  // no segment drawn from the old position
        p.life = 0; p.max = 260 + Math.random() * 380;
        p.hot = Math.random() < 0.06;
    }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = window.innerWidth; H = window.innerHeight;
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        cv.style.width = W + 'px'; cv.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var small = W < 768;
        R = Math.max(W, H) * 0.5;
        cx = W * 0.5; cy = H * 0.5;
        hw = W / 2 / R; hh = H / 2 / R;
        var N = Math.min(Math.round(W * H / (small ? 8400 : 7600)), 210);
        while (P.length < N) { var p = {}; spawn(p); p.life = Math.random() * p.max; P.push(p); }
        P.length = N;
        for (var i = 0; i < P.length; i++) spawn(P[i]);
        ctx.clearRect(0, 0, W, H);
        if (reduce) { for (var k = 0; k < 220; k++) step(); }
    }

    // stream function psi; velocity = (dpsi/dy, -dpsi/dx) -> swirls and vortices, no sinks
    function vel(x, y, out) {
        x *= 1.35; y *= 1.35;
        var a = 1.7 * x + 0.30 * t, b = 1.3 * y - 0.22 * t;
        var c = 2.9 * x + 2.1 * y + 0.17 * t, d = 4.1 * x - 3.3 * y - 0.12 * t;
        var dpx = 1.7 * Math.cos(a) * Math.cos(b) + 0.6 * 2.9 * Math.cos(c) - 0.4 * 4.1 * Math.sin(d);
        var dpy = -1.3 * Math.sin(a) * Math.sin(b) + 0.6 * 2.1 * Math.cos(c) + 0.4 * 3.3 * Math.sin(d);
        out[0] = dpy; out[1] = -dpx;
    }

    // one fixed simulation step (frame-rate independent via the accumulator in loop)
    function step() {
        t += EVOLVE;
        mx += (tmx - mx) * 0.08; my += (tmy - my) * 0.08; minf += (tinf - minf) * 0.05;

        if (reduce || (fc++ % FADE_EVERY === 0)) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0,0,0,' + (reduce ? 0 : FADE) + ')';
            ctx.fillRect(0, 0, W, H);
            ctx.globalCompositeOperation = 'source-over';
        }

        var light = document.documentElement.getAttribute('data-theme') === 'light';
        var base = light ? '20,110,200' : '90,209,255';
        var hotc = light ? '20,60,140' : '255,255,255';
        var gx = (mx - cx) / R, gy = (my - cy) / R;
        var p, i, pass;
        for (pass = 0; pass < 2; pass++) {
            ctx.beginPath();
            for (i = 0; i < P.length; i++) {
                p = P[i];
                if ((pass === 1) !== p.hot) continue;
                vel(p.x, p.y, v);
                if (minf > 0.01) {                   // soft swirl around the cursor
                    var dx = p.x - gx, dy = p.y - gy;
                    var f = minf * 4.8 * Math.exp(-(dx * dx + dy * dy) / 0.08);
                    v[0] += -dy * f; v[1] += dx * f;
                }
                p.px = p.x; p.py = p.y;
                p.x += v[0] * SPEED; p.y += v[1] * SPEED; p.life++;
                if (Math.abs(p.x) > hw || Math.abs(p.y) > hh || p.life > p.max) { spawn(p); continue; }
                ctx.moveTo(cx + p.px * R, cy + p.py * R);
                ctx.lineTo(cx + p.x * R, cy + p.y * R);
            }
            if (pass === 0) { ctx.strokeStyle = 'rgba(' + base + ',0.75)'; ctx.lineWidth = 1; }
            else { ctx.strokeStyle = 'rgba(' + hotc + ',0.9)'; ctx.lineWidth = 1.4; }
            ctx.stroke();
        }
    }

    function loop(now) {
        if (document.hidden) { running = false; return; }
        acc += Math.min((now - last) / 16.667, 4); last = now;
        while (acc >= 1) { step(); acc -= 1; }
        requestAnimationFrame(loop);
    }
    function start() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); } }

    window.addEventListener('resize', resize);
    resize();
    if (reduce) return;                      // static frame only
    window.addEventListener('mousemove', function (e) { tmx = e.clientX; tmy = e.clientY; tinf = 1; });
    window.addEventListener('mouseleave', function () { tinf = 0; });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) start(); });
    start();
})();
