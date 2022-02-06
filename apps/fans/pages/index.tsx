import { EstablishmentItem, FanLayout } from '@melomaniapp/ui';

import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useEstablishments, useGenres } from '@melomaniapp/hooks';
import { Input, List, Space, Typography } from 'antd';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const Home = () => {
  const establishments = useEstablishments();
  const genres = useGenres();

  return (
    <>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Search
          placeholder="What are you looking forward to?"
          onSearch={onSearch}
          enterButton
        />

        <Typography.Title style={{ textAlign: 'left' }} level={3}>
          Establishments
        </Typography.Title>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={establishments}
          renderItem={(establishment) => (
            <List.Item>
              <EstablishmentItem item={establishment} genres={genres} />
            </List.Item>
          )}
        />
      </Space>
    </>
  );
};

export function Index() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/');
    }
  }, [loading, session, router]);

  return (
    <FanLayout session={session}>
      <Home />
    </FanLayout>
  );
}

export default Index;
