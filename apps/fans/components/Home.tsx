import {
  useArtists,
  useEstablishments,
  useEvents,
  useGenres,
} from '@melomaniapp/hooks';
import { Space } from 'antd';
import { Session } from 'next-auth';
import { ArtistsPreviewList } from './artists/ArtistsPreviewList';
import { EstablishmentsPreviewList } from './establishments/EstablishmentsPreviewList';
import { EventsPreviewList } from './events/EventsPreviewList';

interface HomeProps {
  city: string;
  session: Session;
}

export const Home: React.FC<HomeProps> = ({ city, session }) => {
  const establishments = useEstablishments();
  const genres = useGenres();
  const artists = useArtists();
  const events = useEvents(city, session);

  return (
    <div style={{ display: 'flex', margin: '10px' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <EventsPreviewList events={events} genres={genres} />
        <ArtistsPreviewList artists={artists} genres={genres} />
        <EstablishmentsPreviewList
          establishments={establishments}
          genres={genres}
        />
      </Space>
    </div>
  );
};
