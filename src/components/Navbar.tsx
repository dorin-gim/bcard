"use client";

import { FunctionComponent, useEffect, useState } from "react";
import logo from "../Images/logo.svg"
import { JwtPayload, jwtDecode } from "jwt-decode";
import { NavLink, NavigateFunction, useNavigate } from "react-router-dom";
import "../style/Navbar.css"
import { useAuth } from './context/AuthProvider';

interface NavbarProps {
}

export enum UserTypeAndStatus{
  NotInSystem,
  Regular,
  Business,
  Admin
}
 
const NavbarBC: FunctionComponent<NavbarProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const [userStatus, setUserStatus] = useState<UserTypeAndStatus>(UserTypeAndStatus.NotInSystem)
  const { isLoggedIn, logout,startSearch } = useAuth();
  const [navIsOpen, setNavIsOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

    useEffect(() => {
    // Define a function to check screen size
    const checkMobile = () => {
      setNavIsOpen(!window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();

    // Add event listener for screen resize
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", checkMobile);

    return () => {
      mediaQuery.removeEventListener("change", checkMobile);
    };
  }, []);

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
      }
    },[isLoggedIn])

    const handleSearch = (e:any) => {
      startSearch(e);
    }

    const openNavbar = () => {
      if(navIsOpen){
        setNavIsOpen(false);
      }else{
        setNavIsOpen(true);
      }
    }


    return ( <>
      <div id="hamburger" onClick={openNavbar} ><i className="fa-solid fa-bars"></i></div>

   {navIsOpen && <div id="navbar" >

      <div className="nav-container">
        
        <NavLink to={"/"}><img src={logo} alt="logo" className="logo-img" /></NavLink>
  
        <NavLink to="/about">About BCards</NavLink>
        
        {userStatus === UserTypeAndStatus.Business && <>
          <NavLink to="/myfavorites">My favorites BCards</NavLink>
          <NavLink to="/mycards">My BCards</NavLink>
          </>}
        

          <div>
            <form className="search-container">
              <input type="text" placeholder="Search" className="search" onChange={handleSearch} />
              <button className="search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
          </div>

          {userStatus === UserTypeAndStatus.Business && <div className="mange-user">
          <div><i className="fa-solid fa-user"></i></div>
          <div onClick={()=>{
            navigate("/")
            logout()
            localStorage.removeItem("token")
          }}><i className="fa-solid fa-arrow-right-from-bracket"></i></div>
          </div>}

          {userStatus === UserTypeAndStatus.NotInSystem && <div className="login-container">
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login"><i className="fa-solid fa-arrow-right-to-bracket"></i></NavLink>
            
            </div>}

            <button className="toggle-button" onClick={toggleTheme}>
          <i
            className={`fa-solid ${theme === "light" ? "fa-toggle-off" : "fa-toggle-on"
            }`}
          ></i>
        </button>
        </div>
      


    </div>}
    </>
      );
          }
 
export default NavbarBC;