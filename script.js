let currentLang = 'ru';

const translations = {
    ru: {
        role: "Telegram Гарант",
        subtitle: "Безопасные сделки | Комиссия 4%",
        trustTitle: "Кто такой гарант?",
        trustP1: "Гарант — это физическое лицо, компания или организация, которые официально подтверждают выполнение обязательств одной стороны перед другой. Проведено более 200+ успешных сделок.",
        stat1: "Сделок",
        stat2: "Выплат",
        channelsTitle: "Навигация",
        chan1: "Новостной канал",
        chan2: "Адаптер",
        chan3: "Отзывы",
        chanRuch: "Ручения",
        chan4: "Личный контакт",
        commissionTitle: "Гарант сделок",
        commissionText: "Безопасность ваших активов — мой главный приоритет. Работаю честно и быстро.",
        commissionRate: "Комиссия — 4%",
        howItWorksTitle: "Как проходят сделки",
        steps: [
            "Договариваетесь о сделке",
            "Пишете гаранту @Smokovskiy",
            "Покупатель переводит оплату",
            "Продавец передает товар",
            "Гарант выплачивает средства"
        ],
        paymentTitle: "Кошелек",
        copy: "Copy",
        copied: "Done!",
        contactBtn: "Связаться с @Smokovskiy",
        switchLang: "English"
    },
    en: {
        role: "Telegram Guarantor",
        subtitle: "Safe Deals | Commission 4%",
        trustTitle: "What is a guarantor?",
        trustP1: "A guarantor is an individual or organization that officially confirms the fulfillment of obligations. 200+ successful deals completed.",
        stat1: "Deals",
        stat2: "Payouts",
        channelsTitle: "Navigation",
        chan1: "News Channel",
        chan2: "Adapter",
        chan3: "Reviews",
        chanRuch: "Ruch",
        chan4: "Personal Contact",
        commissionTitle: "Guarantor",
        commissionText: "The security of your assets is my top priority. I work honestly and quickly.",
        commissionRate: "Commission — 4%",
        howItWorksTitle: "How it works",
        steps: [
            "Agree on the deal",
            "Message @Smokovskiy",
            "Buyer sends payment",
            "Seller sends goods",
            "Guarantor pays seller"
        ],
        paymentTitle: "Wallet",
        copy: "Copy",
        copied: "Done!",
        contactBtn: "Contact @Smokovskiy",
        switchLang: "Русский"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updateUI();
    animateEntrance();
    createFloatingElements();
    initMagneticEffect();
    animateStats();
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

function animateStats() {
    const stats = document.querySelectorAll('.stat-card p.text-blue-500');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        if (isNaN(target)) return;
        const obj = { val: 0 };
        gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                stat.textContent = Math.floor(obj.val) + (stat.textContent.includes('+') ? '+' : (stat.textContent.includes('%') ? '%' : ''));
            }
        });
    });
}

function initMagneticEffect() {
    const elements = document.querySelectorAll('.border-segments, .main-btn, .lang-toggle');
    elements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, {
                x: x * 0.15,
                y: y * 0.15,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

function toggleLang() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    gsap.to('.container-main', {
        opacity: 0,
        scale: 0.98,
        duration: 0.2,
        onComplete: () => {
            updateUI();
            gsap.to('.container-main', { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" });
        }
    });
}

function copyWallet() {
    const address = "Smokovskiy-deals.ton";
    const btn = document.getElementById('copy-btn');
    const t = translations[currentLang];
    navigator.clipboard.writeText(address).then(() => {
        btn.textContent = t.copied;
        gsap.from(btn, { scale: 1.2, duration: 0.3, ease: "back.out" });
        setTimeout(() => { btn.textContent = t.copy; }, 2000);
    });
}

function createFloatingElements() {
    const container = document.getElementById('floating-container');
    if (!container) return;
    for (let i = 0; i < 4; i++) {
        const blob = document.createElement('div');
        blob.className = 'bg-blob';
        blob.style.left = `${Math.random() * 100}%`;
        blob.style.top = `${Math.random() * 100}%`;
        container.appendChild(blob);
        gsap.to(blob, {
            x: "random(-300, 300)",
            y: "random(-300, 300)",
            scale: "random(0.8, 1.5)",
            duration: "random(15, 30)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
    const configs = [
        { type: 'ava', count: 12 },
        { type: 'shield', count: 15 }
    ];
    configs.forEach(config => {
        for (let i = 0; i < config.count; i++) {
            const item = document.createElement('div');
            item.className = 'float-item';
            if (config.type === 'ava') {
                item.className += ' float-ava';
                item.innerHTML = `<img src="ava.png" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://picsum.photos/seed/${i + 100}/100/100'">`;
                const size = 15 + Math.random() * 35;
                item.style.width = `${size}px`;
                item.style.height = `${size}px`;
            } else {
                item.innerHTML = '<i data-lucide="shield-check"></i>';
                item.style.fontSize = `${8 + Math.random() * 15}px`;
                item.style.color = 'rgba(59, 130, 246, 0.3)';
            }
            item.style.left = `${Math.random() * 100}%`;
            item.style.top = `${Math.random() * 100}%`;
            container.appendChild(item);
            gsap.to(item, {
                x: "random(-200, 200)",
                y: "random(-200, 200)",
                rotation: "random(-360, 360)",
                opacity: "random(0.05, 0.2)",
                duration: "random(15, 40)",
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
    gsap.set('.hero-section, .trust-section, .link-item, .commission-box, .step-card, .wallet-section, .main-btn', { 
        opacity: 0, 
        y: 30,
        filter: "blur(10px)"
    });
    tl.to('.hero-section', { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power4.out" })
      .to('.trust-section', { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, "-=0.6")
      .to('.link-item', { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.1, duration: 0.6, ease: "back.out(1.2)" }, "-=0.4")
      .to('.commission-box', { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, "-=0.4")
      .to('.step-card', { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.1, duration: 0.5 }, "-=0.4")
      .to('.wallet-section, .main-btn', { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, "-=0.3");
}