import { b as bootstrapLazy } from './index-544ec60b.js';
export { s as setNonce } from './index-544ec60b.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["game-preview-web-component",[[1,"game-preview-web-component",{"club":[1],"game":[1],"name":[32]}]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map