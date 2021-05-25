/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";

import Peer from "simple-peer";
import { ChatWindow } from "./components/ChatWindow/ChatWindow.component";
import { ChatInput } from "./components/ChatInput/ChatInput.component";

export const Chat = ({ currentUser }) => {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);

  const latestChat = useRef(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const connectionRef = useRef();

  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState([]);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [call, setCall] = useState({});
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const { metadata: userMetadata } = currentUser || {};

  const saveUsername = useCallback(
    (user) => {
      if (connection.connectionStarted) {
        try {
          connection.invoke("NewUser", user);
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("No connection to server yet.");
      }
    },
    [connection]
  );

  latestChat.current = chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/hubs/chat", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              setStream(stream);
              if (myVideo.current) {
                myVideo.current.srcObject = stream;
              }
            });

          connection.on("RecibeMensaje", (message, user, messageDate, id) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push({ id, user, message, messageDate });

            setChat(updatedChat);
          });

          connection.on("BorraMensaje", (userId) => {
            const updatedChat = [...latestChat.current];

            const chatAfterDelete = updatedChat.filter(
              ({ id }) => id !== userId
            );

            setChat(chatAfterDelete);
          });

          connection.on("NewUserArrived", (data) => {
            saveUsername(userMetadata?.nickname);
            users.push(JSON.parse(data));
          });

          connection.on("CallUser", (from, signal) => {
            console.log(from, signal);
            setCall({ isReceivingCall: true, from, signal });
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection, saveUsername, userMetadata?.nickname, users]);

  const sendMessage = (message) => {
    if (connection.connectionStarted) {
      try {
        connection.invoke("EnviarMensaje", message, userMetadata?.nickname);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  const deleteMessage = (id, user) => {
    if (connection.connectionStarted) {
      try {
        connection.invoke("BorrarMensaje", id, user);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    console.log(id);

    peer.on("signal", (data) => {
      if (connection.connectionStarted) {
        try {
          const stringData = JSON.stringify(data);
          connection.invoke("CallUser", id, stringData);
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("No connection to server yet.");
      }
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    connection.on("CallAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      console.log(call);
      const stringData = JSON.stringify(data);
      connection.invoke("AnswerCall", stringData, call.from);
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const onUserSelected = async (id) => {
    callUser(id);
  };

  return (
    <div>
      <ChatInput
        sendMessage={sendMessage}
        currentUser={userMetadata}
        // saveUsername={saveUsername}
      />
      <hr />
      <ChatWindow chat={chat} deleteMessage={deleteMessage} />
      <button onClick={answerCall}>Atender!</button>
      <h2>Me</h2>
      <video width="500" height="500" autoPlay ref={myVideo}></video>
      <h2>El otro</h2>
      <video width="500" height="500" autoPlay ref={userVideo}></video>
      <ul>
        {users.map(({ userName, connectionId }) => {
          return (
            <li key={connectionId} onClick={() => onUserSelected(connectionId)}>
              {userName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
