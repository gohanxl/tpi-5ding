import React from "react";

export const Home = ({ count, addToCounter }) => {
  return (
    <div>
      <div>{count}</div>
      <div onClick={() => addToCounter()}>Increase</div>
      <div>Decrease</div>
    </div>
  );
};
