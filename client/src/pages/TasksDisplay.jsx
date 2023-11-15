import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TaskDetailsAPI from "../services/taskDetails.js"
import tasksData from "../dummydata/taskDetails.js";
import { useParams } from 'react-router-dom';


function TasksDisplay (){
    const [tasks, setTasks] = useState([]) // api call will only fetch the tasks relevant to the board and date selected
    const { board, date } = useParams()

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const data = await TaskDetailsAPI.tasksByDate()
    //             setTasks(data.data)
    //         } catch (error) {
    //             throw error
    //         }
    //     }) ()
    // }, [])

    useEffect(() => {
        console.log("inside of useeffect")
        setTasks(tasksData)
        console.log(tasksData)
        console.log(board)
        console.log(date)
    },[])

    return(
        <div>
            {
                tasks && tasks.length > 0 ? tasks.map((task) => 
                    <TaskCard key={task.id} task={task} /> 
                ) : <h3>{'No tasks available!'}</h3>
            }
        </div>
    )
}

export default TasksDisplay