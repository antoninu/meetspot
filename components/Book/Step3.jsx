import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Calendar from 'components/Calendar/Calendar';
import { useEffect, useState } from 'react';

const localizer = momentLocalizer(moment);

const now = new Date();


function Step3({disp}) {

    const [disp2, setDisp2] = useState(null)
    const [loading, setLoading] = useState(true)

    console.log(disp)


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
    },[])

    if(loading){
           return  <p> Loading </p>
        }
    else {
        console.log("entra")
        console.log("disp", disp)
        return(
        <div>
            <BigCalendar
                localizer={localizer}
                events={disp2}
                defaultView = "week"
                startAccessor= "start" 
                endAccessor= "end"
            />
        </div> )
    }
}

export default Step3;