// Данные переводов
const translations = {
    ru: {
        role: "Telegram Гарант",
        subtitle: "Безопасные сделки | Комиссия 4%",
        channelsTitle: "Основные каналы",
        chan1: "Адаптер с ссылками",
        chan2: "Отзывы со сделок",
        chan3: "Где я гарант",
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

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updateUI();
    animateEntrance();
});

// Обновление интерфейса
function updateUI() {
    const t = translations[currentLang];
    
    // Текстовые элементы
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (t[key]) el.textContent = t[key];
    });

    // Отрисовка шагов
    const stepsContainer = document.getElementById('steps-container');
    stepsContainer.innerHTML = '';
    t.steps.forEach((step, i) => {
        const div = document.createElement('div');
        div.className = 'step-card';
        div.innerHTML = `<span class="step-num">${i + 1}</span><span>${step}</span>`;
        stepsContainer.appendChild(div);
    });
}

// Переключение языка
function toggleLang() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    document.body.className = `lang-${currentLang}`;
    
    // Плавная смена контента
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

// Копирование кошелька
function copyWallet() {
    const address = "UQA0SJengh1cb8MJ991gEF-FlpOC6Y3wn6vzkdMiHuO-mmwP";
    const btn = document.getElementById('copy-btn');
    const t = translations[currentLang];

    navigator.clipboard.writeText(address).then(() => {
        btn.textContent = t.copied;
        btn.style.color = '#10b981'; // Зеленый
        setTimeout(() => {
            btn.textContent = t.copy;
            btn.style.color = '#3b82f6';
        }, 2000);
    });
}

// Анимация появления
function animateEntrance() {
    const tl = gsap.timeline();

    tl.from('.avatar-wrapper', { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(1.7)" })
      .from('.title', { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
      .from('.badge-row, .subtitle', { y: 10, opacity: 0, duration: 0.5 }, "-=0.3")
      .from('.link-item', { x: -20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.2")
      .from('.commission-box', { scale: 0.9, opacity: 0, duration: 0.6 }, "-=0.2")
      .from('.step-card', { y: 20, opacity: 0, stagger: 0.1, duration: 0.4 }, "-=0.3")
      .from('.wallet-section, .main-btn', { y: 30, opacity: 0, duration: 0.6 }, "-=0.2");
}
