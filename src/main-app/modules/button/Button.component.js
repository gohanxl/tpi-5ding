import React from "react";
import { useHistory } from "react-router";
import "./Button.styles.scss";

const Button = ({ route = "", image, title }) => {
  const history = useHistory();
  return (
    <button
      onClick={() => history.push(route)}
      className="round-button has-text-centered"
    >
      <div className="button-background">
        <img src={image} alt={title} className="button-image" />
      </div>
      <h3 className="title is-6 button-text">{title}</h3>
    </button>
  );
};

export default Button;
