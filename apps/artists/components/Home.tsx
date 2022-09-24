import { useArtists } from '@melomaniapp/hooks';
import { GenreFilter, IconText } from '@melomaniapp/ui';
import {
  Button,
  Card,
  Col,
  List,
  PageHeader,
  Row,
  Spin,
  Modal,
  Form,
  Avatar,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { GenreDTO } from '@melomaniapp/contracts/genre';

interface HomeProps {
  id: string;
  genres: GenreDTO[];
}

export const Home: React.FC<HomeProps> = ({ id, genres }) => {
  const artists = useArtists();

  const [filteredGenres, setFilteredGenres] = useState(
    genres?.map(({ _id }) => _id)
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFilteredGenres(filteredGenres);
  }, [filteredGenres]);

  if (artists?.isLoading) {
    return <Spin size="large" />;
  }

  const filteredArtists = artists.data
    ?.filter((artist) => artist._id !== id)
    .filter((artist) =>
      filteredGenres.length > 0
        ? artist.genreIds.some((genre) => filteredGenres?.includes(genre))
        : artist
    );

  return (
    <Row justify="center">
      <Col span={18}>
        <PageHeader
          style={{ borderRadius: '20px' }}
          title="Inicio"
          ghost={false}
        >
          <Row justify="center">
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
                    genres={genres}
                    onChangeHandler={(values) => setFilteredGenres(values)}
                  />
                </Form.Item>
              </Modal>
            </Col>
          </Row>
          <List
            style={{ marginTop: '20px' }}
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 5,
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
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.imageUrl} size="large" />}
                    title={
                      <Link href={`artists/${item._id}`}>{item.name}</Link>
                    }
                    description={item.description}
                  />
                </List.Item>
              </Card>
            )}
          />
        </PageHeader>
      </Col>
    </Row>
  );
};
