import { r as registerInstance, h } from './index-544ec60b.js';

const gamePreviewWebComponentCss = ":host{display:block}";
const GamePreviewWebComponentStyle0 = gamePreviewWebComponentCss;

const GamePreviewWebComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
GamePreviewWebComponent.style = GamePreviewWebComponentStyle0;

export { GamePreviewWebComponent as game_preview_web_component };

//# sourceMappingURL=game-preview-web-component.entry.js.map