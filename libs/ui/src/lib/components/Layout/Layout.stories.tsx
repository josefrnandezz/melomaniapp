import {
  BellOutlined,
  CarryOutOutlined,
  HomeOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';
import { Avatar, List } from 'antd';

import { Layout, LayoutProps } from './Layout';

export default {
  title: 'Layout',
  component: Layout,
} as Meta;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const mockedOptions = [
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

const Template: Story<LayoutProps> = (args) => (
  <Layout {...args}>
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  </Layout>
);

export const Default = Template.bind({});
Default.args = {
  session: {},
  isFan: false,
  navbarOptions: mockedOptions,
};
