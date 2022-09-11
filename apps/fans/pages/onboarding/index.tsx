import { useGenres } from '@melomaniapp/hooks';
import { CityDropdown, GenreFilter } from '@melomaniapp/ui';
import { Button, Card, Col, Form, Row } from 'antd';
import { useSession } from 'next-auth/client';
import { Layout } from '../../components/layout/Layout';

export const FanOnboarding: React.FC = () => {
  const [session] = useSession();
  const { data: genres } = useGenres();

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
              >
                <CityDropdown />
              </Form.Item>

              <Form.Item
                required={true}
                name="genres"
                label="Géneros musicales"
                trigger="onChangeHandler"
              >
                <GenreFilter genres={genres} />
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

export default FanOnboarding;
