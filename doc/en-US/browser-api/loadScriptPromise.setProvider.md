# loadScriptPromise.setProvider

Register or update a provider information.

## API definition

```
loadScriptPromise.setProvider(id, option);
```

## Arguments

### id
Provider id.

### option

An object which is a map of Provider options.

* `src` - (Mandatory) A string value used for script file url. 
* `windowKey` - (Mandatory or optional) A string value used for detect in window global object. If this option does not exists, `detectProvider` option must be present.
* `detectProvider` - (Mandatory or optional) A anonymous function used for customize provider load result detector. Full detail can be found in ["About customize provider load result detector"](./appendix-customize-provider-load-result-detector.md). If this option does not exists, `windowKey` option must be present.
* `opts` - (optional)  An object which is a map of options. It is equal to [argument opts in `loadScriptPromise.load`](./loadScriptPromise.load.md) 

## Return

None.

## Example

### Using `windowKey` option to detect load.

```
//now set provider "jQuery" using `windowKey` option
loadScriptPromise.setProvider("jQuery", {
            src: "https://code.jquery.com/jquery-3.6.0.min.js",
            windowKey: "jQuery",
            opts: {
                attrs: {
                    "integrity": "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=",
                    "crossorigin": "anonymous",
                }
            }
});

//now load provider "jQuery"
loadScriptPromise.loadProvider("jQuery").then(function(jQuery){
    const version = jQuery().jquery;
});

//or use async / await
//const jQuery = await loadScriptPromise.loadProvider("jQuery");
//const version = jQuery().jquery;
```

### Using `detectProvider` option to detect load without Promise API.

```
//now set provider "abcdefg" using `detectProvider` option

loadScriptPromise.setProvider("abcdefg", {
    src: "https://127.0.0.1/abcdefg.js",
    detectProvider: function(loader){
        if(window["abcdefg"]){
            return window["abcdefg"];    //If detect success, return provider object or just boolean true.
        }
        return false;    //If detect fail, return boolean false or null
    }
});

//now load provider "abcdefg"
loadScriptPromise.loadProvider("abcdefg").then(function(){
    
});

//or use async / await
//await loadScriptPromise.loadProvider("abcdefg");

```

### Using `detectProvider` option to detect load with Promise API.

```
//now set provider "abcdefg" using `detectProvider` option

loadScriptPromise.setProvider("abcdefg", {
    src: "https://127.0.0.1/abcdefg.js",
    detectProvider: function(loader){
        return new Promise(function(resolve, reject){
            if(window["abcdefg"]){
                return resolve(window["abcdefg"]);    //If detect success, resolve provider object or just boolean true.
            }
            return resolve(false);    //If detect fail, resolve boolean false or null
        });

    }
});

//now load provider "abcdefg"
loadScriptPromise.loadProvider("abcdefg").then(function(){
    
});

//or use async / await
//await loadScriptPromise.loadProvider("abcdefg");

```

