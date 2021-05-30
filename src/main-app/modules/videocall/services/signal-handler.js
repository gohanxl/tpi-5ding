import React from "react";
import * as SignalR from "@microsoft/signalr";

export class SignalHandlerService {
  isServiceStarted = false;

  constructor() {}

  hubConnection = null;

  static instance = null;

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new SignalHandlerService();
      return this.instance;
    }
    return this.instance;
  };

  startConnection = (method) => {
    if (this.isServiceStarted) {
      if (method !== null) {
        method();
      }
    } else {
      this.hubConnection = new SignalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/SanvaadConnection")
        .build();

      this.hubConnection
        .start()
        .then(() => {
          this.isServiceStarted = true;
          if (method !== null) {
            method();
          }
          console.log("Connection established successfully!");
        })
        .catch((error) => console.log(error));
    }
  };

  stopConnection = () => {
    this.isServiceStarted = false;
    this.hubConnection
      .stop()
      .then(() => {
        console.log("Connection Closed!");
      })
      .catch((error) => console.log(error));
  };

  disConnection = () => {
    this.hubConnection.onclose((error) => {
      console.log("Disconncted from call.");
    });
  };

  listenReceiveMessage = (method) => {
    this.hubConnection.on("ReceiveMessage", (data) => {
      if (method !== null) {
        method(data);
        console.log("Message received and method executed.", data);
      } else {
        console.log("Message received and method not executed.", data);
      }
    });
  };

  invokeSendMessageToAll = (roomId, data) => {
    this.hubConnection
      .invoke("SendMessageToAll", roomId, data)
      .then(() => {
        console.log("Data broadcasted successfully!");
      })
      .catch((error) => console.log(error));
  };

  listenJoinedRoom = (method) => {
    this.hubConnection.on("JoinedRoom", (roomId, userId, displayName) => {
      if (method !== null) {
        method(roomId, userId, displayName);
      }
    });
  };

  invokeJoinedRoom = (roomId, userId, displayName) => {
    this.hubConnection
      .invoke("JoinedRoom", roomId, userId, displayName)
      .then(() => {
        console.log("Data broadcasted successfully!");
      })
      .catch((error) => console.log(error));
  };

  listenUserLeftRoom = (method) => {
    this.hubConnection.on("LeftRoom", (roomId, userId) => {
      if (method !== null) {
        method(roomId, userId);
      }
    });
  };

  listenGetSelfDetails = (method) => {
    this.hubConnection.on("GetSelfDetails", (user) => {
      if (method !== null) {
        method(user);
        console.log("Received get self details and method executed.", user);
      } else {
        console.log("Received get self details and method not executed.", user);
      }
    });
  };

  invokeGetSelfDetails = () => {
    this.hubConnection
      .invoke("GetSelfDetails")
      .then(() => {
        console.log("Trying to get self details successfully!");
      })
      .catch((error) => console.log(error));
  };

  listenGetRemoteUserDetails = (method) => {
    this.hubConnection.on("GetRemoteUser", (userName, userId) => {
      if (method !== null) {
        method(userName, userId);
      }
    });
  };

  invokeGetRemoteUserDetails = (userId) => {
    this.hubConnection
      .invoke("GetRemoteUser", userId)
      .then(() => {
        console.log("Data broadcasted successfully!");
      })
      .catch((error) => console.log(error));
  };

  listenGetPaticipantsList = (method) => {
    this.hubConnection.on("PaticipantsList", (users) => {
      if (method !== null) {
        method(users);
      }
    });
  };

  invokeGetPaticipantsList = (roomId) => {
    this.hubConnection
      .invoke("PaticipantsList", roomId)
      .then(() => {
        console.log("Data broadcasted successfully!");
      })
      .catch((error) => console.log(error));
  };

  invokeAddScreenSharingModality = (roomId, userId, screenSharingCallId) => {
    this.hubConnection
      .invoke("AddScreenSharingModality", roomId, userId, screenSharingCallId)
      .then(() => {
        console.log("Data broadcasted successfully!");
      })
      .catch((error) => console.log(error));
  };

  listenScreenSharingStatus = (method) => {
    this.hubConnection.on("ScreenSharingStatus", (status, userName) => {
      if (method !== null) {
        method(status, userName);
      }
    });
  };

  listenScreeenSharingStatusWithUserList = (method) => {
    this.hubConnection.on(
      "ScreeenSharingStatusWithUserList",
      (userIds, status) => {
        if (method !== null) {
          method(userIds, status);
        }
      }
    );
  };

  invokeScreenSharingStatus = (roomId, userId, status, userName) => {
    this.hubConnection
      .invoke("ScreenSharingStatus", roomId, userId, status, userName)
      .then(() => {
        console.log("Data broadcasted successfully!");
      })
      .catch((error) => console.log(error));
  };
}
