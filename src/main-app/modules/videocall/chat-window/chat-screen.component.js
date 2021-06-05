import React from "react";
import "./chat-window.styles.scss";
import { ChatMessage } from "./ChatMessage/ChatMessage.component";

export const ChatScreenComponent = ({ messages }) => {
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
    </div>
  );
};
