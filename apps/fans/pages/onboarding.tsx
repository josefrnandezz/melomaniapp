import { Button, Form, Input } from 'antd';
import { GenreFilter } from '@melomaniapp/ui';
import { useGenres } from '@melomaniapp/hooks';
import { useSession } from 'next-auth/react';

const Onboarding = () => {
  const session = useSession();

  const genres = useGenres();
  const [form] = Form.useForm();

  const onSubmit = (onboarding) => {
    console.log(onboarding);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item name="name" label="Full Name">
        <Input />
      </Form.Item>
      <Form.Item name="alias" label="Alias">
        <Input placeholder="@melomaniac" />
      </Form.Item>
      <Form.Item name="city" label="City">
        <Input placeholder="Córdoba" />
      </Form.Item>
      <Form.Item name="genres" label="Genres" trigger="onChangeHandler">
        <GenreFilter genres={genres} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Onboarding;
