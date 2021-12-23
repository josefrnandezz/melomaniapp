const { getThemeVariables } = require('antd/dist/theme');

const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },

  stories: [
    ...rootMain.stories,
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    // add your own webpack tweaks if needed
    config.module.rules.push({
      test: /\.less$/,
      use: [
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              // If you are using less-loader@5 please spread the lessOptions to options directly
              modifyVars: getThemeVariables({
                dark: false, // Enable dark mode
                compact: true, // Enable compact mode
              }),
              javascriptEnabled: true,
            },
          },
        },
      ],
    });

    return config;
  },
};
