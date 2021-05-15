import React from "react";
import { Chat } from "../../Chat/Chat.component";
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
        <Chat />
      </aside>
    </div>
  );
};
