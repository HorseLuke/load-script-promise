import config from "../config/config";

function getOptionOrConfigFormatInt(option, optionKey, configKey){

    configKey = configKey || optionKey;

    let value = 0;
    if(Object.prototype.hasOwnProperty.call(option, optionKey)){
        value = option[optionKey];
    }else{
        value = config.get(configKey);
    }

    value = parseInt(value);

    if(isNaN(value)){
        value = 0;
    }

    return value;

}


async function runDetectProviderByOption(id, option, mode, script){

    if(Object.prototype.hasOwnProperty.call(option, "windowKey")){
        return await runDetectProviderByOptionWindowKey(id, option, mode, script);
    }

    if(Object.prototype.hasOwnProperty.call(option, "detectProvider")){
        return await runDetectProviderByOptionDetectProvider(id, option, mode, script);
    }

    let errorInstance = new Error("Specific provider options does not have 'windowKey' value nor 'detectProvider' anonymous function.");
    errorInstance.customId = id;
    errorInstance.customOption = option;
    errorInstance.customMode = mode;
    errorInstance.customScript = script;

    throw errorInstance;

}


async function runDetectProviderByOptionWindowKey(id, option, mode, script){

    let windowKeyRetryDetectDelay = getOptionOrConfigFormatInt(option, "windowKeyRetryDetectDelay");
    let windowKeyRetryCount = getOptionOrConfigFormatInt(option, "windowKeyRetryCount") - 1;

    if(window[option.windowKey]){
        return window[option.windowKey];
    }

    if(mode == "detect"){
        return undefined;
    }

    for(let i = 1; i <= windowKeyRetryCount; i++){
        if(windowKeyRetryDetectDelay > 0){
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, windowKeyRetryDetectDelay);
            });
        }
        
        if(window[option.windowKey]){
            return window[option.windowKey];
        }

    }

    let errorInstance = new Error("'windowKey' is used for search specific provider in window object, but found nothing. provider id is " + id + "; 'windowKey' is " + option.windowKey);
    errorInstance.customId = id;
    errorInstance.customOption = option;
    errorInstance.customMode = mode;
    errorInstance.customScript = script;

    throw errorInstance;

}



async function runDetectProviderByOptionDetectProvider(id, option, mode, script){

    let data = option.detectProvider(id, option, mode, script);
    if(data instanceof Promise){
        return await data;
    }

    return data;
}


export {
    runDetectProviderByOption,
    getOptionOrConfigFormatInt
}