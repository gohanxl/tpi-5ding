import React from "react";
import { chat_wrapper } from "./chat-window.styles.scss";
import { Message4Real } from "./Message4Real";

export const ChatScreenComponent = ({ messages }) => {
  return (
    <div className={chat_wrapper} id="message_container">
      {messages &&
        messages.map(({ content, user, mid, time }) => (
          <Message4Real
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
