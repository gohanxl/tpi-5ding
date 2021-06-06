import React, { useEffect, useRef } from "react";
import { ChatMessage } from "../ChatMessage/ChatMessage.component";
import "../../ChatWindow.styles.scss";

export const ChatScreen = ({ messages }) => {
  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat_wrapper" id="message_container">
      {messages &&
        messages.map(({ content, user, mid, time }) => (
          <ChatMessage
            key={mid}
            user={user}
            content={content}
            mid={mid}
            time={time}
          />
        ))}
      <div ref={bottomRef} className="list-bottom"></div>
    </div>
  );
};
