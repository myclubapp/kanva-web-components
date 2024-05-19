import { p as proxyCustomElement, H, h } from './p-7cc3f666.js';

const gamePreviewWebComponentCss = ":host{display:block}";
const GamePreviewWebComponentStyle0 = gamePreviewWebComponentCss;

const GamePreviewWebComponent$1 = /*@__PURE__*/ proxyCustomElement(class GamePreviewWebComponent extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.gameId = undefined;
        this.game = undefined;
    }
    getGameId() {
        return "" + this.gameId;
    }
    render() {
        return h("div", { key: '959de9f02d6816f2cfc2f1ecb271d3a838480b57' }, " ", this.getGameId(), " ", this.game, " ");
    }
    static get style() { return GamePreviewWebComponentStyle0; }
}, [1, "game-preview-web-component", {
        "gameId": [1, "game-id"],
        "game": [1]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["game-preview-web-component"];
    components.forEach(tagName => { switch (tagName) {
        case "game-preview-web-component":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, GamePreviewWebComponent$1);
            }
            break;
    } });
}
defineCustomElement$1();

const GamePreviewWebComponent = GamePreviewWebComponent$1;
const defineCustomElement = defineCustomElement$1;

export { GamePreviewWebComponent, defineCustomElement };

//# sourceMappingURL=game-preview-web-component.js.map