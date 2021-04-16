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


function Step3({disp, handleChange}) {

    const [disp2, setDisp2] = useState(null)
    const [loading, setLoading] = useState(true)

    console.log(disp)

    const [error, setError] = useState(null);
    const [{ user }] = useStateValue();


    useEffect(()=>{
        if(disp){
            console.log(disp)
            let newDisp = disp.map(element => {
                element.start = new Date(element.start)
                element.end = new Date(element.end)  
                return element          
            });
            setDisp2(newDisp)
            setLoading(false) 
        }
        setLoading(false) // Quitar esto despues
    },[])

    if(loading) {
        return <p>Loading</p>
    }
    else {
        console.log("entra")
        console.log("disp", disp)
        return(
        <div>
            <Heading>Paso 3</Heading>
            <Text>Selecciona la hora del evento</Text>
            <FormLabel mt={1}>Hora inicio</FormLabel>
            <Input
                type="time"
                placeholder="Hora inicio"
                width="85%"
                onChange={handleChange('horaIni')}
            />
            <FormLabel mt={1}>Hora fin</FormLabel>
            <Input
                type="time"
                placeholder="Hora fin"
                width="85%"
                onChange={handleChange('horaFin')}
            />
            <Box id="invited-list" 
                borderWidth="2px"
                px={7}
                py={3}
                marginTop="12px"
                borderRadius={14}
            >
                <FormLabel mt={1}>Lista de usuarios invitados</FormLabel>
            </Box>
            <Comment>
            <BigCalendar
                localizer={localizer}
                events={disp2}
                defaultView = "week"
                startAccessor= "start" 
                endAccessor= "end"
                style={{ height: 500 }}
            />
            </Comment>
        </div> )
    }
}

export default Step3;