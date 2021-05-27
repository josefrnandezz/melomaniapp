import { GenreDTO } from '@melomaniapp/contracts';
import { Card, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;
const { Meta } = Card;

export interface GenreItemProps {
  genre: GenreDTO;
}

export const GenreItem: React.FunctionComponent<GenreItemProps> = ({
  genre,
}) => {
  return (
    <Card
      style={{
        borderRadius: '8px',
        width: '100%',
        backgroundColor: 'rgb(141, 103, 171)',
      }}
      hoverable
      onClick={() => console.log('you have clicked: ', genre.name)}
    >
      <Title
        level={2}
        style={{
          color: 'snow',
          paddingBottom: '20%',
          paddingRight: '10%',
          width: '100%',
        }}
      >
        {genre.name}
      </Title>
    </Card>
  );
};

export default GenreItem;
