/* eslint-disable */
import {
  cameras_container,
  user_camera_container,
  user_name,
  videochat_container,
  chat_window,
  video_and_toolbar,
} from "./VideoChat.module.scss";
import React, { useEffect, useState } from "react";
import Peer from "peerjs";
import { SignalHandlerService } from "../services/signal-handler";
import { ChatWindowComponent } from "../chat-window/chat-window.component";
import { VideoToolbar } from "../video-toolbar/VideoToolbar";
import { ParticipantListComponent } from "../participant-list/ParticipantList.component";

export const VideoChat = (props) => {
  const ScreeenSharingStatus = {
    Started: "started",
    Stopped: "stopped",
  };

  const { name, uuid, meeting } = props;

  const [signalRService, setSignalRService] = useState();

  let userDisplayName = name;
  let localUserPeer = null;
  let localUserId = null;
  let meetingId = meeting;
  let localUserScreenSharingPeer = null;
  let localUserScreenSharingId = null;
  let isScreenSharingByRemote = false;
  let isScreenSharingEnabled = false;
  let isScreenSharingByMe = false;
  let localUserStream = null;
  let connections = [];
  let remoteConnectionIds = [];
  let isVideoEnabled = false;
  let isMute = false;
  let localUserCallObject = null;
  let screenSharinUserName = null;
  let localUserScreenSharingStream = null;

  const displayMediaOptions = { video: { cursor: "always" }, audio: false };

  const avContraints = {
    audio: true,
    video: { width: { exact: 640 }, height: { exact: 480 } },
  };

  useEffect(() => {
    async function initSignalR() {
      const signalRServ = await SignalHandlerService.getInstance();
      const isConnected = await signalRServ.asyncConnection();
      console.log("SignalRHub Connected: " + isConnected);
      setSignalRService(signalRServ);
    }

    initSignalR();
  }, []);

  useEffect(() => {
    if (signalRService && signalRService.isServiceStarted) {
      onUserDisplayNameReceived(name);
    }
  }, [signalRService]);

  const onUserDisplayNameReceived = async (userName) => {
    userDisplayName = userName;
    signalRService.startConnection(onSuccessfullConnection);
    signalRService.listenJoinedRoom(connectToOtherUsers);
    signalRService.listenUserLeftRoom(remoteUserLeft);
    signalRService.listenGetRemoteUserDetails(onRemoteUserDetails);
    signalRService.listenScreenSharingStatus(onScreenSharingStatus);
    signalRService.listenScreeenSharingStatusWithUserList(
      onScreeenSharingStatusWithUserList
    );
  };

  const onScreeenSharingStatusWithUserList = (userIds, status) => {
    if (userIds.length > 0 && status === ScreeenSharingStatus.Started) {
      userIds.forEach((element) => {
        try {
          if (element !== localUserId) {
            localUserScreenSharingPeer.call(
              element,
              localUserScreenSharingStream
            );
            screenSharinUserName = "You";
          }
        } catch (e) {
          console.error(e);
        }
      });
    } else {
      isScreenSharingByRemote = false;
      isScreenSharingEnabled = false;
      isScreenSharingByMe = false;
      screenSharinUserName = "";
    }
  };

  const onScreenSharingStatus = (status, remoteUserName) => {
    if (status === ScreeenSharingStatus.Stopped) {
      isScreenSharingByRemote = false;
      isScreenSharingEnabled = false;
      isScreenSharingByMe = false;
      screenSharinUserName = "";
      stoppedSharingScreen();
    }
    if (status === ScreeenSharingStatus.Started) {
      screenSharinUserName = remoteUserName;
    }
  };

  const stoppedSharingScreen = () => {
    const videoElement = document.getElementById("screenSharingObj");
    const stream = videoElement.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    videoElement.srcObject = null;
  };

  const onRemoteUserDetails = (userName, userId) => {
    const peerConnection = connections.filter((item) => item.UserId === userId);
    if (peerConnection.length === 1) {
      peerConnection[0].DivElement.childNodes[0].textContent = userName;
    }
  };

  const remoteUserLeft = (roomId, userId) => {
    const peerConnection = connections.filter((item) => item.UserId === userId);
    if (peerConnection.length === 1) {
      peerConnection[0].CallObject.close();
    }
  };

  const connectToOtherUsers = (roomId, userId, displayName) => {
    if (roomId === meetingId && userId !== localUserId) {
      localUserCallObject = localUserPeer.call(userId, localUserStream);
    }

    if (localUserCallObject) {
      localUserCallObject.on(
        "stream",
        (stream) =>
          onReceiveRemoteUserStream(
            stream,
            userId,
            localUserCallObject,
            displayName
          ),
        (error) => {
          console.log("Error during receiving stream", error);
        }
      );
      localUserCallObject.on("close", () => onRemoteUserClosed(userId));
    }
  };

  const onRemoteUserClosed = (userId) => {
    const peerConnection = connections.filter((item) => item.UserId === userId);
    if (peerConnection.length === 1) {
      document
        .getElementById("video-container")
        .removeChild(peerConnection[0].DivElement);
      const index = connections.indexOf(peerConnection[0], 0);
      connections = connections.splice(index, 1);
    }
  };

  const onReceiveRemoteUserStream = (
    stream,
    userId,
    callObject,
    displayName
  ) => {
    if (remoteConnectionIds.indexOf(userId) === -1) {
      remoteConnectionIds.push(userId);
      addUser(stream, userId, callObject, displayName, false);
    }
  };

  const onSuccessfullConnection = async () => {
    const peer = await getPeerObject();
    localUserPeer = peer;
    peer.on("open", sendNotificationOfJoining);
    peer.on("call", onCallReceive);
    await GetUserDevices();
  };

  const GetUserDevices = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(avContraints);
      HandelSucess(stream);
    } catch (exception) {
      HandelError(exception);
    } //fafa
  };

  const HandelSucess = (stream) => {
    const videoTracks = stream.getVideoTracks();
    const constraints = videoTracks[0].getConstraints();

    localUserStream = stream;
    addUser(localUserStream, localUserId, null, userDisplayName, true);
  };

  const HandelError = (error) => {
    if (error.name === "ConstraintNotSatisfiedError") {
      const v = avContraints.video;
      errorMsg(
        `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`,
        error
      );
    } else if (error.name === "PermissionDeniedError") {
      errorMsg(
        "Permissions have not been granted to use your camera and " +
          "microphone, you need to allow the page access to your devices in " +
          "order for the demo to work.",
        error
      );
    }
    errorMsg(`getUserMedia error: ${error.name}`, error);
  };

  const errorMsg = (msg, error) => {
    const errorElement = document.querySelector("#errorMsg");
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (error !== "undefined") {
      console.error(error);
    }
  };

  const onCallReceive = async (call) => {
    const stream = await navigator.mediaDevices.getUserMedia(avContraints);

    localUserStream = stream;
    const peerConnection = connections.filter(
      (item) => item.UserId === localUserId
    );
    if (peerConnection.length === 1) {
      peerConnection[0].VideElement.srcObject = localUserStream;
    }

    call.answer(stream);
    call.on("stream", (stream) => onStream(stream, call));
  };

  const onStream = (stream, call) => {
    if (remoteConnectionIds.indexOf(call.peer) === -1) {
      remoteConnectionIds.push(call.peer);
      signalRService.invokeGetRemoteUserDetails(call.peer);
      addUser(stream, call.peer, call, "", false);
    }
  };

  const GetNewVideoElement = () => {
    const videoElement = document.createElement("video");
    videoElement.setAttribute("playsinline", "");
    videoElement.setAttribute("class", "video-display");
    videoElement.autoplay = true;
    videoElement.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
    return videoElement;
  };

  const addUser = (stream, userId, callObject, userName, isLocalPaticipant) => {
    const videoElement = GetNewVideoElement();
    videoElement.muted = isLocalPaticipant;
    videoElement.srcObject = stream;

    isVideoEnabled = stream.getVideoTracks()[0].enabled;
    isMute = stream.getAudioTracks()[0].enabled;

    const divElement = document.createElement("div");
    divElement.setAttribute("class", user_camera_container);

    const spanElement = document.createElement("span");
    spanElement.innerText = `${userName}`;
    spanElement.setAttribute("class", user_name);

    divElement.appendChild(spanElement);
    divElement.appendChild(videoElement);

    const peerConnection = {};
    peerConnection.RoomId = meetingId;
    peerConnection.VideElement = videoElement;
    peerConnection.UserId = userId;
    peerConnection.CallObject = callObject;
    peerConnection.DivElement = divElement;
    peerConnection.userName = userName;
    peerConnection.isLocalPaticipant = isLocalPaticipant;
    connections.push(peerConnection);

    document.getElementById("video-container").appendChild(divElement);
  };

  const sendNotificationOfJoining = (id) => {
    localUserId = id;
    signalRService.invokeJoinedRoom(meetingId, id, userDisplayName);
    createScreenSharingPeerObject(id);
  };

  const createScreenSharingPeerObject = (id) => {
    const localScreenPeer = getPeerObject();
    localUserScreenSharingPeer = localScreenPeer;
    localScreenPeer.on("open", (screenSharingCallId) =>
      sendNotificationOfAddSharingModality(screenSharingCallId, id)
    );
    localScreenPeer.on("call", onScreenShareCallReceive);
  };

  const sendNotificationOfAddSharingModality = (
    screenSharingCallId,
    userId
  ) => {
    localUserScreenSharingId = screenSharingCallId;
    signalRService.invokeAddScreenSharingModality(
      meetingId,
      userId,
      screenSharingCallId
    );
  };

  const onScreenShareCallReceive = async (call) => {
    call.answer(null);
    call.on("stream", (stream) => onScreenShareStream(stream, call));
  };

  const onScreenShareStream = (stream, call) => {
    isScreenSharingByRemote = true;
    isScreenSharingEnabled = true;
    isScreenSharingByMe = false;

    addScreenSharing(stream);
  };

  const addScreenSharing = (stream) => {
    const videoElement = document.getElementById("screenSharingObj");
    videoElement.muted = false;
    videoElement.autoplay = true;
    videoElement.srcObject = stream;
  };

  const getPeerObject = () => {
    return new Peer(undefined, {
      path: "/",
      host: "localhost",
      port: "3001",
    });
  };

  const muteUnmute = () => {
    if (isMute) {
      isMute = localUserStream.getAudioTracks()[0].enabled = false;
    } else {
      isMute = localUserStream.getAudioTracks()[0].enabled = true;
    }
    return isMute;
  };

  const videoOnOff = () => {
    if (isVideoEnabled) {
      isVideoEnabled = localUserStream.getVideoTracks()[0].enabled = false;
    } else {
      isVideoEnabled = localUserStream.getVideoTracks()[0].enabled = true;
    }
  };

  const endCall = async () => {
    await signalRService.invokeScreenSharingStatus;
    signalRService.stopConnection();
    localUserStream.getAudioTracks()[0].stop();
    localUserStream.getVideoTracks()[0].stop();
    window.location = "/#/educapp/home";
  };

  const toggleChat = () => {
    const attr = document.getElementById("chat_window").hidden;
    document.getElementById("chat_window").hidden = !attr;
  };

  const startShareScreen = async () => {
    try {
      const mediaDevices = navigator.mediaDevices;
      const stream = await mediaDevices.getDisplayMedia(displayMediaOptions);
      localUserScreenSharingStream = stream;

      isScreenSharingByMe = true;
      isScreenSharingEnabled = true;
      isScreenSharingByRemote = false;

      localUserScreenSharingStream.getVideoTracks()[0].onended = (event) => {
        sendOtherToScreenClosed();
      };

      signalRService.invokeScreenSharingStatus(
        meetingId,
        localUserId,
        ScreeenSharingStatus.Started,
        userDisplayName
      );
    } catch (exception) {
      HandelError(exception);
    }
  };

  const stopSharingScreen = () => {
    const tracks = localUserScreenSharingStream.getTracks();
    tracks.forEach((track) => track.stop());
    sendOtherToScreenClosed();
  };

  const sendOtherToScreenClosed = () => {
    isScreenSharingByMe = false;
    isScreenSharingEnabled = false;
    isScreenSharingByRemote = false;
    signalRService.invokeScreenSharingStatus(
      meetingId,
      localUserId,
      ScreeenSharingStatus.Stopped,
      userDisplayName
    );
  };

  /**/
  /**/
  /**/
  /**/
  /**/
  /**/

  return (
    <div className={videochat_container}>
      <div className={video_and_toolbar}>
        <div className="screenSharingContainer" id="screenSharing-container">
          <video id="screenSharingObj"></video>
        </div>

        <VideoToolbar
          muteUnmute={muteUnmute}
          videoOnOff={videoOnOff}
          endCall={endCall}
          toggleChat={toggleChat}
          startShareScreen={startShareScreen}
          stopSharingScreen={stopSharingScreen}
        />
        <div>
          <p>Meet Id = {uuid}</p>
          <div className={cameras_container} id="video-container"></div>
          <div id="errorMsg"></div>
        </div>
      </div>
      <div id="chat_window" className={chat_window}>
        <ChatWindowComponent
          name={name}
          meeting={meetingId}
          signalRService={signalRService}
        />
      </div>
      <ParticipantListComponent
        name={name}
        meetingId={meetingId}
        signalRService={signalRService}
        connections={connections}
      />
    </div>
  );
};
