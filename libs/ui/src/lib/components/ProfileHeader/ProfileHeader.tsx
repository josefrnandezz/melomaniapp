import { FollowButton } from '@melomaniapp/ui';
import { capitalizeFirstLetter } from '../../utils';
import { Avatar, Card, Space, Typography } from 'antd';

import { UserOutlined } from '@ant-design/icons';

interface ProfileHeader {
  name: string;
  alias?: string;
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
          <FollowButton />
        </div>
      </Space>
    </Card>
  );
};
