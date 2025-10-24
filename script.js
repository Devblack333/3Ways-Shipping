// Language data and phone
const LANG = {
  en: {
    company_name: "ThreeWays Shipping Company",
    nav_home: "Home",
    nav_services: "Services",
    nav_why: "Why Us",
    nav_contact: "Contact",
    hero_title: "Fast & Reliable Shipping Worldwide",
    hero_lead: "We deliver your goods safely and on time.",
    btn_services: "Explore Services",
    services_title: "Our Services",
    contact_heading: "Contact Us",
    contact_info: "Phone: {phone} — Email: support@threeways.example",
  },
  ar: {
    company_name: "شركة الشحن ThreeWays",
    nav_home: "الرئيسية",
    nav_services: "خدماتنا",
    nav_why: "لماذا نحن",
    nav_contact: "اتصل بنا",
    hero_title: "شحن سريع وموثوق حول العالم",
    hero_lead: "نقوم بتوصيل بضائعك بأمان وفي الوقت المحدد.",
    btn_services: "استعرض الخدمات",
    services_title: "خدماتنا",
    contact_heading: "اتصل بنا",
    contact_info: "الهاتف: {phone} — البريد الإلكتروني: support@threeways.example",
  },
};

const SITE_PHONE = "+20 123 456 7890";
for (const key in LANG) {
  LANG[key].contact_info = LANG[key].contact_info.replace("{phone}", SITE_PHONE);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (LANG[lang] && LANG[lang][key]) el.textContent = LANG[lang][key];
  });
  localStorage.setItem("lang", lang);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang") || "en";
  applyLanguage(saved);

  document.getElementById("lang-en").onclick = () => applyLanguage("en");
  document.getElementById("lang-ar").onclick = () => applyLanguage("ar");

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const nav = document.querySelector(".nav");
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Scroll reveal
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("sr-visible");
    });
  });
  document.querySelectorAll("[data-sr]").forEach((el) => obs.observe(el));
});
