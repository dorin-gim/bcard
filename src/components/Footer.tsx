import { FunctionComponent } from "react";
import "../style/Home.css";
import logo from "../Images/footer-logo.svg"
import { NavigateFunction, useNavigate } from "react-router-dom";

interface FooterProps {
    
}
 
const Footer: FunctionComponent<FooterProps> = () => {
    const navigate:NavigateFunction = useNavigate();

    let goToAbout = ()=>{
        navigate("/about")
    }
    return ( <div className="footer-container">
        <div className="footer-icons">
    <img src={logo} alt="logo" className="footer-logo-img" />
    <i className="fa-solid fa-circle-info" onClick={goToAbout}></i>
        </div>
    </div> );
}
 
export default Footer;