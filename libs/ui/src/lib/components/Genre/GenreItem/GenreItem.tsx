import { GenreDTO } from '@melomaniapp/contracts/genre';
import { Tag } from 'antd';
import React from 'react';

export interface GenreItemProps {
  genre: GenreDTO;
}

export const GenreItem: React.FunctionComponent<GenreItemProps> = ({
  genre,
}) => {
  return (
    <Tag data-cy={genre._id} key={genre._id} color="cyan">
      {genre.name}
    </Tag>
  );
};

export default GenreItem;
