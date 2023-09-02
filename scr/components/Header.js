import React, { useState } from "react";
import logo from '../../assets/images/logo.png';
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className="header">
      <Title />
      <NavComponent />
    </div>
  );
};

const Title = () => {
  return (
    <a href="/"> <img className="logo" alt="logo" src={logo} /> </a>
  )
};

const NavComponent = () => {

  const [btnName, setBtnName] = useState("Login")
  return (
    <div className="nav-items">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>Cart</li>

        <button className="login"
          onClick={() => {
            btnName === "Login" ? setBtnName("Logout") : setBtnName("Login")
          }}
        >
          {btnName}
        </button>
      </ul>

    </div>
  );
}

export default Header
