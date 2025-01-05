import axios from "axios"
import { User } from "../interfaces/User"
const api: string = `${process.env.REACT_APP_API}/users`

//get all users
export function getAllUsers(){
    return axios.get(api)
}

//get user by id
export function getUserById(_id:string){
    return axios.get(`${api}/${_id}`)
}

//login
export function loginUser(email:string, password:string){
    return axios.post(`${api}/login`,{email,password})
}

//add new user
export function addUser(user:User){
    return axios.post(api, user)
}

//update user


