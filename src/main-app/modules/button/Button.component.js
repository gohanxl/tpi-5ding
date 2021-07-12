import React from "react";
import "./Button.styles.scss";

const Button = ({ route = "", image, title }) => {
  return (
    <a href={`#${route}`} className="has-text-centered">
      <div className="button-background">
        <img src={image} alt={title} className="button-image" />
      </div>
      <h3 className="title is-6 button-text">{title}</h3>
    </a>
  );
};

export default Button;
