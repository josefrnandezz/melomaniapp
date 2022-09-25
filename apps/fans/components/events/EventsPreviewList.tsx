import { EventDTO } from '@melomaniapp/contracts/event';
import { Button, Col, List, PageHeader, Row, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Response } from '@melomaniapp/hooks';
import { EventCard } from './EventCard';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import Link from 'next/link';
import { IconText } from '../IconText';

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
    <Row
      align="middle"
      style={{
        background: '#fffafa',
        alignItems: 'center',
        borderRadius: '20px',
        overflow: 'hidden',
      }}
    >
      <Col xl={24} xxl={24}>
        <PageHeader
          title="Eventos"
          extra={[
            <Link href="/events">
              <Button type="text">
                <IconText icon={EyeOutlined} text="Ver todos" />
              </Button>
            </Link>,
          ]}
        >
          {events.data?.length !== 0 ? (
            <List
              loading={isLoading}
              style={{ padding: '30px' }}
              grid={{
                gutter: 25,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
              dataSource={data?.slice(0, 4)}
              renderItem={(event) => (
                <List.Item>
                  <EventCard item={event} genres={genres.data} />
                </List.Item>
              )}
            />
          ) : (
            <Typography.Paragraph>
              Oops! Parece que no hay ningún evento en tu ciudad 😞
            </Typography.Paragraph>
          )}
        </PageHeader>
      </Col>
    </Row>
  );
};
