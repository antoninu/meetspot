import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="es" style={{ height: '100%' }}>
        <Head>
          <link href="/react-big-calendar.css" rel="stylesheet" />
        </Head>
        <body style={{ height: '100%' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
