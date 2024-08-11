import React, { useEffect } from "react";
import "./ChatBoard.css";
import { useRef } from "react";

const ChatBoard = ({ messages }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="chat-board-container">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <b>[{msg.nickname}]</b>: {msg.message}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatBoard;
