import { useArtists, useGenres } from '@melomaniapp/hooks';
import { GenreFilter, IconText } from '@melomaniapp/ui';
import {
  Avatar,
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
import Link from 'next/link';
import { FilterOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

const Artists: React.FC = () => {
  const artists = useArtists();
  const genres = useGenres();

  const [filteredGenres, setFilteredGenres] = useState(
    genres.data?.map(({ _id }) => _id)
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFilteredGenres(filteredGenres);
  }, [filteredGenres]);

  const filteredArtists = artists.data?.filter((artist) =>
    filteredGenres?.length > 0
      ? artist.genreIds?.some((genre) => filteredGenres?.includes(genre))
      : artist
  );

  if (artists?.isLoading || genres?.isLoading) {
    return <Spin size="large" />;
  }

  return (
    <PageHeader
      style={{ margin: 'auto', borderRadius: '20px' }}
      ghost={false}
      onBack={() => window.history.back()}
      title="Artistas"
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
        dataSource={filteredArtists}
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
                title={<Link href={`/artists/${item._id}`}>{item.name}</Link>}
                avatar={
                  <Avatar
                    size="large"
                    src={
                      <img referrerPolicy="no-referrer" src={item?.imageUrl} />
                    }
                  />
                }
                description={`@${item.alias}`}
              />
            </List.Item>
          </Card>
        )}
      />
    </PageHeader>
  );
};

export default Artists;
