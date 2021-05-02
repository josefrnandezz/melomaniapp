import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Meta } from '@storybook/react';
import React from 'react';

import { AccountMenu } from './AccountMenu';

export default {
  title: 'AccountMenu',
  component: AccountMenu,
} as Meta;

export const Default = () => <AccountMenu />;
