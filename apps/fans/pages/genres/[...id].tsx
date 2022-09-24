import { FollowType } from '@melomaniapp/contracts/follow';
import { useGenre, useUser } from '@melomaniapp/hooks';
import { Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';
import { ProfileHeader } from '../../components/ProfileHeader';

export const GenrePage = () => {
  const [session] = useSession();
  const router = useRouter();

  const { data: user } = useUser(session);

  const { id } = router.query;
  const { data: genre, isLoading } = useGenre(id as string);

  if (isLoading) {
    return <Spin size="large" />;
  }

  const followRoute = `users/${user?._id}/follows_to/genres/${genre?._id}`;

  const unfollowRoute = `users/${user?._id}/unfollows_to/genres/${genre?._id}`;

  return (
    <Layout session={session}>
      <div style={{ marginBottom: '100px' }}>
        <ProfileHeader
          type={FollowType.Genre}
          id={genre?._id}
          name={genre?.name}
          followRoute={followRoute}
          unfollowRoute={unfollowRoute}
          session={session}
        />
      </div>
    </Layout>
  );
};

export default GenrePage;
