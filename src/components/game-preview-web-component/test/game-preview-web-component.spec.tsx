import { newSpecPage } from '@stencil/core/testing';
import { GamePreviewWebComponent } from '../game-preview-web-component';

describe('game-preview-web-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GamePreviewWebComponent],
      html: `<game-preview-web-component></game-preview-web-component>`,
    });
    expect(page.root).toEqualHtml(`
      <game-preview-web-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </game-preview-web-component>
    `);
  });
});
