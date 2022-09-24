import {
  FollowType,
  FollowUserEstablishmentDTO,
} from '@melomaniapp/contracts/follow';
import { useFollows } from '@melomaniapp/hooks';
import { Card, List } from 'antd';
import { Session } from 'next-auth';
import Link from 'next/link';

interface EstablishmentsFollowedListProps {
  session: Session;
}

export const EstablishmentsFollowedList: React.FC<
  EstablishmentsFollowedListProps
> = ({ session }) => {
  const follows = useFollows<FollowUserEstablishmentDTO>(
    FollowType.Establishment,
    session
  );

  const establishments = follows.data?.map((follow) => ({
    ...follow.establishment,
    _id: follow.followedToId,
  }));

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      dataSource={establishments}
      renderItem={(item) => (
        <Card
          bordered={true}
          hoverable
          style={{
            marginBottom: '20px',
            background: '#cae9ff',
            borderRadius: '20px',
          }}
        >
          <Link href={`/establishments/${item._id}`}>
            <List.Item
              key={item._id}
              extra={
                <img
                  style={{ textAlign: 'left' }}
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={item.name}
                description={`@${item.alias}`}
              />

              {item.description}
            </List.Item>
          </Link>
        </Card>
      )}
    />
  );
};
