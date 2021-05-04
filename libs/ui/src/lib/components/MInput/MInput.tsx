import { Input } from 'antd';
import React, { ReactNode, useState } from 'react';

export interface MInputProps {
  placeholder?: string;
  className?: React.CSSProperties;
  onPressEnterHandler?;
  icon?: ReactNode;
}

export const MInput: React.FunctionComponent<MInputProps> = ({
  placeholder,
  className,
  onPressEnterHandler,
  icon,
}) => {
  const [currentValue, setCurrentValue] = useState('');

  return (
    <Input
      placeholder={placeholder}
      onPressEnter={() => onPressEnterHandler(currentValue)}
      onChange={(e) => setCurrentValue(e.target.value)}
      style={className}
      prefix={icon ? icon : null}
    />
  );
};

export default MInput;
