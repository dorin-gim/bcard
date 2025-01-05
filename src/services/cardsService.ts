import axios from "axios"
import Card  from "../interfaces/Card"
const api: string = `${process.env.REACT_APP_API}/cards`

//get all cards
export function getAllCards(){
    return axios.get(api)
}

//get card by id
export function getCardById(_id:string){
    return axios.get(`${api}/${_id}`)
}

//add new card
export function addNewCard(card: Card){
    return axios.post(api, card, {headers:{'x-auth-token':localStorage.getItem("token")}})
}

//update card
export function updateCard(_id:string, card: Card){
    return axios.put(`${api}/${_id}`, card, {headers:{'x-auth-token':localStorage.getItem("token")}})
}

//delete card
export function deleteCard(_id:string){
    return axios.delete(`${api}/${_id}`, {headers:{'x-auth-token':localStorage.getItem("token")}})
}

//get my cards
export function getMyCards(){
    return axios.get(`${api}/my-cards`, {headers:{'x-auth-token':localStorage.getItem("token")}})
}