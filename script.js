const translations = {
    ru: {
        role: "Telegram Гарант",
        subtitle: "Безопасные сделки | Комиссия 4%",
        trustTitle: "Безопасность превыше всего",
        trustP1: "Smokovskiy — стандарт безопасности в Telegram. Проведено более 5000+ успешных сделок.",
        stat1: "Сделок",
        stat2: "Выплат",
        channelsTitle: "Основные каналы",
        chan1: "Адаптер с ссылками",
        chan2: "Отзывы со сделок",
        chan3: "Где я гарант",
        chan4: "Новостной канал",
        commissionTitle: "Гарант сделок",
        commissionText: "Я выступаю гарантом между сторонами сделки. Оплата проходит через меня.",
        commissionRate: "Комиссия — 4%",
        howItWorksTitle: "Как проходят сделки",
        steps: [
            "Договариваетесь о сделке",
            "Пишете гаранту Smokovskiy",
            "Покупатель переводит оплату",
            "Продавец передает товар",
            "Гарант выплачивает средства"
        ],
        paymentTitle: "Реквизиты",
        copy: "Copy",
        copied: "Done!",
        contactBtn: "Связаться с гарантом",
        switchLang: "English"
    },
    en: {
        role: "Telegram Guarantor",
        subtitle: "Safe Deals | Commission 4%",
        trustTitle: "Security First",
        trustP1: "Smokovskiy is the security standard in Telegram. 5000+ successful deals completed.",
        stat1: "Deals",
        stat2: "Payouts",
        channelsTitle: "Main Channels",
        chan1: "Links Adapter",
        chan2: "Deal Reviews",
        chan3: "Verification",
        chan4: "News Channel",
        commissionTitle: "Guarantor",
        commissionText: "I act as a guarantor between the parties of the deal. Payment passes through me.",
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

    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = t.switchLang;

    const stepsContainer = document.getElementById('steps-container');
    if (stepsContainer) {
        stepsContainer.innerHTML = '';
        t.steps.forEach((step, i) => {
            const div = document.createElement('div');
            div.className = 'step-card';
            div.innerHTML = `<span class="step-num">${i + 1}</span><span>${step}</span>`;
            stepsContainer.appendChild(div);
        });
    }
}

function toggleLang() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    
    gsap.to('.container-main', {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
            updateUI();
            gsap.to('.container-main', { opacity: 1, y: 0, duration: 0.4 });
        }
    });
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

function createFloatingElements() {
    const container = document.getElementById('floating-container');
    if (!container) return;

    // Создаем фоновые "световые пятна"
    for (let i = 0; i < 3; i++) {
        const blob = document.createElement('div');
        blob.className = 'bg-blob';
        blob.style.left = `${Math.random() * 100}%`;
        blob.style.top = `${Math.random() * 100}%`;
        container.appendChild(blob);

        gsap.to(blob, {
            x: "random(-200, 200)",
            y: "random(-200, 200)",
            duration: "random(20, 40)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    const configs = [
        { type: 'ava', count: 8 },
        { type: 'shield', count: 10 }
    ];

    configs.forEach(config => {
        for (let i = 0; i < config.count; i++) {
            const item = document.createElement('div');
            item.className = 'float-item';
            
            if (config.type === 'ava') {
                item.className += ' float-ava';
                item.innerHTML = `<img src="ava.png" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://picsum.photos/seed/${i + 10}/100/100'">`;
                const size = 20 + Math.random() * 30;
                item.style.width = `${size}px`;
                item.style.height = `${size}px`;
            } else {
                item.innerHTML = '<i data-lucide="shield-check"></i>';
                item.style.fontSize = `${10 + Math.random() * 12}px`;
                item.style.color = 'rgba(59, 130, 246, 0.2)';
            }

            item.style.left = `${Math.random() * 100}%`;
            item.style.top = `${Math.random() * 100}%`;
            container.appendChild(item);

            gsap.to(item, {
                x: "random(-150, 150)",
                y: "random(-150, 150)",
                rotation: "random(-720, 720)",
                duration: "random(20, 35)",
                repeat: -1,
                yoyo: true,
                ease: "none"
            });
        }
    });
    lucide.createIcons();
}

function animateEntrance() {
    const tl = gsap.timeline();
    gsap.set('.hero-section, .trust-section, .link-item, .commission-box, .step-card, .wallet-section, .main-btn', { opacity: 0, y: 20 });

    tl.to('.hero-section', { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to('.trust-section', { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .to('.link-item', { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, "-=0.4")
      .to('.commission-box', { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .to('.step-card', { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, "-=0.3")
      .to('.wallet-section, .main-btn', { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
}