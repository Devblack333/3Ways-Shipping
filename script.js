document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Language switching
  const LANG = {
    en: { nav_home: "Home", nav_about: "About", nav_services: "Services", nav_contact: "Contact",
          hero_title: "Fast & Reliable Shipping Worldwide",
          hero_lead: "We deliver your goods safely and on time.",
          btn_services: "Explore Services",
          services_title: "Our Services",
          svc_sea: "Sea Freight", svc_air: "Air Freight", svc_ground: "Ground Transport",
          contact_info: "Phone: +20 123 456 7890 — Email: support@threeways.example" },
    ar: { nav_home: "الرئيسية", nav_about: "من نحن", nav_services: "خدماتنا", nav_contact: "اتصل بنا",
          hero_title: "شحن سريع وموثوق حول العالم",
          hero_lead: "نقوم بتوصيل بضائعك بأمان وفي الوقت المحدد.",
          btn_services: "استعرض الخدمات",
          services_title: "خدماتنا",
          svc_sea: "الشحن البحري", svc_air: "الشحن الجوي", svc_ground: "النقل البري",
          contact_info: "الهاتف: +20 123 456 7890 — البريد الإلكتروني: support@threeways.example" }
  };

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (LANG[lang][key]) el.textContent = LANG[lang][key];
    });
  }

  document.getElementById('lang-en').addEventListener('click', () => applyLang('en'));
  document.getElementById('lang-ar').addEventListener('click', () => applyLang('ar'));

  applyLang('en'); // default language
});
