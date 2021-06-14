# load-script-promise

[English](./README.md) | [简体中文](./README.zh-CN.md) 

Enhancement version of dynamic script file loader for browser. New features are:

    - Promise API return
    - Restrict to load same src url only once regarding call load many times
    - Simple provider loader, customizable provider load result detector, and simple infinite recursive provider dependency detection.

This repo is forked and modified from [https://github.com/eldargab/load-script](https://github.com/eldargab/load-script), thanks guys!

The structure and development mode of this repo is compatible with ES Module.

## Installation

In Browser standalone mode (directly require in html file), just include bundled file from `dist` folder, and then use `loadScriptPromise` Object.

`loadScriptPromise` Object is attached to `window` object in browser.

```
<!-- loadScriptPromise.js is for development -->
<script src="./dist/loadScriptPromise.min.js"></script>
```

More usages and examples can be found in folder `/test/browser-test/cases`.

You can open `/test/browser-test/index.html` to see how it works.

[Other details, please read docs in `doc` folder](./doc/en-US/TOC.md).

## API

[Please read docs in `doc` folder](./doc/en-US/TOC.md).

## Test

This repo use mocha to run test.


## License

MIT