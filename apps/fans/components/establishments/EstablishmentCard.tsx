import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import { GenreList } from '@melomaniapp/ui';
import { Card, Divider } from 'antd';
import Link from 'next/link';

type EstablishmentCardProps = {
  item: EstablishmentDTO;
  genres: GenreDTO[];
};

export const EstablishmentCard: React.FC<EstablishmentCardProps> = ({
  item,
  genres,
}: EstablishmentCardProps) => {
  return (
    <Link href={`establishments/${item._id}`}>
      <Card
        hoverable
        style={{
          maxWidth: 240,
          textAlign: 'center',
          background: '#cae9ff',
          overflow: 'hidden',
          borderRadius: '20px',
        }}
        cover={
          <img referrerPolicy="no-referrer" height={180} src={item.imageUrl} />
        }
      >
        <Card.Meta title={item.name} />
        <Divider />
        <GenreList
          justify="center"
          genres={genres?.filter((genre) => item.genreIds.includes(genre._id))}
        />
      </Card>
    </Link>
  );
};
