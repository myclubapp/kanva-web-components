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
  @Prop() theme: string = 'myclub';

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
      case 'myclub':
        return {
          primaryColor: '#339bde',

          secondaryColor: '#795deb',
          backgroundColor: '#ffffff'
        };
      default:
        return {
          primaryColor: '#339bde',
          secondaryColor: '#795deb',
          backgroundColor: '#ffffff'
        };
    }
  }

  private getGameId(): string {
    return this.game;
  }

  private getClubId(): string {
    return this.club;
  }

  private formatDate(dateString): string {
    // 	"15.05.2022"

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

    let date = new Date(dateString.substr(6, 4), dateString.substr(3, 2) - 1, dateString.substr(0, 2)).toLocaleDateString('ch-DE', {
      weekday: 'long',
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
    });
    return date;
  }

  componentWillLoad() {
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
    // Modernes SVG-Layout mit Farbverlauf, Schatten und besserer Anordnung
    const imageSrc = getAssetPath(`./assets/background-${this.theme}.png`);
    const themeStyles = this.getThemeStyles();
    // Hilfsfunktion für Textkürzung
    const truncate = (str, n = 18) => str && str.length > n ? str.slice(0, n - 1) + '…' : str;
    return (
      <Host>
        <slot>
          <svg width={this.width} height={this.height} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bg-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color={themeStyles.primaryColor} />
                <stop offset="100%" stop-color={themeStyles.secondaryColor} />
              </linearGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.25" />
              </filter>
            </defs>
            <rect width="400" height="400" fill="url(#bg-gradient)" />
            {/* Hintergrundbild, falls vorhanden */}
            {this.teamHomeLogo && (
              <image width='400' height='400' href={imageSrc} />
            )}
            {/* Datum */}
            <text x="30" y="50" font-family="Montserrat, Arial, sans-serif" font-size="40" fill={themeStyles.secondaryColor} filter="url(#shadow)" font-weight="bold" stroke="#FFF" stroke-width="1">
              {this.date}
            </text>
            {/* Uhrzeit */}
            <text x="30" y="85" font-family="Montserrat, Arial, sans-serif" font-size="32" fill={themeStyles.secondaryColor} font-weight="bold" opacity="0.95" stroke="#FFF" stroke-width="1">
              {this.time} Uhr
            </text>
            {/* Teams mit größeren Logos und voller Textbreite */}
            {/* Home Team (links) */}
            <g>
              <text x="125" y="120" font-family="Montserrat, Arial, sans-serif" font-size="15" fill="#fff" text-anchor="middle" font-weight="bold" filter="url(#shadow)">
                {this.teamHome}
              </text>
              <rect x="30" y="140" width="130" height="130" rx="24" fill="#fff" filter="url(#shadow)" />
              <image x="35" y="145" width="120" height="120" href={this.teamHomeLogo} />
            </g>
            {/* Away Team (rechts) */}
            <g>
              <text x="370" y="300" font-family="Montserrat, Arial, sans-serif" font-size="15" fill="#fff" text-anchor="end" font-weight="bold" filter="url(#shadow)">
                {this.teamAway}
              </text>
              <rect x="240" y="140" width="130" height="130" rx="24" fill="#fff" filter="url(#shadow)" />
              <image x="245" y="145" width="120" height="120" href={this.teamAwayLogo} />
            </g>
            {/* VS */}
            <text x="200" y="220" font-family="Montserrat, Arial, sans-serif" font-size="36" fill="#fff" text-anchor="middle" font-weight="bold" filter="url(#shadow)">
              VS
            </text>
            {/* Liga */}
            <text x="200" y="350" font-family="Montserrat, Arial, sans-serif" font-size="18" fill="#fff" text-anchor="middle" opacity="0.9">
              {this.liga}
            </text>
            {/* Ort: Stadt und Location zusammen */}
            {(this.city || this.location) && (
              <text x="200" y="375" font-family="Montserrat, Arial, sans-serif" font-size="13" fill="#fff" text-anchor="middle" opacity="0.7">
                {[this.location, this.city ].filter(Boolean).join(', ')}
              </text>
            )}
          </svg>
        </slot>
      </Host>
    );
  }
}