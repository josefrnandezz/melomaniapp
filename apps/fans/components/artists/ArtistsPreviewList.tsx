import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { Button, Col, List, PageHeader, Row } from 'antd';
import { Response } from '@melomaniapp/hooks';
import { ArtistCard } from './ArtistCard';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import { IconText } from '@melomaniapp/ui';
import { EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';

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
    <Row
      align="middle"
      style={{
        background: '#fffafa',
        alignItems: 'center',
        borderRadius: '20px',
        overflow: 'hidden',
      }}
    >
      <Col xl={24} xxl={24}>
        <PageHeader
          title="Artistas"
          extra={[
            <Link href="/artists">
              <Button type="text">
                <IconText icon={EyeOutlined} text="Ver todos" />
              </Button>
            </Link>,
          ]}
        >
          <List
            style={{ padding: '30px' }}
            loading={isLoading}
            grid={{
              gutter: 25,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 4,
              xxl: 4,
            }}
            dataSource={data?.slice(0, 4)}
            renderItem={(artist) => (
              <List.Item>
                <ArtistCard item={artist} genres={genres.data} />
              </List.Item>
            )}
          />
        </PageHeader>
      </Col>
    </Row>
  );
};
