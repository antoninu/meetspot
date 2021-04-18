import { useState, useEffect } from 'react';
import { Box, Heading, Text, useToast } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import useStateValue from 'hooks/useStateValue';
import fetcher from 'utils/fetcher';
import localDate from 'utils/localDate';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

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
  const [ruleData, setRuleData] = useState({});
  const [invitedData, setInvitedData] = useState('');
  const [invitedList, setInvitedList] = useState([]);
  const [error, setError] = useState(null);
  const [, dispatch] = useStateValue();
  const [disp, setDisp] = useState(null);

  const toast = useToast();

  const [{ user }] = useStateValue();
  const [step, setStep] = useState(0);

  useEffect(() => {
    revisarFechas();
  }, [eventData]);

  useEffect(() => {
    revisarFechasRegla();
    revisarHoras();
    revisarFrecuenciaMensual();
  }, [ruleData]);

  // Manejan el estado del evento
  const handleChange = (key) => async (event) => {
    setError(null);
    setEventData({ ...eventData, [key]: event.target.value });
  };

  // Revisa que la fecha de inicio del evento sea antes que la fecha de fin
  const revisarFechas = () => {
    if (eventData && eventData.diaInicio && eventData.diaFin) {
      if (
        !fechasValidas(
          localDate(eventData.diaFin),
          localDate(eventData.diaInicio),
        )
      ) {
        console.log('toast');
        toast({
          title: 'Error en las fechas',
          description: 'El día final no puede ser anterior al día de inicio',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  // Revisa que la fecha escogida para el evento esté en el rango especificado
  const revisarFechasRegla = () => {
    if (
      ruleData &&
      ruleData.dia &&
      eventData &&
      eventData.diaInicio &&
      eventData.diaFin
    ) {
      if (
        !fechasValidas(localDate(eventData.diaFin), localDate(ruleData.dia))
      ) {
        console.log('toast');
        toast({
          title: 'Error en las fechas',
          description:
            'El día escogido para el evento no puede ser después del rango escogido en el Paso 1',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
      if (
        !fechasValidas(localDate(ruleData.dia), localDate(eventData.diaInicio))
      ) {
        console.log('toast');
        toast({
          title: 'Error en las fechas',
          description:
            'El día escogido para el evento no puede ser antes del rango escogido en el Paso 1',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  // Revisa que la hora de inicio del evento sea antes que la de finalización
  const revisarHoras = () => {
    if (ruleData && ruleData.horaInicio && ruleData.horaFin) {
      if (!horasValidas(ruleData.horaInicio, ruleData.horaFin)) {
        console.log('toast');
        toast({
          title: 'Error en las horas',
          description: 'La hora final no puede ser menor que la hora de inicio',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const horasValidas = (horaInicioP, horaFinP) => {
    const horaInicio = new Date();
    horaInicio.setHours(horaInicioP.split(':')[0]);
    horaInicio.setMinutes(horaInicioP.split(':')[1]);
    const horaFin = new Date();
    horaFin.setHours(horaFinP.split(':')[0]);
    horaFin.setMinutes(horaFinP.split(':')[1]);
    return fechasValidas(horaFin, horaInicio);
  };

  const revisarFrecuenciaMensual = () => {
    if (ruleData && ruleData.dia && eventData && eventData.frecuencia) {
      if (eventData.frecuencia === 'mensual') {
        const dia = localDate(ruleData.dia).getDate();
        if (dia > 28) {
          toast({
            title: 'Error en el dia',
            description:
              'Como se escogió frecuencia semanal, no se puede escoger un día después del 28',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };

  const step1terminado = () => {
    if (
      false //!fechasValidas(new Date(eventData.diaFin), new Date(eventData.diaInicio))
    ) {
      toast({
        title: 'Error en las fechas',
        description: 'El día final no puede ser anterior al día de inicio',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    } else {
      return true;
    }
  };

  const step3terminado = () => {
    if (!horasValidas(ruleData.horaInicio, ruleData.horaFin)) {
      toast({
        title: 'Error en las fechas',
        description: 'La hora final no puede ser menor que la hora de inicio',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    } else {
      return true;
    }
  };

  const fechasValidas = (fechaMayor, fechaMenor) =>
    fechaMayor.getTime() >= fechaMenor.getTime();

  //Manejan el estado de la regla
  const handleChangeRule = (key) => async (event) => {
    setError(null);
    setRuleData({ ...ruleData, [key]: event.target.value });
  };

  // Crear el evento para todos los participantes
  const handleSubmit = async () => {
    // Correos
    const correos = invitedList.map((inv) => inv.correo);
    correos.push(user.correo);

    // Evento
    console.log(eventData);
    eventData.estado = 'aceptado';
    eventData.zonaHoraria = '+5';
    eventData.diaInicio = localDate(ruleData.dia);
    eventData.diaFin = localDate(eventData.diaFin);

    // Regla
    console.log(ruleData);
    const p1 = localDate(ruleData.dia);
    p1.setHours(ruleData.horaInicio.split(':')[0]);
    p1.setMinutes(ruleData.horaInicio.split(':')[1]);
    ruleData.horaInicio = p1;

    const p2 = localDate(ruleData.dia);
    p2.setHours(ruleData.horaFin.split(':')[0]);
    p2.setMinutes(ruleData.horaFin.split(':')[1]);
    ruleData.horaFin = p2;

    if (eventData.frecuencia === 'sinRepetir') {
      ruleData.unidad = 0;
    } else if (eventData.frecuencia === 'semanal') {
      ruleData.unidad = ruleData.dia.getDay();
    } else if (eventData.frecuencia === 'mensual') {
      ruleData.unidad = ruleData.dia.getDate();
    }

    delete ruleData.dia;
    eventData.reglas = [ruleData];

    const body = {
      correos,
      evento: eventData,
    };

    console.log(body);

    const response = await fetcher('eventos/crearEventoCompleto', 'POST', body);

    if (response.error) {
      return toast({
        title: 'Error',
        description: response.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    toast({
      title: 'Evento creado',
      description:
        'El evento se ha creado exitosamente y ha quedado añadido en tu horario y en el de tus invitados',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    await router.push('/calendar');

    // // Crear la regla

    // const response2 = await fetcher('reglas/', 'POST', ruleData);
    // if (response2.error) {
    //   setError(response2.error);
    // }
    // // Agregar la regla al evento
    // console.log('resoponses', response);
    // const response3 = await fetcher(
    //   `eventos/${response._id}/reglas/${response2._id}`,
    //   'PATCH',
    // );
    // if (response3.error) {
    //   setError(response3.error);
    // }
    // // Agregar el evento
    // const response4 = await fetcher(
    //   `usuarios/${user._id}/eventos/${response._id}`,
    //   'PATCH',
    // );
    // if (response4.error) {
    //   console.log('error');
    //   setError(response4.error);
    // } else {
    //   await router.push('/calendar');
    // }
  };

  //Manejan el estado del usuario a ser invitado
  const handleChangeInvited = () => async (event) => {
    setError(null);
    setInvitedData(event.target.value);
  };

  const handleAddInvited = () => async () => {
    if (!invitedData)
      return toast({
        title: 'Error',
        description: `Busca usuarios por su correo`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    if (invitedList.filter((e) => e.correo === invitedData).length > 0)
      return toast({
        title: 'Error',
        description: `El usuario ${invitedData} ya fue incluido en la lista`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    if (invitedData === user.correo)
      return toast({
        title: 'Error',
        description: 'No es necesario que te agregues a ti mismo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    const response = await fetcher(`usuarios/correo/${invitedData}`, 'GET');

    if (response.error) {
      setError(response.error);
      return toast({
        title: 'Error',
        description: response.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    // Asumiendo que todo esta bien
    setError(null);
    setInvitedList([...invitedList, response]);
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
    const correos = invitedList.map((inv) => inv.correo);
    correos.push(user.correo);
    const body = {
      correos,
      fechaInicio: localDate(eventData.diaInicio),
      fechaFin: localDate(eventData.diaFin),
    };
    console.log('body', body);
    const response = await fetcher(`usuarios/disponibilidad`, 'POST', body);
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
      {step === 0 && (
        <Step1
          setStep={setStep}
          handleChange={handleChange}
          step1terminado={step1terminado}
        />
      )}
      {step === 1 && (
        <Step2
          setStep={setStep}
          handleChangeInvited={handleChangeInvited}
          handleAddInvited={handleAddInvited}
          handleAvailability={handleAvailability}
          invitedListState={[invitedList, setInvitedList]}
        />
      )}
      {step === 2 && (
        <Step3
          setStep={setStep}
          disp={disp}
          handleChangeRule={handleChangeRule}
          step3terminado={step3terminado}
        />
      )}
      {step === 3 && (
        <Step4
          eventData={eventData}
          handleSubmit={handleSubmit}
          invitedList={invitedList}
          ruleData={ruleData}
        />
      )}
    </Box>
  );
};

export default Book;
