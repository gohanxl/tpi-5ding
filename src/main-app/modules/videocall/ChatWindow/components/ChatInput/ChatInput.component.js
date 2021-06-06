import React from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  chat_input__wrapper,
  chat_input,
  chat_button,
} from "./ChatInput.module.scss";

export const ChatInput = ({ submit }) => {
  return (
    <form onSubmit={submit}>
      <div className="field has-addons">
        <div className={`control ${chat_input__wrapper}`}>
          <input
            className={`input is-normal ${chat_input}`}
            type="text"
            id="message"
            name="message"
          />
        </div>

        <div className="control">
          <button className={`button ${chat_button}`}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </form>
  );
};
