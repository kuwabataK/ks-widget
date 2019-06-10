import { c as patchEsm, b as bootstrapLazy } from './ks-widget-37e6c7b2.js';
var defineCustomElements = function (win, options) {
    return patchEsm().then(function () {
        bootstrapLazy([["ks-widget", [[4, "ks-widget", { "position": [16], "isLocked": [4, "is-locked"], "_position": [32] }]]]], options);
    });
};
export { defineCustomElements };
