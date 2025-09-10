import { newE2EPage } from '@stencil/core/testing';

describe('game-result', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<game-result></game-result>');

    const element = await page.find('game-result');
    expect(element).toHaveClass('hydrated');
  });
});
