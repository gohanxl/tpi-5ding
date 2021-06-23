/* eslint-disable */
import {
  cameras_container,
  user_camera_container,
  user_name,
  videochat_container,
  chat_window,
  cameras_and_screen,
  cameras_row,
  cameras_and_cc,
  close_caption,
  toolbar_and_chat,
} from "./VideoChat.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { SignalHandlerService } from "../services/signal-handler";
import { VideoToolbar } from "../video-toolbar/VideoToolbar";
import { ChatWindow } from "../ChatWindow/ChatWindow.component";
import { ClosedCaptionComponent } from "../../../modules/videocall/closed-caption/ClosedCaption.component";
import { VideoGridComponent } from "./VideoGridComponent.component";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  setMicOn,
  setScreenSharingStatus,
  setVideoOn,
  setVideoRows,
} from "./store/video.actions";
import { Attendance } from "../../shared-components/Attendance/components/Attendance";

export const VideoChat = (props) => {
  const ScreeenSharingStatus = {
    Started: "started",
    Stopped: "stopped",
  };

  const { name, uuid, meeting } = props;

  const user = useSelector((state) => state.user.currentUser);
  const ccRef = useRef();

  const [signalRService, setSignalRService] = useState();

  let localUserStream = null;
  let userDisplayName = name;
  let localUserPeer = null;
  let localUserId = null;
  let meetingId = meeting;

  let localUserScreenSharingPeer = null;
  let localUserScreenSharingId = null;
  let connections = [];
  let remoteConnectionIds = [];

  let localUserCallObject = null;
  let screenSharinUserName = null;
  let localUserScreenSharingStream = null;

  const store = useStore();

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
    if (user && user.dbUser) {
      initSignalR();
    }
  }, [user]);

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
    signalRService.listenIAmExpelled(endCall);
    signalRService.listenIAmMuted(muteByTeacher);
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
      dispatch(setScreenSharingStatus(false, false));

      screenSharinUserName = "";
    }
  };

  const onScreenSharingStatus = (status, remoteUserName) => {
    if (status === ScreeenSharingStatus.Stopped) {
      dispatch(setScreenSharingStatus(false, false));
      screenSharinUserName = "";
      document.getElementById("screenSharingObj").classList.add("d-none");
      stoppedSharingScreen();
    }
    if (status === ScreeenSharingStatus.Started) {
      screenSharinUserName = remoteUserName;
      document.getElementById("screenSharingObj").classList.remove("d-none");
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
    //TODO Borrar esto cdo este todo andando
    /** Asi refrescabamos los videos cdo alguien se iba sin video grid**/
    // const reduxVideos = store.getState().video.rows;
    // reduxVideos.forEach((item) => console.log(item));
    // const filteredReduxVideos = reduxVideos.filter(
    //   (item) => item.id !== userId
    // );
    // dispatch(setVideoRows(filteredReduxVideos));

    divideVideosInRows(null, userId);

    const peerConnection = connections.filter((item) => item.UserId === userId);
    if (peerConnection.length === 1) {
      peerConnection[0].CallObject.close();
      connections = connections.filter((item) => item.UserId !== userId);
    } else {
      console.warn("Error on connections array");
    }
  };

  /*TODO: Revisar antes de borrar porque es el callback del close de peerjs (objeto peer)*/
  // const onRemoteUserClosed = (roomId, userId) => {
  //   const peerConnection = connections.filter((item) => item.UserId === userId);
  //   if (peerConnection.length === 1) {
  //     const index = connections.indexOf(peerConnection[0], 0);
  //     connections = connections.splice(index, 1);
  //   }
  // };

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
      /*TODO: Revisar antes de borrar porque es el callback del close de peerjs (objeto peer)*/
      /*localUserCallObject.on("close", () => remoteUserLeft(roomId, userId));*/
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
    await GetUserDevices();

    const peer = await getPeerObject();
    localUserPeer = peer;
    peer.on("open", sendNotificationOfJoining);
    peer.on("call", onCallReceive);
    peer.on("error", (err) => console.error(err));
  };

  const GetUserDevices = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(avContraints);
      successHandler(stream);
    } catch (exception) {
      errorHandler(exception);
    }
  };

  const successHandler = (stream) => {
    const videoTracks = stream.getVideoTracks();
    const constraints = videoTracks[0].getConstraints();

    localUserStream = stream;
    addUser(localUserStream, localUserId, null, userDisplayName, true);
  };

  const errorHandler = (error) => {
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
    const stream = localUserStream;

    console.log("onCallReceive:localUserStream");
    console.log(localUserStream);
    const peerConnection = connections.filter(
      (item) => item.UserId === localUserId
    );
    if (peerConnection.length === 1) {
      peerConnection[0].VideoElement.srcObject = localUserStream;
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

  const addUser = async (
    stream,
    userId,
    callObject,
    userName,
    isLocalPaticipant
  ) => {
    const videoElement = GetNewVideoElement();
    videoElement.muted = isLocalPaticipant;
    videoElement.srcObject = stream;

    if (isLocalPaticipant) {
      dispatch(setVideoOn(stream.getVideoTracks()[0].enabled));
      dispatch(setMicOn(true));
    }

    const divElement = document.createElement("div");
    divElement.setAttribute("class", user_camera_container);
    divElement.setAttribute("id", userId);

    const spanElement = document.createElement("span");
    spanElement.innerText = `${userName}`;
    spanElement.setAttribute("class", user_name);

    divElement.appendChild(spanElement);
    divElement.appendChild(videoElement);

    const peerConnection = {};
    peerConnection.RoomId = meetingId;
    peerConnection.VideoElement = videoElement;
    peerConnection.UserId = userId;
    peerConnection.CallObject = callObject;
    peerConnection.DivElement = divElement;
    peerConnection.userName = userName;
    peerConnection.isLocalPaticipant = isLocalPaticipant;
    connections.push(peerConnection);

    //TODO borrar esto cdo este andando todo 100 %
    /** Esto es lo que haciamos para apendear sin rows para probar **/
    // const reduxVideos = store.getState().video.rows;
    // const newArrayVideo = [...reduxVideos];
    // newArrayVideo.push(divElement);
    // dispatch(setVideoRows(newArrayVideo));

    divideVideosInRows(divElement, null);
  };

  const divideVideosInRows = async (newVideoDiv, userIdToRemove) => {
    const rows = [];
    const reduxVideoRows = store.getState().video.rows;
    let videoDivs = [];
    if (Array.isArray(reduxVideoRows) && reduxVideoRows.length > 0) {
      const arrayOfChildrenCollection = reduxVideoRows.map(
        (row) => row.divElement.children
      );
      arrayOfChildrenCollection.forEach((collectionOfDivs) => {
        Array.from(collectionOfDivs).forEach((divEl) => {
          videoDivs.push(divEl);
        });
      });
    }

    if (newVideoDiv) {
      videoDivs.push(newVideoDiv);
    }

    if (userIdToRemove) {
      videoDivs = videoDivs.filter((item) => item.id !== userIdToRemove);
    }

    const videoDivsCount = videoDivs.length;
    const initialRowsCount = 2;
    let rowsQuantity = videoDivsCount > initialRowsCount ? initialRowsCount : 1;
    const videoDivsCopy = [...videoDivs];

    const camerasPerRow = Math.floor(videoDivsCount / rowsQuantity);
    const remainingCamera = videoDivsCount % rowsQuantity;

    while (rowsQuantity >= 0) {
      rows.push({
        maxCamsCount:
          rowsQuantity === 0 && remainingCamera
            ? remainingCamera
            : camerasPerRow,
      });
      rowsQuantity--;
    }

    // rows.forEach((row, i) => {
    //   if (row.maxCamsCount === 1 && camerasPerRow > 2) {
    //     rows[i - 1].maxCamsCount--;
    //     row++;
    //   }
    // });

    rows.forEach((row) => {
      const divEl = document.createElement("div");
      divEl.classList.add(cameras_row);
      let remainingCams = row.maxCamsCount;

      while (remainingCams > 0) {
        const videoCam = videoDivsCopy.shift();
        if (videoCam) {
          divEl.appendChild(videoCam);
        }
        remainingCams--;
      }
      row.divElement = divEl;
    });

    dispatch(setVideoRows(rows));
  };

  const dispatch = useDispatch();

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
    dispatch(setScreenSharingStatus(true, false));

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
      path: process.env.REACT_APP_PEERJS_PATH,
      host: process.env.REACT_APP_PEERJS_HOST,
      port: process.env.REACT_APP_PEERJS_PORT,
      debug: 0,
    });
  };

  const muteByTeacher = () => {
    localUserStream.getAudioTracks()[0].enabled = false;
    dispatch(setMicOn(false));
    ccRef.current.muteClosedCaption();
  };

  const muteUnmute = () => {
    const reduxIsMicOn = store.getState().video.micOn;
    if (reduxIsMicOn) {
      localUserStream.getAudioTracks()[0].enabled = false;
      dispatch(setMicOn(false));
      ccRef.current.muteClosedCaption();
    } else {
      localUserStream.getAudioTracks()[0].enabled = true;
      dispatch(setMicOn(true));
      ccRef.current.unMuteClosedCaption();
    }
    return localUserStream.getAudioTracks()[0].enabled;
  };

  const videoOnOff = () => {
    const isVideoEnabled = store.getState().video.videoOn;
    if (isVideoEnabled) {
      localUserStream.getVideoTracks()[0].enabled = false;
      dispatch(setVideoOn(false));
    } else {
      localUserStream.getVideoTracks()[0].enabled = true;
      dispatch(setVideoOn(true));
    }
  };

  const endCall = async () => {
    ccRef.current.endCloseCaption();
    signalRService.stopConnection();

    localUserPeer.destroy();
    localUserScreenSharingPeer.destroy();

    dispatch(setVideoRows([]));

    localUserStream.getAudioTracks().forEach(function (track) {
      track.stop();
    });
    localUserStream.getVideoTracks().forEach(function (track) {
      track.stop();
    });

    connections.forEach((peer) => {
      const stream = peer.VideoElement.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(function (track) {
        track.stop();
      });

      peer.VideoElement.srcObject = null;
    });

    connections = null;
    localUserPeer = null;
    localUserScreenSharingPeer = null;
    localUserStream = null;
    localUserScreenSharingStream = null;

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

      dispatch(setScreenSharingStatus(false, true));

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
      errorHandler(exception);
    }
  };

  const stopSharingScreen = () => {
    const tracks = localUserScreenSharingStream.getTracks();
    tracks.forEach((track) => track.stop());
    sendOtherToScreenClosed();
  };

  const sendOtherToScreenClosed = () => {
    dispatch(setScreenSharingStatus(false, false));
    signalRService.invokeScreenSharingStatus(
      meetingId,
      localUserId,
      ScreeenSharingStatus.Stopped,
      userDisplayName
    );
  };

  return (
    <div className={videochat_container}>
      <div className={cameras_and_screen}>
        <div className="screenSharingContainer" id="screenSharing-container">
          <video className="d-none" id="screenSharingObj" autoPlay />
        </div>
        <div className={cameras_and_cc}>
          <VideoGridComponent />
          <ClosedCaptionComponent
            name={userDisplayName}
            meeting="1"
            ref={ccRef}
            signalRService={signalRService}
          />
          <div id="errorMsg"></div>
        </div>
      </div>
      <div className={toolbar_and_chat}>
        <VideoToolbar
          meetingId={meetingId}
          muteUnmute={muteUnmute}
          videoOnOff={videoOnOff}
          endCall={endCall}
          toggleChat={toggleChat}
          startShareScreen={startShareScreen}
          stopSharingScreen={stopSharingScreen}
          signalRService={signalRService}
        />
        <Attendance
          classId={2}
          meetingId={meetingId}
          signalRService={signalRService}
        />
        <div id="chat_window" className={chat_window}>
          <ChatWindow
            name={name}
            meeting={meetingId}
            signalRService={signalRService}
          />
        </div>
      </div>
    </div>
  );
};
