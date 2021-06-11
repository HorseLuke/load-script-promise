import loadScriptPromiseLoad from "./lib/load-script-promise/load";
import {dataScriptMark, findScriptDomsBySrc} from "./lib/load-script/helper";
import loadRegResource from "./lib/load-script-reg-resource/loadRegResource";
import * as regResourceListStore from "./lib/load-script-reg-resource/regResourceListStore";
import config from "./lib/config/config";

const loadScript = {};

loadScript.load = loadScriptPromiseLoad;

loadScript.regResource = regResourceListStore.set;
loadScript.loadRegResource = loadRegResource;
loadScript.regResourceListStore = regResourceListStore;

loadScript.dataScriptMark = dataScriptMark;
loadScript.findScriptDomsBySrc = findScriptDomsBySrc;

loadScript.config = config;

export default loadScript;