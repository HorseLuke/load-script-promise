# loadScriptPromise.loadTraditionMode

This function is actually modified from [https://github.com/eldargab/load-script](https://github.com/eldargab/load-script).

Arguments is the same as origin, but the behaviour is difference: in this verison, if the src url is the same, it promises load script file only once.

This ensures a script file would not run duplicated that accidently overwrite global/window variables.

## API definition

```
loadScriptPromise.loadTraditionMode(url[, opts[, cb]]);
```

## Arguments

### url
Any script url that you would like to load.  May be absolute or relative.

### [, opts]
If it is a callback function, it is the same as argument `[, cb]`, see argument `[, cb]` description

If it is an object, it is a map of options.  Here are the currently supported options:

* `async` - A boolean value used for `script.async`.  By default this is `true`.
* `attrs` - A map of attributes to set on the `script` node before appending it to the DOM.  By default this is empty.
* `charset` - A string value used for `script.charset`.  By default this is `utf-8`.
* `text` - A string of text to append to the `script` node before it is appended to the DOM.  By default this is empty.
* `type` - A string used for `script.type`.  By default this is `text/javascript`.

### [, cb]
A callback function of the following interface: `function(err, script) {}` where `err` is an error if any occurred and `script` is the `script` node that was appended to the DOM.

## Return

none

## Example

```
loadScriptPromise.loadTraditionMode("./static/testlibDirectTraditionLoad@0.0.1/testlibDirectTraditionLoad.js", {}, function(err, script){

    if(err){
        throw err;
        return false;
    }

    console.log(script.id);

});

```