import React, { useState } from "react";
import { TableComponent } from "../shared-components/grid/components/Table.component";

export const MessageView = () => {
  const [showIncoming, setShowIncoming] = useState(true);
  const [headers, setHeaders] = useState([
    "Fecha",
    "Remitente",
    "Asunto",
    "Acciones",
  ]);

  // eslint-disable-next-line
  const [messages, setMessages] = useState([
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
    [
      "2021-05-29 10:00:00",
      <a key={1}>Juan Perez</a>,
      "Reunion Importante",
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Responder
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
        </button>
      </div>,
    ],
  ]);

  const toggleSection = (incomingFlag) => {
    if (incomingFlag === showIncoming) {
      return;
    }

    setShowIncoming(incomingFlag);
    if (incomingFlag) {
      headers[1] = "Remitente";
      setHeaders(headers);
      document
        .getElementById("incoming_msg")
        .classList.add("is-info", "is-selected");
      document
        .getElementById("outcoming_msg")
        .classList.remove("is-info", "is-selected");
    } else {
      headers[1] = "Destinatario";
      setHeaders(headers);
      document
        .getElementById("incoming_msg")
        .classList.remove("is-info", "is-selected");
      document
        .getElementById("outcoming_msg")
        .classList.add("is-info", "is-selected");
    }
  };

  return (
    <section>
      <div className="card">
        <div className="level card-header">
          <div className="level-left">
            <button className="button is-success">Nuevo Mensaje</button>
          </div>
          <div className="level-right">
            <div className="buttons has-addons level-item">
              <button
                id="incoming_msg"
                className="button is-info is-selected"
                onClick={() => toggleSection(true)}
              >
                Bandeja de Entrada
              </button>
              <button
                id="outcoming_msg"
                className="button"
                onClick={() => toggleSection(false)}
              >
                Bandeja de Salida
              </button>
            </div>
          </div>
        </div>
        <div className="card-content">
          {showIncoming && (
            <div>
              <h1 className="title is-2">Bandeja de Entrada</h1>
              <TableComponent headers={headers} data={messages} />
            </div>
          )}

          {!showIncoming && (
            <div>
              <h1 className="title is-2">Bandeja de Salida</h1>
              <TableComponent headers={headers} data={messages} />
            </div>
          )}
          <br />
          {/*<nav className="pagination" role="navigation" aria-label="pagination">*/}
          <div className="level">
            <div className="level-left">
              <ul className="pagination-list">
                <li>
                  <a
                    className="pagination-link is-current"
                    aria-label="Page 1"
                    aria-current="page"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a className="pagination-link" aria-label="Goto page 2">
                    2
                  </a>
                </li>
                <li>
                  <a className="pagination-link" aria-label="Goto page 3">
                    3
                  </a>
                </li>
              </ul>
            </div>
            <div className="level-right">
              <a
                className="pagination-previous"
                title="This is the first page"
                disabled
              >
                Previous
              </a>
              <a className="pagination-next">Next page</a>
            </div>
          </div>
          {/*</nav>*/}
        </div>
      </div>
    </section>
  );
};
