import { useGenre } from '@melomaniapp/hooks';
import { Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';
import { ProfileHeader } from '../../components/ProfileHeader';

export const GenrePage = () => {
  const [session, isLoading] = useSession();
  const router = useRouter();

  if (isLoading) {
    return <Spin size="large" />;
  }

  const { id } = router.query;
  const { data: genre } = useGenre(id as string);

  return (
    <Layout session={session}>
      <div style={{ marginBottom: '100px' }}>
        <ProfileHeader name={genre?.name} alias="" />
      </div>
    </Layout>
  );
};

export default GenrePage;
