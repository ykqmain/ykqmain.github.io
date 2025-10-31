// main.js (作为 ES Module 使用)

// PC 悬停显示，手机点击显示/隐藏
function setupEmailTooltips() {
    const emailLinks = document.querySelectorAll('a.email-tooltip');
    if (!emailLinks || emailLinks.length === 0) return;

    emailLinks.forEach(el => {
        el.addEventListener('click', e => {
            if (window.innerWidth < 768) { // 手机端
                e.preventDefault();
                el.classList.toggle('show-tooltip');

                const handleClickOutside = evt => {
                    if (!el.contains(evt.target)) {
                        el.classList.remove('show-tooltip');
                        document.removeEventListener('click', handleClickOutside);
                    }
                };
                document.addEventListener('click', handleClickOutside);
            }
        });
    });
}

function setupDiscordTooltips() {
    const discordLinks = document.querySelectorAll('a.discord');
    if (!discordLinks || discordLinks.length === 0) return;

    discordLinks.forEach(el => {
        el.addEventListener('click', e => {
            if (window.innerWidth < 768) { // 手机端
                e.preventDefault();
                el.classList.toggle('show-tooltip');

                // 点击其他地方关闭浮框
                const handleClickOutside = evt => {
                    if (!el.contains(evt.target)) {
                        el.classList.remove('show-tooltip');
                        document.removeEventListener('click', handleClickOutside);
                    }
                };
                document.addEventListener('click', handleClickOutside);
            }
        });
    });
}

// 动态加载「今日诗词」SDK
function loadJinrishici() {
    const el = document.getElementById('jinrishici-sentence');
    if (!el) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js';
    script.charset = 'utf-8';
    script.onload = () => {
        console.log('今日诗词 SDK 已加载');
    };
    script.onerror = () => {
        console.error('今日诗词 SDK 加载失败');
        el.textContent = '加载失败，请稍后再试。';
    };

    document.head.appendChild(script);
}

// 更新日期
function updateYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

function init() {
    setupEmailTooltips();
    setupDiscordTooltips();
    loadJinrishici();
    updateYear();
}

// ES Module 默认延迟执行，DOM 已就绪
init();
