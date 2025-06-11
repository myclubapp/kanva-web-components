import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'myclub-game-preview',
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
          src: '**/*.{jpg,png}',
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

    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
