import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { Card, List } from 'antd';
import { Section } from '../Section';
import { Response } from '@melomaniapp/hooks';
import { ArtistCard } from './ArtistCard';
import { GenreDTO } from '@melomaniapp/contracts/genre';

interface ArtistsPreviewListProps {
  artists: Response<ArtistDTO[]>;
  genres: Response<GenreDTO[]>;
}

export const ArtistsPreviewList: React.FC<ArtistsPreviewListProps> = ({
  artists,
  genres,
}) => {
  const { isLoading, data } = artists;

  return (
    <Card
      bordered
      style={{
        background: '#fffafa',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Section title="Artistas" pushTo="artists" />
      <List
        loading={isLoading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 5,
        }}
        dataSource={data}
        renderItem={(artist) => (
          <List.Item>
            <ArtistCard item={artist} genres={genres.data} />
          </List.Item>
        )}
      />
    </Card>
  );
};
