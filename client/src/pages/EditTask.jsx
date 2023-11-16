import React, {useState, useEffect} from 'react';
import {Link, useParams } from 'react-router-dom';
import TaskDetailsAPI from "../services/taskDetails.js"
import UserDetailsAPI from "../services/userDetails.js"
import BoardDetailsAPI from "../services/boardDetails.js"

const EditTask = () => {

    const{board, date, task_id} = useParams();
    const [selectedAssignee, setSelectedAssignee] = useState([])
    const [creator, setCreator] = useState([])
    const [boardInfo, setBoardInfo] = useState([])
    const [boardMembers, setBoardMembers] = useState([])
    const [status, setStatus] = useState(null)
    const [priority, setPriority] = useState(null)
    const [description, setDescription] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [taskDate, setTaskDate] = useState(null)
    const [task, setTask] = useState({});

    const statusChoices = ['Pending', 'Completed']
    const priorityChoices = ['Red', 'Yellow', 'Green']

    useEffect(() => {
        
        (async () => {
            // get task details by id and set assignee data
            try {
                const data = await TaskDetailsAPI.taskById(task_id)
                setTask(data.data)
                //console.log(data.data)
                setStatus(data.data[0].task_status)
                setPriority(data.data[0].task_priority)
                
                const data2 = await UserDetailsAPI.getUserById(data.data[0].task_assignee_id)
                
                //console.log("data2 is " , data2.data[0].name)
                setSelectedAssignee(data2.data[0])
            } catch (error) {
                throw error
            }

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
                console.log(data.data)
                setBoardMembers(data.data)
            } catch (error) {
                throw error
            }

            // get task creator details
            try {
                const data = await UserDetailsAPI.getUserById(task[0].task_creator_id)
                console.log(data.data)
                setCreator(data.data)                
            } catch (error) {
                throw error
            }

            // get task assignee details
            // try {
            //     console.log("inside assignee api call")
            //     console.log(task[0].task_assignee_id)
            //     const data = await UserDetailsAPI.getUserById(task[0].task_assignee_id)
                
            //     console.log(data.data)
            //     setSelectedAssignee(data.data)                
            // } catch (error) {
            //     throw error
            // }
        }) ();

    }, [])
    /*
    user can not change a task's board (for right now)
    user can not change who created the task (for right now)

    assignee (comes from board members), priority, status are all drop downs
    description, date, start time, end time are editable fields
    */

    const handleOnSubmit = () =>{
        // send task details through edit api
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'assignee') {
          const temp = boardMembers.filter((member) => member.name === value)
          setSelectedAssignee(temp);
          console.log(temp)
        } 
        else if (name === 'status') {
            setStatus(value);
            console.log(value)
        }
        else if (name === 'priority') {
          
            setPriority(value);
            console.log(value)
          }
        else if (name === 'description') {
          
          setSelectedDescription(value);
        }
      };

    return (
      
        <div>
            <form onSubmit={handleOnSubmit}>
                <h2>Editing task {task[0]?.task_id} for {boardInfo[0]?.board_name}</h2>

                <div>

                    <label htmlFor="assignee">
                        Select Assignee
                        <select className='dropdown'id="assignee" name="assignee" value={selectedAssignee.name ? selectedAssignee.name : ''} onChange={handleOnChange}>
                            {boardMembers.map((member) => (
                            <option key={member.user_id} value={member.name}>
                                {member.name}
                            </option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor="status">
                        Select Status
                        <select className='dropdown'id="status" name="status" value={status ? status : ''} onChange={handleOnChange}>
                            {statusChoices.map((choice, index) => (
                            <option key={index} value={choice}>
                                {choice}
                            </option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor="priority">
                        Select Priority
                        <select className='dropdown'id="priority" name="priority" value={priority ? priority : ''} onChange={handleOnChange}>
                            {priorityChoices.map((choice, index) => (
                            <option key={index} value={choice}>
                                {choice}
                            </option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor='description'>
                        Task Description
                        <input type='text' id='description' name='description' value={selectedDescription} onChange={handleOnChange} />
                    </label>








                    {/* <button onClick={updateCreator}>Submit</button> */}
                    <button>Update</button>
                    <Link to={`/board/${board}/${date}`}><button>Cancel</button></Link>
                </div>


            </form>
        </div>
      
    )
  }
  
  export default EditTask