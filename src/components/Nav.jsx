import React, { useEffect, useState } from "react";

import "./Nav.css";

const Nav = () => {
  const [ show, setShow ] = useState(false)

  useEffect(()=>{         // This adds an event listener that listens to the scroll and we add navbar effects using that
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
    return () => {
      window.removeEventListener('scroll', () => {}) 
    }
  },[])

  return (
    <div className={`nav ${show && "showNav"}`}>
      <img
        src="https://www.edigitalagency.com.au/wp-content/uploads/netflix-logo-png-large.png"
        alt="Netflix Logo"
        className="nav__logo"
      />
      <img
        src="https://i.pinimg.com/564x/d8/70/20/d87020c70b0bf5eec4918874fa7d0f9f.jpg"
        alt="Netflix profile"
        className="nav__avatar"
      />
    </div>
  );
};

export default Nav;
