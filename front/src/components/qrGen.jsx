import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './qrGenerator.css';
import { useSelector } from "react-redux";

const QRGenerator = () => {
  const [numberOfCodes, setNumberOfCodes] = useState('');
  const [email, setEmail] = useState('');
  const username = useSelector(state => state.username);
  const navigate = useNavigate();

  const checkLogin = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3001/loggedIn?username=${username}`, { withCredentials: true, headers: { 'Cache-Control': 'no-store' } });
      const { data } = response;
      console.log(data)
      if (data.loggedIn === false){
        console.log(data)
        navigate("/")
        return false
      }
      else return true
    } catch (error) {
      console.error(error);
    }
  }

  const handleNumberOfCodesChange = (event) => {
    setNumberOfCodes(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(await checkLogin(username))
    console.log(numberOfCodes, email)
    const n = numberOfCodes
    if(await checkLogin(username)){
      const response = await axios.post(`http://localhost:3001/qrs`,{n, email});
      console.log(response.data);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-input">
        <label htmlFor="numberOfCodes">Number of QR codes:</label>
        <input
          id="numberOfCodes"
          type="number"
          value={numberOfCodes}
          onChange={handleNumberOfCodesChange}
        />
      </div>
      <div className="form-input">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <button className="form-submit-btn" type="submit">Generate</button>
    </form>
  );
};

export default QRGenerator;
