import { GenreDTO } from '@melomaniapp/contracts';
import { GenreItem } from '@melomaniapp/ui';
import { List } from 'antd';
import Link from 'next/link';
import React from 'react';

export interface GenreListProps {
  genres: GenreDTO[];
}

export const GenreList: React.FunctionComponent<GenreListProps> = ({
  genres,
}) => (
  <List
    grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
    dataSource={genres}
    renderItem={(genre) => (
      <Link href={`/discover/genre/${genre.id}`}>
        <List.Item>
          <GenreItem genre={genre} />
        </List.Item>
      </Link>
    )}
  />
);

export default GenreList;
