import { EventDTO } from '@melomaniapp/contracts/event';
import { Card, List } from 'antd';
import { Section } from '../Section';
import { Response } from '@melomaniapp/hooks';
import { EventCard } from './EventCard';
import { GenreDTO } from '@melomaniapp/contracts/genre';

interface EventsPreviewListProps {
  events: Response<EventDTO[]>;
  genres: Response<GenreDTO[]>;
}

export const EventsPreviewList: React.FC<EventsPreviewListProps> = ({
  events,
  genres,
}) => {
  const { isLoading, data } = events;

  return (
    <Card
      bordered={false}
      style={{
        background: '#fffafa',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Section title="Eventos" pushTo="events" />
      <List
        loading={isLoading}
        style={{ margin: 'auto' }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 5,
        }}
        dataSource={data}
        renderItem={(event) => (
          <List.Item>
            <EventCard item={event} genres={genres.data} />
          </List.Item>
        )}
      />
    </Card>
  );
};
