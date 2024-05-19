'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-63da6689.js');
const utils = require('./utils-bcad3386.js');

const gamePreviewWebComponentCss = ":host{display:block}";
const GamePreviewWebComponentStyle0 = gamePreviewWebComponentCss;

const GamePreviewWebComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gameId = undefined;
        this.game = undefined;
    }
    getGameId() {
        return "" + this.gameId;
    }
    render() {
        return index.h("div", { key: '959de9f02d6816f2cfc2f1ecb271d3a838480b57' }, " ", this.getGameId(), " ", this.game, " ");
    }
};
GamePreviewWebComponent.style = GamePreviewWebComponentStyle0;

const myComponentCss = ":host{display:block}";
const MyComponentStyle0 = myComponentCss;

const MyComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.first = undefined;
        this.middle = undefined;
        this.last = undefined;
    }
    getText() {
        return utils.format(this.first, this.middle, this.last);
    }
    render() {
        return index.h("div", { key: '87518bde3acc437e7c1d21ced9ee6f7c0fe47553' }, "Hello, World! I'm ", this.getText());
    }
};
MyComponent.style = MyComponentStyle0;

exports.game_preview_web_component = GamePreviewWebComponent;
exports.my_component = MyComponent;

//# sourceMappingURL=game-preview-web-component_2.cjs.entry.js.map