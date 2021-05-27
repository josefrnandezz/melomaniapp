import '../src/lib/styles/antd-custom.less';

import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/react';

addDecorator(withKnobs);

export const parameters = { layout: 'fullscreen' };
