import { useEvents, useGenres } from '@melomaniapp/hooks';
import {
  Button,
  Card,
  Col,
  Form,
  List,
  Modal,
  PageHeader,
  Row,
  Spin,
} from 'antd';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IconText } from '../../components/IconText';
import { FilterOutlined, CalendarOutlined } from '@ant-design/icons';
import { GenreFilter } from '@melomaniapp/ui';

const formatDate = (item) => {
  const date = new Date(item.startsAt);
  const formattedDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

  return <IconText text={formattedDate} icon={CalendarOutlined} />;
};

const Events: React.FC = () => {
  const [session, loading] = useSession();

  const events = useEvents('Córdoba', session);
  const genres = useGenres();

  const [filteredGenres, setFilteredGenres] = useState(
    genres.data?.map(({ _id }) => _id)
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFilteredGenres(filteredGenres);
  }, [filteredGenres]);

  const filteredEvents = events.data?.filter((event) =>
    filteredGenres?.length > 0
      ? event.genreIds?.some((genre) => filteredGenres?.includes(genre))
      : event
  );

  if (events?.isLoading || genres?.isLoading) {
    return <Spin size="large" />;
  }

  return (
    <PageHeader
      style={{ margin: 'auto', borderRadius: '20px' }}
      ghost={false}
      onBack={() => window.history.back()}
      title="Eventos"
    >
      <Row justify="center" style={{ marginBottom: '30px' }}>
        <Col>
          <Button onClick={() => setOpen(true)}>
            <IconText text="Filtro" icon={FilterOutlined} />
          </Button>
          <Modal
            visible={open}
            title="Filtra por género musical"
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          >
            <Form.Item>
              <GenreFilter
                genres={genres.data}
                onChangeHandler={(values) => setFilteredGenres(values)}
              />
            </Form.Item>
          </Modal>
        </Col>
      </Row>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
        }}
        dataSource={filteredEvents}
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
            <List.Item key={item._id}>
              <List.Item.Meta
                title={<Link href={`/events/${item._id}`}>{item.name}</Link>}
                description={formatDate(item)}
              />
              {item.description}
            </List.Item>
          </Card>
        )}
      />
    </PageHeader>
  );
};

export default Events;
