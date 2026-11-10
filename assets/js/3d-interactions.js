/* ===== INTERACTIONS, TAB NAVIGATION & PROJECT FILTERING ===== */

class Portfolio3D {
    constructor() {
        this.currentTab = 'profile';
        this.container = document.querySelector('.portfolio-3d-container');
        this.tabs = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');

        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.setupProjectFilters();
        this.initializeTypewriter();
        this.setupScrollProgress();
    }

    setupScrollProgress() {
        const scrollIndicator = document.getElementById('scrollIndicator');
        if (!scrollIndicator) return;

        const updateBar = (el) => {
            const scrollTop = el.scrollTop ?? (document.body.scrollTop || document.documentElement.scrollTop);
            const scrollHeight = (el.scrollHeight ?? document.documentElement.scrollHeight) - (el.clientHeight ?? document.documentElement.clientHeight);
            const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollIndicator.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
        };

        window.addEventListener('scroll', () => updateBar(document.documentElement), { passive: true });
        this.tabContents.forEach(content => {
            content.addEventListener('scroll', () => updateBar(content), { passive: true });
        });
    }

    setupTabNavigation() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.currentTarget.dataset.tab;
                if (tabName) {
                    this.switchTab(tabName);
                }
            });
        });
    }

    switchTab(tabName) {
        if (tabName === this.currentTab) return;

        this.tabs.forEach(tab => tab.classList.remove('active'));
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) activeTab.classList.add('active');

        const currentContent = document.querySelector(`#${this.currentTab}-tab`);
        const newContent = document.querySelector(`#${tabName}-tab`);

        if (currentContent) currentContent.classList.remove('active');
        if (newContent) {
            newContent.classList.add('active');
            newContent.scrollTop = 0;
        }

        const scrollIndicator = document.getElementById('scrollIndicator');
        if (scrollIndicator) scrollIndicator.style.width = '0%';

        this.currentTab = tabName;
    }

    setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card[data-category]');

        if (!filterBtns.length || !projectCards.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                projectCards.forEach(card => {
                    const categories = (card.dataset.category || '').split(' ');
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    initializeTypewriter() {
        const titles = [
            'Lead AI Engineer',
            'Voice AI & SIP/VoIP Architect',
            'Hybrid RAG & Agentic AI Lead',
            'LLM Evaluation & MLOps Lead',
            'Computer Vision & Robotics Engineer'
        ];

        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typewriterElement = document.querySelector('.typewriter-text');

        if (!typewriterElement) return;

        const type = () => {
            const currentTitle = titles[titleIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 85;

            if (!isDeleting && charIndex === currentTitle.length) {
                typeSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typeSpeed = 400;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Portfolio3D();
});
