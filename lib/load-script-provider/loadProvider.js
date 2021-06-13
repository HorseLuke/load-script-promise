import load from "../load-script-promise/load";
import * as providerListStore from "./providerListStore";
import {runDetectProviderByOption, isValidReturnResource} from "./helper";


async function loadProvider(id){

  const dependencyTree = [];

  function addProviderToDependency(id){

    for(let i = 0; i < dependencyTree.length; i++){

      if(id === dependencyTree[i]){
        throw new Error("Recursive provider dependency detect, abort. Recursive provider chain: " + dependencyTree.join(" -> ") + " -> " + id);
      }

    }

    dependencyTree.push(id);

    return dependencyTree.length - 1;

  }


  function generateProviderLoader(id, loadProviderFunction){

    const dependencyTreeId = addProviderToDependency(id);

    let loader = {
      dependencyTreeId: dependencyTreeId,
      id: id,
      option: providerListStore.get(id),
      status: "init",
      script: null,
      loadProvider: loadProviderFunction
    };

    return loader;
  
  }

  async function runProviderLoader(loader){

    providerListStore.checkOption(loader.option);

    loader.status = "detect";
    let resource = await runDetectProviderByOption(loader);

    if(resource === true){
      return resource;
    }

    if(isValidReturnResource(resource)){
      return resource;
    }

    let opts = loader.option.opts || {};

    loader.script = await load(loader.option.src, opts);

    loader.status = "load";
    return await runDetectProviderByOption(loader);

  }

  async function loadProviderWithCheckConflict(id){
    const loader = generateProviderLoader(id, loadProviderWithCheckConflict);
    return await runProviderLoader(loader);
  }

  return await loadProviderWithCheckConflict(id);
  
}


export default loadProvider;