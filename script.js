/* Modernized script: bilingual (EN/AR), mobile nav, scroll reveal, hero video handling.
   Sign-in/comments removed per your earlier request. */

const LANG = {
  en: {
    company_name: "ThreeWays Shipping Company",
    nav_home: "Home", nav_about: "About", nav_services: "Services", nav_why: "Why Us", nav_contact: "Contact",
    hero_title: "ThreeWays Shipping", hero_lead: "Fast. Secure. Global. We deliver packages and freight worldwide with transparent tracking, competitive pricing, and dedicated customer support.",
    btn_services: "Explore Services", btn_contact: "Request a Quote", btn_get_quote: "Get a Quote",
    about_title: "About ThreeWays Shipping", about_p: "ThreeWays is a full-service logistics provider combining global carrier agreements, proprietary routing algorithms, and hands-on customs expertise to make international shipping predictable and simple.",
    services_title: "Our Services",
    svc_air: "Air Freight", svc_sea: "Sea Freight", svc_ground: "Ground & Road Transport",
    contact_heading: "Contact Us", contact_info: "Phone: {phone} — Email: support@threeways.example",
    call_us: "Call us:"
  },
  ar: {
    company_name: "ThreeWays Shipping Company",
    nav_home: "الرئيسية", nav_about: "من نحن", nav_services: "خدماتنا", nav_why: "لماذا نحن", nav_contact: "اتصل بنا",
    hero_title: "ThreeWays شركة شحن", hero_lead: "سريع. آمن. عالمي. نوفر تتبعًا شفافًا، أسعار تنافسية، ودعمًا مخصصًا للعملاء.",
    btn_services: "استعرض الخدمات", btn_contact: "اطلب سعر", btn_get_quote: "احصل على عرض",
    about_title: "عن ThreeWays", about_p: "ThreeWays مزود خدمات لوجستية شامل يجمع بين اتفاقيات الناقلين العالمية وخبرة التخليص الجمركي لتبسيط الشحن الدولي.",
    services_title: "خدماتنا",
    svc_air: "الشحن الجوي", svc_sea: "الشحن البحري", svc_ground: "النقل البري",
    contact_heading: "اتصل بنا", contact_info: "الهاتف: {phone} — البريد: support@threeways.example",
    call_us: "اتصل بنا:"
  }
};

const SITE_PHONE = "+20 123 456 7890";
for (const k of Object.keys(LANG)) LANG[k].contact_info = LANG[k].contact_info.replace('{phone}', SITE_PHONE);

function $id(id){ return document.getElementById(id); }

function applyLanguage(lang){
  try {
    document.documentElement.lang = (lang === 'ar') ? 'ar' : 'en';
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    // toggle active buttons
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.id === 'lang-' + lang));
    // populate i18n nodes
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const key = node.getAttribute('data-i18n');
      if (LANG[lang] && LANG[lang][key]) node.textContent = LANG[lang][key];
    });
    // update phone placeholders
    $id('phone') && ($id('phone').textContent = SITE_PHONE);
    $id('contactPhone') && ($id('contactPhone').textContent = SITE_PHONE);
    localStorage.setItem('site_lang', lang);
  } catch(e){ console.warn(e); }
}

// reveal on scroll helper
function setupScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) ent.target.classList.add('sr-visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-sr]').forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    // language
    const enBtn = $id('lang-en'), arBtn = $id('lang-ar');
    enBtn && enBtn.addEventListener('click', () => applyLanguage('en'));
    arBtn && arBtn.addEventListener('click', () => applyLanguage('ar'));
    const savedLang = localStorage.getItem('site_lang') || (navigator.language && navigator.language.startsWith('ar') ? 'ar' : 'en');
    applyLanguage(savedLang);

    // mobile nav
    const navToggle = $id('navToggle'), nav = document.querySelector('.nav');
    if (navToggle && nav) {
      navToggle.addEventListener('click', (e) => {
        const open = nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(open));
      });
      document.addEventListener('click', (ev) => {
        if (!nav.contains(ev.target) && !navToggle.contains(ev.target)) {
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href.startsWith('#')) return;
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) { e.preventDefault(); el.scrollIntoView({behavior: 'smooth', block: 'start'}); }
        if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      });
    });

    // hero video: pause when off-screen
    (function heroVideo(){
      const v = $id('heroVideo'); if (!v) return;
      v.muted = true; v.playsInline = true; v.loop = true;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => en.isIntersecting ? v.play().catch(()=>{}) : v.pause());
      }, { threshold: 0.25 });
      io.observe(document.querySelector('.hero'));
    })();

    // scroll reveal
    setupScrollReveal();
  } catch(e){ console.warn('init error', e); }
});
