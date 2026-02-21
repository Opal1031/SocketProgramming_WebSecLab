import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  const sendMessage = () => {
    const msg = inputRef.current.value.trim();
    if (!msg) return;
    // dangerouslySetInnerHTML로 XSS 실습 가능
    setMessages([...messages, msg]);
    inputRef.current.value = '';
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} dangerouslySetInnerHTML={{ __html: msg }} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          ref={inputRef}
          placeholder="메시지를 입력하세요..."
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

export default App;
