/* Enhanced bilingual site script: EN/AR support, mobile nav, smooth scroll, hero video logic, scroll reveal */

const LANG = {
  en: {
    company_name: "ThreeWays Shipping Company",
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_why: "Why Us",
    nav_contact: "Contact",
    hero_title: "ThreeWays Shipping",
    hero_lead:
      "Fast. Secure. Global. We deliver packages and freight worldwide with transparent tracking, competitive pricing, and dedicated customer support.",
    btn_services: "Explore Services",
    btn_contact: "Request a Quote",
    btn_get_quote: "Get a Quote",
    about_title: "About ThreeWays Shipping",
    about_p:
      "ThreeWays is a full-service logistics provider combining global carrier agreements, proprietary routing algorithms, and hands-on customs expertise to make international shipping predictable and simple.",
    services_title: "Our Services",
    svc_air: "Air Freight",
    svc_sea: "Sea Freight",
    svc_ground: "Ground & Road Transport",
    contact_heading: "Contact Us",
    contact_info: "Phone: {phone} — Email: support@threeways.example",
    call_us: "Call us:",
  },
  ar: {
    company_name: "شركة الشحن ThreeWays",
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "خدماتنا",
    nav_why: "لماذا نحن",
    nav_contact: "اتصل بنا",
    hero_title: "شركة الشحن ThreeWays",
    hero_lead:
      "سريع. آمن. عالمي. نوفر تتبعًا شفافًا، أسعار تنافسية، ودعمًا مخصصًا للعملاء.",
    btn_services: "استعرض الخدمات",
    btn_contact: "اطلب عرض سعر",
    btn_get_quote: "احصل على عرض",
    about_title: "عن شركة ThreeWays",
    about_p:
      "ThreeWays مزود خدمات لوجستية شامل يجمع بين اتفاقيات النقل العالمية وخبرة التخليص الجمركي لتبسيط عمليات الشحن الدولي.",
    services_title: "خدماتنا",
    svc_air: "الشحن الجوي",
    svc_sea: "الشحن البحري",
    svc_ground: "النقل البري",
    contact_heading: "اتصل بنا",
    contact_info: "الهاتف: {phone} — البريد: support@threeways.example",
    call_us: "اتصل بنا:",
  },
};

// phone placeholder
const SITE_PHONE = "+20 123 456 7890";
Object.keys(LANG).forEach((k) => {
  LANG[k].contact_info = LANG[k].contact_info.replace("{phone}", SITE_PHONE);
});

function $id(id) {
  return document.getElementById(id);
}

function applyLanguage(lang) {
  try {
    const l = lang === "ar" ? "ar" : "en";
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";

    document
      .querySelectorAll(".lang-btn")
      .forEach((b) => b.classList.toggle("active", b.id === "lang-" + l));

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      if (LANG[l] && LANG[l][key]) node.textContent = LANG[l][key];
    });

    const phoneEls = [$id("phone"), $id("contactPhone")].filter(Boolean);
    phoneEls.forEach((el) => (el.textContent = SITE_PHONE));

    localStorage.setItem("site_lang", l);
  } catch (err) {
    console.warn("Language error:", err);
  }
}

function setupScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("sr-visible");
          observer.unobserve(e.target);
        }
      }
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll("[data-sr]").forEach((el) => observer.observe(el));
}

function setupMobileNav() {
  const navToggle = $id("navToggle");
  const nav = document.querySelector(".nav");
  if (!navToggle || !nav) return;

  let locked = false;
  navToggle.addEventListener("click", (e) => {
    if (locked) return;
    locked = true;
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open);
    setTimeout(() => (locked = false), 250);
  });

  document.addEventListener("click", (ev) => {
    if (!nav.contains(ev.target) && !navToggle.contains(ev.target)) {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelector(".nav")?.classList.remove("open");
      }
    });
  });
}

function setupHeroVideo() {
  const video = $id("heroVideo");
  if (!video) return;
  video.muted = true;
  video.playsInline = true;
  video.loop = true;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(video);
}

// init
document.addEventListener("DOMContentLoaded", () => {
  const enBtn = $id("lang-en");
  const arBtn = $id("lang-ar");
  if (enBtn) enBtn.addEventListener("click", () => applyLanguage("en"));
  if (arBtn) arBtn.addEventListener("click", () => applyLanguage("ar"));

  const saved =
    localStorage.getItem("site_lang") ||
    (navigator.language?.startsWith("ar") ? "ar" : "en");
  applyLanguage(saved);

  setupMobileNav();
  setupSmoothScroll();
  setupHeroVideo();
  setupScrollReveal();
});
