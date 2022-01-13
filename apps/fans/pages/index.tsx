import { FanLayout } from '@melomaniapp/ui';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useEstablishments } from '@melomaniapp/hooks';
import { Avatar, Input, List } from 'antd';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const Home = () => {
  const establishments = useEstablishments();

  return (
    <>
      <Search
        placeholder="What are you looking forward to?"
        onSearch={onSearch}
        enterButton
      />

      <List
        itemLayout="horizontal"
        dataSource={establishments}
        renderItem={(establishment) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{establishment.name}</a>}
              description={establishment.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export function Index() {
  const { data: session, status: loading } = useSession();
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
