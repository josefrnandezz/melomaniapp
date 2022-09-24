import { useGenres } from '@melomaniapp/hooks';
import { GenreFilter } from '@melomaniapp/ui';
import { Button, Card, Col, Form, Input, message, Row, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export const Onboarding: React.FC = () => {
  const [session, isLoading] = useSession();
  const { data: genres } = useGenres();
  const router = useRouter();
  const [form] = useForm();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const onSubmit = async (values) => {
    const { spotifyLink, soundCloudLink, youtubeLink, ...rest } = values;

    const socialLinks = [spotifyLink, soundCloudLink, youtubeLink].filter(
      (link) => link
    );

    const body = JSON.stringify({
      ...rest,
      socialLinks,
      imageUrl: session.user.image,
    });

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/artists`,
      {
        method: 'Post',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body,
      }
    );

    if (response.ok) {
      message.success({ content: 'Perfil actualizado!', key: 'updatable' });
      setTimeout(() => router.push('/'), 1000);
    } else {
      message.error({ content: 'Error al actualizar!', key: 'updatable' });
    }
  };

  return (
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
            <Form.Item required={true} name="alias" label="Nickname">
              <Input placeholder="@artista" />
            </Form.Item>
            <Form.Item
              required={true}
              style={{ width: '100%' }}
              name="description"
              label="Descripción"
            >
              <TextArea autoSize placeholder="Cuéntanos un poco sobre ti" />
            </Form.Item>

            <Form.Item
              required={true}
              name="genreIds"
              label="Géneros musicales"
              trigger="onChangeHandler"
            >
              <GenreFilter genres={genres} />
            </Form.Item>

            <Form.Item
              style={{ width: '100%' }}
              name="spotifyLink"
              label="Link de Spotify"
            >
              <Input placeholder="Link de Spotify" />
            </Form.Item>

            <Form.Item
              style={{ width: '100%' }}
              name="soundCloudLink"
              label="Link de SoundCloud"
            >
              <Input placeholder="Link de SoundCloud" />
            </Form.Item>

            <Form.Item
              style={{ width: '100%' }}
              name="youtubeLink"
              label="Link de Youtube"
            >
              <Input placeholder="Link de Youtube" />
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
  );
};

export default Onboarding;
