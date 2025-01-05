import { FunctionComponent, useEffect, useState } from "react";
import { getMyFavList } from "../services/favoriteService";
import Card from "../interfaces/Card";
import BusinessCard from "./BusinessCard";
import "../style/Home.css";

interface FavoritesCardsProps {
    
}
 
const FavoritesCards: FunctionComponent<FavoritesCardsProps> = () => {
    const [showCard, setShowCard] = useState<Card[]>([])


    useEffect(()=>{
        getMyFavList().then((res:Card[])=>setShowCard(res))
    },[])
    return (<div className="main-container">
        <div className="title-container">
        <h2 className="page-title">My Favorites Cards</h2>
        <h5 className="page-subtitle">Your Favorites - Quickly access and manage the items you love most!</h5>
        </div>
        <div className="main-card-container">
        {showCard.length > 0 && showCard.map((card:Card)=><BusinessCard card={card}/>)} 
    
        </div>
        </div> );
}
 
export default FavoritesCards;