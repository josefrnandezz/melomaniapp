import './styles.less';

import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import Head from 'next/head';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider session={session}>
      <Head>
        <title>Melomaniapp Fans</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

export default App;
