import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { Button, Col, List, PageHeader, Row } from 'antd';
import { Response } from '@melomaniapp/hooks';
import { EstablishmentCard } from './EstablishmentCard';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import Link from 'next/link';
import { EyeOutlined } from '@ant-design/icons';
import { IconText } from '../IconText';

interface EstablishmentsPreviewListProps {
  establishments: Response<EstablishmentDTO[]>;
  genres: Response<GenreDTO[]>;
}

export const EstablishmentsPreviewList: React.FC<
  EstablishmentsPreviewListProps
> = ({ establishments, genres }) => {
  const { isLoading, data } = establishments;

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
          title="Establecimientos"
          extra={[
            <Link href="/establishments">
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
            renderItem={(establishment) => (
              <List.Item>
                <EstablishmentCard item={establishment} genres={genres.data} />
              </List.Item>
            )}
          />
        </PageHeader>
      </Col>
    </Row>
  );
};
