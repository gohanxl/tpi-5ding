import React from "react";
import "./Button.styles.scss";
import { useHistory } from "react-router";

const Button = (props) => {
  const history = useHistory();
  return (
    <a onClick={() => history.push(props.route)} className="has-text-centered">
      <div className="button-background">
        <img src={props.image} alt={props.title} className="button-image" />
      </div>
      <h3 className="title is-6 button-text">{props.title}</h3>
    </a>
  );
};

export default Button;
