/*eslint-disable*/
import React, { useEffect } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { es } from "date-fns/locale";
import SweetAlert from "react-bootstrap-sweetalert";
import { calendarService } from "./Calendar.service";

import "./Calendar.styles.scss";
import { useSelector } from "react-redux";

const calendarEvents = [];

const messages = {
  allDay: "Todo el dia",
  previous: "<",
  next: ">",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  showMore: (total) => `+ (${total}) Eventos`,
};

const locales = {
  es: es,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const Calendar = (props) => {
  const user = useSelector((state) => state.user.currentUser);

  const [events, setEvents] = React.useState([]);
  const [alert, setAlert] = React.useState(null);
  let title = "";
  let description = "";

  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    );
    return newDate;
  }

  const getAndSetEvents = () => {
    calendarService
      .getEvents(user.token, user.dbUser.Id)
      .then((response) => {
        response.data.events.map((event) => {
          event.start = convertUTCDateToLocalDate(new Date(event.start));
          event.end = convertUTCDateToLocalDate(new Date(event.end));
        });
        setEvents(response.data.events);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    if (user && user.dbUser) {
      getAndSetEvents();
    }
  }, [user]);

  const selectedEvent = (event) => {
    setAlert(
      <SweetAlert
        showCancel
        showCloseButton
        confirmBtnCssClass="btn-confirm"
        cancelBtnText="Eliminar"
        confirmBtnText="Cerrar"
        cancelBtnBsStyle="danger"
        title={event.title}
        onConfirm={() => hideAlert()}
        onCancel={() => deleteEvent(event)}
      >
        {event.description}
        <hr />
        {event.start.toLocaleTimeString().slice(0, -3)} -{" "}
        {event.end.toLocaleTimeString().slice(0, -3)}
      </SweetAlert>
    );
  };

  const deleteEvent = (event) => {
    calendarService.deleteEvent(user.token, event.id).then(
      setTimeout(() => {
        getAndSetEvents();
      }, 2000)
    );
    successAlert("El evento se elimino correctamente");
  };

  const successAlert = (message) => {
    setAlert(
      <SweetAlert
        success
        confirmBtnCssClass="btn-confirm"
        confirmBtnText="Cerrar"
        title={message}
        onConfirm={() => hideAlert()}
      />
    );
  };

  const addNewEventAlert = (slotInfo) => {
    setAlert(
      <SweetAlert
        title="Agregar evento"
        showCancel
        onConfirm={(e) => addNewEvent(e, slotInfo)}
        onCancel={() => hideAlert()}
        cancelBtnBsStyle="danger"
        confirmBtnCssClass="btn-confirm"
        cancelBtnText="Cancelar"
        confirmBtnText="Guardar"
        type={"controlled"}
        dependencies={[title, description]}
      >
        {(renderProps) => (
          <form>
            <input
              type={"text"}
              ref={renderProps.setAutoFocusInputRef}
              className="form-control"
              onKeyDown={renderProps.onEnterKeyDownConfirm}
              onChange={(e) => (title = e.target.value)}
              placeholder={"Titulo"}
            />
            <br />
            <textarea
              type={"text"}
              className="form-control"
              onKeyDown={renderProps.onEnterKeyDownConfirm}
              onChange={(e) => (description = e.target.value)}
              placeholder={"Descripcion"}
            />
            <hr />
          </form>
        )}
      </SweetAlert>
    );
  };

  const addNewEvent = (e, slotInfo) => {
    const body = {
      title: title,
      description: description,
      start: slotInfo.start,
      end: slotInfo.end,
      userId: user.dbUser.Id,
    };

    calendarService
      .createEvent(user.token, body)
      .then(() => {
        getAndSetEvents();
      })
      .catch((e) => console.error(e));

    successAlert("El evento se guardo correctamente");
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-12 calendar">
          {alert}
          <BigCalendar
            selectable
            messages={messages}
            localizer={localizer}
            culture={"es"}
            events={events}
            defaultView="week"
            scrollToTime={new Date(1990, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={(event) => selectedEvent(event)}
            onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
          />
        </div>
      </div>
    </div>
  );
};
