import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

function index(props) {
  const [eventos, setEventos] = useState([]);

  const setupWS = () => {
    const wss = new WebSocket('ws://localhost:3001/');
    wss.onopen = () => {
      wss.onmessage = (msg) => {
        console.log(msg);
        setEventos(JSON.parse(msg.data));
      };
    };
  };

  useEffect(() => {
    setupWS();
    const URL = process.env.NEXT_PUBLIC_BACKEND_URI + 'eventos/eventosLive';
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        setEventos(res);
      });
  }, []);
  return (
    <Box
      minH="100vh"
      p={[7, 7, 14]}
      mt={14}
      textAlign={['center', 'center', 'inherit']}
      alignItems="center"
    >
      <h1>Movies List</h1>
      <ul>
        {eventos.map((m, index) => (
          <li key={index}>{m.nombre}</li>
        ))}
      </ul>
    </Box>
  );
}

export default index;
