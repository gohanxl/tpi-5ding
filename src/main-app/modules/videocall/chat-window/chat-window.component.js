/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { ChatInput4Real } from "./chat-input.component";
import { ChatScreenComponent } from "./chat-screen.component";

export const ChatWindowComponent = (props) => {
  const { name, meeting, signalRService } = props;

  // let messages = [
  //   { content: "fafafa1", mid: v4(), user: name, time: Date.now() },
  //   { content: "fafafa2", mid: v4(), user: name, time: Date.now() },
  //   { content: "fafafa3", mid: v4(), user: name, time: Date.now() },
  // ];

  const [messages, setMessages] = useState([]);
  //     useState([
  //   {
  //     content: "fafafa1",
  //     mid: v4(),
  //     user: { displayName: "Hardcodeta" },
  //     time: Date.now(),
  //   },
  //   {
  //     content: "fafafa2",
  //     mid: v4(),
  //     user: { displayName: "Hardcodeta" },
  //     time: Date.now(),
  //   },
  //   {
  //     content: "fafafa3",
  //     mid: v4(),
  //     user: { displayName: "Hardcodeta" },
  //     time: Date.now(),
  //   },
  // ]);
  const latestChat = useRef(null);
  // let localUser = null;
  const [localUser, setLocalUser] = useState();

  useEffect(() => {
    if (signalRService) {
      signalRService.startConnection(null);
      signalRService.listenReceiveMessage(pushMessage);
      signalRService.listenGetSelfDetails(onReceiveSelfDetails);
    }
  }, [signalRService]);

  const onReceiveSelfDetails = (user) => {
    // localUser = user;
    setLocalUser(user);
  };

  latestChat.current = messages;

  const submit = (event) => {
    event.preventDefault();
    const msg = event.target["message"].value;

    if (!msg) {
      return alert("Please enter a message.");
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
    // setTimeout(() => scrollBottom(), 500);
  };
  //
  // const scrollBottom = () => {
  //   let element = document.getElementById("message_container");
  //   element.scrollTop = element.scrollHeight;
  // };

  const deleteMessage = (mid, user) => {};

  return (
    <div>
      <div>
        <ChatScreenComponent messages={messages} />
      </div>
      <div>
        <ChatInput4Real name={name} submit={submit} />
      </div>
    </div>
  );
};
