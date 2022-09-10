import './styles.less';

import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json),
        }}
      >
        <Head>
          <title>Melomaniapp Establishments</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </SWRConfig>
    </Provider>
  );
}

export default App;
