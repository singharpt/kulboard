import axios from 'axios'

const getUserById = (user_id) => axios.get(`http://localhost:3000/api/user/${user_id}`)

export default{
    getUserById
}