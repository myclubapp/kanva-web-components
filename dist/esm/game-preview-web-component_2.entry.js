import { r as registerInstance, h } from './index-0452f064.js';
import { f as format } from './utils-11fcde98.js';

const gamePreviewWebComponentCss = ":host{display:block}";
const GamePreviewWebComponentStyle0 = gamePreviewWebComponentCss;

const GamePreviewWebComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.gameId = undefined;
        this.game = undefined;
    }
    getGameId() {
        return "" + this.gameId;
    }
    render() {
        return h("div", { key: '959de9f02d6816f2cfc2f1ecb271d3a838480b57' }, " ", this.getGameId(), " ", this.game, " ");
    }
};
GamePreviewWebComponent.style = GamePreviewWebComponentStyle0;

const myComponentCss = ":host{display:block}";
const MyComponentStyle0 = myComponentCss;

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.first = undefined;
        this.middle = undefined;
        this.last = undefined;
    }
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return h("div", { key: '87518bde3acc437e7c1d21ced9ee6f7c0fe47553' }, "Hello, World! I'm ", this.getText());
    }
};
MyComponent.style = MyComponentStyle0;

export { GamePreviewWebComponent as game_preview_web_component, MyComponent as my_component };

//# sourceMappingURL=game-preview-web-component_2.entry.js.map