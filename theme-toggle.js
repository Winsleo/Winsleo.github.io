/* Theme toggle (dark default) + scroll reveal. Remove the <script> tag to disable. */
(function () {
    var root = document.documentElement;
    var saved = localStorage.getItem('theme');
    if (saved === 'light') root.setAttribute('data-theme', 'light');

    var actions = document.querySelector('.nav-actions');
    if (actions) {
        var btn = document.createElement('button');
        btn.id = 'theme-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Toggle theme');
        var sync = function () {
            btn.textContent = root.getAttribute('data-theme') === 'light' ? '\u263E' : '\u2600';
        };
        btn.addEventListener('click', function () {
            var light = root.getAttribute('data-theme') !== 'light';
            if (light) root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme');
            localStorage.setItem('theme', light ? 'light' : 'dark');
            sync();
        });
        sync();
        actions.insertBefore(btn, actions.firstChild);
    }

    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.education-item, .work-item, .publication-item, .project-card, .award-item, .skill-category, .csdn-stats .stat-item')
        .forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
})();
