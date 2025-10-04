// main.js (作为 ES Module 使用)

// 更新日期
function updateYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}


// 动态加载「今日诗词」SDK
function isSafari() {
    const ua = navigator.userAgent;
    return /Safari/.test(ua) && !/Chrome|Chromium|Edg/.test(ua);
}

function loadJinrishiciAPI(el) {
    if (!el) return;
    const cacheKey = 'jinrishici_today';
    const cacheTimeKey = 'jinrishici_time';
    const now = Date.now();

    // 检查缓存（1小时）
    const cached = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);
    if (cached && cachedTime && now - cachedTime < 3600_000) {
        el.textContent = cached;
        return;
    }

    // 请求 API
    fetch('https://v2.jinrishici.com/one.json')
        .then(res => res.json())
        .then(data => {
            const text = data?.data?.content || '加载失败，请稍后重试';
            el.textContent = text;
            localStorage.setItem(cacheKey, text);
            localStorage.setItem(cacheTimeKey, now);
        })
        .catch(err => {
            console.error('今日诗词 API 加载失败:', err);
            el.textContent = '加载失败，请稍后重试';
        });
}

function loadJinrishici() {
    const el = document.getElementById('jinrishici-sentence');
    if (!el) return;

    if (isSafari()) {
        console.log('检测到 Safari，使用 API 方式加载诗词');
        loadJinrishiciAPI(el);
        return;
    }

    // 非 Safari，尝试加载 SDK
    const script = document.createElement('script');
    script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js';
    script.charset = 'utf-8';
    script.onload = () => console.log('今日诗词 SDK 已加载');
    script.onerror = () => {
        console.warn('SDK 加载失败，使用 API 方式');
        loadJinrishiciAPI(el);
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
