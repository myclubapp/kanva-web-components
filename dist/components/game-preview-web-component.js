import { p as proxyCustomElement, H, h } from './p-bc093015.js';

const gamePreviewWebComponentCss = ":host{display:block}";
const GamePreviewWebComponentStyle0 = gamePreviewWebComponentCss;

const GamePreviewWebComponent$1 = /*@__PURE__*/ proxyCustomElement(class GamePreviewWebComponent extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
    static get style() { return GamePreviewWebComponentStyle0; }
}, [1, "game-preview-web-component", {
        "club": [1],
        "game": [1],
        "name": [32]
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