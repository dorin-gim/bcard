import { FunctionComponent, useEffect, useState } from "react";
import { getMyCards } from "../services/cardsService";
import AddCardModal from "./AddCardModal";
import "../style/Home.css";
import Card from "../interfaces/Card";
import BusinessCard from "./BusinessCard";

interface MyCardsProps {
    
}
 
const MyCards: FunctionComponent<MyCardsProps> = () => {
    const [myCards, setMyCards] = useState<Card[]>([])
    const [openAddModal, setOpenAddModal] = useState<boolean>(false)
    const [cardChanged, setCardChanged] = useState<boolean>(false)
    
   

    useEffect(()=>{
        getMyCards().then((res) => setMyCards(res.data))
    },[cardChanged])

    let handleAddCard = ()=>{
        //open the add card modal
        setOpenAddModal(true);
    }

    let refresh=()=>{
        setCardChanged(!cardChanged)
    }
    
    return ( <div className="main-container">
        <div className="title-container d-flex flex-column">
        <h2 className="page-title">MY CARDS</h2>
        <h5 className="page-subtitle">Here you can create and edit your BCards</h5>
        <div className="main-card-container">
            {myCards.length > 0 && myCards.map((card)=><BusinessCard card={card} refresh={refresh}/>)}
        </div>
        <div >
        <button className="add-card-button" onClick={handleAddCard}>Create a new card</button>
        <AddCardModal show={openAddModal} onClose={() => setOpenAddModal(false)} refresh={refresh}/>
        </div>
        </div>
    </div> );
}
 
export default MyCards;