import loadScriptPromiseLoad from "./lib/load-script-promise/load";
import loadScriptTraditionMode from "./lib/load-script/load";
import {dataScriptMark, findScriptDomsBySrc} from "./lib/load-script/helper";
import loadProvider from "./lib/load-script-provider/loadProvider";
import * as providerListStore from "./lib/load-script-provider/providerListStore";
import config from "./lib/config/config";

const setProvider = providerListStore.set;

export {
    config,
    loadScriptPromiseLoad as load,
    loadScriptTraditionMode as loadTraditionMode,
    setProvider,
    loadProvider,
    providerListStore,
    dataScriptMark,
    findScriptDomsBySrc
};