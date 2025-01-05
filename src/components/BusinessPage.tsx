import { FunctionComponent, useEffect, useState } from "react";
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import '../style/CardPage.css'
import { getCardById } from "../services/cardsService";
import { useParams } from "react-router-dom";
import Card from "../interfaces/Card";

interface BusinessPageProps {
    
}
 
const BusinessPage: FunctionComponent<BusinessPageProps> = () => {
    let {id} = useParams()
    let[card, setCard] = useState<Card>()
    const [center, setCenter] = useState({ lat: 22.54992, lng: 0 });

    useEffect(()=>{
        getCardById(id as string)
        .then((res:any) => setCard(res.data))
        

    },[])

    useEffect(()=>{
        geocodeLocation(`${card?.address.street} ${card?.address.houseNumber}, ${card?.address.city}, ${card?.address.country}`);

    },[card])

      const geocodeLocation = async (address:any) => {
    const apiKey = 'AIzaSyATaADRCONXJD2QmukSdLqOS0UZ33F6D70';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results && data.results[0]) {
      const location = data.results[0].geometry.location;
      setCenter(location); // Update the center state with new coordinates
    } else {
      console.error('Location not found');
    }
  };
    return ( <div className="main-container">
         <div className="title-container">
        <h2 className="page-title">{card?.title ?? ""}</h2>
        <h5 className="page-subtitle">{card?.subtitle ?? ""}</h5>
        </div>

        <div className="business-main-info mt-2">

            <div className="business-details">
                <div className="business-img"><img src={card?.image.url} alt={card?.image.alt}/></div>
                <div className="business-description mt-2"><p>{card?.description ?? ""}</p></div>
            </div>

            <div className="business-info">
                <div className="business-map">
                     <APIProvider apiKey={"AIzaSyATaADRCONXJD2QmukSdLqOS0UZ33F6D70"
                    }>
                        <Map
                          
                          center={center}
                          defaultZoom={15}
                          gestureHandling={'greedy'}
                          disableDefaultUI={true}
                        />
                      </APIProvider>
                </div>
                <div className="business-contact-info"> 
                        <div className="business-address"><p>{`${card?.address.street} ${card?.address.houseNumber}, ${card?.address.city}, ${card?.address.country}` ?? ""}</p></div>
                        <div className="business-contact-icons">
                            <i className="fa-solid fa-envelope"></i>
                            <i className="fa-solid fa-phone"></i>
                        </div>
                    
                </div>
            </div>

        </div>
    </div> );
}
 
export default BusinessPage;