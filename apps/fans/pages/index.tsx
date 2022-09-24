import { Layout } from '../components/layout/Layout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Home } from '../components/Home';
import { useUser } from '@melomaniapp/hooks';

export function Index() {
  const [session, loading] = useSession();
  const router = useRouter();

  const { data: user } = useUser(session);

  useEffect(() => {
    if (!loading && !session) {
      router.push('/');
    }
  }, [loading, session, router]);

  return (
    <Layout session={session}>
      <Home city={user?.city} session={session} />
    </Layout>
  );
}

export default Index;
