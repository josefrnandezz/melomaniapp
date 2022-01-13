import { GenreDTO } from '@melomaniapp/contracts/genre';
import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

export interface GenreFilterProps {
  genres: GenreDTO[];
  selectedGenres?: string[];
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
      defaultValue={selectedGenres?.map((genre) => genre)}
      showArrow
    >
      {genres &&
        genres.map((genre) => (
          <Option key={genre._id} data-cy={genre.name} value={genre._id}>
            {genre.name}
          </Option>
        ))}
    </Select>
  );
};

export default GenreFilter;
