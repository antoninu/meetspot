import { ChakraTheme, extendTheme } from '@chakra-ui/react';

const config = {};

const colors = {
  blue: {
    500: '#2b71b3',
  },
  gray: {
    500: '#525d6c',
  },
};

const components = {};

const styles = {
  global: () => ({
    '#__next': {
      height: '100%',
    },
  }),
};

const theme: ChakraTheme = extendTheme({
  config,
  styles,
  colors,
  components,
});
export default theme;
