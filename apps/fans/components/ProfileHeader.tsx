import { FollowButton } from '@melomaniapp/ui';
import { Avatar, Card, Space, Typography } from 'antd';

import { UserOutlined } from '@ant-design/icons';
interface ProfileHeader {
  name: string;
  alias: string;
}

export const ProfileHeader: React.FC<ProfileHeader> = ({ name, alias }) => {
  return (
    <Card
      bordered={false}
      style={{
        margin: 'auto',
        background: '#fffafa',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Space direction="vertical" size="middle">
        <div style={{ margin: 'auto', alignItems: 'center' }}>
          <Avatar size={140} icon={<UserOutlined />} />
        </div>
        <Typography.Title>{name}</Typography.Title>
        <Typography.Paragraph>{`@${alias}`}</Typography.Paragraph>
        <div
          style={{
            width: '100%',
          }}
        >
          <FollowButton />
        </div>
      </Space>
    </Card>
  );
};
