import { GenreDTO } from '@melomaniapp/contracts';
import { Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

export interface GenreFilterProps {
  genres: GenreDTO[];
  className?: React.CSSProperties;
}

export const GenreFilter: React.FunctionComponent<GenreFilterProps> = ({
  genres,
  className,
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const onChangeHandler = (value: string[]) => {
    setSelected(value);
  };

  return (
    <Select
      data-cy="genreFilter"
      mode="multiple"
      placeholder="Genres"
      showSearch={false}
      style={className}
      onChange={onChangeHandler}
      showArrow
    >
      {genres.map((genre) => (
        <Option data-cy={genre.id} value={genre.id}>
          {genre.name}
        </Option>
      ))}
    </Select>
  );
};

export default GenreFilter;
