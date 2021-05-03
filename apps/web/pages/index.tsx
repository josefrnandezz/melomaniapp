import { Layout } from '@melomaniapp/ui';
import { Typography } from 'antd';
import React from 'react';

export default function Home() {
  return (
    <Layout session={{}} isFan={false}>
      <Typography.Title>Hola que pasa esto es el home</Typography.Title>
    </Layout>
  );
}
