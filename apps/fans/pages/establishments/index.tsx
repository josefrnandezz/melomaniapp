import { useEstablishments, useGenres } from '@melomaniapp/hooks';
import { GenreFilter } from '@melomaniapp/ui';
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
import React, { useEffect, useState } from 'react';
import { IconText } from '../../components/IconText';
import { FilterOutlined } from '@ant-design/icons';

const Establishments: React.FC = () => {
  const establishments = useEstablishments();
  const genres = useGenres();

  const [filteredGenres, setFilteredGenres] = useState(
    genres.data?.map(({ _id }) => _id)
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFilteredGenres(filteredGenres);
  }, [filteredGenres]);

  const filteredEstablishments = establishments.data?.filter((establishment) =>
    filteredGenres?.length > 0
      ? establishment.genreIds.some((genre) => filteredGenres?.includes(genre))
      : establishment
  );

  if (establishments?.isLoading || genres?.isLoading) {
    return <Spin size="large" />;
  }

  return (
    <PageHeader
      style={{ margin: 'auto', borderRadius: '20px' }}
      ghost={false}
      onBack={() => window.history.back()}
      title="Establecimientos"
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
        dataSource={filteredEstablishments}
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
                title={
                  <Link href={`/establishments/${item._id}`}>{item.name}</Link>
                }
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

export default Establishments;
