import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./login.css";
import {login} from "../app/actions.js"
import { useDispatch, useSelector } from "react-redux"
const Login = () => {
  let dispatch = useDispatch()
  const user = useSelector(state => state.username);
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(username, password))
    setError(true);
  };

  useEffect(()=>{
    if (user) {
        setError(false);
        navigate("/qr");
      } 
  }, [user])

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="error-message">Incorrect username or password</p>}
      <div className="form-input">
        <label htmlFor="username">Email</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="form-input">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button className="form-submit-btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;