import React from "react";

export const Message = ({ user, message, messageDate }) => (
  <div style={{ background: "#eee", borderRadius: "5px", padding: "0 10px" }}>
    <p>
      <span>{messageDate} --- </span>
      <strong>{user}</strong> says:
    </p>
    <p>{message}</p>
  </div>
);
