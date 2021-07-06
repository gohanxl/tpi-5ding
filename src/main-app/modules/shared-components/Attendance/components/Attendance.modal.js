import React, { useEffect, useState } from "react";

export const AttendanceModal = (props) => {
  const { iAmPresent, toggle } = props;

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened(props.isOpened);
  }, [props]);

  const toggleChild = (e) => {
    e.preventDefault();
    setIsOpened((prevOpened) => !prevOpened);
    toggle();
  };

  return (
    <div className={isOpened ? "modal is-active" : "modal"}>
      <div className="modal-card">
        <header className="modal-card-head">
          <h2 className="modal-card-title">Asistencia</h2>
          <button
            className="delete"
            aria-label="close"
            onClick={toggleChild}
          ></button>
        </header>
        <section className="modal-card-body">
          <p>Por favor, indique que se encuentra presente en la clase.</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={iAmPresent}>
            Presente
          </button>
        </footer>
      </div>
    </div>
  );
};
