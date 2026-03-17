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
    // Сначала создаем иконки
    lucide.createIcons();
    // Обновляем текст
    updateUI();
    // Запускаем анимацию
    animateEntrance();
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

function animateEntrance() {
    const tl = gsap.timeline();

    // Плавное проявление всех элементов
    tl.to('.hero-section', { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to('.link-item', { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to('.commission-box', { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" }, "-=0.3")
      .to('.step-card', { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }, "-=0.3")
      .to('.wallet-section, .main-btn', { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
}