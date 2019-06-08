import { a as patchBrowser, b as globals, c as bootstrapLazy } from './ks-widget-57868f0b.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["ks-widget",[[4,"ks-widget",{"position":[16],"isLocked":[4,"is-locked"],"_position":[32]}]]]], { resourcesUrl });
});
