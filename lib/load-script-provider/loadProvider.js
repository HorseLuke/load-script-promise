import load from "../load-script-promise/load";
import * as providerListStore from "./providerListStore";
import {runDetectProviderByOption, isValidReturnResource} from "./helper";

async function loadProvider(id){

    let option = providerListStore.get(id);
    providerListStore.checkOption(option);

    let resource = await runDetectProviderByOption(id, option, "detect", null);

    if(resource === true){
      return resource;
    }

    if(isValidReturnResource(resource)){
      return resource;
    }

    let opts = option.opts || {};

    const script = await load(option.src, opts);

    return await runDetectProviderByOption(id, option, "load", script);

}


export default loadProvider;