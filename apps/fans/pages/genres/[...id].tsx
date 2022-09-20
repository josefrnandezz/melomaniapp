import { FollowType } from '@melomaniapp/contracts/follow';
import { useFan, useGenre } from '@melomaniapp/hooks';
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
  const { data: genre, isLoading: isGenreLoading } = useGenre(id as string);

  const username = session?.user.email.slice(
    0,
    session?.user.email.indexOf('@')
  );

  const fan = useFan(username);

  if (fan?.isLoading || isGenreLoading) {
    return <Spin size="large" />;
  }

  const followRoute = `users/${fan.data?._id}/follows_to/genres/${genre?._id}`;

  const unfollowRoute = `users/${fan.data?._id}/unfollows_to/genres/${genre?._id}`;

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
