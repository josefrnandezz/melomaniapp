import { GenreDTO } from '@melomaniapp/contracts/genre';
import { Select } from 'antd';
import React from 'react';
import { capitalizeFirstLetter } from '../../../utils';

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
      allowClear
      data-cy="genreFilter"
      mode="multiple"
      placeholder="Géneros musicales"
      showSearch={false}
      style={className}
      onChange={onChangeHandler}
      defaultValue={selectedGenres?.map((genre) => genre)}
      showArrow
    >
      {genres?.map((genre) => (
        <Option key={genre._id} data-cy={genre.name} value={genre._id}>
          {capitalizeFirstLetter(genre.name)}
        </Option>
      ))}
    </Select>
  );
};

export default GenreFilter;
