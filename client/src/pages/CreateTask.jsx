import React, {useState, useEffect} from 'react';
import {Link, useParams } from 'react-router-dom';

const CreateTask = () => {

    const{board, date, task_id} = useParams();
    const [creator, setCreator] = useState({});

    return (
      
        <div>
            <form>
                <div>
                    {/* <input className='EditCreatorInputForm' type='text' id='name' name='name' value={creator.name} placeholder="Type the creator's name..." onChange={handleChange}/>
                </div>
                <br></br>
                <div>
                    <input className='EditCreatorInputForm' type='text' id='description' name='description' value={creator.description} placeholder="Type the creator's description..." onChange={handleChange}/>
                </div>
                <br></br>
                <div>
                    <input className='EditCreatorInputForm' type='text' id='imageURL' name='imageURL' value={creator.imageURL} placeholder="Type the creator's imageURL..." onChange={handleChange}/>
                </div>
                <br></br>
                <div>
                    <input className='EditCreatorInputForm' type='text' id='url' name='url' value={creator.url} placeholder="Type the creator's url..." onChange={handleChange}/>
                </div>
                <br></br>
                <div> */}
                    {/* <button onClick={updateCreator}>Submit</button> */}
                    <button>Update</button>
                    <Link to={`/`}><button>Cancel</button></Link>
                </div>


            </form>
        </div>
      
    )
  }
  
  export default CreateTask