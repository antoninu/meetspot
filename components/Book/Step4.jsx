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
  Center,
  Input,
  Select,
  Text,
  Flex,
  Comment,
  List,
  ListItem,
  ListIcon,
  MdCheckCircle,
} from '@chakra-ui/react';
import stringFormatter from 'utils/stringFormatter';
import FaceIcon from 'public/icons/face.svg';
import { FormattedMessage } from 'react-intl';

function Step4({ eventData, handleSubmit, invitedList, ruleData }) {
  return (
    <Box>
      <Heading as="h3" size="lg" mb={7} textAlign="center">
        <FormattedMessage id="create_last_check_title" />
      </Heading>
      <Text w={['100%', '100%', '30vw']}>
        <FormattedMessage id="create_last_check_1" /> <b>{eventData.nombre}</b><FormattedMessage id="create_last_check_2" />{' '}
        <b>{eventData.descripcion}</b><FormattedMessage id="create_last_check_3" />{' '}
        <b>{eventData.diaInicio}</b> <FormattedMessage id="create_last_check_4" /> <b>{eventData.diaFin}</b><FormattedMessage id="create_last_check_5" />
        <b>{eventData.frecuencia}</b><FormattedMessage id="create_last_check_6" /><b>{ruleData.dia}</b>
        <FormattedMessage id="create_last_check_7" /><b>{ruleData.horaInicio}</b><FormattedMessage id="create_last_check_8" />{' '}
        <b>{ruleData.horaFin}</b>.
      </Text>

      <Text mt={7} width="100%">
        <b><FormattedMessage id="create_last_invited" /></b>
      </Text>
      <List spacing={3}>
        {invitedList.length > 0 ? (
          invitedList.map((invitado, id) => (
            <ListItem key={id}>
              <ListIcon as={FaceIcon} color="green.500" h="24px" w="24px" />
              {invitado
                ? stringFormatter(
                    invitado.nombre + ' ' + invitado.apellido,
                    'name',
                  ) +
                  ' - ' +
                  invitado.correo
                : ''}
            </ListItem>
          ))
        ) : (
          <Text><FormattedMessage id="create_last_nobody" /></Text>
        )}
      </List>

      <Button
        width="100%"
        mt={7}
        type="submit"
        colorScheme="blue"
        onClick={() => {
          handleSubmit();
        }}
      >
        <FormattedMessage id="schedule_button" />
      </Button>
    </Box>
  );
}

export default Step4;
