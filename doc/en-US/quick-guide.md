# Quick start guide for `load-script-promise`

## Introduction

Welcome to use `load-script-promise`! It is an enhancement version of dynamic script file loader for browser. New features are:

    - Promise API return
    - Restrict to load same src url only once regarding call load many times
    - Simple provider loader, customizable provider load result detector, and simple infinite recursive provider dependency detection.

This repo is forked and modified from [https://github.com/eldargab/load-script](https://github.com/eldargab/load-script), thanks guys!

The structure and development mode of this repo is compatible with ES Module.

## Dependency

Promise API is suggested, no matter whether browser has been implemented, or use Promise polyfill. 

If you do not want to use Promise API, or browser does not have Promise API, only `loadScriptPromise.loadTraditionMode` can be used to load script file. 

Arguments of `loadScriptPromise.loadTraditionMode` is the same as  [https://github.com/eldargab/load-script](https://github.com/eldargab/load-script) .

## Browser compatibility

Browser compatibility is defined in file `.babelrc`, now support chrome >= 40, safari >= 9.

## Installation

### In Browser standalone mode (directly require in html file)

It is simple! Just include bundled file from `dist` folder, and then use `loadScriptPromise` Object.

`loadScriptPromise` Object is attached to `window` object in browser.

```
<!-- loadScriptPromise.js is for development -->
<script src="/dist/loadScriptPromise.min.js"></script>
```

More usages and examples can be found in folder `/test/browser-test/cases`.

You can open `/test/browser-test/index.html` to see how it works.

### App development integration

Docs are in progress. 

But you can open `index.js` and see how it works, or see doc ["Lib API"](./lib-api/index.md).

## Browser API

Browser apis are exposed in `loadScriptPromise` object which is attached to `window` object when using browser standalone mode (directly require in html file).

Please see doc ["Browser API"](./browser-api/index.md)

## Lib API

Please see doc ["Lib API"](./browser-api/index.md)


## Test

This repo use mocha to run test.

### Browser test

mocha tests bundled file from `dist` folder in browser. 

All related files are located in folder `/test/browser-test/`

You can open `/test/browser-test/index.html` to see how it works.

### Node test

mocha tests some logical codes from `lib` folder in node side, c8 is used for code coverage. 

All related files are located in folder `/test/node-test/`

## License

MIT