import { Col, Form, Input, Row } from 'antd';
import { GenreFilter } from '@melomaniapp/ui';
import { useGenres } from '@melomaniapp/hooks';

const Onboarding = () => {
  const genres = useGenres();

  return (
    <Form>
      <Row>
        <Col>
          <Form.Item label="Full Name">
            <Input />
          </Form.Item>
          <Form.Item label="Alias">
            <Input />
          </Form.Item>
          <Form.Item label="City">
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label="Favourite genres">
            <GenreFilter genres={genres} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Onboarding;
