# Lib API

## Introduction

Lib apis is used to app development integration.

Docs are in progress. 

But you can open `index.js` and see how it works.

Tipically, these import commands are use most:

```
//if you want to load script file src url with Promise API return, use this import.
//The function that imported is the same as `loadScriptPromise.load` in dist build file file.
import loadScriptPromiseLoad from "<load-script-promise>/lib/load-script-promise/load";

//if you want to load script file src url in traditional mode, use this import.
//The function that imported is the same as `loadScriptPromise.loadTraditionMode` in dist build file file.
import loadScriptTraditionMode from "<load-script-promise>/lib/load-script/load";

//if you want to set or reg a provider, use this import.
//The function that imported is the same as `loadScriptPromise.setProvider` in dist build file.
import {set as setProvider} from "<load-script-promise>/lib/load-script-provider/providerListStore";

//if you want to load a provider, use this import.
//The function that imported is the same as `loadScriptPromise.loadProvider` in dist build file.
import loadProvider from "<load-script-promise>/lib/load-script-provider/loadProvider";

```

change `<load-script-promise>` to `@horseluke/load-script-promise` (if this repo has been published to npm and installed via npm) or folder path (if you manually copy the whole `lib` folder to your project)
