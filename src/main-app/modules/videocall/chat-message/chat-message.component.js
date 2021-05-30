import React from "react";

export const ChatMessageComponent = (props) => {
  const { msg } = props;

  return (
    <div style="display: flex; flex-direction: column;">
      <mat-card
        styles={{
          "background-color": "#536DFE",
          color: "white",
          "align-self": "flex-start",
          "text-align": "start",
          "border-top-right-radius": "4px",
          "border-top-left-radius": "4px",
          "min-width": "250px",
          "max-width": "100%",
          "margin-bottom": "5px",
          "margin-top": "5px",
          padding: "20px 12px 12px 12px",
          display: "inline-flex",
          "flex-direction": "column",
        }}
      >
        <div style="top: 2px;margin-bottom: 15px; position: absolute;left: 4px; font-size: 12px; opacity: 0.6">
          {msg.user.displayName}
        </div>
        <div style="top: 2px;margin-bottom: 15px; position: absolute;right: 4px; font-size: 12px; opacity: 0.6">
          {msg.time || "Here Date"}
        </div>
        <span style="word-wrap: break-word;top: 2px">{msg.content}</span>
      </mat-card>
    </div>
  );
};
