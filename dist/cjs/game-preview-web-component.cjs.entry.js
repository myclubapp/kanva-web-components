'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a350b38d.js');

const gamePreviewWebComponentCss = ":host{display:block}";
const GamePreviewWebComponentStyle0 = gamePreviewWebComponentCss;

const GamePreviewWebComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.club = undefined;
        this.game = undefined;
        this.name = undefined;
        this.teamAway = undefined;
        this.teamAwayLogo = undefined;
        this.teamHome = undefined;
        this.teamHomeLogo = undefined;
        this.city = undefined;
        this.location = undefined;
        this.dateTime = undefined;
        this.date = undefined;
        this.time = undefined;
        this.liga = undefined;
    }
    getGameId() {
        return this.game;
    }
    getClubId() {
        return this.club;
    }
    formatDate(dateString) {
        // 	"15.05.2022"
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
        let date = new Date(dateString.substr(6, 4), dateString.substr(3, 2) - 1, dateString.substr(0, 2)).toLocaleDateString('ch-DE', {
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
            .then((response) => response.json()).then(response => {
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
        return (index.h(index.Host, { key: '092af0abed983c57270facd504bb156f3a35d6b9' }, index.h("slot", { key: '21a6be090f4337c3543b4698f30a887730f6c013' }, index.h("svg", { key: '5f3ceffa645349972903e3133565eec66c7ea091', width: "400", height: "400", xmlns: "http://www.w3.org/2000/svg" }, index.h("rect", { key: '60584a321e8f20356f25f837ee7f1f3858e8292b', width: "400", height: "400", fill: "#f25528" }), index.h("rect", { key: 'c2b22336cb256bf542ee951fdc9e60c158c708e7', x: "0", y: "0", width: "20", height: "400", fill: "black" }), index.h("rect", { key: '0789fed22d680b40d65c5ccba583fc97fb8bbb25', x: "0", y: "0", width: "400", height: "20", fill: "black" }), index.h("rect", { key: 'e5d1245ef1aaa2dce60c096e0983835b1406c1a9', x: "0", y: "380", width: "400", height: "20", fill: "black" }), index.h("rect", { key: 'fa03bdcca455181bde447223d2bde922de706885', x: "380", y: "0", width: "20", height: "400", fill: "black" }), index.h("rect", { key: 'f076a23a8bb93a8960090cf05228102375abd0b5', x: "0", y: "370", width: "15", height: "10", fill: "orange" }), index.h("rect", { key: '541ae0dd4594dd8f7f2c61b6a12c95d00a8dfff3', x: "0", y: "355", width: "15", height: "10", fill: "orange" }), index.h("rect", { key: '619902b91a05a5a5a1d7b9b4265053409e8c1224', x: "0", y: "340", width: "15", height: "10", fill: "orange" }), index.h("text", { key: '1d6678ac6c66adb2149fad0fa1c7fa9c9d518c98', x: "10", y: "40", "font-family": "Impact", "font-size": "40", fill: "black", stroke: "orange", "stroke-width": "1" }, this.date), index.h("text", { key: 'b1558bf9dde0acf1568a142fbb0d61d001df9099', x: "12", y: "40", "font-family": "Impact", "font-size": "40", fill: "black", stroke: "orange", "stroke-width": "1" }, this.date), index.h("text", { key: '029ffcad5179a1dbbb1ef78a6fa2001ca583ae56', x: "25", y: "65", "font-family": "Impact", "font-size": "16", fill: "black" }, this.time, " Uhr in ", this.city), index.h("text", { key: '087ff5e160c876f763227583af07d8b8f334941a', x: "40", y: "120", "font-family": "Impact", "font-size": "18", fill: "orange", stroke: "black" }, this.teamHome), index.h("rect", { key: '36105d1820aba4cfb7f95c31364ba88c1312e2fa', x: "40", y: "125", height: "120", width: "120", fill: "white" }), index.h("image", { key: '228b657dc54df652b9bf9744c22684b8febd05d5', x: "40", y: "125", height: "120", width: "120", href: this.teamHomeLogo }), index.h("text", { key: '67bbb44556257147dfcbca385e36d1458a8612c4', x: "180", y: "200", "font-family": "Impact", "font-size": "30", fill: "orange", stroke: "black", "stroke-width": "1" }, "VS"), index.h("text", { key: '616e4e3b12b106f204b569b37abee6fff536e283', x: "355", y: "265", "font-family": "Impact", "font-size": "18", fill: "orange", stroke: "black", "text-anchor": "end" }, this.teamAway), index.h("rect", { key: 'a1741e0b33189a3dc62ad4489e7562a1ef3a89aa', x: "235", y: "125", height: "120", width: "120", fill: "white" }), index.h("image", { key: '544ecd5c9b08a9aef2a5f5dc9587abb38ad9b81c', x: "235", y: "125", height: "120", width: "120", href: this.teamAwayLogo }), index.h("text", { key: '978f7f997191cfb7292d35222bc9046f4ebd6f4f', x: "25", y: "370", "font-family": "Impact", "font-size": "20", fill: "black", "text-anchor": "start" }, this.liga), index.h("g", { key: '5dd6e72963a774269cbdcbcf20a92b1ca8840aee', transform: "rotate(-90 0 0)" }, index.h("text", { key: '5869ec805c067f54b00f0cc6ec1e6f7e6e837fd0', x: "-390", y: "390", "font-family": "Impact", "font-size": "40", fill: "orange", stroke: "black", "stroke-width": "1" }, "GAMEDAY")))), index.h("div", { key: '79eea2e673c5bc726714c64b19f01b0962961cc4' }, " ", this.name)));
    }
};
GamePreviewWebComponent.style = GamePreviewWebComponentStyle0;

exports.game_preview_web_component = GamePreviewWebComponent;

//# sourceMappingURL=game-preview-web-component.cjs.entry.js.map