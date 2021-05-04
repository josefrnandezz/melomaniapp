import { SearchOutlined } from '@ant-design/icons';
import { Meta } from '@storybook/react';

import MInput from './MInput';

export default {
  title: 'MInput',
  component: MInput,
  decorators: [
    (MInput) => (
      <div style={{ width: '20%' }}>
        <MInput />
      </div>
    ),
  ],
} as Meta;

const Template = (args) => <MInput {...args} />;

export const DefaultInput = Template.bind({});

export const SearchInput = Template.bind({});
SearchInput.args = {
  className: { borderRadius: '500px' },
  icon: <SearchOutlined />,
};
