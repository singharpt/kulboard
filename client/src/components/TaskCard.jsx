import React from 'react'
import '../App.css'
import ReactModal from 'react-modal';
import { useState} from "react";

// need to replace 'assigned to' with user's name

function TaskCard({task}){
    // const handleOnClick = (event) => {
    //     event.preventDefault()
    //     window.location.href = `/tasks/${task.task_id}`
    // }


    // style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)' }, 
    //content: {maxWidth:'500px', maxHeight: '500px', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', borderRadius:'5px', backgroundColor:'#a3b18a'}}}
    
    const [viewDetails, setViewDetails] = useState(false)

    const openModal = () => {
        setViewDetails(true);
      }
    
    const closeModal = () => {
        setViewDetails(false);
    }

    const handleEdit = (event) => {
        // link to edit form
        event.preventDefault()
        window.location.href = `/board/${task.board_id}/${task.task_date}/${task.task_id}`
    }

    const handleDelete = () => {
        // add api call for deleting a task
    }

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '10px' }}>
            <div>
                <h2>Assigned to: {task.task_assignee_id}</h2>
                <p>Status: {task.task_status}</p>
                <p>Description: {task.task_description}</p>
                <button onClick={openModal}> View Details </button>
                {
                    viewDetails == true ? 
                        <ReactModal isOpen={openModal} onRequestClose={closeModal} ariaHideApp={false}
                            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }, 
                                     content: {maxWidth:'500px', maxHeight: '500px', top:'50%', left:'50%', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'translate(-50%, -50%)', borderRadius:'5px'}}}>
                            <div>
                                <h2>View Details</h2>
                                <p>Assigned by: {task.task_creator_id}</p>
                                <p>Start time: {task.task_start_time}</p>
                                <p>End time: {task.task_end_time}</p>
                                <p>Status: {task.task_status}</p>
                                <p>Description: {task.task_description}</p>
                                <button onClick={closeModal}>Close Details</button>
                                <button onClick={handleEdit}>Edit task</button>
                                <button onClick={handleDelete}>Delete task</button>
                            </div>
                        </ReactModal>
                    :null
                }
            </div>
        </div>
    )
}

export default TaskCard