import { useGenres } from '@melomaniapp/hooks';
import { Card, List, PageHeader, Spin, Typography } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../components/layout/Layout';
import { capitalizeFirstLetter } from '../utils';

export const Genres: React.FC = () => {
  const [session] = useSession();
  const router = useRouter();

  const { data: genres, isLoading } = useGenres();

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Layout session={session}>
      <PageHeader
        style={{ margin: 'auto' }}
        ghost={false}
        onBack={() => window.history.back()}
        title="Géneros"
      >
        <List
          style={{
            margin: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            height: '100vh',
          }}
          grid={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={genres}
          renderItem={(genre) => (
            <Card
              bordered={true}
              hoverable
              style={{
                width: 240,
                margin: 'auto auto 20px auto',
                background: '#cae9ff',
              }}
            >
              <List.Item
                onClick={() => router.push(`genres/${genre._id}`)}
                key={genre._id}
              >
                <Typography.Title level={4}>
                  {genre && capitalizeFirstLetter(genre.name)}
                </Typography.Title>
              </List.Item>
            </Card>
          )}
        />
      </PageHeader>
    </Layout>
  );
};

export default Genres;
