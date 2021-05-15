import React from "react";
import { Message } from "./ChatMessage.component";

export const ChatWindow = (props) => {
  const chat = props.chat.map((m) => (
    <Message
      key={Date.now() * Math.random()}
      user={m.user}
      message={m.message}
    />
  ));

  return <div>{chat}</div>;
};
