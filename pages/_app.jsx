import { ChakraProvider } from '@chakra-ui/react';
import theme from 'assets/theme';
import { StateProvider } from 'state/StateProvider';
import initialState from 'state/initialState';
import reducer from 'state/reducer';
import esTranslations from '../locales/es.json';
import enTranslations from '../locales/en.json';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();

  console.log(locale);

  let messages;

  if (locale.includes('es')) {
    messages = esTranslations;
  } else {
    messages = enTranslations;
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      <ChakraProvider theme={theme}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Component {...pageProps} />
        </StateProvider>
      </ChakraProvider>
    </IntlProvider>
  );
}

export default MyApp;
