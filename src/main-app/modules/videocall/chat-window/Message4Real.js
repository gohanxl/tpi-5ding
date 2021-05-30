/* eslint-disable */
import React from "react";

export const Message4Real = ({ user, content, time, mid, deleteMessage }) => (
  <div style={{ background: "#eee", borderRadius: "5px", padding: "0 10px" }}>
    <p>
      <span>{time} --- </span>
      <strong>{user.displayName}</strong> says:
    </p>
    <p>{content}</p>
    {/*<button onClick={() => deleteMessage(mid, user)}>Borrar Mensaje</button>*/}
  </div>
);
