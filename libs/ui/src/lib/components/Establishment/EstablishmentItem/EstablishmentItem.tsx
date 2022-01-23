import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import { Card, Typography } from 'antd';
import Link from 'next/link';

import { GenreList } from '../../../..';

type EstablishmentItemProps = {
  item: EstablishmentDTO;
  genres: GenreDTO[];
};

export const EstablishmentItem: React.FunctionComponent<EstablishmentItemProps> =
  ({ item, genres }: EstablishmentItemProps) => {
    return (
      <Link href={`establishments/${item._id}`}>
        <Card hoverable style={{ width: 240, justifyContent: 'center' }}>
          <Card.Meta
            title={item.name}
            description={
              <Typography.Paragraph ellipsis>
                {item.description}
              </Typography.Paragraph>
            }
          />
          <GenreList
            genres={genres?.filter((genre) =>
              item.genreIds.includes(genre._id)
            )}
          />
        </Card>
      </Link>
    );
  };

export default EstablishmentItem;
