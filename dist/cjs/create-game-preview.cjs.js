'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a350b38d.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

/*
 Stencil Client Patch Browser v4.18.1 | MIT Licensed | https://stenciljs.com
 */
var patchBrowser = () => {
  const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('create-game-preview.cjs.js', document.baseURI).href));
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return index.promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["game-preview-web-component.cjs",[[1,"game-preview-web-component",{"club":[1],"game":[1],"name":[32],"teamAway":[32],"teamAwayLogo":[32],"teamHome":[32],"teamHomeLogo":[32],"city":[32],"location":[32],"dateTime":[32],"date":[32],"time":[32],"liga":[32]}]]],["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=create-game-preview.cjs.js.map