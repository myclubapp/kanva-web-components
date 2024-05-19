import { p as promiseResolve, b as bootstrapLazy } from './index-0452f064.js';
export { s as setNonce } from './index-0452f064.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v4.18.1 | MIT Licensed | https://stenciljs.com
 */
var patchBrowser = () => {
  const importMeta = import.meta.url;
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["game-preview-web-component_2",[[1,"game-preview-web-component",{"gameId":[1,"game-id"],"game":[1]}],[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
});

//# sourceMappingURL=create-game-preview.js.map