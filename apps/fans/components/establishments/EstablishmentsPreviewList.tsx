import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { Card, List } from 'antd';
import { Section } from '../Section';
import { Response } from '@melomaniapp/hooks';
import { EstablishmentCard } from './EstablishmentCard';
import { GenreDTO } from '@melomaniapp/contracts/genre';

interface EstablishmentsPreviewListProps {
  establishments: Response<EstablishmentDTO[]>;
  genres: Response<GenreDTO[]>;
}

export const EstablishmentsPreviewList: React.FC<
  EstablishmentsPreviewListProps
> = ({ establishments, genres }) => {
  const { isLoading, data } = establishments;

  return (
    <Card
      bordered={false}
      style={{
        background: '#fffafa',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px',
      }}
    >
      <Section title="Establecimientos" pushTo="establishments" />
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
        renderItem={(establishment) => (
          <List.Item>
            <EstablishmentCard item={establishment} genres={genres.data} />
          </List.Item>
        )}
      />
    </Card>
  );
};
