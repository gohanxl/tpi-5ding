import React from "react";

export const ChatInput4Real = ({ name, submit }) => {
  return (
    <form onSubmit={submit}>
      <div htmlFor="user">{name}</div>
      <br />
      <label htmlFor="message">Message:</label>
      <br />
      <input type="text" id="message" name="message" />
      <br />
      <br />
      <button>Submit</button>
    </form>
  );
};
