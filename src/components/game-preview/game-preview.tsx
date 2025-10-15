import { Component, Host, Prop, State, h } from '@stencil/core';
import {
  formatDate,
  extractGameId,
  buildGraphQLQuery,
  buildSwissVolleyTeamGamesQuery,
  buildSwissHandballTeamClubGamesQuery,
  parseDateTime,
  getBackgroundImageSrc
} from '../../utils/utils';

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
  @Prop() type: string = 'swissunihockey'; // swissunihockey, swissvolley
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
 * Is this a home game?
 */
  @Prop() ishomegame: boolean = false;
  /**
 * Width of the preview
 */
  @Prop() width: string = '1080';
  /**
   * Height of the preview
   */
  @Prop() height: string = '1350';
  /**
   * Theme of the preview
   */
  @Prop() theme: string = 'kanva'; // myclub, kadetten-unihockey
  /**
   * Background image URL. Falls back to theme-based image if not provided.
   */
  @Prop() backgroundimage: string;
  /**
   * Blur of the preview
   */
  @Prop() imageblur: string = ''; // light, medium, strong

  /**
   * Team Id (used for type 'swissvolley' and 'swisshandball' only)
   */
  @Prop() team: string;

  /**
   * Club Id (used for type 'swisshandball' only)
   */
  @Prop() club: string;


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

  private getGameId(): string {
    return this.game;
  }

  private getGameId2(): string {
    return this.game2 || '';
  }

  private getGameId3(): string {
    return this.game3 || '';
  }

  private getTeamId(): string {
    return this.team;
  }

  private getClubId(): string {
    return this.club;
  }

  private getImageBlur(): string {
    return this.imageblur;
  }

  private getType(): string {
    return this.type;
  }

  private getIsHomeGame(): boolean {
    return this.ishomegame;
  }

  // Choose next upcoming game for preview; if none upcoming, fallback to last most recent
  private selectSwissvolleyPreviewGame(games: any[]): any | null {
    if (!Array.isArray(games) || games.length === 0) return null;
    const now = new Date();
    const withDate = games.map(g => ({
      item: g,
      dt: parseDateTime(g.date, g.time)
    }));
    const future = withDate.filter(x => x.dt.getTime() >= now.getTime());
    const chosen = (future.length > 0
      ? future.sort((a, b) => a.dt.getTime() - b.dt.getTime())[0]
      : withDate.sort((a, b) => b.dt.getTime() - a.dt.getTime())[0]);
    return chosen?.item || null;
  }

  componentWillLoad() {
    // swisshandball uses team+club-based games list
    if (this.getType() === 'swisshandball' && this.getTeamId() && this.getClubId()) {
      const teamClubQuery = buildSwissHandballTeamClubGamesQuery(this.getTeamId(), this.getClubId());
      fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/api/swisshandball?query=${teamClubQuery}`)
        .then((response: Response) => response.json())
        .then(response => {
          // console.log(response);
          const games = response.data?.games || [];
          const byId = (id: string) => {
            const targetId = extractGameId(id);
            return games.find(g => extractGameId(String(g.id)) === targetId);
          };
          const primary = (this.game && this.game.trim() !== '') ? byId(this.game) : this.selectSwissvolleyPreviewGame(games);
          if (primary) {
            this.teamAway = primary.teamAway;
            this.teamAwayLogo = primary.teamAwayLogo;
            this.teamHome = primary.teamHome;
            this.teamHomeLogo = primary.teamHomeLogo;
            this.city = primary.city;
            this.location = primary.location;
            this.time = primary.time;
            this.date = formatDate(primary.date);
          }
          if (this.game2 && this.game2.trim() !== '') {
            const g2 = byId(this.game2);
            if (g2) {
              this.teamAwayLogo2 = g2.teamAwayLogo;
              this.teamHomeLogo2 = g2.teamHomeLogo;
            }
          }
          if (this.game3 && this.game3.trim() !== '') {
            const g3 = byId(this.game3);
            if (g3) {
              this.teamAwayLogo3 = g3.teamAwayLogo;
              this.teamHomeLogo3 = g3.teamHomeLogo;
            }
          }
        });
      return;
    }

    // swissvolley uses team-based games list
    if (this.getType() === 'swissvolley' && this.getTeamId()) {
      const teamQuery = buildSwissVolleyTeamGamesQuery(this.getTeamId());
      fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/api/swissvolley?query=${teamQuery}`)
        .then((response: Response) => response.json())
        .then(response => {
          // console.log(response);
          const games = response.data?.games || [];
          const byId = (id: string) => {
            const targetId = extractGameId(id);
            return games.find(g => extractGameId(String(g.id)) === targetId);
          };
          const primary = (this.game && this.game.trim() !== '') ? byId(this.game) : this.selectSwissvolleyPreviewGame(games);
          if (primary) {
            this.teamAway = primary.teamAway;
            this.teamAwayLogo = primary.teamAwayLogo;
            this.teamHome = primary.teamHome;
            this.teamHomeLogo = primary.teamHomeLogo;
            this.city = primary.city;
            this.location = primary.location;
            this.time = primary.time;
            this.date = formatDate(primary.date);
          }
          if (this.game2 && this.game2.trim() !== '') {
            const g2 = byId(this.game2);
            if (g2) {
              this.teamAwayLogo2 = g2.teamAwayLogo;
              this.teamHomeLogo2 = g2.teamHomeLogo;
            }
          }
          if (this.game3 && this.game3.trim() !== '') {
            const g3 = byId(this.game3);
            if (g3) {
              this.teamAwayLogo3 = g3.teamAwayLogo;
              this.teamHomeLogo3 = g3.teamHomeLogo;
            }
          }
        });
      return;
    }

    // default flow (e.g., swissunihockey): fetch by gameId and optional game2/game3
    const gameId = extractGameId(this.getGameId());
    const graphQLQuery = buildGraphQLQuery(gameId);

    fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/api/${this.getType()}?query=${graphQLQuery}`)
      .then((response: Response) => response.json()
      ).then(response => {
        const game = response.data?.game;
        if (game) {
          console.log(game);
          this.name = game.name;
          this.teamAway = game.teamAway;
          this.teamAwayLogo = game.teamAwayLogo;
          this.teamHome = game.teamHome;
          this.teamHomeLogo = game.teamHomeLogo;
          this.city = game.city;
          this.location = game.location;
          this.time = game.time;
          this.date = formatDate(game.date);

        }
      });

    if (this.game2 && this.game2.trim() !== '') {
      const gameId2 = extractGameId(this.getGameId2());
      const graphQLQuery2 = buildGraphQLQuery(gameId2);

      fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/api/${this.getType()}?query=${graphQLQuery2}`)
        .then((response2: Response) => response2.json()
        ).then(response2 => {
          // console.log(response2);
          const game2 = response2.data?.game;
          if (game2) {
            console.log(game2);
            this.teamAwayLogo2 = game2.teamAwayLogo;
            this.teamHomeLogo2 = game2.teamHomeLogo;
          }
        });
    }

    if (this.game3 && this.game3.trim() !== '') {
      const gameId3 = extractGameId(this.getGameId3());
      const graphQLQuery3 = buildGraphQLQuery(gameId3);

      fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/api/${this.getType()}?query=${graphQLQuery3}`)
        .then((response3: Response) => response3.json()
        ).then(response3 => {
          // console.log(response3);
          const game3 = response3.data?.game;
          if (game3) {
            console.log(game3);
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
    const imageSrc = getBackgroundImageSrc(this.backgroundimage, this.theme);
    // eslint-disable-next-line

    return (
      <Host>
        <slot>
          <svg width={this.width} height={this.height} viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Filter Optionen - aktiviere eine davon */}

              {/* Option 1: Blur Filter (Unschärfe) */}
              <filter id="light">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>

              {/* Option 2: Brightness + Blur (dunkler und unscharf) */}
              <filter id="medium">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                <feComponentTransfer>
                  <feFuncR type="linear" slope="0.6" />
                  <feFuncG type="linear" slope="0.6" />
                  <feFuncB type="linear" slope="0.6" />
                </feComponentTransfer>
              </filter>

              {/* Option 3: Starker Blur */}
              <filter id="strong">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
              </filter>

            </defs>
            {/* Hintergrundbild */}
            <image width='1080' height='1350' href={imageSrc} filter={`url(#${this.getImageBlur()})`} />

            {/* Blur Element for Background Image */}
            {/* Option A: Halbtransparentes Overlay (kombinierbar mit Filtern oben) */}
            {/* <rect width="1080" height="1350" fill="rgba(0, 0, 0, 0.3)" /> */}

            {/* Option B: Gradient Overlay - auskommentieren zum Testen */}
            {/* <rect width="1080" height="1350" fill="url(#overlayGradient)" /> */}

            {/* Option C: Weißes Overlay für hellere Abschwächung */}
            {/* <rect width="1080" height="1350" fill="rgba(255, 255, 255, 0.4)" /> */}


            {/* HOME GAME - groß und zentriert oben */}
            <text x="540" y="190" font-family="Bebas Neue, sans-serif" font-size="216" fill="#fff" text-anchor="middle" font-weight="900" letter-spacing="1">
              {this.getIsHomeGame() ? 'HOME GAME' : 'GAME DAY'}
            </text>

            {/* Datum, Uhrzeit und Ortschaft - zweite Zeile zentriert */}
            <text x="540" y="243" font-family="Bebas Neue, sans-serif" font-size="49" fill="#fff" text-anchor="middle" font-weight="600">
              {this.date} {this.time} {this.location}
            </text>


            {/* 3 Multi GAME Modus - Team-Logos links unten  Spiel 1 oben */}
            {(this.game3 && this.game3.trim() !== '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="27" y="1097" width="189" height="189" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="27" y="750" width="189" height="189" href={this.teamHomeLogo} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="324" y="1013" width="216" height="216" rx="32" fill="#fff" filter="url(#shadow)" />*/}
                <image x="243" y="750" width="189" height="189" href={this.teamAwayLogo} />
              </g>
            )}

            {/* 3 Multi GAME ModusTeam-Logos links unten Spiel 2 mitte*/}
            {(this.game3 && this.game3.trim() !== '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="27" y="1097" width="189" height="189" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="27" y="950" width="189" height="189" href={this.teamHomeLogo2} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="324" y="1013" width="216" height="216" rx="32" fill="#fff" filter="url(#shadow)" />*/}
                <image x="243" y="950" width="189" height="189" href={this.teamAwayLogo2} />
              </g>
            )}
            {/* 3 Multi GAME ModusTeam-Logos links unten Spiel 3 unten*/}
            {(this.game3 && this.game3.trim() !== '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="27" y="1097" width="189" height="189" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="27" y="1150" width="189" height="189" href={this.teamHomeLogo3} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="324" y="1013" width="216" height="216" rx="32" fill="#fff" filter="url(#shadow)" />*/}
                <image x="243" y="1150" width="189" height="189" href={this.teamAwayLogo3} />
              </g>
            )}



            {/* 2 Multi GAME Modus - Team-Logos links unten  Spiel 1 oben */}
            {(this.game2 && this.game2.trim() !== '') && (!this.game3 || this.game3.trim() === '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="27" y="1097" width="189" height="189" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="27" y="950" width="189" height="189" href={this.teamHomeLogo} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="324" y="1013" width="216" height="216" rx="32" fill="#fff" filter="url(#shadow)" />*/}
                <image x="243" y="950" width="189" height="189" href={this.teamAwayLogo} />
              </g>
            )}

            {/* 2 Multi GAME ModusTeam-Logos links unten Spiel 2 unten*/}
            {(this.game2 && this.game2.trim() !== '') && (!this.game3 || this.game3.trim() === '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="27" y="1097" width="189" height="189" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="27" y="1150" width="189" height="189" href={this.teamHomeLogo2} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="324" y="1013" width="216" height="216" rx="32" fill="#fff" filter="url(#shadow)" />*/}
                <image x="243" y="1150" width="189" height="189" href={this.teamAwayLogo2} />
              </g>
            )}



            {/* SINGLE GAME Modus - Team-Logos links unten nebeneinander */}
            {(!this.game2 || this.game2.trim() === '') && (!this.game3 || this.game3.trim() === '') && (
              <g>
                {/* Home Team Logo (links) */}
                {/*<rect x="27" y="1097" width="189" height="189" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                <image x="27" y="1150" width="189" height="189" href={this.teamHomeLogo} />

                {/* Away Team Logo (rechts daneben) */}
                {/*<rect x="324" y="1013" width="216" height="216" rx="32" fill="#fff" filter="url(#shadow)" />*/}
                <image x="243" y="1150" width="189" height="189" href={this.teamAwayLogo} />
              </g>
            )}

            {/* Presented by myclub - unten rechts */}
            <text x="1060" y="1330" font-family="Bebas Neue, sans-serif" font-size="40" fill="#fff" text-anchor="end" opacity="0.7">
              @getkanva.io
            </text>
          </svg>
        </slot>
      </Host>
    );
  }
}