/* eslint-disable */
import {
  video_display,
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
import { VideoGridComponent } from "./VideoGridComponent.component";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  setConnections,
  setLocalUserId,
  setLocalUserPeer,
  setLocalUserScreenSharingId,
  setLocalUserScreenSharingPeer,
  setLocalUserScreenSharingStream,
  setLocalUserStream,
  setMicOn,
  setRemoteConnectionIds,
  setScreenSharingStatus,
  setVideoOn,
  setVideoRows,
} from "./store/video.actions";
import { Attendance } from "../../shared-components/Attendance/components/Attendance";
//import { v4 } from "uuid";

export const VideoChat = (props) => {
  const ScreeenSharingStatus = {
    Started: "started",
    Stopped: "stopped",
  };

  const { name, uuid, meeting } = props;

  const user = useSelector((state) => state.user.currentUser);
  const ccRef = useRef();
  const store = useStore();

  const [signalRService, setSignalRService] = useState();

  let userDisplayName = name; //no need for redux here
  let meetingId = meeting;

  let screenSharinUserName = ""; // No need for redux here

  const intervalId = useRef(null);

  const displayMediaOptions = { video: { cursor: "always" }, audio: false };

  const avContraints = {
    audio: true,
    video: { width: { exact: 640 }, height: { exact: 480 } },
  };

  useEffect(() => {
    async function initSignalR() {
      const signalRServ = await SignalHandlerService.getInstance();
      const isConnected = await signalRServ.asyncConnection();
      setSignalRService(signalRServ);
    }
    if (user && user.dbUser) {
      initSignalR();
    }
  }, [user]);

  useEffect(() => {
    if (signalRService && signalRService.isServiceStarted) {
      onUserDisplayNameReceived(name);
      intervalId.current = setInterval(() => {
        let connections = getConnections();
        if (connections) {
          const deadUserIds = connections
            .filter((conn) => {
              if (conn.CallObject) {
                return !conn.CallObject.open;
              }
              return false;
            })
            .map((conn) => conn.UserId);
          deadUserIds.forEach((userId) => remoteUserLeft(meetingId, userId));
        }
      }, 10000);
    }
    return () => clearInterval(intervalId.current);
  }, [signalRService]);

  const getLocalUserStream = () => {
    return store.getState().video.localUserStream;
  };

  const getLocalUserPeer = () => {
    return store.getState().video.localUserPeer;
  };

  const getLocalUserId = () => {
    return store.getState().video.localUserId;
  };

  const getLocalUserScreenSharingPeer = () => {
    return store.getState().video.localUserScreenSharingPeer;
  };

  const getConnections = () => {
    return store.getState().video.connections;
  };

  const getRemoteConnectionIds = () => {
    return store.getState().video.remoteConnectionIds;
  };

  const getLocalUserScreenSharingStream = () => {
    return store.getState().video.localUserScreenSharingStream;
  };

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
          if (element !== getLocalUserId()) {
            getLocalUserScreenSharingPeer().call(
              element,
              getLocalUserScreenSharingStream()
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
    const peerConnection = getConnections().filter(
      (item) => item.UserId === userId
    );
    if (peerConnection.length === 1) {
      peerConnection[0].DivElement.childNodes[0].textContent = userName;
    }
  };

  const remoteUserLeft = (roomId, userId) => {
    // divideVideosInRows(null, userId, false, null);
    divideVideosInRows(null, userId, false);

    const peerConnection = getConnections().filter(
      (item) => item.UserId === userId
    );
    if (peerConnection.length === 1) {
      peerConnection[0].CallObject.close();
      const connections = getConnections().filter(
        (item) => item.UserId !== userId
      );
      dispatch(setConnections(connections));
    } else {
      console.warn("Error on connections array");
    }
  };

  const connectToOtherUsers = (roomId, userId, displayName) => {
    let localUserCallObject;

    if (roomId === meetingId && userId !== getLocalUserId()) {
      localUserCallObject = getLocalUserPeer().call(
        userId,
        getLocalUserStream()
      );
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
          console.error("Error during receiving stream", error);
        }
      );
    }
  };

  const onReceiveRemoteUserStream = (
    stream,
    userId,
    callObject,
    displayName
  ) => {
    if (getRemoteConnectionIds().indexOf(userId) === -1) {
      const newRemoteConnectionIds = [...getRemoteConnectionIds()];
      newRemoteConnectionIds.push(userId);
      dispatch(setRemoteConnectionIds(newRemoteConnectionIds));
      addUser(stream, userId, callObject, displayName, false);
    }
  };

  const onSuccessfullConnection = async () => {
    await GetUserDevices();
    const peer = await getPeerObject();
    dispatch(setLocalUserPeer(peer));
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
    dispatch(setLocalUserStream(stream));
    addUser(stream, getLocalUserId(), null, userDisplayName, true);
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
    const stream = getLocalUserStream();
    const peerConnection = getConnections().filter(
      (item) => item.UserId === getLocalUserId()
    );
    if (peerConnection.length === 1) {
      peerConnection[0].VideoElement.srcObject = stream;
    }

    call.answer(stream);
    call.on("stream", (stream) => onStream(stream, call));
  };

  const onStream = (stream, call) => {
    if (getRemoteConnectionIds().indexOf(call.peer) === -1) {
      const newRemoteConnectionIds = [...getRemoteConnectionIds()];
      newRemoteConnectionIds.push(call.peer);
      dispatch(setRemoteConnectionIds(newRemoteConnectionIds));
      signalRService.invokeGetRemoteUserDetails(call.peer);
      addUser(stream, call.peer, call, "", false);
    }
  };

  const GetNewVideoElement = () => {
    const videoElement = document.createElement("video");
    videoElement.setAttribute("playsinline", "");
    videoElement.setAttribute("class", video_display);
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
    divElement.setAttribute("id", isLocalPaticipant ? "my_video" : userId);

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
    let newConnections = [...getConnections()];
    newConnections.push(peerConnection);
    dispatch(setConnections(newConnections));

    // divideVideosInRows(divElement, null, isLocalPaticipant, stream);
    divideVideosInRows(divElement, null, isLocalPaticipant);
  };

  const divideVideosInRows = async (
    newVideoDiv,
    userIdToRemove,
    isLocalPaticipant
    // stream
  ) => {
    const rows = [];
    const reduxVideoRows = store.getState().video.rows;
    let videoDivs = [];
    if (
      Array.isArray(reduxVideoRows) &&
      reduxVideoRows.length > 0 &&
      !isLocalPaticipant
    ) {
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
      // for (let i = 0; i < 8; i++) {
      //   let clone = newVideoDiv.cloneNode(true);
      //   clone.id = v4();
      //   clone.childNodes[1].srcObject = stream;
      //   videoDivs.push(clone);
      // }
    }

    if (userIdToRemove) {
      videoDivs = videoDivs.filter((item) => item.id !== userIdToRemove);
    }

    const videoDivsCount = videoDivs.length;
    let rowsQuantity = 1;
    if (videoDivsCount > 2 && videoDivsCount <= 8) {
      rowsQuantity = 2;
    } else if (videoDivsCount > 8 && videoDivsCount <= 12) {
      rowsQuantity = 3;
    } else if (videoDivsCount > 12 && videoDivsCount <= 16) {
      rowsQuantity = 4; // Al haber 14 entra aca
    } else if (videoDivsCount > 16 && videoDivsCount <= 20) {
      rowsQuantity = 5;
    } else if (videoDivsCount > 20 && videoDivsCount <= 24) {
      rowsQuantity = 6;
    } else if (videoDivsCount > 24) {
      rowsQuantity = 7;
    }

    const videoDivsCopy = [...videoDivs];

    const camerasPerRow = Math.floor(videoDivsCount / rowsQuantity);
    let remainingCameras =
      videoDivsCount % rowsQuantity > 0
        ? videoDivsCount - camerasPerRow * rowsQuantity
        : 0;

    for (let i = 0; i < rowsQuantity; i++) {
      rows.push({
        maxCamsCount: camerasPerRow,
      });
    }

    let limitCamerasPerRow = 4;
    let someRowsReachedLimit = rows.some(
      (row) => row.maxCamsCount >= limitCamerasPerRow
    );
    if (remainingCameras > 0 && someRowsReachedLimit) {
      limitCamerasPerRow = camerasPerRow + 2;
    }

    while (remainingCameras > 0) {
      //cada iteracion del while recorro el array de rows, si encuentro un elemento q no tiene el max cams, le meto 1
      //y hago break para salir del for y volver al while, asi hasta distribuir las remaining cameras
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].maxCamsCount < limitCamerasPerRow) {
          rows[i].maxCamsCount = rows[i].maxCamsCount + 2;
          break;
        }
      }
      remainingCameras--;
    }

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
    dispatch(setLocalUserId(id));
    signalRService.invokeJoinedRoom(meetingId, id, userDisplayName);
    createScreenSharingPeerObject(id);
  };

  const createScreenSharingPeerObject = (id) => {
    const localScreenPeer = getPeerObject();
    dispatch(setLocalUserScreenSharingPeer(localScreenPeer));
    localScreenPeer.on("open", (screenSharingCallId) =>
      sendNotificationOfAddSharingModality(screenSharingCallId, id)
    );
    localScreenPeer.on("call", onScreenShareCallReceive);
  };

  const sendNotificationOfAddSharingModality = (
    screenSharingCallId,
    userId
  ) => {
    dispatch(setLocalUserScreenSharingId(screenSharingCallId));
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
      config: {
        iceServers: [
          {
            url: "turn:turn.anyfirewall.com:443?transport=tcp",
            credential: "webrtc",
            username: "webrtc",
          },
          {
            url: "turn:numb.viagenie.ca",
            credential: "muazkh",
            username: "webrtc@live.com",
          },
          {
            url: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
          {
            url: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
          {
            url: "turn:turn.bistri.com:80",
            credential: "homeo",
            username: "homeo",
          },
        ],
      },
    });
  };

  const muteByTeacher = () => {
    getLocalUserStream().getAudioTracks()[0].enabled = false;
    dispatch(setMicOn(false));
    if (ccRef && ccRef.current) {
      ccRef.current.muteClosedCaption();
    }
  };

  const muteUnmute = () => {
    const reduxIsMicOn = store.getState().video.micOn;
    if (reduxIsMicOn) {
      getLocalUserStream().getAudioTracks()[0].enabled = false;
      dispatch(setMicOn(false));
      if (ccRef && ccRef.current) {
        ccRef.current.muteClosedCaption();
      }
    } else {
      getLocalUserStream().getAudioTracks()[0].enabled = true;
      dispatch(setMicOn(true));
      if (ccRef && ccRef.current) {
        ccRef.current.unMuteClosedCaption();
      }
    }
    return getLocalUserStream().getAudioTracks()[0].enabled;
  };

  const videoOnOff = () => {
    const isVideoEnabled = store.getState().video.videoOn;
    if (isVideoEnabled) {
      getLocalUserStream().getVideoTracks()[0].enabled = false;
      dispatch(setVideoOn(false));
    } else {
      getLocalUserStream().getVideoTracks()[0].enabled = true;
      dispatch(setVideoOn(true));
    }
  };

  const endCall = async () => {
    if (ccRef && ccRef.current) {
      ccRef.current.endCloseCaption();
    }
    signalRService.stopConnection();

    getLocalUserPeer().destroy();
    getLocalUserScreenSharingPeer().destroy();

    dispatch(setVideoRows([]));

    getLocalUserStream()
      .getAudioTracks()
      .forEach(function (track) {
        track.stop();
      });
    getLocalUserStream()
      .getVideoTracks()
      .forEach(function (track) {
        track.stop();
      });

    getConnections().forEach((peer) => {
      const stream = peer.VideoElement.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(function (track) {
        track.stop();
      });

      peer.VideoElement.srcObject = null;
    });

    dispatch(setConnections([]));
    dispatch(setLocalUserPeer(null));
    dispatch(setLocalUserScreenSharingPeer(null));
    dispatch(setLocalUserStream(null));
    dispatch(setLocalUserScreenSharingStream(null));

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
      // localUserScreenSharingStream = stream;
      dispatch(setLocalUserScreenSharingStream(stream));

      dispatch(setScreenSharingStatus(false, true));

      getLocalUserScreenSharingStream().getVideoTracks()[0].onended = (
        event
      ) => {
        sendOtherToScreenClosed();
      };

      signalRService.invokeScreenSharingStatus(
        meetingId,
        getLocalUserId(),
        ScreeenSharingStatus.Started,
        userDisplayName
      );
    } catch (exception) {
      errorHandler(exception);
    }
  };

  const stopSharingScreen = () => {
    const tracks = getLocalUserScreenSharingStream().getTracks();
    tracks.forEach((track) => track.stop());
    sendOtherToScreenClosed();
  };

  const sendOtherToScreenClosed = () => {
    dispatch(setScreenSharingStatus(false, false));
    signalRService.invokeScreenSharingStatus(
      meetingId,
      getLocalUserId(),
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
        <div className={cameras_and_cc} id="video-grid-container">
          <VideoGridComponent
            name={userDisplayName}
            meeting="1"
            ccRef={ccRef}
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
