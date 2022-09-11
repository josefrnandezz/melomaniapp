import { useFan, useGenres } from '@melomaniapp/hooks';
import { CityDropdown, GenreFilter } from '@melomaniapp/ui';
import { Button, Card, Col, Form, Input, Row, Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { Layout } from '../../components/layout/Layout';

export const EditFanProfile: React.FC = () => {
  const [session] = useSession();
  const { data: genres } = useGenres();
  const username = session?.user.email.slice(
    0,
    session?.user.email.indexOf('@')
  );

  const { data: fan, isLoading } = useFan(username);
  const [form] = Form.useForm();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const onSubmit = () => {
    console.log('YAY');
  };

  return (
    <Layout session={session}>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '160px',
          marginTop: '160px',
        }}
      >
        <Col span={12} style={{ margin: 'auto' }}>
          <Card style={{ borderRadius: '20px' }}>
            <Form form={form} layout="vertical" onFinish={onSubmit}>
              <Form.Item
                required={true}
                style={{ width: '100%' }}
                name="city"
                label="Ciudad"
                initialValue={fan?.city && fan?.city}
              >
                <CityDropdown selectedCity={fan?.city} />
              </Form.Item>

              <Form.Item
                required={true}
                name="genres"
                label="Genres"
                initialValue={fan?.genres.map((genre) => genre)}
                trigger="onChangeHandler"
              >
                <GenreFilter
                  genres={genres}
                  selectedGenres={fan?.genres.map((genre) => genre)}
                />
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

export default EditFanProfile;
