import { Meta, Story } from '@storybook/react';

import { AccountMenu, AccountMenuProps } from './AccountMenu';

export default {
  title: 'AccountMenu',
  component: AccountMenu,
} as Meta;

const Template: Story<AccountMenuProps> = (args) => <AccountMenu {...args} />;

export const Default = () => Template.bind({});
Default.args = {
  session: {},
};
