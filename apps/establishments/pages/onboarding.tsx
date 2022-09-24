import { EstablishmentForm } from '@melomaniapp/ui';
import { Card, Col, message, Row, Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../components/layout/Layout';

export const Onboarding: React.FC = () => {
  const [session, isLoading] = useSession();
  const router = useRouter();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const onSubmit = async (values) => {
    const { city, full, ...args } = values;

    const body = JSON.stringify({
      ...args,
      email: session.user.email,
      address: { city: values.city, full: values.full },
      imageUrl: session?.user.image,
    });

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/establishments`,
      {
        method: 'Post',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body,
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
    <Row justify="center">
      <Col span={12}>
        <Card style={{ borderRadius: '20px', marginBottom: '70px' }}>
          <EstablishmentForm onSubmit={onSubmit} />
        </Card>
      </Col>
    </Row>
  );
};

export default Onboarding;
