import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'game-preview-web-component',
  styleUrl: 'game-preview-web-component.css',
  shadow: true,
})
export class GamePreviewWebComponent {
  /**
   * Club Id from my-club
   */
  @Prop() club: string;
  /**
   * Game Id from my-club
   */
  @Prop() game: string;

  /**
   * Name of the Game
   */
  @State() name: string;

  private getGameId(): string {
    return this.game;
  }

  private getClubId(): string {
    return this.club;
  }

  componentWillLoad() {
    fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/gamePreview?gameId=${this.getGameId()}&clubId=${this.getClubId()}`)
    // fetch("https://europe-west6-myclubmanagement.cloudfunctions.net/gamePreview?gameId=su-1005184&clubId=su-452800")
    .then((response: Response) => response.json()
    ).then(response => {
      console.log(response);
        this.name = response.name;
      });
}

  render() {
    return <div> {this.name}</div>;
  }

}
