import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate, useLocation } from "react-router-dom";

const CalendarView = () => {
  // Use the useLocation hook to get the location object
  const location = useLocation();
  const navigate = useNavigate();

  // Access the board data from the location.state object
  const board = location.state;

  // Use the received props in your component
  console.log("Received Board Data:", board);

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  function handleDateClick(info) {
    // Access the clicked event information here
    const parts = info.dateStr.split("-");
    const newDate = `${parts[1]}-${parts[2]}-${parts[0]}`;
    //console.log("Date Clicked:", newDate);
    const tasks_display_url = `/board/${board.board_id}/${newDate}`;
    console.log(tasks_display_url);
    navigate(tasks_display_url);
  }

  return (
    <div className="calendar-container" style={{ width: "1000px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title",
          right: "prev,next",
        }}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        height="75vh"
      />
    </div>
  );
};

export default CalendarView;
