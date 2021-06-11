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

  asyncConnection = () => {
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_HUB_URL)
      .build();

    return this.hubConnection
      .start()
      .then(() => {
        this.isServiceStarted = true;
        console.log("Connection established successfully!");
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  startConnection = (method) => {
    if (this.isServiceStarted) {
      if (method !== null) {
        method();
      }
    } else {
      this.hubConnection = new SignalR.HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_HUB_URL)
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
    // eslint-disable-next-line
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
        console.log("Chat Message broadcasted successfully!");
      })
      .catch((error) => console.log(error));
  };

  invokeSendClosedCaption = (roomId, closedCaption) => {
    this.hubConnection.invoke("SendClosedCaption", roomId, closedCaption);
  };

  listenReceiveClosedCaption = (method) => {
    this.hubConnection.on("ReceiveClosedCaption", (data) => {
      if (method !== null) {
        method(data);
      }
    });
  };

  listenJoinedRoom = (method) => {
    this.hubConnection.on("JoinedRoom", (roomId, userId, displayName) => {
      if (method !== null) {
        method(roomId, userId, displayName);
      }
    });
  };

  invokeJoinedRoom = (roomId, userId, displayName) => {
    return this.hubConnection
      .invoke("JoinedRoom", roomId, userId, displayName)
      .then(() => {
        console.log("Joined Room broadcasted successfully!");
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

  listenUpdateParticipants = (method) => {
    this.hubConnection.on(
      "UpdateParticipants",
      (roomId, userId, displayName) => {
        if (method !== null) {
          method(roomId, userId, displayName);
        }
      }
    );
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
        console.log("Get remote user details successfully!");
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
        console.log("Get participants list successfully!");
      })
      .catch((error) => console.log(error));
  };

  invokeAddScreenSharingModality = (roomId, userId, screenSharingCallId) => {
    this.hubConnection
      .invoke("AddScreenSharingModality", roomId, userId, screenSharingCallId)
      .then(() => {
        console.log("Connected sharescreen peer successfully!");
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
        console.log("Share screen broadcasted successfully!");
      })
      .catch((error) => console.log(error));
  };

  invokeCheckAttendance = (classId, userId, meetingId) => {
    this.hubConnection
      .invoke("CheckAttendance", classId, userId, meetingId)
      .then(() => {
        console.log("Asked for attendance broadcasted successfully!");
      })
      .catch((error) => console.log(error));
  };

  listenAskForAttendance = (method) => {
    this.hubConnection.on("AskForAttendance", (cronogramaId) => {
      if (method !== null) {
        method(cronogramaId);
      }
    });
  };

  invokeIAmPresent = (cronogramaId, userId) => {
    this.hubConnection
      .invoke("IAmPresent", cronogramaId, userId)
      .then(() => {
        console.log("I am present broadcasted successfully!");
      })
      .catch((error) => console.log(error));
  };

  invokeRemoveParticipant = (roomId, userId) => {
    this.hubConnection
      .invoke("RemoveParticipant", roomId, userId)
      .then(() => {
        console.log(`Removed participant ${userId} broadcasted successfully!`);
      })
      .catch((error) => console.log(error));
  };

  listenIAmExpelled = (method) => {
    this.hubConnection.on("IAmExpelled", () => {
      if (method !== null) {
        method();
      }
    });
  };

  invokeGetSelfUid = () => {
    this.hubConnection
      .invoke("GetSelfUid")
      .then(() => {
        console.log("Trying to get self uid successfully!");
      })
      .catch((error) => console.log(error));
  };

  listenGetSelfUid = (method) => {
    this.hubConnection.on("GetSelfUid", (uid) => {
      if (method !== null) {
        method(uid);
        console.log("Received get self uid and method executed.", uid);
      } else {
        console.log("Received get self uid and method not executed.", uid);
      }
    });
  };
}
