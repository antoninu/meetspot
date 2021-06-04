import React, { useState, useEffect } from 'react';
import {
  Button,
  MenuItem as ChakraMenuItem,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Box,
  Avatar,
  AvatarBadge,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import useStateValue from 'hooks/useStateValue';
import fetcher from 'utils/fetcher';
import stringFormatter from 'utils/stringFormatter';

function Notification() {
  const [{ user }] = useStateValue();

  const [fullUser, setFullUser] = useState(null);
  const [notifications, setNotifcations] = useState([]);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    if (user !== null) fetchUser();
  }, [eventos]);

  const fetchUser = async () => {
    let fullUserNew;
    if (navigator.onLine) {
      fullUserNew = await fetcher(`usuarios/${user._id}`, 'GET');
      localStorage.setItem('fullUser', JSON.stringify(fullUserNew));
      setFullUser(fullUserNew);
    } else {
      if (localStorage.getItem('fullUser') === null) {
        setFullUser(null);
      } else {
        fullUserNew = JSON.parse(localStorage.getItem('fullUser'));
        setFullUser(fullUserNew);
      }
    }
    console.log(fullUserNew);
    getNotifications(fullUserNew);
  };

  const getNotifications = (usuario) => {
    let pendingEventsNew = usuario.eventos.filter(
      (element) => element.estado === 'pendiente',
    );
    console.log('pre-sorted', pendingEventsNew);
    pendingEventsNew = pendingEventsNew.sort(function (a, b) {
      var dateA = new Date(a.fechaCreacion),
        dateB = new Date(b.fechaCreacion);
      return dateB.getTime() - dateA.getTime();
    });
    console.log('pre-sorted', pendingEventsNew);

    const top3 = pendingEventsNew; //.slice(0, 3);
    let notifcaciones = [];
    let creador = 'Alguien';
    let mensaje = '';
    top3.forEach((evento) => {
      if (evento.creador)
        creador = stringFormatter(
          evento.creador.nombre + ' ' + evento.creador.apellido,
          'name',
        );
      let nombre = evento.nombre;
      mensaje = `${creador} ${mensaje_not()} ${nombre}`;
      notifcaciones.push(mensaje);
    });
    console.log(notifcaciones);
    setNotifcations(notifcaciones);
  };
  const noticiacionesMensajee = () => {
    const lang = getBrowserLang();
    if (lang.includes('en')) {
      return 'Notificaciones';
    } else {
      return 'Notifications';
    }
  };
  const mensaje_not = () => {
    const lang = getBrowserLang();
    if (lang.includes('en')) {
      return ' te ha invitado a su evento ';
    } else {
      return ' has invited you to the event ';
    }
  };
  function getBrowserLang() {
    return navigator.language || navigator.userLanguage;
  }
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
    <Popover>
      <PopoverTrigger>
        <Avatar
          size="sm"
          icon={<BellIcon aria-label="notification-icon" />}
          style={{ cursor: 'pointer' }}
        >
          {notifications.length > 0 && (
            <AvatarBadge boxSize="1.25em" bg="tomato">
              <span style={{ color: 'white', fontSize: 'xx-small' }}>
                {notifications.length}
              </span>
            </AvatarBadge>
          )}
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{noticiacionesMensajee()}</PopoverHeader>
        <PopoverBody>
          {notifications.map((value, index) => {
            if (index == notifications.length - 1)
              return (
                <Box key={index} pb={1}>
                  <span>{value}</span>
                </Box>
              );
            else
              return (
                <Box key={index} pb={1}>
                  <span>{value}</span>
                  <hr></hr>
                </Box>
              );
          })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default Notification;
