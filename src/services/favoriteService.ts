import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Card from "../interfaces/Card";
const api: string = `${process.env.REACT_APP_API}/cards`

//add to favorites cards
export function addCardToFavList(cardId:string){    
    return axios.patch(`${api}/${cardId}`,undefined,{headers:{'x-auth-token':localStorage.getItem("token")}})
}

//get all my fav list
export async function getMyFavList(): Promise<Card[]> {
    const token: string = localStorage.getItem("token") ?? "";
    const decoded: any = jwtDecode<any>(token);
    const userId: string = decoded._id ?? "";
    const cards = await axios.get(api);
    const filterCards = cards.data.filter((card: Card) => card?.likes?.includes(userId));

    return filterCards;
}

