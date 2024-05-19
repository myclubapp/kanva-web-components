import { h } from "@stencil/core";
export class GamePreviewWebComponent {
    constructor() {
        this.club = undefined;
        this.game = undefined;
        this.name = undefined;
    }
    getGameId() {
        return this.game;
    }
    getClubId() {
        return this.club;
    }
    componentWillLoad() {
        fetch(`https://europe-west6-myclubmanagement.cloudfunctions.net/gamePreview?gameId=${this.getGameId()}&clubId=${this.getClubId()}`)
            // fetch("https://europe-west6-myclubmanagement.cloudfunctions.net/gamePreview?gameId=su-1005184&clubId=su-452800")
            .then((response) => response.json()).then(response => {
            console.log(response);
            this.name = response.name;
        });
    }
    render() {
        return h("div", { key: '7541827a51a8fd28d0f82f9bc18b4476461b1f53' }, " ", this.name);
    }
    static get is() { return "game-preview-web-component"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["game-preview-web-component.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["game-preview-web-component.css"]
        };
    }
    static get properties() {
        return {
            "club": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Club Id from my-club"
                },
                "attribute": "club",
                "reflect": false
            },
            "game": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Game Id from my-club"
                },
                "attribute": "game",
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "name": {}
        };
    }
}
//# sourceMappingURL=game-preview-web-component.js.map
