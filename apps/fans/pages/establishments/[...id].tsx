import { useEstablishment } from '@melomaniapp/hooks';

import { Col, Row, Spin, Typography } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';

export const EstablishmentPage = () => {
  const [session, isLoading] = useSession();
  const router = useRouter();

  if (isLoading) {
    return <Spin size="large" />;
  }

  const { id } = router.query;
  const { data: establishment } = useEstablishment(id as string);

  return (
    <Layout session={session}>
      <Row>
        <Col>
          <Typography.Title>{establishment?.name}</Typography.Title>
          <Typography.Paragraph>{`@${establishment?.alias}`}</Typography.Paragraph>
        </Col>
      </Row>
      <Row style={{ backgroundColor: 'white', height: '100%' }}>
        <Col>{establishment?.description}</Col>
      </Row>
    </Layout>
  );
};

export default EstablishmentPage;
