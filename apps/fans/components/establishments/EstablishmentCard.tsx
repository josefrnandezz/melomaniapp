import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import { GenreList } from '@melomaniapp/ui';
import { Card, Divider, Typography } from 'antd';
import { useRouter } from 'next/router';

type EstablishmentCardProps = {
  item: EstablishmentDTO;
  genres: GenreDTO[];
};

export const EstablishmentCard: React.FC<EstablishmentCardProps> = ({
  item,
  genres,
}: EstablishmentCardProps) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`establishments/${item._id}`)}
      hoverable
      style={{
        width: 240,
        textAlign: 'center',
        background: '#cae9ff',
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
        genres={genres?.filter((genre) => item.genreIds.includes(genre._id))}
      />
    </Card>
  );
};
