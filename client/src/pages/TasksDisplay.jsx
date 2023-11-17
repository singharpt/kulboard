import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Divider } from "@mui/material";
import TaskCard from "../components/TaskCard";
import TaskDetailsAPI from "../services/taskDetails.js";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function TasksDisplay() {
  const [tasks, setTasks] = useState([]);
  const { board, date } = useParams();

  const addTask = () => {
    window.location.href = `/board/${board}/${date}/create`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TaskDetailsAPI.tasksByDate(board, date);
        setTasks(data.data);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, [board, date]);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {tasks.length > 0 && (
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Tasks Available
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addTask}
          style={{ marginBottom: "8px", marginLeft: "20px" }}
        >
          Add New Task
        </Button>
      </Box>

      <Divider />

      {tasks.length > 0 ? (
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          mt={2}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Box>
      ) : (
        <Typography variant="h5" sx={{ textAlign: "center", marginTop: 2 }}>
          No tasks available!
        </Typography>
      )}
    </Box>
  );
}

export default TasksDisplay;
