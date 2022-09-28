import { useGenres, useMyArtist } from '@melomaniapp/hooks';
import { GenreFilter } from '@melomaniapp/ui';
import { Button, Card, Col, Form, Input, message, Row, Spin } from 'antd';
import { useSession } from 'next-auth/client';

import {
  souncloudRegex,
  spotifyRegex,
  youtubeRegex,
} from '@melomaniapp/domain';
import { useRouter } from 'next/router';

export const EditFanProfile: React.FC = () => {
  const [session] = useSession();
  const { data: genres } = useGenres();
  const { data: artist, isLoading } = useMyArtist(session);
  const [form] = Form.useForm();
  const router = useRouter();

  if (isLoading || !router) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
    });

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/artists/${artist?._id}`,
      {
        method: 'Put',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body,
      }
    );
    if (response.ok) {
      message.success({ content: 'Perfil actualizado!', key: 'updatable' });
      setTimeout(() => router.push('/profile'), 1000);
    } else {
      message.error({ content: 'Error al actualizar!', key: 'updatable' });
    }
  };

  const getLinks = () => {
    const spotify = artist?.socialLinks.find((link) => spotifyRegex.test(link));
    const soundCloud = artist?.socialLinks.find((link) =>
      souncloudRegex.test(link)
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
              initialValue={artist?.name}
            >
              <Input placeholder="Nombre" />
            </Form.Item>
            <Form.Item
              required={true}
              name="alias"
              label="Nickname"
              initialValue={artist?.alias}
            >
              <Input placeholder="@artista" />
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
              name="genreIds"
              label="Géneros musicales"
              initialValue={artist?.genreIds.map((genre) => genre)}
              trigger="onChangeHandler"
            >
              <GenreFilter
                genres={genres}
                selectedGenres={artist?.genreIds.map((genre) => genre)}
              />
            </Form.Item>

            <Form.Item
              style={{ width: '100%' }}
              name="spotifyLink"
              label="Link de Spotify"
              initialValue={links.spotify}
            >
              <Input placeholder="Link de Spotify" />
            </Form.Item>

            <Form.Item
              style={{ width: '100%' }}
              name="soundCloudLink"
              label="Link de SoundCloud"
              initialValue={links.soundCloud}
            >
              <Input placeholder="Link de SoundCloud" />
            </Form.Item>

            <Form.Item
              style={{ width: '100%' }}
              name="youtubeLink"
              label="Link de Youtube"
              initialValue={links.youtube}
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

export default EditFanProfile;
