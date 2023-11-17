import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import TaskDetailsAPI from "../services/taskDetails.js";
import UserDetailsAPI from "../services/userDetails.js";
import BoardDetailsAPI from "../services/boardDetails.js";

const EditTask = () => {
  const { board, date, task_id } = useParams();
  const [selectedAssignee, setSelectedAssignee] = useState([]);
  // const [creator, setCreator] = useState([])
  const [boardInfo, setBoardInfo] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState('')
  const [taskDate, setTaskDate] = useState(""); // can simplify the number of vars later
  const [task, setTask] = useState({});

  const statusChoices = ["Pending", "Completed"];
  const priorityChoices = ["Red", "Yellow", "Green"];

  /*
    NO end time
    react date time picker for setting date and start time
    */

  useEffect(() => {
    (async () => {
      // get/set task details and set assignee data
      try {
        const data = await TaskDetailsAPI.taskById(task_id);
        setTask(data.data);
        setStatus(data.data[0].task_status);
        setPriority(data.data[0].task_priority);
        setDescription(data.data[0].task_description);
        setStartTime(data.data[0].task_start_time);
        // setEndTime(data.data[0].task_end_time)
        setTaskDate(data.data[0].task_date);

        const data2 = await UserDetailsAPI.getUserById(
          data.data[0].task_assignee_id
        );
        console.log("setting og assignee");
        console.log(data2.data);
        setSelectedAssignee(data2.data);
      } catch (error) {
        throw error;
      }

      // get board info by id
      try {
        const data = await BoardDetailsAPI.getBoardById(board);
        setBoardInfo(data.data);
      } catch (error) {
        throw error;
      }

      // get board members
      try {
        const data = await BoardDetailsAPI.getUsersByBoardId(board);
        console.log("setting board members data");
        console.log(data.data);
        setBoardMembers(data.data);
      } catch (error) {
        throw error;
      }

      // get task creator details
      // try {
      //     const data = await UserDetailsAPI.getUserById(task[0].task_creator_id)
      //     console.log(data.data)
      //     setCreator(data.data)
      // } catch (error) {
      //     throw error
      // }
    })();
  }, []);
  /*
    user can not change a task's board (for right now)
    user can not change who created the task (for right now)

    assignee (comes from board members), priority, status are all drop downs
    description, date, start time, end time are editable fields
    */

  const handleDelete = async (event) => {
    // add api call for deleting a task
    event.preventDefault();
    try {
      await TaskDetailsAPI.delete(task_id);
      console.log("task has been deleted");
    } catch (error) {
      throw error;
    }
    window.location = `/board/${board}/${date}`;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    // send task details through edit api
    console.log(board);
    console.log(selectedAssignee[0].user_id);
    console.log(description);
    console.log(priority);
    console.log(status);
    console.log(startTime);
    // console.log(endTime)
    console.log(taskDate);
    const updatedTask = {
      board: board,
      assignee: selectedAssignee[0].user_id,
      description: description,
      priority: priority,
      status: status,
      start_time: startTime,
      end_time: "1:00", // random for now
      date: taskDate,
    };

    await TaskDetailsAPI.update(task_id, updatedTask);
    window.location = `/board/${board}/${date}`;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "assignee") {
      // not super foolproof
      const temp = boardMembers.filter((member) => member.name === value);
      console.log("new assignee is");
      console.log(temp);
      setSelectedAssignee(temp);
    } else if (name === "status") {
      setStatus(value);
      console.log(value);
    } else if (name === "priority") {
      setPriority(value);
      console.log(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "start_time") {
      setStartTime(value);
    } else if (name === "end_time") {
      setEndTime(value);
    } else if (name === "date") {
      setTaskDate(value);
    }
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h2 style={{ textTransform: "capitalize" }}>
          Editing task {task[0]?.task_id} for {boardInfo[0]?.board_name}
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              style={{
                background: "white",
                padding: "2px 5px",
                marginLeft: "5px",
              }}
            >
              Select Assignee
            </InputLabel>
            <Select
              className="dropdown"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="assignee"
              value={selectedAssignee[0] ? selectedAssignee[0].name : ""}
              onChange={handleOnChange}
            >
              {boardMembers.map((member, index) => (
                <MenuItem key={index} value={member.name}>
                  {member.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel
              htmlFor="status"
              style={{
                background: "white",
                padding: "2px 5px",
                marginLeft: "5px",
              }}
            >
              Select Status
            </InputLabel>
            <Select
              className="dropdown"
              id="status"
              name="status"
              value={status ? status : ""}
              onChange={handleOnChange}
            >
              {statusChoices.map((choice, index) => (
                <MenuItem key={index} value={choice}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel
              htmlFor="priority"
              style={{
                background: "white",
                padding: "2px 5px",
                marginLeft: "5px",
              }}
            >
              Select Priority
            </InputLabel>
            <Select
              className="dropdown"
              id="priority"
              name="priority"
              value={priority ? priority : ""}
              onChange={handleOnChange}
            >
              {priorityChoices.map((choice, index) => (
                <MenuItem key={index} value={choice}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="description"
            name="description"
            label="Task Description"
            value={description}
            onChange={handleOnChange}
          />

          <TextField
            id="start_time"
            name="start_time"
            label="Start Time"
            value={startTime}
            onChange={handleOnChange}
          />

          <TextField
            id="date"
            name="date"
            label="Date"
            value={taskDate}
            onChange={handleOnChange}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "rows",
              padding: "15px",
              margin: "20px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                marginTop: "-20px",
              }}
            >
              <Button variant="contained" type="submit">
                Update
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete Task
              </Button>
              <Link to={`/board/${board}/${date}`}>
                <Button variant="contained">Cancel</Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
