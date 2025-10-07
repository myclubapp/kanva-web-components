import { Component, Host, Prop, State, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'game-preview',
  styleUrl: 'game-preview.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class GamePreview {
  /**
   * Club Id from my-club
   */
  @Prop() club: string;
  /**
   * Game Id from my-club
   */
  @Prop() game: string;
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
  @State() teamAway: string;
  @State() teamAwayLogo: string;
  @State() teamHome: string;
  @State() teamHomeLogo: string;
  @State() city: string;
  @State() location: string;
  @State() dateTime: string;
  @State() date: string;
  @State() time: string;
  @State() liga: string;

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

  private getClubId(): string {
    return this.club;
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

  componentWillLoad() {
    // console.log('ishomegame value:', this.ishomegame, 'type:', typeof this.ishomegame);
    fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/gamePreview?gameId=${this.getGameId()}&clubId=${this.getClubId()}`)
      // fetch("https://europe-west6-myclubmanagement.cloudfunctions.net/gamePreview?gameId=su-1005184&clubId=su-452800")
      .then((response: Response) => response.json()
      ).then(response => {
        console.log(response);

        this.name = response.name;
        this.teamAway = response.teamAway;
        this.teamAwayLogo = response.teamAwayLogo;
        this.teamHome = response.teamHome;
        this.teamHomeLogo = response.teamHomeLogo;
        this.city = response.city;
        this.location = response.location;
        this.dateTime = response.dateTime._seconds;
        this.time = response.time;
        this.date = this.formatDate(response.date);
        this.liga = response.liga;
      });
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
      : getAssetPath(`background-${this.getDefaultBackgroundImage()}.png`);
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
              {this.date} {this.time} {this.city}
            </text>

            {/* Team-Logos links unten nebeneinander */}
            <g>
              {/* Home Team Logo (links) */}
              {/*<rect x="10" y="325" width="70" height="70" rx="0" fill="#fff" filter="url(#shadow)" />*/}
              <image x="10" y="325" width="70" height="70" href={this.teamHomeLogo} />

              {/* Away Team Logo (rechts daneben) */}
              {/*<rect x="120" y="300" width="80" height="80" rx="12" fill="#fff" filter="url(#shadow)" />*/}
              <image x="90" y="325" width="70" height="70" href={this.teamAwayLogo} />
            </g>

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