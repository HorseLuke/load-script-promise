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


async function runDetectProviderByOption(option, mode, script){

    if(Object.prototype.hasOwnProperty.call(option, "windowKey")){
        return await runDetectProviderByOptionWindowKey(option, mode, script);
    }

    if(Object.prototype.hasOwnProperty.call(option, "detectProvider")){
        return await runDetectProviderByOptionDetectProvider(option, mode, script);
    }

    let errorInstance = new Error("Specific provider options does not have 'windowKey' value nor 'detectProvider' anonymous function.");
    errorInstance.customOption = option;
    errorInstance.customMode = mode;
    errorInstance.customScript = script;

    throw errorInstance;

}


async function runDetectProviderByOptionWindowKey(option, mode, script){

    let windowKeyRetryDetectDelay = getOptionOrConfigFormatInt(option, "windowKeyRetryDetectDelay");
    let windowKeyRetryCount = getOptionOrConfigFormatInt(option, "windowKeyRetryCount") - 1;

    if(window[option.windowKey]){
        return window[option.windowKey];
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


    if(mode == "detect"){
        return undefined;
    }

    let errorInstance = new Error("Specific provider does not found option 'windowKey' value in window object. 'windowKey' is " + option.windowKey);
    errorInstance.customOption = option;
    errorInstance.customMode = mode;
    errorInstance.customScript = script;

    throw errorInstance;

}



async function runDetectProviderByOptionDetectProvider(option, mode, script){

    let data = option.detectProvider(option, mode, script);
    if(data instanceof Promise){
        return await data;
    }

    return data;
}


export {
    runDetectProviderByOption,
    getOptionOrConfigFormatInt
}