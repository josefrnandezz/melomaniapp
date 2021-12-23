import { Layout } from '@melomaniapp/ui';
import { Typography } from 'antd';

import {
  BellOutlined,
  CarryOutOutlined,
  HomeOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const options = [
  {
    key: 'home',
    title: 'Home',
    icon: <HomeOutlined />,
    href: '/home',
  },
  {
    key: 'discover',
    title: 'Discover',
    icon: <SearchOutlined />,
    href: '/discover',
  },
  {
    key: 'notifications',
    title: 'Notifications',
    icon: <BellOutlined />,
    href: '/notifications',
  },
  {
    key: 'events',
    title: 'My events',
    icon: <CarryOutOutlined />,
    href: '/events',
  },
  {
    key: 'management',
    title: 'Management',
    icon: <SettingOutlined />,
    href: '/management',
  },
];

export function Index() {
  return (
    <Layout navbarOptions={options} session={{}} isFan={true}>
      <Typography.Title>Hola que pasa esto es el home</Typography.Title>
    </Layout>
  );
}

export default Index;
