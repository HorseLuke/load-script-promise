import loadScriptPromiseLoad from "./lib/load-script-promise/load";
import loadScriptTraditionMode from "./lib/load-script/load";
import {dataScriptMark, findScriptDomsBySrc} from "./lib/load-script/helper";
import loadProvider from "./lib/load-script-provider/loadProvider";
import * as providerListStore from "./lib/load-script-provider/providerListStore";
import config from "./lib/config/config";

const loadScript = {};

loadScript.load = loadScriptPromiseLoad;
loadScript.loadTraditionMode = loadScriptTraditionMode;

loadScript.regProvider = providerListStore.set;
loadScript.loadProvider = loadProvider;
loadScript.providerListStore = providerListStore;

loadScript.dataScriptMark = dataScriptMark;
loadScript.findScriptDomsBySrc = findScriptDomsBySrc;

loadScript.config = config;

export default loadScript;