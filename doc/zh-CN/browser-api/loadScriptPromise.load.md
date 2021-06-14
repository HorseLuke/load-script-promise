# loadScriptPromise.load

A wrapper for script tradition mode loader (`loadScriptPromise.loadTraditionMode`), with Promise API return.

## API definition

```
Promise loadScriptPromise.load(url[, opt]);
```

## Arguments

### url
Any script url that you would like to load.  May be absolute or relative.

### [, opts]

Unlike `loadScriptPromise.loadTraditionMode`, it only support an object which is a map of options.  Here are the currently supported options:

* `async` - A boolean value used for `script.async`.  By default this is `true`.
* `attrs` - A map of attributes to set on the `script` node before appending it to the DOM.  By default this is empty.
* `charset` - A string value used for `script.charset`.  By default this is `utf-8`.
* `text` - A string of text to append to the `script` node before it is appended to the DOM.  By default this is empty.
* `type` - A string used for `script.type`.  By default this is `text/javascript`.

## Return

A Promise API.

## Example

```
const src = "./static/testlibDirectPromiseLoad@0.0.1/testlibDirectPromiseLoad.js";
return loadScriptPromise.load(src).then(function (script){
    console.log(script.id);
}
```