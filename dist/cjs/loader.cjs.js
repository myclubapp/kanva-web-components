'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-63da6689.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["game-preview-web-component_2.cjs",[[1,"game-preview-web-component",{"gameId":[1,"game-id"],"game":[1]}],[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map