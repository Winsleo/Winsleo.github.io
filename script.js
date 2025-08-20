// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Internationalization (i18n) Logic ---
    const langBtns = document.querySelectorAll('.lang-btn');

    const setLanguage = (lang) => {
        if (typeof translations === 'undefined' || !translations[lang]) {
            console.error(`Translations for language "${lang}" not found. Make sure translations.js is loaded correctly.`);
            return;
        }

        // 1. Update all tagged elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key] !== undefined) {
                 if (el.hasAttribute('data-i18n-html')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // 2. Update page title
        document.title = translations[lang].pageTitle;

        // 3. Update active language button
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // 4. Update HTML lang attribute
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

        // 5. Save user preference
        localStorage.setItem('preferredLanguage', lang);
    };

    // Add click listeners to language switch buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setLanguage(this.dataset.lang);
        });
    });
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // 移动端菜单切换
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // 动画效果
        const bars = navToggle.querySelectorAll('.bar');
        if (navToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // 平滑滚动到锚点
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 减去导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // 关闭移动端菜单
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // 论文发表筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const publicationItems = document.querySelectorAll('.publication-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有active类
            filterBtns.forEach(b => b.classList.remove('active'));
            // 添加active类到当前按钮
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            publicationItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'grid';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 摘要展开/收起功能
    const abstractToggles = document.querySelectorAll('.abstract-toggle');
    abstractToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const abstractContent = this.nextElementSibling;
            const currentLang = localStorage.getItem('preferredLanguage') || 'zh';
            
            abstractContent.classList.toggle('show');

            if (abstractContent.classList.contains('show')) {
                this.textContent = translations[currentLang]['hide_abstract'];
            } else {
                this.textContent = translations[currentLang]['show_abstract'];
            }
        });
    });
    
    // 项目类别筛选功能
    const categoryTabs = document.querySelectorAll('.category-tab');
    const projectCards = document.querySelectorAll('.project-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有active类
            categoryTabs.forEach(t => t.classList.remove('active'));
            // 添加active类到当前标签
            this.classList.add('active');
            
            const categoryValue = this.getAttribute('data-category');
            
            projectCards.forEach(card => {
                if (categoryValue === 'all' || card.getAttribute('data-category') === categoryValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 观察器选项
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // 滚动动画
    const animateElements = document.querySelectorAll('.section-title, .intro-text, .publication-item, .project-card, .contact-info');
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        animationObserver.observe(element);
    });
    

    
    // 活跃导航链接
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // 移除所有活跃状态
                navLinks.forEach(link => link.classList.remove('active'));
                // 添加当前活跃状态
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
    
    // 打字机效果（可选）
    const profileTitle = document.querySelector('.profile-name');
    if (profileTitle) {
        const text = profileTitle.textContent;
        profileTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                profileTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // 延迟启动打字机效果
        setTimeout(typeWriter, 500);
    }
    
    // 添加鼠标跟随效果（可选）
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(52, 152, 219, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.display = 'none';
    });
    
    // 点击效果
    document.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 100px;
            height: 100px;
            background: rgba(52, 152, 219, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            left: ${e.clientX - 50}px;
            top: ${e.clientY - 50}px;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // 添加涟漪动画CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
        
        .nav-link.active {
            color: #3498db;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu .nav-link {
                font-size: 1.2rem;
                margin: 1rem 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Video Modal Logic (robust)
    const videoModal = document.getElementById('video-modal');
    const videoBtns = document.querySelectorAll('.video-btn');
    const closeBtn = document.querySelector('.close-btn');
    const projectVideo = document.getElementById('project-video');
    const videoStatus = document.getElementById('video-status');
    let lastSrc = '';

    function showModal() {
        videoModal.style.display = 'block';
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        videoModal.style.display = 'none';
        videoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        safeStopAndReset();
    }

    function showLoading() {
        if (videoStatus) {
            videoStatus.style.display = 'flex';
            const loading = videoStatus.querySelector('.video-loading');
            const err = videoStatus.querySelector('.video-error');
            if (loading) loading.style.display = 'flex';
            if (err) err.style.display = 'none';
        }
    }

    function showError() {
        if (videoStatus) {
            videoStatus.style.display = 'flex';
            const loading = videoStatus.querySelector('.video-loading');
            const err = videoStatus.querySelector('.video-error');
            if (loading) loading.style.display = 'none';
            if (err) {
                err.style.display = 'block';
                if (lastSrc) {
                    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
                    const errorText = translations[currentLang]['video_error_text'];
                    const linkText = translations[currentLang]['video_error_open_in_new_tab'];
                    err.innerHTML = `${errorText} <a href="${lastSrc}" target="_blank" rel="noopener" style="margin-left:8px;color:#3498db;">${linkText}</a>`;
                }
            }
        }
    }

    function hideStatus() {
        if (videoStatus) videoStatus.style.display = 'none';
    }

    function safeStopAndReset() {
        try {
            projectVideo.pause();
        } catch (e) {}
        projectVideo.removeAttribute('src');
        // Force unload
        projectVideo.load();
        lastSrc = '';
        showLoading();
    }

    function attachVideoEventsOnce() {
        if (!projectVideo._eventsBound) {
            projectVideo.addEventListener('loadeddata', () => {
                hideStatus();
            });
            projectVideo.addEventListener('canplay', () => {
                hideStatus();
            });
            projectVideo.addEventListener('error', () => {
                showError();
            });
            projectVideo.addEventListener('emptied', () => {
                showLoading();
            });
            projectVideo._eventsBound = true;
        }
    }

    attachVideoEventsOnce();

    videoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video-src');
            if (!videoSrc) return;
            showModal();
            showLoading();

            if (lastSrc !== videoSrc) {
                safeStopAndReset();
                projectVideo.src = videoSrc;
                lastSrc = videoSrc;
            }

            // Start loading and play when possible
            const playPromise = projectVideo.play();
            if (playPromise && typeof playPromise.then === 'function') {
                playPromise.then(() => hideStatus()).catch(() => {
                    // Autoplay might be blocked; show controls and wait for user
                    hideStatus();
                });
            }
        });
    });

    closeBtn.addEventListener('click', hideModal);

    window.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            hideModal();
        }
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && videoModal.style.display === 'block') {
            hideModal();
        }
    });

    // At the end of DOMContentLoaded, initialize the language
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
    
    // Always default to English, but respect saved preference if it exists
    setLanguage(savedLang || 'en');
    
    // If no language is saved, set the default to English
    if (!savedLang) {
        localStorage.setItem('preferredLanguage', 'en');
    }
});

// 页面加载动画
window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #667eea;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    loadingScreen.appendChild(loader);
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});