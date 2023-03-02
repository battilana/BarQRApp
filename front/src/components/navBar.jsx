import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import {logOut} from "../app/actions.js"
import "./navBar.css"
const Navbar = () => {
  const user = useSelector((state) => state.username);
  let dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogOut = ()=>{
    dispatch(logOut());
    navigate("/")
  }
  return  <nav className="navbar-container">
      {user && (
        <div className="navbar-right">
          <span className="navbar-welcome">Welcome, {user}</span>
          <button to="/logout" className="navbar-logout" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      )}
    </nav>
};

export default Navbar;
