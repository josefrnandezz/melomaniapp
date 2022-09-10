import { Layout } from '../components/layout/Layout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function Index() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/');
    }
  }, [loading, session, router]);

  return (
    <Layout session={session}>
      <h1>Holi</h1>
    </Layout>
  );
}

export default Index;
