import { useArtist, useGenres } from '@melomaniapp/hooks';
import { CityDropdown, GenreFilter } from '@melomaniapp/ui';
import { Button, Card, Col, Form, Input, Row, Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { Layout } from '../../components/layout/Layout';

export const EditFanProfile: React.FC = () => {
  const [session] = useSession();
  const { data: genres } = useGenres();

  const { data: artist, isLoading } = useArtist(
    '27F6AB17-55B8-4007-9D6D-D80AE21A1CF1'
  );
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

  const getLinks = () => {
    const spotifyRegex = /https:\/\/(www\.)?open\.spotify\.com\/artist\/.*/;
    const soundCloudRegex = /https:\/\/(www\.)?soundcloud\.com\/.*/;
    const youtubeRegex = /https:\/\/(www\.)?youtube\.com\/c\/.*/;

    const spotify = artist?.socialLinks.find((link) => spotifyRegex.test(link));
    const soundCloud = artist?.socialLinks.find((link) =>
      soundCloudRegex.test(link)
    );
    const youtube = artist?.socialLinks.find((link) => youtubeRegex.test(link));

    return {
      spotify,
      soundCloud,
      youtube,
    };
  };

  const links = getLinks();

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
                name="name"
                label="Nombre"
                initialValue={artist?.name}
              >
                <Input placeholder="Nombre" />
              </Form.Item>
              <Form.Item
                required={true}
                style={{ width: '100%' }}
                name="description"
                label="Descripción"
                initialValue={artist?.description}
              >
                <Input placeholder="Descripción" />
              </Form.Item>

              <Form.Item
                required={true}
                style={{ width: '100%' }}
                name="spotifyLink"
                label="Link de Spotify"
                initialValue={links.spotify}
              >
                <Input placeholder="Link de Spotify" />
              </Form.Item>

              <Form.Item
                required={true}
                style={{ width: '100%' }}
                name="soundCloudLink"
                label="Link de SoundCloud"
                initialValue={links.soundCloud}
              >
                <Input placeholder="Link de SoundCloud" />
              </Form.Item>

              <Form.Item
                required={true}
                style={{ width: '100%' }}
                name="youtubeLink"
                label="Link de Youtube"
                initialValue={links.youtube}
              >
                <Input placeholder="Link de Youtube" />
              </Form.Item>

              <Form.Item
                required={true}
                name="genres"
                label="Géneros musicales"
                initialValue={artist?.genreIds.map((genre) => genre)}
                trigger="onChangeHandler"
              >
                <GenreFilter
                  genres={genres}
                  selectedGenres={artist?.genreIds.map((genre) => genre)}
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
