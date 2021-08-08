import { GenreDTO } from '@melomaniapp/contracts/genre';
import { Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

export interface GenreFilterProps {
  genres: GenreDTO[];
  selectedGenres?: GenreDTO[];
  className?: React.CSSProperties;
  onChangeHandler?: (values: string[]) => void;
}

export const GenreFilter: React.FunctionComponent<GenreFilterProps> = ({
  genres,
  selectedGenres,
  className,
  onChangeHandler,
}) => {
  return (
    <Select
      data-cy="genreFilter"
      mode="multiple"
      placeholder="Genres"
      showSearch={false}
      style={className}
      onChange={onChangeHandler}
      defaultValue={selectedGenres?.map((e) => e.id)}
      showArrow
    >
      {genres.map((genre) => (
        <Option key={genre.id} data-cy={genre.id} value={genre.id}>
          {genre.name}
        </Option>
      ))}
    </Select>
  );
};

export default GenreFilter;
