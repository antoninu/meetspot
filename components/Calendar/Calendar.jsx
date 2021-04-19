import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, Button, Heading } from '@chakra-ui/react';

const localizer = momentLocalizer(moment);

const Calendar = ({ eventos }) => {
  return (
    <Box>
      <BigCalendar
        localizer={localizer}
        onSelectEvent={(event) => console.log(event)}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        eventPropGetter={(event, start, end, isSelected) => {
          let newStyle = {
            backgroundColor: '#3182CE',
            border: 'none',
          };

          return {
            style: newStyle,
          };
        }}
      />
    </Box>
  );
};

export default Calendar;
