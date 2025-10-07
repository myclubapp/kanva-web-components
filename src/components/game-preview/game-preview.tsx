import { Component, Host, Prop, State, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'game-preview',
  styleUrl: 'game-preview.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class GamePreview {
  /**
   * CLub type
   */
  @Prop() type: string = 'swissunihockey';
  /**
   * Game Id from my-club
   */
  @Prop() game: string;
  /**
   * Game Id from my-club for 2nd game
   */
  @Prop() game2: string;
  /**
   * Game Id from my-club for 3rd game
   */
  @Prop() game3: string;
  /**
   * Width of the preview
   */
  @Prop() width: string = '400';
  /**
   * Height of the preview
   */
  @Prop() height: string = '400';
  /**
   * Theme of the preview
   */
  @Prop() theme: string = 'myclub'; // myclub, kadetten-unihockey
  /**
   * Background image URL. Falls back to theme-based image if not provided.
   */
  @Prop() backgroundimage: string;
  /**
   * Is this a home game?
   */
  @Prop() ishomegame: boolean = false;

  /**
   * Name of the Game
   */
  @State() name: string;
  @State() description: string;
  @State() teamAway: string;
  @State() teamAwayLogo: string;
  @State() teamHome: string;
  @State() teamHomeLogo: string;
  @State() teamAwayLogo2: string;
  @State() teamHomeLogo2: string;
  @State() teamAwayLogo3: string;
  @State() teamHomeLogo3: string;
  @State() city: string;
  @State() location: string;
  @State() dateTime: string;
  @State() date: string;
  @State() time: string;


  private getThemeStyles() {
    switch (this.theme) {
      case 'kadetten-unihockey':
        return {
          primaryColor: 'orange',
          secondaryColor: 'black',
          backgroundColor: '#f25528'
        };
      case 'myclub-light':
        return {
          primaryColor: '#339bde',
          secondaryColor: '#795deb',
          backgroundColor: '#ffffff'
        };
      case 'myclub-dark':
        return {
          primaryColor: '#795deb',
          secondaryColor: '#339bde',
          backgroundColor: '#1a1a1a'
        };
      case 'light':
        return {
          primaryColor: '#339bde',
          secondaryColor: '#795deb',
          backgroundColor: '#ffffff'
        };
      case 'dark':
        return {
          primaryColor: '#795deb',
          secondaryColor: '#339bde',
          backgroundColor: '#1a1a1a'
        };
      default:
        return {
          primaryColor: '#339bde',
          secondaryColor: '#795deb',
          backgroundColor: '#ffffff'
        };
    }
  }

  private getDefaultBackgroundImage(): string {
    switch (this.theme) {
      case 'kadetten-unihockey':
        return 'kadetten-unihockey';
      case 'myclub':
      case 'myclub-light':
      case 'myclub-dark':
      case 'light':
      case 'dark':
      default:
        return 'myclub';
    }
  }

  private getGameId(): string {
    return this.game;
  }

  private getGameId2(): string {
    return this.game2 || '';
  }

  private getGameId3(): string {
    return this.game3 || '';
  }

  private getType(): string {
    return this.type;
  }

  private getIsHomeGame(): boolean {
    return this.ishomegame;
  }

  private formatDate(dateString): string {
    // 	"15.05.2022"

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

    let date = new Date(dateString.substr(6, 4), dateString.substr(3, 2) - 1, dateString.substr(0, 2)).toLocaleDateString('ch-DE', {
      // weekday: 'long',
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
    });
    return date;
  }

  private extractGameId(gameId: string): string {
    // Extrahiert die reine Nummer aus der gameId (z.B. "su-1076712" -> "1076712")
    if (!gameId) return '';
    const match = gameId.match(/\d+/);
    return match ? match[0] : gameId;
  }

  private buildGraphQLQuery(gameId: string): string {
    const query = `{
  game(gameId: "${gameId}") {
    date
    time
    location
    city
    teamHome
    teamAway
    teamHomeLogo
    teamAwayLogo
    result
    resultDetail
  }
}`;
    return encodeURIComponent(query);
  }

  componentWillLoad() {
    // console.log('ishomegame value:', this.ishomegame, 'type:', typeof this.ishomegame);
    const gameId = this.extractGameId(this.getGameId());
    const graphQLQuery = this.buildGraphQLQuery(gameId);
    
    fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/api/${this.getType()}?query=${graphQLQuery}`)
      .then((response: Response) => response.json()
      ).then(response => {
        console.log(response);
        const game = response.data?.game;
        if (game) {
          this.name = game.name;
          this.teamAway = game.teamAway;
          this.teamAwayLogo = game.teamAwayLogo;
          this.teamHome = game.teamHome;
          this.teamHomeLogo = game.teamHomeLogo;
          this.city = game.city;
          this.location = game.location;
          this.time = game.time;
          this.date = this.formatDate(game.date);

        }
      });

    if (this.game2 && this.game2.trim() !== '') {
      const gameId2 = this.extractGameId(this.getGameId2());
      const graphQLQuery2 = this.buildGraphQLQuery(gameId2);
      
      fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/api/${this.getType()}?query=${graphQLQuery2}`)
        .then((response2: Response) => response2.json()
        ).then(response2 => {
          console.log(response2);
          const game2 = response2.data?.game;
          if (game2) {
            this.teamAwayLogo2 = game2.teamAwayLogo;
            this.teamHomeLogo2 = game2.teamHomeLogo;
          }
        });
    }

    if (this.game3 && this.game3.trim() !== '') {
      const gameId3 = this.extractGameId(this.getGameId3());
      const graphQLQuery3 = this.buildGraphQLQuery(gameId3);
      
      fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/api/${this.getType()}?query=${graphQLQuery3}`)
        .then((response3: Response) => response3.json()
        ).then(response3 => {
          console.log(response3);
          const game3 = response3.data?.game;
          if (game3) {
            this.teamAwayLogo3 = game3.teamAwayLogo;
            this.teamHomeLogo3 = game3.teamHomeLogo;
          }
        });
    }

  }

  componentDidLoad() {
    /*
    var canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.fillStyle = "#f25528";
    context.fillRect(0, 0, 400, 400);

    // Border
    context.fillStyle = "black";
    context.fillRect(0, 0, 20, 400);
    context.fillRect(0, 0, 400, 20);
    context.fillRect(0, 380, 400, 20);
    context.fillRect(380, 0, 20, 400);

    context.fillStyle = "orange";
    context.fillRect(0, 361, 15, 10);
    context.fillRect(0, 321, 15, 10);
    context.fillRect(0, 341, 15, 10);

    // Datum / Uhrzeit
    context.fillStyle = 'black';                                          // set the color back to 'red'
    context.font = '40pt Arial';
    context.strokeStyle = 'black';                                          // define the CSS font for writing text    
    context.fillText('5. Mai', 15, 60);                                   // write the text 'Hello'

    // Location
    context.fillStyle = 'black';                                          // set the color back to 'red'
    context.font = '16pt Arial';                                        // define the CSS font for writing text
    context.fillText('16:00 Uhr in Ortschaft', 15, 80);                                   // write the text 'Hello'
    // Halle
    context.fillStyle = 'black';                                          // set the color back to 'red'
    context.font = '16pt Arial';                                        // define the CSS font for writing text
    context.fillText('Turnhalle', 15, 100);                                   // write the text 'Hello'


    // Team A
    context.fillStyle = 'black';                                          // set the color back to 'red'
    context.font = '16pt Arial';                                        // define the CSS font for writing text
    context.fillText('Mannschaft A', 15, 200);                                   // write the text 'Hello'

    // VS
    context.fillStyle = 'orange';                                          // set the color back to 'red'
    context.font = '20pt Arial';                                        // define the CSS font for writing text
    context.fillText('VS', 180, 200);                                   // write the text 'Hello'
    context.strokeStyle = 'black';
    context.strokeText('VS', 180, 200);  
    context.fillStyle = 'orange';                                          // set the color back to 'red'
    context.font = '20pt Arial';                                        // define the CSS font for writing text
    context.fillText('VS', 182, 200);                                   // write the text 'Hello'
    context.strokeStyle = 'black';
    context.strokeText('VS', 182, 200);  

    // Team B
    context.fillStyle = 'black';                                          // set the color back to 'red'
    context.font = '16pt Arial';                                        // define the CSS font for writing text
    context.fillText('Mannschaft B', 240, 200);                                   // write the text 'Hello'

    // Liga
    context.fillStyle = 'black';                                          // set the color back to 'red'
    context.font = '10pt Arial';                                        // define the CSS font for writing text
    context.textAlign = "right";
    context.fillText('Herren 2. Liga', 290, 380);                                   // write the text 'Hello'

    // Gameday
    context.fillStyle = 'orange';                                          // set the color back to 'red'
    context.font = '40pt Arial ';
    context.rotate(-Math.PI / 2);
    context.textAlign = "left";                                       // define the CSS font for writing text
    context.fillText('GAMEDAY', -390, 390,);                                   // write the text 'Hello'
    context.strokeStyle = 'black';
    context.strokeText('GAMEDAY', -390, 390,);
  
    */

  }

  render() {
    // Layout basierend auf Instagram-Vorlagen
    const themeStyles = this.getThemeStyles();
    // Entweder URL (http/https oder data:image) oder theme-basiertes Bild
    const imageSrc = this.backgroundimage && (this.backgroundimage.startsWith('http') || this.backgroundimage.startsWith('data:image/'))
      ? this.backgroundimage
      : getAssetPath(`./assets/background-${this.getDefaultBackgroundImage()}.png`);
    // eslint-disable-next-line

    return (
      <Host>
        <slot>
          <svg width={this.width} height={this.height} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">

            <rect width="400" height="400" fill="url(#bg-gradient)" />
            {/* Hintergrundbild, falls vorhanden */}

            <image width='400' height='400' href={imageSrc} />


            {/* HOME GAME - groß und zentriert oben */}
            <text x="200" y="70" font-family="Bebas Neue, sans-serif" font-size="80" fill="#fff" text-anchor="middle" font-weight="900" letter-spacing="1">
              {this.getIsHomeGame() ? 'HOME GAME' : 'GAME DAY'}
            </text>

            {/* Datum, Uhrzeit und Ortschaft - zweite Zeile zentriert */}
            <text x="200" y="90" font-family="Bebas Neue, sans-serif" font-size="18" fill="#fff" text-anchor="middle" font-weight="600">
              {this.date} {this.time} {this.location}
            </text>


            {/* 3 Multi GAME Modus - Team-Logos links unten  Spiel 1 oben */}
            {(this.game3 && this.game3.trim() !== '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="10" y="325" width="70" height="70" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="10" y="165" width="70" height="70" href={this.teamHomeLogo} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="120" y="300" width="80" height="80" rx="12" fill="#fff" filter="url(#shadow)" />*/}
                <image x="90" y="165" width="70" height="70" href={this.teamAwayLogo} />
              </g>
            )}

            {/* 3 Multi GAME ModusTeam-Logos links unten Spiel 2 mitte*/}
            {(this.game3 && this.game3.trim() !== '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="10" y="325" width="70" height="70" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="10" y="245" width="70" height="70" href={this.teamHomeLogo2} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="120" y="300" width="80" height="80" rx="12" fill="#fff" filter="url(#shadow)" />*/}
                <image x="90" y="245" width="70" height="70" href={this.teamAwayLogo2} />
              </g>
            )}
            {/* 3 Multi GAME ModusTeam-Logos links unten Spiel 3 unten*/}
            {(this.game3 && this.game3.trim() !== '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="10" y="325" width="70" height="70" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="10" y="325" width="70" height="70" href={this.teamHomeLogo3} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="120" y="300" width="80" height="80" rx="12" fill="#fff" filter="url(#shadow)" />*/}
                <image x="90" y="325" width="70" height="70" href={this.teamAwayLogo3} />
              </g>
            )}



            {/* 2 Multi GAME Modus - Team-Logos links unten  Spiel 1 oben */}
            {(this.game2 && this.game2.trim() !== '') && (!this.game3 || this.game3.trim() === '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="10" y="325" width="70" height="70" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="10" y="245" width="70" height="70" href={this.teamHomeLogo} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="120" y="300" width="80" height="80" rx="12" fill="#fff" filter="url(#shadow)" />*/}
                <image x="90" y="245" width="70" height="70" href={this.teamAwayLogo} />
              </g>
            )}

            {/* 2 Multi GAME ModusTeam-Logos links unten Spiel 2 unten*/}
            {(this.game2 && this.game2.trim() !== '') && (!this.game3 || this.game3.trim() === '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="10" y="325" width="70" height="70" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="10" y="325" width="70" height="70" href={this.teamHomeLogo2} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="120" y="300" width="80" height="80" rx="12" fill="#fff" filter="url(#shadow)" />*/}
                <image x="90" y="325" width="70" height="70" href={this.teamAwayLogo2} />
              </g>
            )}



            {/* SINGLE GAME Modus - Team-Logos links unten nebeneinander */}
            {(!this.game2 || this.game2.trim() === '') && (!this.game3 || this.game3.trim() === '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="10" y="325" width="70" height="70" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="10" y="325" width="70" height="70" href={this.teamHomeLogo} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="120" y="300" width="80" height="80" rx="12" fill="#fff" filter="url(#shadow)" />*/}
                <image x="90" y="325" width="70" height="70" href={this.teamAwayLogo} />
              </g>
            )}

            {/* Presented by myclub - unten rechts */}
            <text x="390" y="390" font-family="Bebas Neue, sans-serif" font-size="12" fill="#fff" text-anchor="end" opacity="0.7">
              presented by myclub
            </text>
          </svg>
        </slot>
      </Host>
    );
  }
}