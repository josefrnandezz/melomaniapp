import { CheckOutlined } from '@ant-design/icons';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  args: {
    type: 'primary',
    icon: '',
  },
  decorators: [
    (Button) => (
      <div style={{ margin: '3em' }}>
        <Button />
      </div>
    ),
  ],
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Button {...args}>Text</Button>;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  type: 'primary',
};

export const Secondary = Template.bind({});

Secondary.args = {
  type: 'secondary',
};

export const PrimaryWithIcon = Template.bind({});

PrimaryWithIcon.args = {
  type: 'primary',
  icon: <CheckOutlined />,
};

export const SecondaryWithIcon = Template.bind({});

SecondaryWithIcon.args = {
  type: 'secondary',
  icon: <CheckOutlined />,
};
