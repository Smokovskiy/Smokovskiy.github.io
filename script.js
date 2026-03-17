const translations = {
    ru: {
        role: "Telegram Гарант",
        subtitle: "Безопасные сделки | Комиссия 4%",
        channelsTitle: "Основные каналы",
        chan1: "Адаптер с ссылками",
        chan2: "Отзывы со сделок",
        chan3: "Где я гарант",
        chan4: "Новостной канал",
        commissionTitle: "Гарант сделок",
        commissionText: "Я выступаю гарантом между сторонами сделки. Оплата проходит через меня для безопасности обеих сторон.",
        commissionRate: "Комиссия — 4%",
        howItWorksTitle: "Как проходят сделки",
        steps: [
            "Договариваетесь о сделке",
            "Пишете гаранту Smokovskiy",
            "Покупатель переводит оплату",
            "Продавец передает товар",
            "Гарант выплачивает средства"
        ],
        paymentTitle: "Реквизиты для сделки",
        copy: "Копировать",
        copied: "Готово!",
        contactBtn: "Связаться с гарантом",
        switchLang: "English"
    },
    en: {
        role: "Telegram Guarantor",
        subtitle: "Safe Deals | Commission 4%",
        channelsTitle: "Main Channels",
        chan1: "Links Adapter",
        chan2: "Deal Reviews",
        chan3: "Verification",
        chan4: "News Channel",
        commissionTitle: "Guarantor",
        commissionText: "I act as a guarantor between the parties of the deal. Payment passes through me for safety.",
        commissionRate: "Commission — 4%",
        howItWorksTitle: "How it works",
        steps: [
            "Agree on the deal",
            "Message the guarantor",
            "Buyer sends payment",
            "Seller sends goods",
            "Guarantor pays seller"
        ],
        paymentTitle: "Payment Details",
        copy: "Copy",
        copied: "Done!",
        contactBtn: "Contact Guarantor",
        switchLang: "Русский"
    }
};

let currentLang = 'ru';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updateUI();
    animateEntrance();
    createFloatingIcons();
});

function updateUI() {
    const t = translations[currentLang];
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (t[key]) el.textContent = t[key];
    });

    const stepsContainer = document.getElementById('steps-container');
    stepsContainer.innerHTML = '';
    t.steps.forEach((step, i) => {
        const div = document.createElement('div');
        div.className = 'step-card';
        div.innerHTML = `<span class="step-num">${i + 1}</span><span>${step}</span>`;
        stepsContainer.appendChild(div);
    });
}

function toggleLang() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    updateUI();
}

function copyWallet() {
    const address = "UQA0SJengh1cb8MJ991gEF-FlpOC6Y3wn6vzkdMiHuO-mmwP";
    const btn = document.getElementById('copy-btn');
    const t = translations[currentLang];
    navigator.clipboard.writeText(address).then(() => {
        btn.textContent = t.copied;
        setTimeout(() => { btn.textContent = t.copy; }, 2000);
    });
}

// Летающие галочки
function createFloatingIcons() {
    const container = document.getElementById('floating-icons');
    const iconCount = 12;

    for (let i = 0; i < iconCount; i++) {
        const icon = document.createElement('div');
        icon.className = 'floating-icon';
        icon.innerHTML = '<i data-lucide="shield-check"></i>';
        
        // Случайная позиция
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = 15 + Math.random() * 30;
        
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
        icon.style.fontSize = `${size}px`;
        
        container.appendChild(icon);
        
        // Анимация GSAP
        gsap.to(icon, {
            x: "random(-100, 100)",
            y: "random(-100, 100)",
            rotation: "random(-360, 360)",
            duration: "random(10, 20)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
    lucide.createIcons();
}

function animateEntrance() {
    const tl = gsap.timeline();
    gsap.set('.hero-section, .link-item, .commission-box, .step-card, .wallet-section, .main-btn', { opacity: 0, y: 30 });

    tl.to('.hero-section', { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .to('.link-item', { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, "-=0.6")
      .to('.commission-box', { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .to('.step-card', { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.4")
      .to('.wallet-section, .main-btn', { opacity: 1, y: 0, duration: 0.8 }, "-=0.3");
}