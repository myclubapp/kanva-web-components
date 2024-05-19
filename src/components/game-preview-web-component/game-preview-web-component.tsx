import { Component, Host, Prop, State, h } from '@stencil/core';

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

  private getGameId(): string {
    return this.game;
  }

  private getClubId(): string {
    return this.club;
  }

  private formatDate(dateString): string {
    // 	"15.05.2022"

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

    let date = new Date(dateString.substr(6,4), dateString.substr(3,2) -1, dateString.substr(0,2)).toLocaleDateString('ch-DE', {
      weekday: 'short',
      year: '2-digit',
      month: 'short',
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

    // https://www.w3schools.com/graphics/svg_text.asp

    return (
      <Host>
        <slot>
          <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" fill="#f25528" />
            <rect x="0" y="0" width="20" height="400" fill="black" />
            <rect x="0" y="0" width="400" height="20" fill="black" />
            <rect x="0" y="380" width="400" height="20" fill="black" />
            <rect x="380" y="0" width="20" height="400" fill="black" />

            <rect x="0" y="370" width="15" height="10" fill="orange" />
            <rect x="0" y="355" width="15" height="10" fill="orange" />
            <rect x="0" y="340" width="15" height="10" fill="orange" />

            <text x="10" y="40" font-family="Arial" font-size="40" fill="black"  stroke="orange" stroke-width="1">{this.date}</text>
            <text x="12" y="40" font-family="Arial" font-size="40" fill="black"  stroke="orange" stroke-width="1">{this.date}</text>
            <text x="25" y="90" font-family="Arial" font-size="16" fill="black">{this.time} Uhr in {this.city}</text>

            <text x="40" y="120" font-family="Arial" font-size="18" fill="orange" stroke="black">{this.teamHome}</text>
            <rect x="40" y="125" height="120" width="120" fill="white"></rect>
            <image x="40" y="125" height="120" width="120" href={this.teamHomeLogo} />

            <text x="180" y="200" font-family="Arial" font-size="30" fill="orange" stroke="black" stroke-width="1">VS</text>
            


            <text x="355" y="265" font-family="Arial" font-size="18" fill="orange" stroke="black" text-anchor="end">{this.teamAway}</text>
            <rect x="235" y="125" height="120" width="120" fill="white"></rect>
            <image x="235" y="125" height="120" width="120" href={this.teamAwayLogo} />

            <text x="25" y="370" font-family="Arial" font-size="20" fill="black" text-anchor="start">{this.liga}</text>
            <g transform="rotate(-90 0 0)">
              <text x="-390" y="390" font-family="Arial" font-size="40" fill="orange" stroke="black" stroke-width="1">GAMEDAY</text>
            </g>
          </svg>


        </slot>
        <div> {this.name}</div>
      </Host>
    );
  }

}
