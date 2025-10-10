
// Arabic AllWays site script with comments using localStorage and contact links (Unsplash images used)
const CONTACT = {
  phone: "+20 123 456 7890",
  whatsapp: "+201234567890",
  facebook: "https://facebook.com/"
};

function applyContacts(){
  try{
    const phoneEl = document.getElementById('phone');
    const waEls = document.querySelectorAll('#wa, #waBtn');
    const fbEls = document.querySelectorAll('#fb, #fbBtn');
    const telEls = document.querySelectorAll('#tel');
    const phone = localStorage.getItem('site_phone') || CONTACT.phone;
    const whatsapp = localStorage.getItem('site_whatsapp') || CONTACT.whatsapp;
    const facebook = localStorage.getItem('site_facebook') || CONTACT.facebook;
    if(phoneEl) phoneEl.textContent = phone;
    waEls.forEach(e=>e.href = 'https://wa.me/' + whatsapp.replace(/\D/g,''));
    fbEls.forEach(e=>e.href = facebook);
    telEls.forEach(e=>e.href = 'tel:' + phone.replace(/\s/g,''));
  }catch(e){
    console.warn(e);
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  applyContacts();

  // Comment wall on index
  try{
    const loginBox = document.getElementById('loginBox');
    const commentArea = document.getElementById('commentArea');
    const usernameInput = document.getElementById('username');
    const loginBtn = document.getElementById('loginBtn');
    const postBtn = document.getElementById('postBtn');
    const commentInput = document.getElementById('commentInput');
    const signOutBtn = document.getElementById('signOutBtn');
    const commentsList = document.getElementById('commentsList');
    if(!commentsList) return; // not on home

    let user = localStorage.getItem('aw_ar_user') || null;
    let comments = JSON.parse(localStorage.getItem('aw_ar_comments') || '[]');

    function escapeHtml(s){ return String(s).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }
    function renderComments(){
      commentsList.innerHTML = '';
      if(comments.length === 0){ commentsList.innerHTML = '<p class="muted">لا توجد تعليقات بعد — كن الأول!</p>'; return; }
      // show few comments and allow scroll (comments container is scrollable)
      comments.slice().reverse().forEach(c=>{
        const div = document.createElement('div');
        div.className = 'comment';
        div.innerHTML = `<strong>${escapeHtml(c.name)}</strong><div style="margin-top:6px">${escapeHtml(c.text)}</div><div class='muted' style='font-size:12px;margin-top:6px'>${new Date(c.created).toLocaleString()}</div>`;
        commentsList.appendChild(div);
      });
    }

    if(user){ loginBox.style.display='none'; commentArea.classList.remove('hidden'); }
    else{ commentArea.classList.add('hidden'); loginBox.style.display='block'; }

    loginBtn && loginBtn.addEventListener('click', ()=>{
      const name = usernameInput.value.trim();
      if(!name) return alert('الرجاء إدخال اسمك للتسجيل.');
      localStorage.setItem('aw_ar_user', name);
      user = name;
      loginBox.style.display='none';
      commentArea.classList.remove('hidden');
    });

    signOutBtn && signOutBtn.addEventListener('click', ()=>{
      localStorage.removeItem('aw_ar_user');
      user = null;
      loginBox.style.display='block';
      commentArea.classList.add('hidden');
    });

    postBtn && postBtn.addEventListener('click', ()=>{
      const text = commentInput.value.trim();
      if(!text) return alert('الرجاء كتابة تعليق.');
      const newComment = { name: user, text, created: new Date().toISOString() };
      comments.push(newComment);
      localStorage.setItem('aw_ar_comments', JSON.stringify(comments));
      commentInput.value = '';
      renderComments();
    });

    renderComments();
  }catch(e){ console.warn('comments init error', e); }

});

function doModalLogin(){
  const name = document.getElementById('modalName').value.trim();
  if(!name) return alert('الرجاء إدخال الاسم');
  localStorage.setItem('aw_ar_user', name);
  document.getElementById('loginModal').classList.add('hidden');
  location.reload();
}
