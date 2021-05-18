import React from "react";
import { chat_wrapper } from "./ChatWindows.module.scss";
import { Message } from "../ChatMessage/ChatMessage.component";

export const ChatWindow = ({ chat, deleteMessage }) => {
  return (
    <div className={chat_wrapper}>
      {chat &&
        chat.map(({ id, user, message, messageDate }) => (
          <Message
            key={id}
            userId={id}
            user={user}
            messageDate={messageDate}
            message={message}
            deleteMessage={deleteMessage}
          />
        ))}
    </div>
  );
};
