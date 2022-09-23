import { EditEventDTO } from '@melomaniapp/contracts/event';
import { useArtists, useEvent, useGenres } from '@melomaniapp/hooks';
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
  Switch,
} from 'antd';
import moment from 'moment';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/layout/Layout';

export const EditEvent: React.FC = () => {
  const [form] = Form.useForm();
  const [session] = useSession();
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading } = useEvent(id as string);

  const allGenres = useGenres();
  const allArtists = useArtists();

  if (isLoading || allGenres.isLoading || allArtists.isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleUpdate = async (
    values
  ): Promise<{ isResponseOk: boolean; path: string }> => {
    const body: EditEventDTO = {
      ...values,
      name: values.name,
      description: values.description,
      startsAt: values.date[0].toDate(),
      endsAt: values.date[1].toDate(),
    };

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/events/${data.event?._id}`,
      {
        method: 'Put',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...body }),
      }
    );

    return {
      isResponseOk: response.ok,
      path: `events/${data.event?._id}`,
    };
  };

  const handleCancel = async (): Promise<{
    isResponseOk: boolean;
    path: string;
  }> => {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/events/${data.event?._id}`,
      {
        method: 'Delete',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      isResponseOk: response.ok,
      path: '/',
    };
  };

  const onSubmit = async (values) => {
    const { isResponseOk, path } = values.cancelEvent
      ? await handleCancel()
      : await handleUpdate(values);

    if (isResponseOk) {
      message.success({ content: 'Evento actualizado!', key: 'updatable' });

      setTimeout(() => router.push(path), 1000);
    } else {
      message.error({
        content: 'Error al actualizar evento',
        key: 'updatable',
      });
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
                initialValue={data?.event?.name}
              >
                <Input placeholder="Nombre" />
              </Form.Item>
              <Form.Item
                required={true}
                style={{ width: '100%' }}
                name="description"
                label="Descripción"
                initialValue={data?.event?.description}
              >
                <Input placeholder="Descripción" />
              </Form.Item>
              <Row>
                <Col span={24}>
                  <Form.Item
                    required={true}
                    style={{ width: '100%' }}
                    name="date"
                    label="Fecha de inicio"
                    initialValue={[
                      moment(data?.event.startsAt),
                      moment(data?.event.endsAt),
                    ]}
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
                    initialValue={data?.event.address.city}
                    trigger="onChangeHandler"
                  >
                    <CityDropdown selectedCity={data?.event.address.city} />
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item
                    required={true}
                    style={{ width: '100%' }}
                    name="address"
                    label="Dirección"
                    initialValue={data?.event?.address.full}
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
                initialValue={data?.artists?.map((artist) => artist._id)}
              >
                <Select
                  placeholder="Artistas"
                  showSearch={false}
                  showArrow
                  mode="multiple"
                >
                  {allArtists.data?.map((artist) => {
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
                initialValue={data?.genres.map((genre) => genre._id)}
                trigger="onChangeHandler"
              >
                <GenreFilter
                  genres={allGenres.data}
                  selectedGenres={data?.genres.map((genre) => genre._id)}
                />
              </Form.Item>
              <Form.Item
                initialValue={false}
                name="cancelEvent"
                required={true}
                label="Cancelar evento"
              >
                <Switch defaultChecked={false} />
              </Form.Item>
              <Form.Item trigger="onChangeHandler">
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

export default EditEvent;
