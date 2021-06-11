async function runDetectProviderByOption(option){

    if(Object.prototype.hasOwnProperty.call(option, "windowKey")){
        return runDetectProviderByOptionWindowKey(option);
    }

    if(Object.prototype.hasOwnProperty.call(option, "detectProvider")){
        return await runDetectProviderByOptionDetectProvider(option);
    }

    throw new Error("Specific reg resource options does not have 'windowKey' value nor 'detectProvider' anonymous function.");

}


function runDetectProviderByOptionWindowKey(option){

    if(window[option.windowKey]){
        return window[option.windowKey];
    }

    return undefined;
}



async function runDetectProviderByOptionDetectProvider(option){

    let data = option.detectProvider(option);
    if(data instanceof Promise){
        return await data;
    }

    return data;
}


export {
    runDetectProviderByOption
}