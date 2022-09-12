import { capitalizeFirstLetter } from '../../utils';
import { Avatar, Button, Card, Space, Typography } from 'antd';

import { UserOutlined, EditOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface ProfileHeader {
  name: string;
  alias?: string;
  path?: string;
}

export const ProfileHeader: React.FC<ProfileHeader> = ({
  name,
  alias,
  path,
}) => {
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
          <Link href={path}>
            <Button icon={<EditOutlined />}>Editar</Button>
          </Link>
        </div>
      </Space>
    </Card>
  );
};
