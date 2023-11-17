import React, {useState, useEffect} from 'react';
import {Link, useParams } from 'react-router-dom';
import BoardDetailsAPI from "../services/boardDetails.js"
import TaskDetailsAPI from "../services/taskDetails.js"
/*
add task from date page
default: set creator (from context provider), date (from url), board (from url) 
drop down: set assignee, priority, status
text: description, start time, end time 
*/

const CreateTask = () => {

    const [selectedAssignee, setSelectedAssignee] = useState([])
    const [creator, setCreator] = useState() // replaced with context provider
    const [boardInfo, setBoardInfo] = useState([])
    const [boardMembers, setBoardMembers] = useState([])
    const [status, setStatus] = useState('')
    const [priority, setPriority] = useState('')
    const [description, setDescription] = useState('')
    const [startTime, setStartTime] = useState('')
    // const [endTime, setEndTime] = useState('')

    const statusChoices = ['Pending', 'Completed']
    const priorityChoices = ['Red', 'Yellow', 'Green']



    useEffect(() => {
        
        (async () => {
            // get board info by id
            try {
                const data = await BoardDetailsAPI.getBoardById(board)
                setBoardInfo(data.data)
            } catch (error) {
                throw error
            }

            // get board members
            try {
                const data = await BoardDetailsAPI.getUsersByBoardId(board)
                console.log("setting board members data")
                console.log(data.data)
                setBoardMembers(data.data)
            } catch (error) {
                throw error
            }

            // get task creator details
            // try {
            //     const data = await UserDetailsAPI.getUserById(task[0].task_creator_id)
            //     console.log(data.data)
            //     setCreator(data.data)                
            // } catch (error) {
            //     throw error
            // }
        }) ();

    }, [])

    const handleOnChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'assignee') { // not super foolproof
            const temp = boardMembers.filter((member) => member.name === value)
            console.log("new assignee is")
            console.log(temp)
            setSelectedAssignee(temp);
        } 
        else if (name === 'priority') {
            setPriority(value);
            console.log(value)
        }
        else if (name === 'description') {
            setDescription(value);
            console.log(value)
        }
        else if (name === 'start_time') {
            setStartTime(value);
        }
        // else if (name === 'end_time') {
        //     setEndTime(value);
        // }
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault()

        event.preventDefault()
        // send task details through edit api
        console.log(board)
        console.log(boardMembers[0].user_id)
        console.log(selectedAssignee[0].user_id)
        console.log(description)
        console.log(priority)
        console.log(startTime)
        // console.log(endTime)
        console.log(date)
        const createdTask = {
            board: board,
            creator: boardMembers[0].user_id, // random for now
            assignee: selectedAssignee[0].user_id,
            description: description,
            priority: priority,
            status: "Pending",
            start_time: startTime,
            end_time: "10:00", // random for now
            date: date
        }

        await TaskDetailsAPI.create(createdTask)
        window.location = `/board/${board}/${date}`
    }

    const{board, date} = useParams();

    return (
      
        <div>
            <form onSubmit={handleOnSubmit}>
                <h2>Creating new task for {boardInfo[0]?.board_name}</h2>

                <div style={{ display: 'flex', flexDirection:'column', margin: '20px', justifyContent: 'center'}}>
                    
                    <label htmlFor="assignee">
                        Select Assignee
                        <select className='dropdown'id="assignee" name="assignee" value={selectedAssignee[0] ? selectedAssignee[0].name : ''} onChange={handleOnChange}>
                            <option value="" disabled>--Select--</option>
                            {boardMembers.map((member, index) => (
                            <option key={index} value={member.name}>
                                {member.name}
                            </option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor="priority">
                        Select Priority
                        <select className='dropdown'id="priority" name="priority" value={priority ? priority : ''} onChange={handleOnChange}>
                            <option value="" disabled>--Select--</option>
                            {priorityChoices.map((choice, index) => (
                            <option key={index} value={choice}>
                                {choice}
                            </option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor='description'>
                        Task Description
                        <input type='text' id='description' name='description' value={description} onChange={handleOnChange} />
                    </label>

                    <label htmlFor='start_time'>
                        Start Time
                        <input type='text' id='start_time' name='start_time' value={startTime} onChange={handleOnChange} />
                    </label>

                    <div style={{ display: 'flex', flexDirection:'rows', padding: '15px', margin: '20px', justifyContent: 'center'}}>
                        <button type='submit'>Create</button>
                        <Link to={`/board/${board}/${date}`}><button>Cancel</button></Link>
                    </div>
                </div>
            </form>
        </div>
      
    )
  }
  
  export default CreateTask