# Browser API

## Introduction

These apis are exposed in `loadScriptPromise` object which is attached to `window` object when using browser standalone mode (directly require in html file).

## API list

### Promise load script file

  - [loadScriptPromise.load(url[, opt])](./loadScriptPromise.load.md)

### Not promise load script file

  - [loadScriptPromise.loadTraditionMode(url[, opts[, cb]])](./loadScriptPromise.loadTraditionMode.md)

### Provider loader

  - [loadScriptPromise.setProvider(id, option)](./loadScriptPromise.setProvider.md)
  - [loadScriptPromise.loadProvider(id)](./loadScriptPromise.loadProvider.md)

## Appendix

  - [About customize provider load result detector](./appendix-customize-provider-load-result-detector.md)