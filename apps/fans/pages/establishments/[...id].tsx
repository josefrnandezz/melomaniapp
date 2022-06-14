import { useEstablishment } from '@melomaniapp/hooks';
import { FanLayout } from '@melomaniapp/ui';
import { Col, Row, Layout, Typography, Space } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export const EstablishmentPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  const { id } = router.query;
  const establishment = useEstablishment(id as string);

  return (
    <FanLayout session={session}>
      <Row>
        <Col>
          <Typography.Title>{establishment?.name}</Typography.Title>
          <Typography.Paragraph>{`@${establishment?.alias}`}</Typography.Paragraph>
        </Col>
      </Row>
      <Row style={{ backgroundColor: 'white', height: '100%' }}>
        <Col>{establishment?.description}</Col>
      </Row>
    </FanLayout>
  );
};

export default EstablishmentPage;
