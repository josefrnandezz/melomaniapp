import { Layout } from '../components/layout/Layout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Home from '../components/Home';
import { useMyEstablishment } from '@melomaniapp/hooks';
import { Spin } from 'antd';

export function Index() {
  const [session, isLoading] = useSession();
  const establishment = useMyEstablishment(session);
  const router = useRouter();

  if (isLoading || establishment.isLoading || !router) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  if (!establishment.data && establishment.isError) {
    router.push('/onboarding');
  }

  return <Home establishmentId={establishment.data?._id} />;
}

export default Index;
