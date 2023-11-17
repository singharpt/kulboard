import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "./CalendarView.css"; // Create a separate CSS file for styling

const CalendarView = () => {
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  return (
    <div className="calendar-container" style={{ width: "1000px" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title",
          right: "prev,next",
        }}
        events={[]}
        eventContent={renderEventContent}
        height="75vh"
      />
    </div>
  );
};

export default CalendarView;
