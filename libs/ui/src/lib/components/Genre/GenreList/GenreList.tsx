import { GenreDTO } from '@melomaniapp/contracts/genre';
import { GenreItem } from '@melomaniapp/ui';
import { Col, List, Row } from 'antd';
import Link from 'next/link';
import React from 'react';

export interface GenreListProps {
  genres: GenreDTO[];
}

export const GenreList: React.FunctionComponent<GenreListProps> = ({
  genres,
}) => (
  <List>
    <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24 }}>
      {genres.map((genre) => (
        <Col xs={24} sm={12} md={8}>
          <Link href={`/discover/genre/${genre.id}`}>
            <List.Item>
              <GenreItem genre={genre} />
            </List.Item>
          </Link>
        </Col>
      ))}
    </Row>
  </List>
);

export default GenreList;
