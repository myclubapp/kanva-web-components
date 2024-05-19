import { b as bootstrapLazy } from './index-0452f064.js';
export { s as setNonce } from './index-0452f064.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["game-preview-web-component_2",[[1,"game-preview-web-component",{"gameId":[1,"game-id"],"game":[1]}],[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map