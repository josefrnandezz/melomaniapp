import { FollowType, FollowUserGenreDTO } from '@melomaniapp/contracts/follow';
import { EditUserDto } from '@melomaniapp/contracts/user';
import { useFollows, useUser } from '@melomaniapp/hooks';
import { CityDropdown } from '@melomaniapp/ui';
import { Button, Card, Col, Form, message, Row, Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';

export const EditFanProfile: React.FC = () => {
  const [form] = Form.useForm();
  const [session, isLoading] = useSession();
  const router = useRouter();
  const { data: follows } = useFollows<FollowUserGenreDTO>(
    FollowType.Genre,
    session
  );

  const { data: user } = useUser(session);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const onSubmit = async (data: EditUserDto) => {
    const genres = follows?.map(({ followedToId }) => followedToId);

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/users/${user?._id}`,
      {
        method: 'Put',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, roles: user?.roles, genres }),
      }
    );

    if (response.ok) {
      message.success({ content: 'Perfil actualizado!', key: 'updatable' });

      setTimeout(() => router.push('/profile'), 1000);
    } else {
      message.error({ content: 'Error al actualizar!', key: 'updatable' });
    }
  };

  return (
    <Row
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '160px',
        marginTop: '160px',
      }}
    >
      <Col span={12} style={{ margin: 'auto' }}>
        <Card style={{ borderRadius: '20px' }}>
          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Form.Item
              required={true}
              style={{ width: '100%' }}
              name="city"
              label="Ciudad"
              trigger="onChangeHandler"
              initialValue={user?.city && user?.city}
            >
              <CityDropdown selectedCity={user?.city} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Confirmar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default EditFanProfile;
