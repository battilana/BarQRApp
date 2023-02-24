import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './status.css';

const Status = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('false');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/qrs/status/${id}`)
      .then(r => {
        if (r.data === true) {
          setStatus('true');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const changeStatus = () => {
    try {
      axios.post(`http://localhost:3001/qrs/${id}`);
      setStatus('true');
    } catch (error) {
      console.log(error);
    }
    console.log('hola');
  };

  console.log(status);
  return (
    <Box className="status-container">
      <h1 className={`status-header ${status === 'true' ? 'invalid' : 'valid'}`}>
        {status === 'true' ? 'QR es inválido' : 'QR es válido'}
      </h1>
      {status !== 'true' && (
        <Button className="use-button" variant="contained" color="primary" onClick={changeStatus}>
          Usar
        </Button>
      )}
    </Box>
  );
};

export default Status;