describe('loadScriptPromise.setProvider and loadScriptPromise.loadProvider using custom detectProvider mode test', function() {

    const providerId= "testlibProviderLoadCustomDetectProvider";
    const windowKey = "testlibProviderLoadCustomDetectProvider";

    const providerUIId= "testlibProviderLoadCustomDetectProviderUI";
    const providerUIKey = "UI";

    before(function (){

        loadScriptPromise.setProvider(providerId, {
            src: "./static/testlibProviderLoadCustomDetectProvider@0.0.1/testlibProviderLoadCustomDetectProvider.js",
            windowKey: windowKey,
        });

        loadScriptPromise.setProvider(providerUIId, {
            src: "./static/testlibProviderLoadCustomDetectProvider@0.0.1/testlibProviderLoadCustomDetectProviderUI.js",
            detectProvider: function(loader){
                //This does not load main providerId. You have to do it manually.
                if(window[windowKey][providerUIKey]){
                    //return window[windowKey][providerUIKey];
                    return true;      //return success detect result only
                }
                return false;
            },
        });

    });

    it('is load providerUIId success after load providerId success', function() {

        const defaultVal = Math.random() + "_" + Date.now();
        
        //detectProvider does not load main providerId. You have to do it manually first.
        const resourcePromise = loadScriptPromise.loadProvider(providerId);

        return resourcePromise.then(function(resource){

            //test load providerId is OK

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


            //after load providerId, load providerUIId
            return loadScriptPromise.loadProvider(providerUIId);



        }).then(function(){

            if(!Object.prototype.hasOwnProperty.call(window[windowKey], providerUIKey)){
                throw new Error("load failed using detectProvider");
            }
            
            window[windowKey][providerUIKey].setUIName(defaultVal);
            if(window[windowKey][providerUIKey].getUIName() !== defaultVal){
                throw new Error("load failed using detectProvider, can not set value");
            }

        });

    });

});

