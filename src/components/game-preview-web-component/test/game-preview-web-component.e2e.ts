import { newE2EPage } from '@stencil/core/testing';

describe('game-preview-web-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<game-preview-web-component></game-preview-web-component>');

    const element = await page.find('game-preview-web-component');
    expect(element).toHaveClass('hydrated');
  });
});
