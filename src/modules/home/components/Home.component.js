import React from "react";
import "./Home.styles.scss"
import Chat from './Chat'

export const Home = ({ count, addToCounter, history }) => {
  return (
    <div style={{ margin: '0 30%' }}>
      <Chat />
    </div>
  );
};
