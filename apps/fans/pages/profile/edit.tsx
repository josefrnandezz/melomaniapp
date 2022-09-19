import { EditUserDto } from '@melomaniapp/contracts/user';
import { useFan, useGenres } from '@melomaniapp/hooks';
import { CityDropdown, GenreFilter } from '@melomaniapp/ui';
import { Button, Card, Col, Form, message, Row, Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';

export const EditFanProfile: React.FC = () => {
  const [session, isSessionLoading] = useSession();
  const router = useRouter();

  if (isSessionLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }
  const { data: genres } = useGenres();

  const username = session?.user.email.slice(
    0,
    session?.user.email.indexOf('@')
  );

  const { data: fan } = useFan(username);
  const [form] = Form.useForm();

  const onSubmit = async (data: EditUserDto) => {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/users/${fan?._id}`,
      {
        method: 'Put',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, roles: fan?.roles }),
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
    <Layout session={session}>
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
                initialValue={fan?.city && fan?.city}
              >
                <CityDropdown selectedCity={fan?.city} />
              </Form.Item>

              <Form.Item
                required={true}
                name="genres"
                label="Genres"
                initialValue={fan?.genres.map((genre) => genre)}
                trigger="onChangeHandler"
              >
                <GenreFilter
                  genres={genres}
                  selectedGenres={fan?.genres.map((genre) => genre)}
                />
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
    </Layout>
  );
};

export default EditFanProfile;
