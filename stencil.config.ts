import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'kanva-web-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      dir: 'dist',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      copy: [
        {
          src: 'components/game-preview/assets',
          dest: 'dist/components/assets',
          warn: true,
        },
        {
          src: 'components/game-result/assets',
          dest: 'dist/components/assets',
          warn: true,
        }
      ]
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: 'components/game-preview/assets',
          dest: 'build'
        },
        {
          src: 'components/game-result/assets',
          dest: 'build'
        }
      ]
    },
  ],
  testing: {
    browserHeadless: true,
  },
};
