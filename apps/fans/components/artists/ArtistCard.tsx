import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import { GenreList } from '@melomaniapp/ui';
import { Card, Divider, Space, Typography } from 'antd';
import { useRouter } from 'next/router';

type ArtistCardProps = {
  item: ArtistDTO;
  genres: GenreDTO[];
};

export const ArtistCard: React.FC<ArtistCardProps> = ({
  item,
  genres,
}: ArtistCardProps) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`artists/${item._id}`)}
      hoverable
      style={{
        width: 240,
        textAlign: 'center',
        background: '#cae9ff',
        overflow: 'hidden',
        borderRadius: '20px',
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Card.Meta title={item.name} />
      <Divider />
      <GenreList
        justify="center"
        genres={genres?.filter((genre) => item.genreIds.includes(genre._id))}
      />
    </Card>
  );
};
