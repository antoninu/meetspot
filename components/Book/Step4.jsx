import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Calendar from 'components/Calendar/Calendar';
import { useEffect, useState } from 'react';
import useStateValue from 'hooks/useStateValue';
import fetcher from 'utils/fetcher';
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
    Comment
  } from '@chakra-ui/react';

const localizer = momentLocalizer(moment);

const now = new Date();


function Step4({eventData, handleSubmit}) {

    console.log(eventData);

/**
 * descripcion: "Tobia Raffaele"
diaFin: "2021-04-22"
diaInicio: "2021-04-10"
frecuencia: "sinRepetir"
nombre: "Tobia Raffaele"
 */

    return(
        <div>
            <Heading>Paso 3</Heading>
            <br></br>
            <Flex alignItems="center" justifyContent="space-around">
                <FormLabel mt={1} width="20%">Nombre</FormLabel>
                <Input
                type="name"
                value={eventData.nombre}
                readonly
                />
            </Flex>
            <br></br>
            <Flex alignItems="center" justifyContent="space-around">
                <FormLabel mt={1} width="20%">Descripcion</FormLabel>
                <Input
                type="name"
                value={eventData.descripcion}
                readonly
                />
            </Flex>
            <br></br>
            <Flex alignItems="center" justifyContent="space-around">
                <FormLabel mt={1} width="20%">Frecuencia</FormLabel>
                <Input
                type="name"
                value={eventData.frecuencia}
                readonly
                />
            </Flex>
            <br></br>
            <Flex alignItems="center" justifyContent="space-around">
                <FormLabel mt={1} width="20%">Dia inicio</FormLabel>
                <Input
                type="name"
                value={eventData.diaInicio}
                readonly
                />
            </Flex>
            <br></br>
            <Flex alignItems="center" justifyContent="space-around">
                <FormLabel mt={1} width="20%">Dia fin</FormLabel>
                <Input
                type="name"
                value={eventData.diaFin}
                readonly
                />
            </Flex>
            <br></br>
            <Button
                width="100%"
                mt={4}
                type="submit"
                colorScheme="blue"
                onClick={()=> {handleSubmit()}}
            >
            Crear evento
            </Button>
        </div>
    );
    
}

export default Step4;