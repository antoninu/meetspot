import { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  FormHelperText,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

function Step1({ setStep, handleChange, step1terminado, eventData }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventData.nombre) {
      setError('Debe agregarle un nombre al evento');
    } else if (!eventData.descripcion) {
      setError('Debe agregarle una descripcion al evento');
    } else if (!eventData.diaInicio) {
      setError('Debe agregarle un día de inicio al evento');
    } else if (!eventData.diaFin) {
      setError('Debe agregarle un día fin al evento');
    } else if (!eventData.frecuencia) {
      setError('Debe agregarle la frencuencia al evento');
    } else {
      setError(null);
    }
  }, [eventData]);

  return (
    <FormControl id="signup">
      <Heading as="h3" size="lg" mb={7} textAlign="center">
        <FormattedMessage id="create_event_create" />
      </Heading>
      <FormLabel id="name-label">
        <FormattedMessage id="create_name" />
      </FormLabel>
      <Input
        type="name"
        placeholder="Nombre..."
        onChange={handleChange('nombre')}
        id="name"
      />
      <FormLabel mt={1} id="description-label">
        <FormattedMessage id="create_description" />
      </FormLabel>
      <Input
        type="name"
        placeholder="Descripción..."
        onChange={handleChange('descripcion')}
        id="description"
      />
      <FormLabel mt={1} id="initial-day-label">
        <FormattedMessage id="create_start_day" />
      </FormLabel>
      <Input
        type="date"
        placeholder="Día inicio..."
        onChange={handleChange('diaInicio')}
        id="initial-day"
      />
      <FormLabel mt={1} id="final-day-label">
        <FormattedMessage id="create_end_day" />
      </FormLabel>
      <Input
        type="date"
        placeholder="Día fin..."
        onChange={handleChange('diaFin')}
        id="final-day"
      />
      <FormLabel mt={1} id="frecuency-label">
        <FormattedMessage id="create_frequency" />
      </FormLabel>
      <Select
        placeholder="Seleccione una opción"
        onChange={handleChange('frecuencia')}
        id="frequency"
        aria-label="frequency"
      >
        <option value="sinRepetir">Sin repetición</option>
        <option value="semanal">Semanal</option>
        <option value="mensual">Mensual</option>
      </Select>
      {error && <FormHelperText color="red">{error}</FormHelperText>}
      <Button
        width="100%"
        mt={4}
        type="submit"
        colorScheme="blue"
        disabled={
          !eventData.nombre ||
          !eventData.descripcion ||
          !eventData.diaInicio ||
          !eventData.diaFin ||
          !eventData.frecuencia
        }
        onClick={() => {
          if (step1terminado()) setStep(1);
        }}
      >
        <FormattedMessage id="create_next" />
      </Button>
    </FormControl>
  );
}

export default Step1;
