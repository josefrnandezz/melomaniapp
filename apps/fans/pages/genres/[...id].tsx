import { useGenre } from '@melomaniapp/hooks';
import { FollowButton } from '@melomaniapp/ui';
import { Card, Col, Row, Spin, Typography } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';
import { capitalizeFirstLetter } from '../../utils';

export const GenrePage = () => {
  const [session, isLoading] = useSession();
  const router = useRouter();

  if (isLoading) {
    return <Spin size="large" />;
  }

  const { id } = router.query;
  const { data: genre } = useGenre(id as string);

  return (
    <Layout session={session}>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Row>
          <Col>
            <Typography.Title>
              {genre?.name && capitalizeFirstLetter(genre.name)}
            </Typography.Title>
          </Col>
        </Row>
        <Row style={{ backgroundColor: 'white' }}>
          <FollowButton isActive={true} />
        </Row>
      </Card>
    </Layout>
  );
};

export default GenrePage;
