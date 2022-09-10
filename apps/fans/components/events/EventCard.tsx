import { EventDTO } from '@melomaniapp/contracts/event';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import { GenreList } from '@melomaniapp/ui';
import { Card, Divider, Typography } from 'antd';
import { useRouter } from 'next/router';

type EventCardProps = {
  item: EventDTO;
  genres: GenreDTO[];
};

export const EventCard: React.FC<EventCardProps> = ({
  item,
  genres,
}: EventCardProps) => {
  const router = useRouter();

  return (
    <Card
      bordered={true}
      onClick={() => router.push(`events/${item._id}`)}
      hoverable
      style={{
        width: 240,
        textAlign: 'center',
        background: '#cae9ff',
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Card.Meta title={item.name} />
      <Divider />
      <GenreList
        genres={genres?.filter((genre) => item.genreIds.includes(genre._id))}
      />
    </Card>
  );
};
