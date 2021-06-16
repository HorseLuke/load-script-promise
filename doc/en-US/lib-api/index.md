# Lib API

## Introduction

Lib apis is used to app development integration.

In fact, browser apis are exported from some lib apis. That is what file `index.js` does.

To use these lib apis, the fastest way is to use npm to install package.

```
npm i @horseluke/load-script-promise
```

Another way but not recommend is manually copy the whole `lib` folder to your project.

After install complete, use import commands in your project.

## API List

Typically, these import commands are use most.

Version 1.1.0 and above:

```
//if you want to load script file src url with Promise API return, use this import.
//The function that imported is the same as `loadScriptPromise.load` in dist build file file.
import {load} from "@horseluke/load-script-promise";

//if you want to load script file src url in traditional mode, use this import.
//The function that imported is the same as `loadScriptPromise.loadTraditionMode` in dist build file file.
import {loadTraditionMode} from "@horseluke/load-script-promise";

//if you want to set or reg a provider, use this import.
//The function that imported is the same as `loadScriptPromise.setProvider` in dist build file.
import {setProvider} from "@horseluke/load-script-promise";

//if you want to load a provider, use this import.
//The function that imported is the same as `loadScriptPromise.loadProvider` in dist build file.
import {loadProvider} from "@horseluke/load-script-promise";

```


Version 1.0.0 and above:

```
//if you want to load script file src url with Promise API return, use this import.
//The function that imported is the same as `loadScriptPromise.load` in dist build file file.
import loadScriptPromiseLoad from "@horseluke/load-script-promise/lib/load-script-promise/load";

//if you want to load script file src url in traditional mode, use this import.
//The function that imported is the same as `loadScriptPromise.loadTraditionMode` in dist build file file.
import loadScriptTraditionMode from "@horseluke/load-script-promise/lib/load-script/load";

//if you want to set or reg a provider, use this import.
//The function that imported is the same as `loadScriptPromise.setProvider` in dist build file.
import {set as setProvider} from "@horseluke/load-script-promise/lib/load-script-provider/providerListStore";

//if you want to load a provider, use this import.
//The function that imported is the same as `loadScriptPromise.loadProvider` in dist build file.
import loadProvider from "@horseluke/load-script-promise/lib/load-script-provider/loadProvider";

```

If you manually copy the whole `lib` folder to your project, change `@horseluke/load-script-promise` to the right destination folder path.
