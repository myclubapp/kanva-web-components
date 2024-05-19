'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a350b38d.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["game-preview-web-component.cjs",[[1,"game-preview-web-component",{"club":[1],"game":[1],"name":[32],"teamAway":[32],"teamAwayLogo":[32],"teamHome":[32],"teamHomeLogo":[32],"city":[32],"location":[32],"dateTime":[32],"date":[32],"time":[32],"liga":[32]}]]],["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map