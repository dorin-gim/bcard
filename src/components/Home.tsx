import { FunctionComponent, useEffect, useState } from "react";
import  Card  from "../interfaces/Card";
import { getAllCards } from "../services/cardsService";
import BusinessCard from "./BusinessCard";
import "../style/Home.css"
import { useAuth } from "./context/AuthProvider";

interface HomeProps {
}
 
const Home: FunctionComponent<HomeProps> = () => {
    const [cards, setCards]= useState<Card[]>([])
    const [isError,setIsError] = useState<Boolean>(false);
  const { search } = useAuth();
    useEffect(()=>{
        getAllCards()
        .then((res)=> {setCards(res.data)}).catch((err)=>
            setIsError(true)
        )
    },[])

    useEffect(()=>{

        const temp = cards.filter((card:Card)=>card.title.toLowerCase().includes(search.toLowerCase()) || card.subtitle.toLowerCase().includes(search.toLowerCase()) || card.description.toLowerCase().includes(search.toLowerCase()))
        
        setCards(temp)
        
    },[search])
    return (<div className="main-container">
        <div className="title-container">
        <h2 className="page-title">CARD PAGE</h2>
        <h5 className="page-subtitle">Here you can find business cards from all categories</h5></div>
        {isError && <div>Error</div>}
        {!isError && <div className="main-card-container">
            {cards.length > 0 && cards.map((card:Card)=><BusinessCard card={card}/>)}
        </div>}
    

    </div>  );
}
 
export default Home;