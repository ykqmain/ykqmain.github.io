// main.js (作为 ES Module 使用)

// 更新日期
function updateYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

// 动态加载「今日诗词」SDK
function loadJinrishici() {
    const script = document.createElement('script');
    script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js';
    script.charset = 'utf-8';
    script.onload = () => {
        console.log('今日诗词 SDK 已加载');
        // SDK 会自动将诗词填充到 #jinrishici-sentence
    };
    document.head.appendChild(script);
}

// PC 悬停显示，手机点击显示
function setupDiscordTooltips() {
    const discordLinks = document.querySelectorAll('a.discord');
    if (!discordLinks || discordLinks.length === 0) return;

    discordLinks.forEach(el => {
        el.addEventListener('click', e => {
            if (window.innerWidth < 768) { // 手机端行为
                e.preventDefault();
                el.classList.toggle('show-tooltip');
            }
        });
    });
}

function init() {
    updateYear();
    loadJinrishici();
    setupDiscordTooltips();
}

// document.addEventListener("DOMContentLoaded", init);
// ES Module 默认延迟执行，DOM 已就绪
init();
