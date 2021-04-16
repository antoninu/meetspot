import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react'

function Step1({ setStep, handleChange }) {
  return (
    <FormControl id="signup">
      <Heading>Paso 1</Heading>
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
        <option value="diaria">Diaria</option>
        <option value="semanal">Semanal</option>
        <option value="mensual">Mensual</option>
      </Select>

      <Button
        width="100%"
        mt={4}
        type="submit"
        colorScheme="blue"
        onClick={() => setStep(1)}
      >
        Siguiente
      </Button>
    </FormControl>
  );
}

export default Step1;
