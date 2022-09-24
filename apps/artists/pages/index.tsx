import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Home } from '../components/Home';
import { useGenres, useMyArtist } from '@melomaniapp/hooks';
import { Spin } from 'antd';

export function Index() {
  const [session, loading] = useSession();
  const { data, isError } = useMyArtist(session);
  const genres = useGenres();
  const router = useRouter();

  if (loading || genres.isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  if (!data && isError) {
    router.push('/onboarding');
  }

  return <Home id={data?._id} genres={genres.data} />;
}

export default Index;
