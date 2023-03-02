import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import './qrGenerator.css';
import { useSelector } from "react-redux";
import PhoneInput from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';
import Navbar from './navBar';

const QRGenerator = () => {
  const [numberOfCodes, setNumberOfCodes] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [qrImages, setQRImages] = useState();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [wp, setWp] = useState('');
  const [showWpInput, setShowWpInput] = useState(false);
  const username = useSelector(state => state.username);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      const loggedIn = await checkLogin(username);
      if (!loggedIn) {
        navigate("/");
      }
    }
    checkUser();
  }, [username, navigate]);

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
  const handleDownloadAll = () => {
    if (qrImages) {
      qrImages.forEach((qrImage, index) => {
        const link = document.createElement('a');
        link.href = qrImage;
        link.download = `qr-code-${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };
  
  const handleNumberOfCodesChange = (event) => {
    setNumberOfCodes(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleWpChange = (value) => {
    setWp(value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const n = numberOfCodes
    if(await checkLogin(username)){
      try {
        setLoading(true)
        const response = await axios.post(`http://localhost:3001/qrs`,{n, email, wp});
        console.log(response.data.images);
        
        // Convert buffer array to image URL array
        const imageURLs = response.data.images.map(buffer => `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`);
        
        // Set state to display generated QR codes
        setCompleted(true);
        setTimeout(() => {
          setCompleted(false);
        }, 4000);
        setQRImages(imageURLs);
      } catch (error) {
        console.error(error);
        setConfirmation('Failed to generate QR codes. Please try again later.');
      } finally {
        setConfirmation('QR codes generated successfully!');
        setLoading(false); // Set loading back to false
      }
    }
  };
  

  return (
    <div>
      <Navbar />
      {confirmation && <div className="confirmation">{confirmation}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="numberOfCodes">Number of QR codes:</label>
          <div>
            <input
              type="range"
              min={1}
              max={50}
              value={numberOfCodes}
              onChange={handleNumberOfCodesChange}
            />
            <p>{numberOfCodes}</p>
          </div>

        </div>
        {showEmailInput ?
          <div className="form-input">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          :
          <button
            className="form-email-btn"
            onClick={() => setShowEmailInput(true)}
          >
            Send via email
          </button>
        }
        {showWpInput ?
          <div className="form-input">
          <label htmlFor="wp">WhatsApp Number:</label>
          <PhoneInput
              placeholder="Enter phone number"
              id="number"
              type="tel"
              value={wp}
              onChange={handleWpChange}
            />
        </div>
          :
          <button
            className="form-email-btn"
            onClick={() => setShowWpInput(true)}
          >
            Send via WhatsApp
          </button>
        }


        <button className="form-submit-btn" type="submit">Generate</button>
      </form>
      {loading && (
        <div className="loading-container">
          <div className="spinner" />
          {completed && (
            <div className="completed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p>Completed!</p>
            </div>
          )}
        </div>
      )}
      {qrImages && <button className="download-all-btn" type="button" onClick={handleDownloadAll}>Download All</button>}
      <div className="qr-container">
        {qrImages && qrImages.map((qrImage, index) => (
          <div className="qr-item" key={index}>
            <img src={qrImage} alt={`QR code ${index + 1}`} />
            <a href={qrImage} download={`qr-code-${index + 1}.png`}>Download QR code</a>
          </div>
        ))}
      </div>
    </div>
  );}
export default QRGenerator;

