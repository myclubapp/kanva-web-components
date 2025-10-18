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
  tag: 'game-result',
  styleUrl: 'game-result.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class GameResult {

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
  @Prop() theme: string = 'kanva';
  /**
   * Background image URL. Falls back to theme-based image if not provided.
   */
  @Prop() backgroundimage: string;
  /**
 * Show result detail
 */
  @Prop() showresultdetail: boolean = false;
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


  @State() name: string;
  @State() description: string;
  @State() teamAway: string;
  @State() teamAwayLogo: string;
  @State() teamHome: string;
  @State() teamHomeLogo: string;
  @State() city: string;
  @State() location: string;
  @State() date: string;
  @State() time: string;
  @State() result: string;
  @State() resultDetail: string;
  /**
   * Game 2 Attributes
   */
  @State() teamAway2: string;
  @State() teamAwayLogo2: string;
  @State() teamHome2: string;
  @State() teamHomeLogo2: string;
  @State() result2: string;
  @State() resultDetail2: string;


  private getGameId(): string {
    return this.game;
  }

  private getGameId2(): string {
    return this.game2;
  }

  private getImageBlur(): string {
    return this.imageblur;
  }

  private getShowResultDetail(): boolean {
    return this.showresultdetail;
  }

  private getType(): string {
    return this.type;
  }

  private getTeamId(): string {
    return this.team;
  }

  private getClubId(): string {
    return this.club;
  }

  // Choose most recent past game for result; if none past, fallback to earliest
  private selectSwissvolleyResultGame(games: any[]): any | null {
    if (!Array.isArray(games) || games.length === 0) return null;
    const now = new Date();
    const withDate = games.map(g => ({
      item: g,
      dt: parseDateTime(g.date, g.time)
    }));
    const past = withDate.filter(x => x.dt.getTime() <= now.getTime());
    const chosen = (past.length > 0
      ? past.sort((a, b) => b.dt.getTime() - a.dt.getTime())[0]
      : withDate.sort((a, b) => a.dt.getTime() - b.dt.getTime())[0]);
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
          const primary = (this.game && this.game.trim() !== '') ? byId(this.game) : this.selectSwissvolleyResultGame(games);
          if (primary) {
            this.teamAway = primary.teamAway;
            this.teamAwayLogo = primary.teamAwayLogo;
            this.teamHome = primary.teamHome;
            this.teamHomeLogo = primary.teamHomeLogo;
            this.city = primary.city;
            this.location = primary.location;
            this.time = primary.time;
            this.date = formatDate(primary.date);
            this.result = primary.result;
            this.resultDetail = primary.resultDetail;
          }
          if (this.game2 && this.game2.trim() !== '') {
            const g2 = byId(this.game2);
            if (g2) {
              this.teamAway2 = g2.teamAway;
              this.teamAwayLogo2 = g2.teamAwayLogo;
              this.teamHome2 = g2.teamHome;
              this.teamHomeLogo2 = g2.teamHomeLogo;
              this.result2 = g2.result;
              this.resultDetail2 = g2.resultDetail;
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
          const primary = (this.game && this.game.trim() !== '') ? byId(this.game) : this.selectSwissvolleyResultGame(games);
          if (primary) {
            this.teamAway = primary.teamAway;
            this.teamAwayLogo = primary.teamAwayLogo;
            this.teamHome = primary.teamHome;
            this.teamHomeLogo = primary.teamHomeLogo;
            this.city = primary.city;
            this.location = primary.location;
            this.time = primary.time;
            this.date = formatDate(primary.date);
            this.result = primary.result;
            this.resultDetail = primary.resultDetail;
          }
          if (this.game2 && this.game2.trim() !== '') {
            const g2 = byId(this.game2);
            if (g2) {
              this.teamAway2 = g2.teamAway;
              this.teamAwayLogo2 = g2.teamAwayLogo;
              this.teamHome2 = g2.teamHome;
              this.teamHomeLogo2 = g2.teamHomeLogo;
              this.result2 = g2.result;
              this.resultDetail2 = g2.resultDetail;
            }
          }
        });
      return;
    }

    const gameId = extractGameId(this.getGameId());
    const graphQLQuery = buildGraphQLQuery(gameId);

    fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/api/${this.getType()}?query=${graphQLQuery}`)
      .then((response: Response) => response.json()
      ).then(response => {
        // console.log(response);
        const game = response.data?.game;
        if (game) {
          this.name = game.name;
          this.description = game.description;
          this.teamAway = game.teamAway;
          this.teamAwayLogo = game.teamAwayLogo;
          this.teamHome = game.teamHome;
          this.teamHomeLogo = game.teamHomeLogo;
          this.city = game.city;
          this.location = game.location;
          this.time = game.time;
          this.date = formatDate(game.date);

          this.result = game.result;
          this.resultDetail = game.resultDetail;
        }
      });


    if (this.game2 && this.game2.trim() !== '') {
      const gameId2 = extractGameId(this.getGameId2());
      const graphQLQuery2 = buildGraphQLQuery(gameId2);

      fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/api/${this.getType()}?query=${graphQLQuery2}`)
        .then((response2: Response) => response2.json()
        ).then(response2 => {
          // console.log(response2, '2nd game');
          const game2 = response2.data?.game;
          if (game2) {
            this.teamAway2 = game2.teamAway;
            this.teamAwayLogo2 = game2.teamAwayLogo;
            this.teamHome2 = game2.teamHome;
            this.teamHomeLogo2 = game2.teamHomeLogo;
            this.result2 = game2.result;
            this.resultDetail2 = game2.resultDetail;
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

            {(!this.game2 || this.game2.trim() === '') && (
              <g>
                {/* ONE GAME LAYOUT */}

                {/* RESULT - groß und zentriert oben */}
                <text x="27" y="1323" font-family="Bebas Neue, sans-serif" font-size="405" fill="#fff" text-anchor="start" font-weight="900" letter-spacing="0" font-style="italic" stroke="#fff" stroke-width="16" paint-order="stroke fill">
                  {this.result}
                </text>
                {this.getShowResultDetail() && (
                  <text x="486" y="1323" font-family="Bebas Neue, sans-serif" font-size="81" fill="#fff" text-anchor="start" font-weight="400" letter-spacing="0" font-style="italic" stroke="#fff" stroke-width="3" paint-order="stroke fill">
                    {this.resultDetail}
                  </text>
                )}
                {/* Team-Logos links unten nebeneinander */}
                <g>
                  {/* Home Team Logo (links) */}
                  {/*<rect x="27" y="1097" width="189" height="189" rx="0" fill="#fff" filter="url(#shadow)" />*/}
                  <image x="648" y="14" width="189" height="189" href={this.teamHomeLogo} />

                  {/* Away Team Logo (rechts daneben) */}
                  {/*<rect x="324" y="1013" width="216" height="216" rx="32" fill="#fff" filter="url(#shadow)" />*/}
                  <image x="864" y="14" width="189" height="189" href={this.teamAwayLogo} />
                </g>
              </g>
            )}

            {(this.game2 && this.game2.trim() !== '') && (
              <g>
                {/* TWO GAMES LAYOUT */}
                {this.game2 !== null && (
                  <g> {/* First Game */}
                    <image x="54" y="351" width="108" height="108" href={this.teamHomeLogo} />
                    <image x="243" y="351" width="108" height="108" href={this.teamAwayLogo} />
                    <text x="189" y="648" font-family="Bebas Neue, sans-serif" font-size="216" fill="#fff" text-anchor="middle" font-weight="900" letter-spacing="0" font-style="italic" stroke="#fff" stroke-width="11" paint-order="stroke fill">
                      {this.result}
                    </text>
                    {this.getShowResultDetail() && (
                      <text x="378" y="648" font-family="Bebas Neue, sans-serif" font-size="81" fill="#fff" text-anchor="start" font-weight="400" letter-spacing="0" font-style="italic" stroke="#fff" stroke-width="3" paint-order="stroke fill">
                        {this.resultDetail}
                      </text>
                    )}
                  </g>
                )}
                <line x1="27" y1="675" x2="378" y2="675" stroke="#fff" stroke-width="5" />
                <g> {/* Second Game */}
                  <image x="54" y="891" width="108" height="108" href={this.teamHomeLogo2} />
                  <image x="243" y="891" width="108" height="108" href={this.teamAwayLogo2} />
                  <text x="189" y="864" font-family="Bebas Neue, sans-serif" font-size="216" fill="#fff" text-anchor="middle" font-weight="900" letter-spacing="0" font-style="italic" stroke="#fff" stroke-width="11" paint-order="stroke fill">
                    {this.result2}
                  </text>
                  {this.getShowResultDetail() && (
                    <text x="378" y="770" font-family="Bebas Neue, sans-serif" font-size="81" fill="#fff" text-anchor="start" font-weight="400" letter-spacing="0" font-style="italic" stroke="#fff" stroke-width="3" paint-order="stroke fill">
                      {this.resultDetail2}
                    </text>
                  )}
                </g>
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
