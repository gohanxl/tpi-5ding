import React, { useState } from "react";

export const ChatInput = ({ sendMessage, currentUser }) => {
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const isMessageProvided = message && message !== "";

    if (currentUser?.nickname && isMessageProvided) {
      sendMessage(message);
    } else {
      alert("Please insert an user and a message.");
    }
  };

  const onMessageUpdate = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div htmlFor="user">{currentUser?.nickname}</div>
      <br />
      <label htmlFor="message">Message:</label>
      <br />
      <input
        type="text"
        id="message"
        name="message"
        value={message}
        onChange={onMessageUpdate}
      />
      <br />
      <br />
      <button>Submit</button>
    </form>
  );
};
