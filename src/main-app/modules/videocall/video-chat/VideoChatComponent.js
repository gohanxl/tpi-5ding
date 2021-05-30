/* eslint-disable */
import React, { useEffect, useState } from "react";
import Peer from "peerjs";
import { SignalHandlerService } from "../services/signal-handler";

export const VideoChatComponent = (props) => {
  const ScreeenSharingStatus = {
    Started: "started",
    Stopped: "stopped",
  };

  const { name, meeting } = props;

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

  const avContraints = {
    audio: true,
    video: { width: { exact: 640 }, height: { exact: 480 } },
  };

  useEffect(() => {
    async function initSignalR() {
      const signalRServ = SignalHandlerService.getInstance();
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
        if (element !== localUserId) {
          localUserScreenSharingPeer.call(
            element,
            localUserScreenSharingStream
          );
          screenSharinUserName = "You";
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
    const videoElement = document.getElementById("screenSharingObj"); //as HTMLVideoElement;TODO que onda angular aca?
    const stream = videoElement.srcObject; //as MediaStream;
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
      //fafaf
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
        .getElementById(`video-${name}`)
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
      peerConnection[0].VideElement.srcObject = localUserStream; //TODO VideElement???
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
    videoElement.setAttribute("class", "videoDisplay");
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
    divElement.setAttribute("class", "displayNameContainer");

    const spanElement = document.createElement("span");
    spanElement.innerText = `${userName}`;
    spanElement.setAttribute("class", "displayName");

    divElement.appendChild(spanElement);
    divElement.appendChild(videoElement);

    const peerConnection = {};
    peerConnection.RoomId = meetingId;
    peerConnection.VideElement = videoElement;
    peerConnection.UserId = userId;
    peerConnection.CallObject = callObject;
    peerConnection.DivElement = divElement;
    connections.push(peerConnection);

    document.getElementById(`video-${name}`).appendChild(divElement);
  };

  const sendNotificationOfJoining = (id) => {
    localUserId = id;
    console.log(meetingId);
    console.log(id);
    console.log(userDisplayName);
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

    // this.changeDetector.detectChanges();TODO esto es de angular no se que carajo es
    // this.changeDetector.markForCheck();

    addScreenSharing(stream);
  };

  const addScreenSharing = (stream) => {
    const videoElement = document.getElementById("screenSharingObj"); // as HTMLVideoElement; TODO esto angular que onda?
    videoElement.muted = false;
    videoElement.srcObject = stream;
  };

  const getPeerObject = () => {
    return new Peer(undefined, {
      path: "/",
      host: "localhost",
      port: "9000",
    });
  };

  return (
    <div>
      <h1>ClientVideoChatHere: {name}</h1>
      <div id={"video-" + name}></div>
      <div id="errorMsg"></div>
    </div>
  );
};
