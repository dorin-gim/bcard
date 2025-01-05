"use client";
import { FunctionComponent, useEffect, useState } from "react";
import  CardInterface from "../interfaces/Card";
import { jwtDecode } from "jwt-decode";
import { UserTypeAndStatus } from "./Navbar";
import { addCardToFavList } from "../services/favoriteService";
import { deleteCard, updateCard } from "../services/cardsService";
import UpdateCard from "./UpdateCard";
import UpdateCardModal from "./UpdateCardModal";
import "../style/Card.css"
import { showDeleteMessage } from "../services/feedbacksServies";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";


interface BusinessCardProps {
    card:CardInterface
    refresh?: Function
}
 
const BusinessCard: FunctionComponent<BusinessCardProps> = ({card, refresh}) => {
  const [userStatus, setUserStatus] = useState<UserTypeAndStatus>(UserTypeAndStatus.NotInSystem)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isMyCard, setIsMyCard] = useState<boolean>(false)
  const [openUpdateCardModal, setOpenUpdateCardModal] = useState<boolean>(false)
  const [cardChanged, setCardChanged] = useState<boolean>(false)
  const navigate:NavigateFunction = useNavigate();

      useEffect(()=>{
      const token = localStorage.getItem("token");

      if(!token){
        setUserStatus(UserTypeAndStatus.NotInSystem)
      }else{
        const decoded = jwtDecode<any>(token);
        if(decoded.isAdmin === false && decoded.isBusiness === false){
          setUserStatus(UserTypeAndStatus.Regular)
        }else if(decoded.isBusiness === true){
          setUserStatus(UserTypeAndStatus.Business);
        }
        else setUserStatus(UserTypeAndStatus.Admin)

        card?.likes?.forEach((like:string)=>{
          if(like === decoded._id){
            setIsFavorite(true)}
        })
        card?.user_id === decoded._id && setIsMyCard(true)
      }
    },[])

    const addCardToFavListOn: Function = (cardId:string)=>{
      addCardToFavList(cardId)
      setIsFavorite(!isFavorite)
    }

    const deleteMyCard: Function = (cardId:string)=>{
      showDeleteMessage("Are you sure you want to delete this card?")
      deleteCard(cardId);
      refresh && refresh()
    }

    let updateRefresher = ()=>{
      alert("Edit card")
      refresh && refresh()
    }

    let handleUpdateCard = () =>{
      //open the update card modal
      setOpenUpdateCardModal(true);
     }

     let openCard = ()=>{
     navigate(`/card/${card._id}`)}
    
    return ( <div className="main-card-container">

    
    <div className="card-container">
        <div className="card-img">
        <img className="img-card" src={card.image.url} alt={card.image.alt}/>
        </div>

        <div className="icons-container">
        
        <div className="icons">
        {isMyCard && <div className="delete-button"><i className="fa-solid fa-trash" onClick={()=>deleteMyCard(card._id)}></i></div>}

        {isMyCard && <div className="edit-button"><i className="fa-solid fa-pen-to-square" onClick={()=>{handleUpdateCard()}}></i></div>
         }
    
        <UpdateCardModal show={openUpdateCardModal} onClose={() => setOpenUpdateCardModal(false)} refresh={updateRefresher} card={card}/>

        <div><i className="fa-solid fa-phone"></i></div>
        
        {userStatus !== UserTypeAndStatus.NotInSystem && <div><i className={isFavorite ? "fa-solid fa-star" :"fa-regular fa-star"} onClick={()=>addCardToFavListOn(card._id)} ></i></div> }
        <div><i className="fa-solid fa-eye" onClick={openCard}></i></div>
        </div>

      </div>
         <div className="card-details">
      <div className="card-title">
      <h5 className="main-card-title">{card.title}</h5>
        <h6 id="card-subtitle">{card.subtitle}</h6>
      </div>
      <p className="card-description">
     {card.description}
      </p>
         </div>

    </div>

    </div>
 );
}
 
export default BusinessCard;