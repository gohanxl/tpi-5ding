import React from "react";

export const ChatInput4Real = ({ submit }) => {
  return (
    <form onSubmit={submit}>
      <label htmlFor="message">Mensaje</label>
      <br />
      <input type="text" id="message" name="message" />
      <br />
      <br />
      <button>Enviar</button>
    </form>
  );
};
