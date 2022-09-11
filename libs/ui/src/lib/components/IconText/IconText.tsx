import { Space } from 'antd';
import React from 'react';

interface IconTextProps {
  icon: React.FC;
  text: string;
}

export const IconText: React.FC<IconTextProps> = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
