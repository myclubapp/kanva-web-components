import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'game-preview-web-component',
  styleUrl: 'game-preview-web-component.css',
  shadow: true,
})
export class GamePreviewWebComponent {

  /**
   * Game Id from my-club
   */
  @Prop() gameId: string;
  @Prop() game: string;

  private getGameId(): string {
    return "" + this.gameId;
  }

  render() {
    return <div> {this.getGameId()} {this.game} </div>;
  }

}
