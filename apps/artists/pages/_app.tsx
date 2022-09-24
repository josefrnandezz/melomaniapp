import './styles.less';

import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { Layout } from '../components/layout/Layout';

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
          <title>Melomaniapp Artists</title>
        </Head>
        <main className="app">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </SWRConfig>
    </Provider>
  );
}

export default App;
