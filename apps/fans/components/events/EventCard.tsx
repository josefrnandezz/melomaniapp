import { EventDTO } from '@melomaniapp/contracts/event';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import { GenreList } from '@melomaniapp/ui';
import { Avatar, Card, Col, Divider, Row } from 'antd';
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
        maxHeight: 500,
        width: 240,
        textAlign: 'center',
        background: '#cae9ff',
        overflow: 'hidden',
        borderRadius: '20px',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card.Meta title={item.name} />
      <Divider />
      <GenreList
        justify="center"
        genres={genres?.filter((genre) => item.genreIds.includes(genre._id))}
      />
    </Card>
  );
};
