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
        Crea tu evento
      </Heading>
      <FormLabel>Nombre</FormLabel>
      <Input
        type="name"
        placeholder="Nombre..."
        onChange={handleChange('nombre')}
      />

      <FormLabel mt={1}>Descripción</FormLabel>
      <Input
        type="name"
        placeholder="Descripción..."
        onChange={handleChange('descripcion')}
      />

      <FormLabel mt={1}>Día inicio</FormLabel>
      <Input
        type="date"
        placeholder="Día inicio..."
        onChange={handleChange('diaInicio')}
      />

      <FormLabel mt={1}>Día fin</FormLabel>
      <Input
        type="date"
        placeholder="Día fin..."
        onChange={handleChange('diaFin')}
      />

      <FormLabel mt={1}>Frecuencia</FormLabel>
      <Select
        placeholder="Seleccione una opción"
        onChange={handleChange('frecuencia')}
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
        Siguiente
      </Button>
    </FormControl>
  );
}

export default Step1;
