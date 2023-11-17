import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Paper,
  FormControl,
  InputLabel,
} from "@mui/material";
import BoardDetailsAPI from "../services/boardDetails.js";
import TaskDetailsAPI from "../services/taskDetails.js";
import { MyContext } from "../components/ContextProvider";

const CreateTask = () => {
  const { board, date } = useParams();
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [boardInfo, setBoardInfo] = useState({});
  const [boardMembers, setBoardMembers] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const { user } = useContext(MyContext);

  const statusChoices = ["Pending", "Completed"];
  const priorityChoices = ["Red", "Yellow", "Green"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BoardDetailsAPI.getBoardById(board);
        setBoardInfo(data.data[0]);
      } catch (error) {
        throw error;
      }

      try {
        const data = await BoardDetailsAPI.getUsersByBoardId(board);
        setBoardMembers(data.data);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, [board]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "assignee") {
      setSelectedAssignee(value);
    } else if (name === "priority") {
      setPriority(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "start_time") {
      setStartTime(value);
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const createdTask = {
      board: board,
      creator: user.user_id,
      assignee: selectedAssignee,
      description: description,
      priority: priority,
      status: "Pending",
      start_time: startTime,
      end_time: "10:00", // random for now
      date: date,
    };

    await TaskDetailsAPI.create(createdTask);
    window.location = `/board/${board}/${date}`;
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
          <Typography
            variant="h5"
            style={{ textTransform: "capitalize", marginBottom: "20px" }}
          >
            Creating new task for {boardInfo.board_name}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel
                  htmlFor="assignee"
                  style={{
                    background: "white",
                    padding: "2px 5px",
                    marginLeft: "5px",
                  }}
                >
                  Select Assignee
                </InputLabel>
                <Select
                  id="assignee"
                  name="assignee"
                  value={selectedAssignee}
                  onChange={handleOnChange}
                >
                  <MenuItem value="" disabled>
                    --Select--
                  </MenuItem>
                  {boardMembers.map((member, index) => (
                    <MenuItem key={index} value={member.user_id}>
                      {member.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
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
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={handleOnChange}
                >
                  <MenuItem value="" disabled>
                    --Select--
                  </MenuItem>
                  {priorityChoices.map((choice, index) => (
                    <MenuItem key={index} value={choice}>
                      {choice}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Task Description"
                value={description}
                onChange={handleOnChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="start_time"
                name="start_time"
                label="Start Time"
                type="text"
                value={startTime}
                onChange={handleOnChange}
              />
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "500",
                  }}
                >
                  Create
                </Button>
                <Link to={`/board/${board}/${date}`}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: "500",
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

export default CreateTask;
