# load-script-promise

[English](./README.md) | [简体中文](./README.zh-CN.md) 

Enhancement version of dynamic script file loader for browser. New features are:

    - Promise API return
    - Restrict to load same src url only once regarding call load many times
    - Simple provider loader, customizable provider load result detector, and simple infinite recursive provider dependency detection.

This repo is forked and modified from [https://github.com/eldargab/load-script](https://github.com/eldargab/load-script), thanks guys!

The structure and development mode of this repo is compatible with ES Module.

Npm package name is `@horseluke/load-script-promise`.

## Installation

### In Browser standalone mode (directly require in html file)

It is simple! Just include bundled file from `dist` folder (you can find this folder in repo), and then use `loadScriptPromise` Object.

`loadScriptPromise` Object is attached to `window` object in browser.

```
<!-- loadScriptPromise.js is for development -->
<script src="/dist/loadScriptPromise.min.js"></script>
```

More usages and examples can be found in folder `/test/browser-test/cases`.

You can open `/test/browser-test/index.html` to see how it works.

Doc ["Browser API"](./doc/en-US/browser-api/index.md) has more details.


### App development integration

First, use npm to install package.

```
npm i @horseluke/load-script-promise
```

Then go to doc ["Lib API"](./doc/en-US/lib-api/index.md) to read more.


## API

[Please read docs in `doc` folder](./doc/en-US/TOC.md).

## Test

This repo use mocha to run test.


## License

MIT