import config from "../config/config";

function generateErrorFromLoader(msg ,loader){
    let errorInstance = new Error(msg);
    errorInstance.customId = loader.id;
    errorInstance.customOption = loader.option;
    errorInstance.customStatus = loader.status;
    errorInstance.customScript = loader.script;
    return errorInstance;
}

function isValidReturnResource(resource){
    if(resource === true){
        return true;
    }

    if(resource === false){
        return false;
    }

    if(typeof resource == "undefined"){
        return false;
    }

    if(resource === null){
        return false;
    }

    return true;

}


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


async function runDetectProviderByOption(loader){

    if(Object.prototype.hasOwnProperty.call(loader.option, "windowKey")){
        return await runDetectProviderByOptionWindowKey(loader);
    }

    if(Object.prototype.hasOwnProperty.call(loader.option, "detectProvider")){
        return await runDetectProviderByOptionDetectProvider(loader);
    }

    let errorInstance = generateErrorFromLoader("Specific provider options does not have 'windowKey' value nor 'detectProvider' anonymous function.", loader);
    throw errorInstance;

}

async function runDetectProviderByOptionWindowKey(loader){

    let windowKeyRetryDetectDelay = getOptionOrConfigFormatInt(loader.option, "windowKeyRetryDetectDelay");
    let windowKeyRetryCount = getOptionOrConfigFormatInt(loader.option, "windowKeyRetryCount") - 1;

    if(window[loader.option.windowKey]){
        return window[loader.option.windowKey];
    }

    if(loader.status == "detect"){
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
        
        if(window[loader.option.windowKey]){
            return window[loader.option.windowKey];
        }

    }

    let errorInstance = generateErrorFromLoader("'windowKey' is used for search specific provider in window object, but found nothing. provider id is " + loader.id + "; 'windowKey' is " + loader.option.windowKey, loader);

    throw errorInstance;

}


//
async function runDetectProviderByOptionDetectProvider(loader){

    let resource = loader.option.detectProvider(loader);
    if(resource instanceof Promise){
        resource = await resource;
    }

    if(isValidReturnResource(resource)){
        return resource;
    }

    if(loader.status == "detect"){
        return undefined;
    }

    let errorInstance = generateErrorFromLoader("'detectProvider' is used for search specific provider, but return not true, nor valid resource. provider id is " + loader.id + ".", loader);

    throw errorInstance;

}

export {
    runDetectProviderByOption,
    getOptionOrConfigFormatInt,
    isValidReturnResource
}