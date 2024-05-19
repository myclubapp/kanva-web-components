import { h } from "@stencil/core";
export class GamePreviewWebComponent {
    constructor() {
        this.gameId = undefined;
        this.game = undefined;
    }
    getGameId() {
        return "" + this.gameId;
    }
    render() {
        return h("div", { key: '959de9f02d6816f2cfc2f1ecb271d3a838480b57' }, " ", this.getGameId(), " ", this.game, " ");
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
            "gameId": {
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
                "attribute": "game-id",
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
                    "text": ""
                },
                "attribute": "game",
                "reflect": false
            }
        };
    }
}
//# sourceMappingURL=game-preview-web-component.js.map
