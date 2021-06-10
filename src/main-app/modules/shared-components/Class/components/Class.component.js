import React from "react";
import { ChatContainer } from "../../Chat/Chat.container";
import { lecture, cameras, chat } from "./Class.module.scss";

export const Class = () => {
  const students = [
    { id: 1, name: "Pepito" },
    { id: 2, name: "Pedro" },
  ];

  return (
    <div className={lecture}>
      <section className={cameras}>
        {students.map(({ id, name }) => {
          return (
            <div key={id}>
              <span>{name}</span>
            </div>
          );
        })}
      </section>
      <aside className={chat}>
        <ChatContainer />
      </aside>
    </div>
  );
};
