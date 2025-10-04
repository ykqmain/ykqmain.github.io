// main.js (作为 ES Module 使用)

// 更新日期
function updateYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

// 动态加载「今日诗词」SDK
function loadJinrishici() {
    const el = document.getElementById('jinrishici-sentence');
    const script = document.createElement('script');
    script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js';
    script.charset = 'utf-8';
    // SDK 会自动将诗词填充到 #jinrishici-sentence
    script.onload = () => console.log('今日诗词 SDK 已加载');
    // Safari 会拦截 “Cloudflare Analytics” 脚本
    script.onerror = () => {
        console.warn('Safari 可能拦截了 SDK，尝试使用 API 方式。');
        fetch('https://v2.jinrishici.com/one.json')
            .then(res => res.json())
            .then(data => {
                const el = document.getElementById('jinrishici-sentence');
                if (el && data?.data?.content) el.textContent = data.data.content;
            })
            .catch(err => console.error('API 请求失败:', err));
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
