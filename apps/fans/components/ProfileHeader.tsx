import { FollowButton } from '@melomaniapp/ui';
import { Avatar, Card, Space, Spin, Typography } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import { capitalizeFirstLetter } from '../utils';
import { Session } from 'next-auth';
import { useFollows } from '@melomaniapp/hooks';
import { FollowType } from '@melomaniapp/contracts/follow';

interface ProfileHeader {
  type: FollowType;
  id: string;
  name: string;
  alias?: string;
  followRoute: string;
  unfollowRoute: string;
  session: Session;
}

export const ProfileHeader: React.FC<ProfileHeader> = ({
  type,
  id,
  name,
  alias,
  followRoute,
  unfollowRoute,
  session,
}) => {
  const follows = useFollows(type, session);

  const follow = follows?.data?.find((follow) => follow.followedToId === id);

  if (follows?.isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const createFollow = () =>
    fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/follows/${followRoute}`,
      {
        method: 'Post',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

  const deleteFollow = () =>
    fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/follows/${follow?._id}/${unfollowRoute}`,
      {
        method: 'Put',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

  return (
    <Card
      bordered={false}
      style={{
        margin: 'auto',
        background: '#fffafa',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '20px',
      }}
    >
      <Space direction="vertical" size="middle">
        <div style={{ margin: 'auto', alignItems: 'center' }}>
          <Avatar size={140} icon={<UserOutlined />} />
        </div>
        <Typography.Title>
          {name && capitalizeFirstLetter(name)}
        </Typography.Title>
        {alias ? (
          <Typography.Paragraph>{`@${alias}`}</Typography.Paragraph>
        ) : null}
        <div
          style={{
            width: '100%',
          }}
        >
          <FollowButton
            isActive={!!follow}
            createFollow={createFollow}
            deleteFollow={deleteFollow}
          />
        </div>
      </Space>
    </Card>
  );
};
