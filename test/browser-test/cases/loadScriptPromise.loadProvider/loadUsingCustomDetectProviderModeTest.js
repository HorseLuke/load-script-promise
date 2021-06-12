describe('loadScriptPromise.setProvider and loadScriptPromise.loadProvider using custom detectProvider mode test', async function() {

    it('is load success', async function() {

        const providerId= "testlibProviderLoadCustomDetectProvider";
        const windowKey = "testlibProviderLoadCustomDetectProvider";
    
        const providerUIId= "testlibProviderLoadCustomDetectProviderUI";
        const providerUIKey = "UI";


        loadScriptPromise.setProvider(providerId, {
            src: "./static/testlibProviderLoadCustomDetectProvider@0.0.1/testlibProviderLoadCustomDetectProvider.js",
            windowKey: windowKey,
        });

        loadScriptPromise.setProvider(providerUIId, {
            src: "./static/testlibProviderLoadCustomDetectProvider@0.0.1/testlibProviderLoadCustomDetectProviderUI.js",
            detectProvider: function(id, option, mode, script){
                if(window[windowKey][providerUIKey]){
                    //return window[windowKey][providerUIKey];
                    return true;
                }
                return false;
            },
        });

        const defaultVal = Math.random() + "_" + Date.now();
        
        const resource = await loadScriptPromise.loadProvider(providerId);
        await loadScriptPromise.loadProvider(providerUIId);

        if(!Object.prototype.hasOwnProperty.call(window, windowKey)){
            throw new Error("load failed");
        }

        if(resource !== window[windowKey]){
            throw new Error("load failed, return is not the same as windowKey");
        }

        if(!Object.prototype.hasOwnProperty.call(window[windowKey], providerUIKey)){
            throw new Error("load failed using detectProvider");
        }
        
        window[windowKey].setVal(defaultVal);

        if(window[windowKey].getVal() !== defaultVal){
            throw new Error("load failed, can not set value");
        }

        window[windowKey][providerUIKey].setUIName(defaultVal);
        if(window[windowKey][providerUIKey].getUIName() !== defaultVal){
            throw new Error("load failed using detectProvider, can not set value");
        }

    });

});

