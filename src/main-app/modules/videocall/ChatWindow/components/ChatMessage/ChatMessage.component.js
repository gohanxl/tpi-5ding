/* eslint-disable */
import React from "react";
import { chat_message__wrapper } from "./ChatMessage.module.scss";

export const ChatMessage = ({ user, content, time, mid, deleteMessage }) => (
  <div className={chat_message__wrapper}>
    <p>
      {/* <span>{time} --- </span> */}
      <strong>{user && user.displayName ? user.displayName : "Usuario"}</strong>
      :
    </p>
    <p>{content}</p>
    {/*<button onClick={() => deleteMessage(mid, user)}>Borrar Mensaje</button>*/}
  </div>
);
