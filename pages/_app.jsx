import { ChakraProvider } from '@chakra-ui/react';
import theme from 'assets/theme';
import { StateProvider } from 'state/StateProvider';
import initialState from 'state/initialState';
import reducer from 'state/reducer';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Component {...pageProps} />
      </StateProvider>
    </ChakraProvider>
  );
}

export default MyApp;
