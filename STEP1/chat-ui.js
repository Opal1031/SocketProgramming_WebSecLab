
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter')
    sendMessage();
});

function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg)
    return;
  
  // innerHTML 사용 (XSS 취약점 실습 목적)
  chatMessages.innerHTML += `<div>${msg}</div>`;
  chatInput.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
