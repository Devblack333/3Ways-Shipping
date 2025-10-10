const loginBox = document.getElementById("loginBox");
const commentBox = document.getElementById("commentBox");
const commentsList = document.getElementById("commentsList");
const usernameInput = document.getElementById("username");
const loginBtn = document.getElementById("loginBtn");
const postBtn = document.getElementById("postBtn");
const commentInput = document.getElementById("commentInput");
const phoneEl = document.getElementById('phone');
const wa = document.getElementById('wa');
const fb = document.getElementById('fb');
const tel = document.getElementById('tel');

const CONTACT = {
  phone: localStorage.getItem('site_phone') || '+20 123 456 7890',
  whatsapp: localStorage.getItem('site_whatsapp') || '+201234567890',
  facebook: localStorage.getItem('site_facebook') || 'https://facebook.com/globalship'
};
phoneEl.textContent = CONTACT.phone;
wa.href = 'https://wa.me/' + CONTACT.whatsapp.replace(/\D/g,'');
fb.href = CONTACT.facebook;
tel.href = 'tel:' + CONTACT.phone.replace(/\s/g,'');

let user = localStorage.getItem("user");
let comments = JSON.parse(localStorage.getItem("comments") || "[]");

function renderComments() {
  commentsList.innerHTML = "";
  if(comments.length === 0){ commentsList.innerHTML = '<p>No comments yet.</p>'; return; }
  comments.slice().reverse().forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `<strong>${c.name}</strong><div>${c.text}</div>`;
    commentsList.appendChild(div);
  });
}

if (user) {
  loginBox.classList.add("hidden");
  commentBox.classList.remove("hidden");
}

loginBtn.onclick = () => {
  const name = usernameInput.value.trim();
  if (!name) return alert("Please enter your name.");
  localStorage.setItem("user", name);
  loginBox.classList.add("hidden");
  commentBox.classList.remove("hidden");
  user = name;
};

postBtn.onclick = () => {
  const text = commentInput.value.trim();
  if (!text) return alert("Please write a comment.");
  comments.push({ name: user, text });
  localStorage.setItem("comments", JSON.stringify(comments));
  commentInput.value = "";
  renderComments();
};

renderComments();
