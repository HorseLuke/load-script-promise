# 关于自定义供应商载入结果检测器

## Introduction

In `loadScriptPromise.setProvider`, developer can use `detectProvider`option to customize your provider load result.

`detectProvider` option should be a anonymous function. Like this:

```
loadScriptPromise.setProvider("ddddd", {
    "src": "./dddddd",
    "detectProvider": function(loader){
        return true;
    }
})
```

## What `detectProvider` can be received

As a anonymous function, `detectProvider` option will receive the current provider loader object. Loader object has these keys:

* `id` - A string, representing provider id
* `option` - An object which is a map of Provider options.
* `status` - Current provider loader status. "detect" represents before loading script files, "load" means after success loading script files. Other values are internal use or rare, and if you meet this case, you should report a bug.
* `script` - If `status` equals to "load", it is a script DOM. Otherwise it is null.
* `loadProvider` - Use this function if you want to load another provider inside the current provider loader. **This is the only way to ensure not to have an infinite recursive provider dependency.**


## What `detectProvider` should return

As a anonymous function, `detectProvider` option should return detect result, following these guidelines:

  - If detect success, return provider object, or just boolean true.

  - Otherwise, return boolean false or null to represent fail detection.

`detectProvider` option can return a Promise API too. Pass detect result to resolve function.

Any error throwed in `detectProvider` option will terminate the processing of current provider loader and raises error.


## Example

### Detect load without Promise API.

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

### Detect load with Promise API.

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


### load another provider when detecting load

```
//now set provider "abcdefg" using `detectProvider` option

loadScriptPromise.setProvider("abcdefg", {
    src: "https://127.0.0.1/abcdefg.js",
    detectProvider: async function(loader){
        await loader.loadProvider("jQuery");    //load another provider
        if(window["abcdefg"]){
            return resolve(window["abcdefg"]);    //If detect success, resolve provider object or just boolean true.
        }
        return resolve(false);    //If detect fail, resolve boolean false or null

    }
});

//now load provider "abcdefg"
loadScriptPromise.loadProvider("abcdefg").then(function(){
    
});

//or use async / await
//await loadScriptPromise.loadProvider("abcdefg");

```
