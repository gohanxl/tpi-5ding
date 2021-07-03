/*eslint-disable*/
import React from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { es } from "date-fns/locale";
import SweetAlert from "react-bootstrap-sweetalert";

import "./Calendar.styles.scss";

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
  const [events, setEvents] = React.useState(calendarEvents);
  const [alert, setAlert] = React.useState(null);
  const selectedEvent = (event) => {
    setAlert(
      <SweetAlert
        title={event.title}
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
      >
        {event.start.toLocaleTimeString().slice(0, -3)} -{" "}
        {event.end.toLocaleTimeString().slice(0, -3)}
      </SweetAlert>
    );
  };
  const addNewEventAlert = (slotInfo) => {
    setAlert(
      <SweetAlert
        input
        showCancel
        cancelBtnBsStyle="danger"
        confirmBtnCssClass="btn-confirm"
        title="Agrega tu evento"
        cancelBtnText="Cancelar"
        confirmBtnText="Guardar"
        onConfirm={(e) => addNewEvent(e, slotInfo)}
        onCancel={() => hideAlert()}
      />
    );
  };
  const addNewEvent = (e, slotInfo) => {
    var newEvents = events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setAlert(null);
    setEvents(newEvents);
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
            defaultView="month"
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={(event) => selectedEvent(event)}
            onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
          />
        </div>
      </div>
    </div>
  );
};
