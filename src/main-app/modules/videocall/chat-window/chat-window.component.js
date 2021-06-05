/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { ChatInput4Real } from "./chat-input.component";
import { ChatScreenComponent } from "./chat-screen.component";
import "./chat-window.styles.scss";

export const ChatWindowComponent = (props) => {
  const { name, meeting, signalRService } = props;
  const [messages, setMessages] = useState([]);
  const latestChat = useRef(null);
  const [localUser, setLocalUser] = useState({ displayName: name });

  useEffect(() => {
    if (signalRService) {
      signalRService.startConnection(null);
      signalRService.listenReceiveMessage(pushMessage);
      signalRService.listenGetSelfDetails(onReceiveSelfDetails);
    }
  }, [signalRService]);

  const onReceiveSelfDetails = (user) => {
    setLocalUser(user);
  };

  latestChat.current = messages;

  const submit = (event) => {
    event.preventDefault();
    const msg = event.target["message"].value;

    if (!msg) {
      return alert("Por favor ingrese un mensaje");
    }

    let message = {
      content: msg,
      mid: v4(),
      user: localUser,
    };

    pushMessage(message);
    event.target["message"].value = "";
    signalRService.invokeSendMessageToAll(meeting, message);
  };

  const pushMessage = (message) => {
    message.time = Date.now();
    console.log(message.time);
    const updatedChat = [...latestChat.current];
    updatedChat.push(message);
    setMessages(updatedChat);
  };

  const deleteMessage = (mid, user) => {};

  return (
    <div className="chat_container">
      <ChatScreenComponent messages={messages} />
      <ChatInput4Real name={name} submit={submit} />
    </div>
  );
};
