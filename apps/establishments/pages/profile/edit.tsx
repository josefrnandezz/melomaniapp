import { EditEstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { useMyEstablishment } from '@melomaniapp/hooks';
import { EstablishmentForm } from '@melomaniapp/ui';
import { Card, Col, message, PageHeader, Row, Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export const EditEstablishmentProfile: React.FC = () => {
  const [session] = useSession();
  const router = useRouter();

  const { data: establishment, isLoading } = useMyEstablishment(session);

  if (isLoading || !router) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const onSubmit = async (values) => {
    const { city, full, ...rest } = values;

    const body: EditEstablishmentDTO = {
      ...rest,
      address: {
        city: values.city,
        full: values.full,
      },
      email: establishment?.email,
    };

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/establishments/${establishment?._id}`,
      {
        method: 'Put',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...body }),
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
    <Row justify="center">
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Card style={{ borderRadius: '20px', marginBottom: '70px' }}>
          <PageHeader
            title="Edita tu perfil"
            onBack={() => window.history.back()}
          >
            <EstablishmentForm
              establishment={establishment}
              onSubmit={onSubmit}
            />
          </PageHeader>
        </Card>
      </Col>
    </Row>
  );
};

export default EditEstablishmentProfile;
