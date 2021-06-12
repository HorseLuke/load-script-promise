describe('loadScriptPromise.setProvider and loadScriptPromise.loadProvider using custom detectProvider mode test', async function() {

    const providerId= "testlibProviderLoadCustomDetectProvider";
    const windowKey = "testlibProviderLoadCustomDetectProvider";

    const providerUIId= "testlibProviderLoadCustomDetectProviderUI";
    const providerUIKey = "UI";

    before(() => {

        loadScriptPromise.setProvider(providerId, {
            src: "./static/testlibProviderLoadCustomDetectProvider@0.0.1/testlibProviderLoadCustomDetectProvider.js",
            windowKey: windowKey,
        });

        loadScriptPromise.setProvider(providerUIId, {
            src: "./static/testlibProviderLoadCustomDetectProvider@0.0.1/testlibProviderLoadCustomDetectProviderUI.js",
            detectProvider: function(id, option, mode, script){
                //This does not load main providerId. You have to do it manually.
                if(window[windowKey][providerUIKey]){
                    //return window[windowKey][providerUIKey];
                    return true;      //return success detect result only
                }
                return false;
            },
        });

    });

    it('is load providerId success', async function() {

        const defaultVal = Math.random() + "_" + Date.now();
        
        const resource = await loadScriptPromise.loadProvider(providerId);

        if(!Object.prototype.hasOwnProperty.call(window, windowKey)){
            throw new Error("load failed");
        }

        if(resource !== window[windowKey]){
            throw new Error("load failed, return is not the same as windowKey");
        }

        window[windowKey].setVal(defaultVal);

        if(window[windowKey].getVal() !== defaultVal){
            throw new Error("load failed, can not set value");
        }

    });

    it('is load providerUIId success', async function() {

        const defaultVal = Math.random() + "_" + Date.now();
        
        //detectProvider does not load main providerId. You have to do it manually.
        const resource = await loadScriptPromise.loadProvider(providerId);
        await loadScriptPromise.loadProvider(providerUIId);

        if(!Object.prototype.hasOwnProperty.call(window[windowKey], providerUIKey)){
            throw new Error("load failed using detectProvider");
        }
        
        window[windowKey][providerUIKey].setUIName(defaultVal);
        if(window[windowKey][providerUIKey].getUIName() !== defaultVal){
            throw new Error("load failed using detectProvider, can not set value");
        }

    });

});

