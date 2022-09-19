import { Select, Spin } from 'antd';
import React from 'react';
import { useCities } from '@melomaniapp/hooks';

const { Option } = Select;

export interface CityDropdownProps {
  selectedCity?: string;
  onChangeHandler?: (value: string) => void;
}

export const CityDropdown: React.FC<CityDropdownProps> = ({
  selectedCity,
  onChangeHandler,
}) => {
  const { data: cities, isLoading } = useCities();

  if (isLoading) {
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Spin size="large" style={{ margin: 'auto' }} />;
    </div>;
  }

  return (
    <Select
      placeholder="Ciudad"
      showSearch={false}
      defaultValue={selectedCity}
      showArrow
      onChange={onChangeHandler}
    >
      {cities?.map((city) => (
        <Option key={city} value={city}>
          {city}
        </Option>
      ))}
    </Select>
  );
};

export default CityDropdown;
