/* Main script: language toggle, Google Sign-In, comments (localStorage) */

/* ---------- ORIGINAL CONSTANTS & LANG OBJECT (kept as-is) ---------- */
const CLIENT_ID = "588835745426-47dj5a40ukn58ohqpalbgc0m385c32ub.apps.googleusercontent.com";

const LANG = {
  en: {
    company_name: "AllWays Shipping Company",
    nav_home: "Home", nav_about: "About", nav_services: "Services", nav_contact: "Contact",
    hero_title: "AllWays Shipping Company", hero_lead: "Fast. Secure. Global. We deliver packages and freight across the world with reliable tracking and friendly service.",
    btn_services: "Our Services", btn_contact: "Contact Us",
    why_title: "Why Choose AllWays?", why_speed: "Speed", why_speed_p: "Quick deliveries and on-time performance.",
    why_security: "Security", why_security_p: "Insured shipping and real-time tracking.", why_global: "Global Reach", why_global_p: "Partnerships across continents for smooth delivery.",
    services_title: "Our Services", svc_air: "Air Freight", svc_air_p: "Fast international air shipping.", svc_sea: "Sea Freight", svc_sea_p: "Cost-efficient container shipping.", svc_ground: "Ground Delivery", svc_ground_p: "Local & last-mile delivery solutions.",
    comments_title: "Client Feedback", comments_lead: "Sign in with Google to post a comment. Recent comments are shown below.", btn_post: "Post Comment", btn_whatsapp: "Message on WhatsApp", btn_facebook: "Visit our Facebook",
    contact_heading: "Contact Us", contact_info: "Phone: {phone} — Email: support@allways.example", footer_text: "© AllWays Shipping Company — All rights reserved",
    about_title: "About AllWays Shipping Company", about_p: "We are a team of logistics professionals dedicated to safe and reliable shipments worldwide."
  },
  ar: {
    company_name: "AllWays Shipping Company",
    nav_home: "الرئيسية", nav_about: "من نحن", nav_services: "خدماتنا", nav_contact: "اتصل بنا",
    hero_title: "شركة الشحن AllWays", hero_lead: "سريع. آمن. عالمي. نوفر تتبعًا موثوقًا وخدمة ودودة لشحن الطرود والبضائع حول العالم.",
    btn_services: "خدماتنا", btn_contact: "اتصل بنا",
    why_title: "لماذا تختار AllWays؟", why_speed: "السرعة", why_speed_p: "توصيل سريع وموعد دقيق.",
    why_security: "الأمان", why_security_p: "تأمين الشحن وتتبع فوري.", why_global: "تغطية عالمية", why_global_p: "شراكات عبر القارات لتوصيل سلس.",
    services_title: "خدماتنا", svc_air: "الشحن الجوي", svc_air_p: "شحن جوي دولي سريع.", svc_sea: "الشحن البحري", svc_sea_p: "شحن حاويات اقتصادي.", svc_ground: "التوصيل البري", svc_ground_p: "حلول التوزيع المحلي.",
    comments_title: "آراء العملاء", comments_lead: "سجّل لتستطيع نشر تعليق. أحدث التعليقات تظهر أدناه.", btn_post: "انشر", btn_whatsapp: "مراسلة عبر واتساب", btn_facebook: "صفحتنا على فيسبوك",
    contact_heading: "اتصل بنا", contact_info: "الهاتف: {phone} — البريد: support@allways.example", footer_text: "© AllWays Shipping Company — جميع الحقوق محفوظة",
    about_title: "عن شركة AllWays", about_p: "نحن فريق من المختصين في الخدمات اللوجستية نعمل على شحن آمن وموثوق عبر العالم."
  }
};

// inject phone
const SITE_PHONE = "+20 123 456 7890";
LANG.en.contact_info = LANG.en.contact_info.replace("{phone}", SITE_PHONE);
LANG.ar.contact_info = LANG.ar.contact_info.replace("{phone}", SITE_PHONE);

/* ---------- utility helpers & original functions (kept & reused) ---------- */

// JS-safe getter
function $id(id) { return document.getElementById(id); }

/* apply language */
function applyLanguage(lang) {
  try {
    document.documentElement.lang = (lang === 'ar') ? 'ar' : 'en';
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    const enBtn = $id('lang-en');
    const arBtn = $id('lang-ar');
    if (enBtn && arBtn) { enBtn.classList.toggle('active', lang === 'en'); arBtn.classList.toggle('active', lang === 'ar'); }
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const key = node.getAttribute('data-i18n');
      if (LANG[lang] && LANG[lang][key]) node.textContent = LANG[lang][key];
    });
    localStorage.setItem('site_lang', lang);
  } catch (e) { console.warn(e); }
}

/* JWT parse (original) */
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

/* handle credential (original) */
function handleCredentialResponse(response) {
  try {
    const payload = parseJwt(response.credential);
    const user = { name: payload.name, email: payload.email, picture: payload.picture };
    localStorage.setItem('aw_user', JSON.stringify(user));
    updateUserUI(user);
  } catch (e) { console.error(e); }
}

/* update user UI (original) */
function updateUserUI(user) {
  try {
    if (!user) { $id('userBadge') && $id('userBadge').classList.add('hidden'); $id('gsiButton') && $id('gsiButton').classList.remove('hidden'); return; }
    $id('gsiButton') && $id('gsiButton').classList.add('hidden');
    if ($id('userPic') && user.picture) $id('userPic').src = user.picture;
    if ($id('userName')) $id('userName').textContent = user.name;
    $id('userBadge') && $id('userBadge').classList.remove('hidden');
  } catch (e) { console.warn(e); }
}

/* signOut (original) */
function signOut() {
  localStorage.removeItem('aw_user');
  $id('userBadge') && $id('userBadge').classList.add('hidden');
  $id('gsiButton') && $id('gsiButton').classList.remove('hidden');
}

/* parse/escape */
function escapeHtml(s) { return String(s).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

/* ---------- initialization & glue (improvements added) ---------- */

document.addEventListener('DOMContentLoaded', () => {
  try {
    // language buttons
    const enBtn = $id('lang-en'), arBtn = $id('lang-ar');
    if (enBtn) enBtn.addEventListener('click', () => applyLanguage('en'));
    if (arBtn) arBtn.addEventListener('click', () => applyLanguage('ar'));
    const savedLang = localStorage.getItem('site_lang') || 'en';
    applyLanguage(savedLang);

    // mobile nav toggle
    const navToggle = $id('navToggle');
    const nav = document.querySelector('.nav');
    if (navToggle && nav) {
      navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
      });

      // close nav when clicking outside
      document.addEventListener('click', (ev) => {
        if (!nav.contains(ev.target) && !navToggle.contains(ev.target)) {
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // smooth scroll for nav links
    document.querySelectorAll('.nav a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav after click
        if (nav && nav.classList.contains('open')) { nav.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); }
      });
    });

    // Google Sign-In init will run on window.onload (keeps original behavior)
    // But restore saved user immediately if present
    const savedUser = localStorage.getItem('aw_user');
    if (savedUser) {
      try { updateUserUI(JSON.parse(savedUser)); } catch (e) { console.warn(e); }
    }

    // sign out listener (delegated)
    document.addEventListener('click', (e) => { if (e.target && e.target.id === 'signOut') signOut(); });

    /* ---------- Comments system (original logic consolidated) ---------- */
    const postBtn = $id('postBtn'), cInput = $id('commentInput'), cList = $id('commentsList'), clearBtn = $id('clearBtn');
    if (cList) {
      let comments = JSON.parse(localStorage.getItem('aw_comments') || '[]');

      function renderComments() {
        cList.innerHTML = '';
        if (comments.length === 0) { cList.innerHTML = '<p class="muted">No comments yet — be the first!</p>'; return; }
        comments.slice().reverse().forEach(c => {
          const div = document.createElement('div'); div.className = 'comment';
          div.innerHTML = '<strong>' + escapeHtml(c.name) + '</strong><div style="margin-top:6px">' + escapeHtml(c.text) + '</div><div class="muted" style="font-size:12px;margin-top:6px">' + new Date(c.created).toLocaleString() + '</div>';
          cList.appendChild(div);
        });
      }

      renderComments();

      if (postBtn) postBtn.addEventListener('click', () => {
        const user = JSON.parse(localStorage.getItem('aw_user') || 'null');
        if (!user) return alert('Please sign in with Google to post a comment.');
        const text = cInput.value.trim(); if (!text) return alert('Please write a comment.');
        const newC = { name: user.name, text, created: new Date().toISOString() };
        comments.push(newC); localStorage.setItem('aw_comments', JSON.stringify(comments)); cInput.value = ''; renderComments();
        // smooth scroll to top of comments after posting
        cList.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      if (clearBtn) clearBtn.addEventListener('click', () => { if (confirm('Clear all local comments?')) { comments = []; localStorage.removeItem('aw_comments'); renderComments(); } });
    }
  } catch (e) { console.warn('init error', e); }
});

/* ---------- Google Sign-In initialization (kept original with minor safety) ---------- */
window.onload = function() {
  try {
    if (window.google && google.accounts && google.accounts.id) {
      google.accounts.id.initialize({ client_id: CLIENT_ID, callback: handleCredentialResponse });
      const gsiEl = document.getElementById('gsiButton');
      if (gsiEl) google.accounts.id.renderButton(gsiEl, { theme: 'outline', size: 'medium', text: 'signin_with' });
    }
    const saved = localStorage.getItem('aw_user');
    if (saved) updateUserUI(JSON.parse(saved));
  } catch (e) { console.warn('GSI init error', e); }
};

/* ---------- misc: hero video safe controls ---------- */
(function heroVideoEnhancements(){
  try {
    const v = document.getElementById('heroVideo');
    if (!v) return;
    // Ensure autoplay on mobile (muted & playsinline)
    v.muted = true;
    v.playsInline = true;
    v.autoplay = true;
    v.loop = true;

    // Provide fallback poster color if video fails
    v.addEventListener('error', () => {
      v.style.display = 'none';
      const hero = document.querySelector('.hero');
      if (hero) hero.style.backgroundImage = 'linear-gradient(180deg, rgba(3,86,182,0.12), rgba(255,255,255,0.6))';
    });

    // Pause video when not visible (save CPU/battery)
    const io = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          try { v.play().catch(()=>{}); } catch(_) {}
        } else {
          try { v.pause(); } catch(_) {}
        }
      });
    }, { threshold: 0.2 });
    io.observe(document.querySelector('.hero'));
  } catch(e){/*noop*/ }
})();
