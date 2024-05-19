import { b as bootstrapLazy } from './index-a8480cfa.js';
export { s as setNonce } from './index-a8480cfa.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["game-preview-web-component",[[1,"game-preview-web-component",{"club":[1],"game":[1],"name":[32],"teamAway":[32],"teamAwayLogo":[32],"teamHome":[32],"teamHomeLogo":[32],"city":[32],"location":[32],"dateTime":[32],"date":[32],"time":[32],"liga":[32]}]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map