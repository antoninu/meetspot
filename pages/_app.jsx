import { ChakraProvider } from '@chakra-ui/react';
import theme from 'assets/theme';
import { StateProvider } from 'state/StateProvider';
import initialState from 'state/initialState';
import reducer from 'state/reducer';
import { register } from 'next-offline/runtime';

function MyApp({ Component, pageProps }) {
  if(process.browser){
    register('/service-worker.js', {scope: '/'});
  }
  return (
    <ChakraProvider theme={theme}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Component {...pageProps} />
      </StateProvider>
    </ChakraProvider>
  );
}

export default MyApp;
