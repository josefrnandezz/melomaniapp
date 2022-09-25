import { Layout } from '../components/layout/Layout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Home } from '../components/Home';
import { useUser } from '@melomaniapp/hooks';
import { Spin } from 'antd';

export function Index() {
  const [session, isLoading] = useSession();
  const router = useRouter();

  const { data: user } = useUser(session);

  useEffect(() => {
    if (!isLoading && session && !user?.city) {
      router.push('/');
    }
  }, [isLoading, session, router]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  return <Home city={user?.city} session={session} />;
}

export default Index;
