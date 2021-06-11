import load from "../load-script-promise/load";
import * as regResourceListStore from "./regResourceListStore";
import {runDetectProviderByOption} from "./helper";

export default async function loadRegResource(id){

    let option = regResourceListStore.get(id);
    regResourceListStore.checkOption(option);

    let resource = await runDetectProviderByOption(option);

    if(typeof resource != "undefined" && resource != null){
      return resource;
    }

    let opts = option.opts || {};

    await load(option.src, opts);

    return await runDetectProviderByOption(option);

}