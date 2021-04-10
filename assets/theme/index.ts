import { ChakraTheme, extendTheme } from '@chakra-ui/react';

const config = {};

const colors = {};

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
