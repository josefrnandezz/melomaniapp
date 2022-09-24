import { CreateEventDTO } from '@melomaniapp/contracts/event';
import { useArtists, useGenres, useMyEstablishment } from '@melomaniapp/hooks';
import { CityDropdown, GenreFilter } from '@melomaniapp/ui';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Spin,
} from 'antd';
import { useSession } from 'next-auth/client';
import router from 'next/router';
import { Layout } from '../../components/layout/Layout';

export const CreateEvent: React.FC = () => {
  const [session, isLoading] = useSession();

  const genres = useGenres();
  const artists = useArtists();
  const establishment = useMyEstablishment(session);

  const [form] = Form.useForm();

  if (
    isLoading ||
    genres.isLoading ||
    artists.isLoading ||
    establishment.isLoading
  ) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const onSubmit = async (values) => {
    const body: CreateEventDTO = {
      ...values,
      establishmentId: establishment.data?._id,
      ownerId: establishment.data?.ownerId,
      address: { city: values.city, full: values.full },
      startsAt: values.startsAt[0].toDate(),
      endsAt: values.startsAt[1].toDate(),
    };

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/events`,
      {
        method: 'Post',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      message.success({ content: 'Evento creado!', key: 'updatable' });

      setTimeout(() => router.push('/'), 1000);
    } else {
      message.error({ content: 'Error al crear evento', key: 'updatable' });
    }
  };

  return (
    <Layout session={session}>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Col span={12} style={{ margin: 'auto' }}>
          <Card style={{ borderRadius: '20px' }}>
            <Form form={form} layout="vertical" onFinish={onSubmit}>
              <Form.Item
                required={true}
                style={{ width: '100%' }}
                name="name"
                label="Nombre"
              >
                <Input placeholder="Nombre" />
              </Form.Item>
              <Form.Item
                required={true}
                style={{ width: '100%' }}
                name="description"
                label="Descripción"
              >
                <Input placeholder="Descripción" />
              </Form.Item>
              <Row>
                <Col span={24}>
                  <Form.Item
                    required={true}
                    style={{ width: '100%' }}
                    name="startsAt"
                    label="Fecha de inicio"
                  >
                    <DatePicker.RangePicker
                      showTime
                      format={['DD/MM/YYYY HH:mm']}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item
                    required={true}
                    style={{ width: '100%' }}
                    name="city"
                    label="Ciudad"
                    trigger="onChangeHandler"
                    initialValue={establishment.data?.address.city}
                  >
                    <CityDropdown />
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item
                    required={true}
                    style={{ width: '100%' }}
                    name="full"
                    label="Dirección"
                    initialValue={establishment.data?.address.full}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                required={true}
                style={{ width: '100%' }}
                name="artistIds"
                label="Artistas"
              >
                <Select
                  placeholder="Artistas"
                  showSearch={false}
                  showArrow
                  mode="multiple"
                >
                  {artists.data?.map((artist) => {
                    return (
                      <Select.Option key={artist?._id} value={artist?._id}>
                        {artist.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                required={true}
                name="genreIds"
                label="Géneros musicales"
                trigger="onChangeHandler"
              >
                <GenreFilter genres={genres.data} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Confirmar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default CreateEvent;
