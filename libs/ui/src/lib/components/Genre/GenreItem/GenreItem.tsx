import { Button } from '@melomaniapp/ui';
import { Card } from 'antd';
import React from 'react';

export interface GenreItemProps {
  name: string;
  className?: React.CSSProperties;
}

export const GenreItem = ({ name, className }: GenreItemProps) => (
  <Card style={className}>
    <div>
      <h2 style={{ justifyContent: 'center' }}>{name}</h2>
      <Button type="primary">Hola</Button>
    </div>
  </Card>
);

export default GenreItem;
