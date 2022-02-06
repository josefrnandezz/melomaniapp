import { GenreDTO } from '@melomaniapp/contracts/genre';
import { Col, List, Row } from 'antd';
import React from 'react';

import GenreItem from '../GenreItem/GenreItem';

export interface GenreListProps {
  genres: GenreDTO[];
}

export const GenreList: React.FunctionComponent<GenreListProps> = ({
  genres,
}) => (
  <List>
    <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24 }}>
      {genres?.map((genre) => (
        <Col key={genre._id}>
          <List.Item>
            <GenreItem genre={genre} />
          </List.Item>
        </Col>
      ))}
    </Row>
  </List>
);

export default GenreList;
