import { Avatar, Button, Card, Space, Typography } from 'antd';

import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { Session } from 'next-auth';
import Link from 'next/link';

interface FanProfileHeaderProps {
  name: string;
  session?: Session;
}

export const FanProfileHeader: React.FC<FanProfileHeaderProps> = ({
  name,
  session,
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
        marginBottom: '60px',
      }}
    >
      <Space direction="vertical" size="middle">
        <div style={{ margin: 'auto', alignItems: 'center' }}>
          {!session ? (
            <Avatar size={140} icon={<UserOutlined />} />
          ) : (
            <Avatar
              size={140}
              src={
                <img referrerPolicy="no-referrer" src={session.user?.image} />
              }
            />
          )}
        </div>
        <Typography.Title>{name}</Typography.Title>
        <div
          style={{
            width: '100%',
          }}
        >
          <Link href="/profile/edit">
            <Button icon={<EditOutlined />}>Editar perfil</Button>
          </Link>
        </div>
      </Space>
    </Card>
  );
};
