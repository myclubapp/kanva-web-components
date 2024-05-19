import type { Components, JSX } from "../types/components";

interface GamePreviewWebComponent extends Components.GamePreviewWebComponent, HTMLElement {}
export const GamePreviewWebComponent: {
    prototype: GamePreviewWebComponent;
    new (): GamePreviewWebComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
