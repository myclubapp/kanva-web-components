import { r as registerInstance, h } from './index-a8480cfa.js';
import { f as format } from './utils-11fcde98.js';

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
        return h("div", { key: '578e870e3bc96b183f05957e8bc81daeeb59bf55' }, "Hello, World! I'm ", this.getText());
    }
};
MyComponent.style = MyComponentStyle0;

export { MyComponent as my_component };

//# sourceMappingURL=my-component.entry.js.map