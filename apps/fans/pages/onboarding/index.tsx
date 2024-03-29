import { EditUserDto } from '@melomaniapp/contracts/user';
import { useGenres, useUser } from '@melomaniapp/hooks';
import { CityDropdown } from '@melomaniapp/ui';
import { Button, Card, Col, Form, message, Row, Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';

export const FanOnboarding: React.FC = () => {
  const [session] = useSession();
  const router = useRouter();

  const { data: user } = useUser(session);
  const { data: genres, isLoading } = useGenres();

  if (isLoading || !router) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const [form] = Form.useForm();

  const onSubmit = async (data: EditUserDto) => {
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
        body: JSON.stringify({ ...data, genres: [], roles: user?.roles }),
      }
    );

    if (response.ok) {
      message.success({ content: 'Perfil actualizado!', key: 'updatable' });

      setTimeout(() => router.push('/'), 1000);
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
              trigger="onChangeHandler"
              label="Ciudad"
            >
              <CityDropdown />
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

export default FanOnboarding;
