import { useArtists, useEvent, useGenres } from '@melomaniapp/hooks';
import { CityDropdown, GenreFilter } from '@melomaniapp/ui';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Switch,
} from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/layout/Layout';

export const EditEvent: React.FC = () => {
  const [session] = useSession();
  const router = useRouter();
  const { data: genres } = useGenres();
  const { data: artists } = useArtists();

  const { id } = router.query;

  const { data: event, isLoading } = useEvent(id as string);
  const [form] = Form.useForm();

  const onSubmit = () => {
    console.log('YAY');
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
                initialValue={event?.name}
              >
                <Input placeholder="Nombre" />
              </Form.Item>
              <Form.Item
                required={true}
                style={{ width: '100%' }}
                name="description"
                label="Descripción"
                initialValue={event?.description}
              >
                <Input placeholder="Descripción" />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item
                    required={true}
                    style={{ width: '100%' }}
                    name="startsAt"
                    label="Fecha de inicio"
                    initialValue={event?.startsAt}
                  >
                    <DatePicker format={['DD/MM/YYYY']} />
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item
                    required={true}
                    style={{ width: '100%' }}
                    name="endsAt"
                    label="Fecha de fin"
                    initialValue={event?.endsAt}
                  >
                    <DatePicker format={['DD/MM/YYYY']} />
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
                    initialValue={event?.address.city}
                  >
                    <CityDropdown />
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item
                    required={true}
                    style={{ width: '100%' }}
                    name="address"
                    label="Dirección"
                    initialValue={event?.address.full}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                required={true}
                style={{ width: '100%' }}
                name="city"
                label="Artistas"
              >
                <Select placeholder="Artistas" showSearch={false} showArrow>
                  {artists?.map((artist) => {
                    return (
                      <Select.Option key={artist?._id} value={artist?._id}>
                        {artist}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                required={true}
                name="genres"
                label="Géneros musicales"
                initialValue={event?.genreIds.map((genre) => genre)}
                trigger="onChangeHandler"
              >
                <GenreFilter
                  genres={genres}
                  selectedGenres={event?.genreIds.map((genre) => genre)}
                />
              </Form.Item>
              <Form.Item required={true} label="Cancelar evento">
                <Switch defaultChecked />
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

export default EditEvent;
