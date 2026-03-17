const translations = {
    ru: {
        role: "Telegram Гарант",
        subtitle: "Безопасные сделки | Комиссия 4%",
        trustTitle: "Безопасность превыше всего",
        trustP1: "Smokovskiy — это не просто имя, это стандарт безопасности в Telegram. За годы работы проведено более 5000+ успешных сделок без единого неразрешенного спора.",
        stat1: "Сделок",
        stat2: "Выплат",
        trustP2: "Мы используем многоуровневую систему проверки активов и гарантируем сохранность средств до полного выполнения обязательств обеими сторонами.",
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
        trustTitle: "Security First",
        trustP1: "Smokovskiy is not just a name, it's a security standard in Telegram. Over 5000+ successful deals have been completed over the years.",
        stat1: "Deals",
        stat2: "Payouts",
        trustP2: "We use a multi-level asset verification system and guarantee the safety of funds until all obligations are met.",
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
    createFloatingElements();
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

// Парящие элементы (Авы + Галочки)
function createFloatingElements() {
    const container = document.getElementById('floating-container');
    
    // Создаем 6 аватарок и 8 галочек
    const configs = [
        { type: 'ava', count: 6 },
        { type: 'shield', count: 8 }
    ];

    configs.forEach(config => {
        for (let i = 0; i < config.count; i++) {
            const item = document.createElement('div');
            item.className = 'float-item';
            
            if (config.type === 'ava') {
                item.className += ' float-ava';
                item.innerHTML = `<img src="ava.png" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://picsum.photos/seed/${i}/100/100'">`;
                const size = 30 + Math.random() * 50;
                item.style.width = `${size}px`;
                item.style.height = `${size}px`;
            } else {
                item.innerHTML = '<i data-lucide="shield-check"></i>';
                item.style.fontSize = `${15 + Math.random() * 20}px`;
                item.style.color = 'rgba(59, 130, 246, 0.2)';
            }

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;

            container.appendChild(item);

            gsap.to(item, {
                x: "random(-150, 150)",
                y: "random(-150, 150)",
                rotation: "random(-360, 360)",
                duration: "random(15, 30)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    });
    lucide.createIcons();
}

function animateEntrance() {
    const tl = gsap.timeline();
    gsap.set('.hero-section, .trust-section, .link-item, .commission-box, .step-card, .wallet-section, .main-btn', { opacity: 0, y: 30 });

    tl.to('.hero-section', { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .to('.trust-section', { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .to('.link-item', { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, "-=0.6")
      .to('.commission-box', { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .to('.step-card', { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.4")
      .to('.wallet-section, .main-btn', { opacity: 1, y: 0, duration: 0.8 }, "-=0.3");
}