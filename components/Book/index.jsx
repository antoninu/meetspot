import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import useStateValue from 'hooks/useStateValue';
import fetcher from 'utils/fetcher';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

/**
 * {
    "nombre":"nombre",
    "descripcion": "descripcion",
    "diaInicio": "{{todayDate}}",
    "diaFin": "{{todayDate}}",
    "frecuencia": "diaria",
    "estado": "aceptado",
    "zonaHoraria": "+5",
} 
 */

const Book = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState({});
  const [invitedData, setInvitedData] = useState('');
  const [invitedList, setInvitedList] = useState([]);
  const [error, setError] = useState(null);
  const [, dispatch] = useStateValue();
  const [disp, setDisp] = useState(null);

  const [{ user }] = useStateValue();
  const [step, setStep] = useState(0);

  //Manejan el estado del evento
  const handleChange = (key) => async (event) => {
    setError(null);
    setEventData({ ...eventData, [key]: event.target.value });
  };

  const handleSubmit = async () => {
    // Crear el evento
    console.log(eventData);
    eventData.estado = 'aceptado';
    eventData.zonaHoraria = '+5';
    const response = await fetcher('eventos/', 'POST', eventData);

    if (response.error) {
      setError(response.error);
    }
    // Crear la regla
    const regla = {
      unidad: 1,
      horaInicio: new Date('April 12, 2021 14:00:00'),
      horaFin: new Date('April 12, 2021 15:15:00'),
    };
    const response2 = await fetcher('reglas/', 'POST', regla);
    if (response2.error) {
      setError(response2.error);
    }
    // Agregar la regla al evento
    console.log('resoponses', response);
    const response3 = await fetcher(
      `eventos/${response._id}/reglas/${response2._id}`,
      'PATCH',
    );
    if (response3.error) {
      setError(response3.error);
    }
    // Agregar el evento
    const response4 = await fetcher(
      `usuarios/${user._id}/eventos/${response._id}`,
      'PATCH',
    );
    if (response4.error) {
      setError(response4.error);
    }
  };

  //Manejan el estado del usuario a ser invitado
  const handleChangeInvited = () => async (event) => {
    setError(null);
    setInvitedData(event.target.value);
  };

  const handleAddInvited = () => async () => {
    /**const response = await fetcher('usuarios/', 'POST', invitedData);

    if (response.error) {
      setError(response.error);
    } else {
    */
    // Asumiendo que todo esta bien
    setError(null);
    setInvitedList([...invitedList, invitedData]);
    let append = document.createElement('div');
    append.innerText = invitedData;
    document.getElementById('invited-list').appendChild(append);
    //}
  };

  //Manejan el estado de la lista de usuarios a ser invitados
  const handleChangeInvitedList = () => async (event) => {
    setError(null);
    setInvitedList([...invitedList, invitedData]);

    document
      .getElementById('invited-list')
      .appendChild(<Text>{invitedData}</Text>);
  };

  const handleAvailability = async () => {
    const response = await fetcher(
      `usuarios/${user._id}/disponibilidad`,
      'GET',
    );
    if (response.error) {
      setError(response.error);
    } else {
      //console.log('Disponibilidad: ', response);
      let newDisp = response.map((element) => {
        element.start = new Date(element.start);
        element.end = new Date(element.end);
        return element;
      });
      //console.log('Con dates: ', newDisp);
      setDisp(newDisp);
    }
  };

  return (
    <Box h="100vh" p={14} mt={14} maxWidth={['100%']}>
      <Heading mb={4}>Agendar un evento</Heading>
      {step === 0 && <Step1 setStep={setStep} handleChange={handleChange} />}
      {step === 1 && (
        <Step2
          setStep={setStep}
          handleChangeInvited={handleChangeInvited}
          handleAddInvited={handleAddInvited}
          handleAvailability={handleAvailability}
        />
      )}
      {step === 2 && <Step3 disp={disp} />}
    </Box>
  );
};

export default Book;
