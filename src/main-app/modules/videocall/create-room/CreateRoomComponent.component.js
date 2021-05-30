import React, {useState} from "react";
import "./CreateRoomComponent.styles.scss";
import {v4} from "uuid";

export const CreateRoomComponent = () => {

    const [isMeetingURLCreated, setIsMeetingURLCreated] = useState(false);
    const [meetingUrl, setMeetingUrl] = useState();

    const createRoomId = () => {
        const meetingId = v4();
        setMeetingUrl(`${location.origin}/join/${meetingId}`);
        setIsMeetingURLCreated(true)
        this.router.navigate([`/join/${meetingId}`]);//TODO what is this router?
    };

    const joinRoom = () => {
        const meetingId = document.getElementById('meeting_id_join').value;
        if (meetingId) {
            this.router.navigate([`/join/${meetingId}`]); //TODO what is this router?
        }
    };

    return <div className="container-fluid h-100">
        <div className="row h-100">
            <div className="col-sm-6 col-2 h-100  py-2 d-flex align-items-center justify-content-center fixed-top"
                 id="left">


                <div style="margin: 10px;">
                    <button color="primary" onClick={() => createRoomId()}>
                        <mat-icon>
                            video_call
                        </mat-icon>
                        Create Room
                    </button>
                </div>

                <b>OR</b>

                <div style=" margin-left: 10px;">
                    <mat-form-field>
                        <input id="meeting_id_join" placeholder="Meeting Id"/>
                    </mat-form-field>
                </div>

                <div style="margin-left: 10px;">
                    <button color="primary"
                            onClick={() => joinRoom()}
                        // disabled="joinInput.hasError('required') ? true : false"
                    >Join
                    </button>
                </div>


            </div>
            <div className="col-sm-6 invisible col-2">
                <!--hidden spacer-->
            </div>
            <div className="col offset-2 offset-sm-6 py-2 align-items-center justify-content-center">
                <img src="./sanvaad.png" style="margin-top: 50px; margin-left: 30px;"/>
            </div>
        </div>
    </div>

};
