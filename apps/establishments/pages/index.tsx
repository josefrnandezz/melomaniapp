import { Layout } from '../components/layout/Layout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Home from '../components/Home';
import { useMyEstablishment } from '@melomaniapp/hooks';

export function Index() {
  const [session, isLoading] = useSession();
  const establishment = useMyEstablishment(session);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session && !establishment) {
      router.push('/');
    }
  }, [isLoading, session, router]);

  return (
    <Layout session={session}>
      <Home establishmentId={establishment.data?._id} />
    </Layout>
  );
}

export default Index;
