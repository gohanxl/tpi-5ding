import React from "react";

export const Message = ({
  userId,
  user,
  message,
  messageDate,
  deleteMessage,
}) => (
  <div style={{ background: "#eee", borderRadius: "5px", padding: "0 10px" }}>
    <p>
      <span>{messageDate} --- </span>
      <strong>{user}</strong> says:
    </p>
    <p>{message}</p>
    <button onClick={() => deleteMessage(userId, user)}>Borrar Mensaje</button>
  </div>
);
