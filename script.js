// Shared script for AllWays Shipping Company demo site
// Edit CONTACT defaults below or update via localStorage in the browser
const CONTACT = {"phone": "+20 123 456 7890", "whatsapp": "+201234567890", "facebook": "https://facebook.com/"};

// Apply contact links on page load
document.addEventListener('DOMContentLoaded', ()=>{
  try{
    const phoneEl = document.getElementById('phone');
    const wa = document.getElementById('wa');
    const fb = document.getElementById('fb');
    const tel = document.getElementById('tel');
    const waBtn = document.getElementById('waBtn');

    const phone = localStorage.getItem('site_phone') || CONTACT.phone;
    const whatsapp = localStorage.getItem('site_whatsapp') || CONTACT.whatsapp;
    const facebook = localStorage.getItem('site_facebook') || CONTACT.facebook;

    if(phoneEl) phoneEl.textContent = phone;
    if(wa) wa.href = 'https://wa.me/' + whatsapp.replace(/\D/g,'');
    if(fb) fb.href = facebook;
    if(tel) tel.href = 'tel:' + phone.replace(/\s/g,'');
    if(waBtn) waBtn.href = 'https://wa.me/' + whatsapp.replace(/\D/g,'');
  }catch(e){ console.warn(e); }

  // Initialize comment wall if on index.html
  try{
    const loginBox = document.getElementById('loginBox');
    const commentArea = document.getElementById('commentArea');
    const usernameInput = document.getElementById('username');
    const loginBtn = document.getElementById('loginBtn');
    const postBtn = document.getElementById('postBtn');
    const commentInput = document.getElementById('commentInput');
    const signOutBtn = document.getElementById('signOutBtn');
    const commentsList = document.getElementById('commentsList');

    if(!commentsList) return; // Not on home page

    let user = localStorage.getItem('aw_user') || null;
    let comments = JSON.parse(localStorage.getItem('aw_comments') || '[]');

    function escapeHtml(s){ return String(s).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }

    function renderComments(){
      if(!commentsList) return;
      commentsList.innerHTML = '';
      if(comments.length === 0){ commentsList.innerHTML = '<p class="muted">No comments yet — be the first!</p>'; return; }
      comments.slice().reverse().forEach(c=>{
        const div = document.createElement('div');
        div.className = 'comment';
        div.innerHTML = `<strong>${escapeHtml(c.name)}</strong><div style="margin-top:6px">${escapeHtml(c.text)}</div><div class='muted' style='font-size:12px;margin-top:6px'>Posted: ${new Date(c.created).toLocaleString()}</div>`;
        commentsList.appendChild(div);
      });
    }

    if(user){ loginBox.style.display='none'; commentArea.classList.remove('hidden'); }
    else{ commentArea.classList.add('hidden'); loginBox.style.display='block'; }

    loginBtn.addEventListener('click', ()=>{
      const name = usernameInput.value.trim();
      if(!name) return alert('Please enter your name to sign in.');
      localStorage.setItem('aw_user', name);
      user = name;
      loginBox.style.display='none';
      commentArea.classList.remove('hidden');
    });

    signOutBtn && signOutBtn.addEventListener('click', ()=>{
      localStorage.removeItem('aw_user');
      user = null;
      loginBox.style.display='block';
      commentArea.classList.add('hidden');
    });

    postBtn.addEventListener('click', ()=>{
      const text = commentInput.value.trim();
      if(!text) return alert('Please write a comment.');
      const newComment = { name: user, text, created: new Date().toISOString() };
      comments.push(newComment);
      localStorage.setItem('aw_comments', JSON.stringify(comments));
      commentInput.value = '';
      renderComments();
    });

    renderComments();
  }catch(e){ console.warn('comments init error', e); }
});

// Utility: developers can set contact info in browser console like:
// localStorage.setItem('site_phone','+20 111 222 3333'); location.reload();
