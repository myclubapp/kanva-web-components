import { newSpecPage } from '@stencil/core/testing';
import { GameResult } from '../game-result';

describe('game-result', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GameResult],
      html: `<game-result></game-result>`,
    });
    expect(page.root).toEqualHtml(`
      <game-result>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </game-result>
    `);
  });
});
