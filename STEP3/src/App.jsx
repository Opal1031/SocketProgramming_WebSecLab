import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';

function App() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const socketRef = useRef();

  // 서버에서 기존 메시지 불러오기
  useEffect(() => {
    fetch('http://localhost:5000/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  // 소켓 연결 및 이벤트 핸들러 등록
  useEffect(() => {
    socketRef.current = io('http://localhost:5000');
    socketRef.current.on('new_message', msg => {
      setMessages(prev => [...prev, msg]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const msg = inputRef.current.value.trim();
    if (!msg) return;
    // 서버에 메시지 전송 (REST + 소켓)
    fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg })
    });
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