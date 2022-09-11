import { Select, Spin } from 'antd';
import React from 'react';
import { useCities } from '@melomaniapp/hooks';

const { Option } = Select;

export interface CityDropdownProps {
  selectedCity?: string;
}

export const CityDropdown: React.FC<CityDropdownProps> = ({ selectedCity }) => {
  const { data: cities, isLoading } = useCities();

  if (isLoading) {
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Spin size="large" style={{ margin: 'auto' }} />;
    </div>;
  }

  return (
    <Select
      placeholder="Ciudades"
      showSearch={false}
      defaultValue={selectedCity}
      showArrow
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
