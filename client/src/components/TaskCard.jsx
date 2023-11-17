import React from "react";
import "../App.css";
import ReactModal from "react-modal";
import { useState, useEffect } from "react";
import UserDetailsAPI from "../services/userDetails.js";
import TaskDetailsAPI from "../services/taskDetails.js";

// need to replace 'assigned to' with user's name

function TaskCard({ task }) {
  // const handleOnClick = (event) => {
  //     event.preventDefault()
  //     window.location.href = `/tasks/${task.task_id}`
  // }

  // style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
  //content: {maxWidth:'500px', maxHeight: '500px', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', borderRadius:'5px', backgroundColor:'#a3b18a'}}}

  const [viewDetails, setViewDetails] = useState(false);
  const [creator, setCreator] = useState([]);
  const [assignee, setAssignee] = useState([]);

  const openModal = () => {
    setViewDetails(true);
  };

  const closeModal = () => {
    setViewDetails(false);
  };

  const handleEdit = (event) => {
    // link to edit form
    event.preventDefault();
    window.location.href = `/board/${task.board_id}/${task.task_date}/${task.task_id}`;
  };

  useEffect(() => {
    (async () => {
      // set assignee details
      try {
        const data = await UserDetailsAPI.getUserById(task.task_assignee_id);
        //console.log(data.data)
        setAssignee(data.data);
      } catch (error) {
        throw error;
      }

      // set creator details
      try {
        const data = await UserDetailsAPI.getUserById(task.task_creator_id);
        //console.log(data.data)
        setCreator(data.data);
      } catch (error) {
        throw error;
      }
    })();
  }, []); // add tasks?

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        margin: "10px",
      }}
    >
      <div>
        <h4>
          Assigned to{" "}
          {assignee && assignee.length > 0 ? assignee[0].name : null}
        </h4>

        <p>
          <span style={{ fontWeight: "600" }}>Status :</span> {task.task_status}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Description :</span>{" "}
          {task.task_description}
        </p>
        <button onClick={openModal}> View Details </button>
        {viewDetails == true ? (
          <ReactModal
            isOpen={openModal}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={{
              overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
              content: {
                maxWidth: "500px",
                maxHeight: "500px",
                top: "50%",
                left: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: "translate(-50%, -50%)",
                borderRadius: "5px",
              },
            }}
          >
            <div>
              <h2 style={{ textAlign: "center", fontWeight: "700" }}>
                Task Details
              </h2>
              <p>
                <span style={{ fontWeight: "600" }}>Assigned by: </span>
                {creator && creator.length > 0 ? creator[0].name : null}
              </p>
              <p>
                <span style={{ fontWeight: "600" }}>Start time: </span>
                {task.task_start_time}
              </p>
              {/* <p>End time: {task.task_end_time}</p> */}
              <p>
                <span style={{ fontWeight: "600" }}>Status: </span>
                {task.task_status}
              </p>
              <p>
                <span style={{ fontWeight: "600" }}>Priority: </span>
                {task.task_priority}
              </p>
              <p>
                <span style={{ fontWeight: "600" }}>Description: </span>
                {task.task_description}
              </p>
              <div>
                <button onClick={closeModal}>Close Details</button>
                <button onClick={handleEdit}>Edit task</button>
              </div>
            </div>
          </ReactModal>
        ) : null}
      </div>
    </div>
  );
}

export default TaskCard;
