import { useState, useEffect } from 'react';
import { Box, Heading, useToast, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useStateValue from 'hooks/useStateValue';
import fetcher from 'utils/fetcher';
import localDate from 'utils/localDate';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Stepper from './Stepper';
import { FormattedMessage } from 'react-intl';


const Book = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState({});
  const [ruleData, setRuleData] = useState({});
  const [invitedData, setInvitedData] = useState('');
  const [invitedList, setInvitedList] = useState([]);
  const [, setError] = useState(null);
  const [disp, setDisp] = useState(null);
  const [availabilityCheck, setAvailabilityCheck] = useState(false);
  const [userList, setUserList] = useState([]);
  const [emails, setEmails] = useState([]);

  const toast = useToast();

  const [{ user }] = useStateValue();
  const [step, setStep] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    revisarFechas();
  }, [eventData]);

  useEffect(() => {
    revisarFechasRegla();
    revisarHoras();
    revisarFrecuenciaMensual();
  }, [ruleData]);

  const fetchUsers = async () => {
    const response = await fetcher('usuarios', 'GET');
    if (response.error) {
      return toast({
        title: 'Error',
        description: response.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    let userEmails = response.map((element) => {
      return { value: element.correo, label: element.correo };
    });
    setUserList(userEmails);
  };
  //revisa que se tenga conexiono se envia una notificación de error
  const verificarConexion = () => {
    if (process.browser) {
      if (!navigator.onLine) {
        toast({
          title: 'Sin conexión a internet',
          description:
            'Este servicio solo se puede usar con una conexión a internet',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
    }
    return true;
  };

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
        toast({
          title: 'Error en las fechas',
          description:
            'El día escogido para el evento no puede ser después del rango escogido en el Paso 1',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      if (
        !fechasValidas(localDate(ruleData.dia), localDate(eventData.diaInicio))
      ) {
        toast({
          title: 'Error en las fechas',
          description:
            'El día escogido para el evento no puede ser antes del rango escogido en el Paso 1',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      return true;
    }
    return true;
  };

  // Revisa que la hora de inicio del evento sea antes que la de finalización
  const revisarHoras = () => {
    if (ruleData && ruleData.horaInicio && ruleData.horaFin) {
      if (!horasValidas(ruleData.horaInicio, ruleData.horaFin)) {
        toast({
          title: 'Error en las horas',
          description: 'La hora final no puede ser menor que la hora de inicio',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      return true;
    }
    return true;
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
              'Como se escogió frecuencia mensual, no se puede escoger un día después del 28',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return false;
        }
        return true;
      }
      return true;
    }
    return true;
  };

  const step1terminado = () => {
    if (!verificarConexion()) {
      toast({
        title: 'Error',
        description: 'La conexión no está disponible',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!eventData.frecuencia) {
      toast({
        title: 'Por favor selecciona una frecuencia',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    } else if (
      !fechasValidas(new Date(eventData.diaFin), new Date(eventData.diaInicio))
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

  const step2terminado = () => {
    if (!verificarConexion()) return false;
    return true;
  };

  const step3terminado = () => {
    if (!verificarConexion()) return;
    return revisarHoras() && revisarFechasRegla() && revisarFrecuenciaMensual();
  };

  const fechasValidas = (fechaMayor, fechaMenor) =>
    fechaMayor.getTime() >= fechaMenor.getTime();

  //Manejan el estado de la regla
  const handleChangeRule = (key) => async (event) => {
    setError(null);
    setRuleData({ ...ruleData, [key]: event.target.value });
  };

  // Construir body de solicitud para verificar la disponbilidad o crear un evento
  const buildBody = () => {
    // Correos

    const correos = invitedList.map((inv) => inv.correo);
    correos.push(user.correo);

    // Evento
    const evento = JSON.parse(JSON.stringify(eventData));

    evento.estado = 'aceptado';
    evento.zonaHoraria = '+5';
    if (eventData.frecuencia === 'sinRepetir') {
      evento.diaInicio = localDate(ruleData.dia);
    } else if (eventData.frecuencia === 'semanal') {
      evento.diaInicio = getLastSunday(localDate(ruleData.dia));
    } else if (eventData.frecuencia === 'mensual') {
      evento.diaInicio = getFirstDayMonth(localDate(ruleData.dia));
    }
    evento.diaFin = localDate(eventData.diaFin);

    // Regla
    const rule = JSON.parse(JSON.stringify(ruleData));

    if (eventData.frecuencia === 'sinRepetir') {
      rule.unidad = 0;
    } else if (eventData.frecuencia === 'semanal') {
      rule.unidad = localDate(ruleData.dia).getDay();
    } else if (eventData.frecuencia === 'mensual') {
      rule.unidad = localDate(ruleData.dia).getDate();
    }
    rule.horaInicio = new Date(evento.diaInicio);
    rule.horaFin = new Date(evento.diaInicio);
    rule.horaInicio.setHours(ruleData.horaInicio.split(':')[0]);
    rule.horaInicio.setMinutes(ruleData.horaInicio.split(':')[1]);

    rule.horaFin.setHours(ruleData.horaFin.split(':')[0]);
    rule.horaFin.setMinutes(ruleData.horaFin.split(':')[1]);

    evento.reglas = [rule];

    const body = {
      correos,
      evento: evento,
      creador: user.correo,
    };

    return body;
  };

  // Crear el evento para todos los participantes
  const handleSubmit = async () => {
    if (!verificarConexion()) return;
    const body = buildBody();
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
  };

  // Obtene el último domingo de una fecha dada
  const getLastSunday = (d) => {
    var t = new Date(d);
    t.setDate(t.getDate() - t.getDay());
    return t;
  };

  // Obtiene el primer día del mes de una fecha dada
  const getFirstDayMonth = (d) => {
    var t = new Date(d);
    t.setDate(1);
    return t;
  };

  //Manejan el estado del usuario a ser invitado
  const handleFinalInvited = async (selected) => {
    let listaCompleta = [];
    for (const element of selected) {
      const email = element.value;
      const response = await fetcher(`usuarios/correo/${email}`, 'GET');
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
      listaCompleta.push(response);
      // Asumiendo que todo esta bien
    }
    setInvitedList(listaCompleta);
  };

  const handleAddInvited = (email) => {
    if (!verificarConexion()) {
      toast({
        title: 'Error',
        description: 'La conexión no está disponible',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (email === user.correo) {
      toast({
        title: 'Error',
        description: 'No es necesario que te agregues a ti mismo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleAvailability = async () => {
    if (!verificarConexion()) return;
    const correos = invitedList.map((inv) => inv.correo);
    correos.push(user.correo);
    const body = {
      correos,
      fechaInicio: localDate(eventData.diaInicio),
      fechaFin: localDate(eventData.diaFin),
    };
    const response = await fetcher(`usuarios/disponibilidad`, 'POST', body);
    if (response.error) {
      return toast({
        title: 'Error',
        description: response.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      let newDisp = response.map((element) => {
        element.start = new Date(element.start);
        element.end = new Date(element.end);
        return element;
      });
      setDisp(newDisp);
    }
  };

  const verficarDisponibilidad = async () => {
    if (!verificarConexion()) return;
    const body = buildBody();
    const response = await fetcher(
      `eventos/verificarDisponibilidad`,
      'POST',
      body,
    );
    if (response.error) {
      console.log(response.error);
      toast({
        title: 'Error',
        description:
          typeof response.error === 'String'
            ? response.error
            : 'No hay disponibilidad',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    setAvailabilityCheck(true);
    toast({
      title: 'Verificado',
      description: response.mensaje,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    return true;
  };

  return (
    <Center minH="80vh" py={[14]} mt={14}>
      <Box borderWidth="2px" p={7} borderRadius={14} w={[300, 400, 600]}>
        <Heading mb={4} textAlign="center">
          <FormattedMessage id="create_event_title" />
        </Heading>
        <Stepper step={step} setStep={setStep} />
        {step === 0 && (
          <Step1
            setStep={setStep}
            handleChange={handleChange}
            step1terminado={step1terminado}
            eventData={eventData}
          />
        )}
        {step === 1 && (
          <Step2
            setStep={setStep}
            handleFinalInvited={handleFinalInvited}
            handleAddInvited={handleAddInvited}
            handleAvailability={handleAvailability}
            step2terminado={step2terminado}
            userEmails={userList}
            emailsState={[emails, setEmails]}
            user={user}
          />
        )}
        {step === 2 && (
          <Step3
            setStep={setStep}
            disp={disp}
            handleChangeRule={handleChangeRule}
            step3terminado={step3terminado}
            verficarDisponibilidad={verficarDisponibilidad}
            availabilityCheck={availabilityCheck}
            ruleData={ruleData}
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
    </Center>
  );
};

export default Book;
