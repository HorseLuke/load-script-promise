describe('loadScriptPromise.setProvider and loadScriptPromise.loadProvider using complex custom detectProvider mode test', async function() {

    const providerId= "testlibProviderLoadDependencyDetectProvider";
    const windowKey = "testlibProviderLoadDependencyDetectProvider";

    const urlPrefix = "./static/testlibProviderLoadDependencyDetectProvider@0.0.1";


    before(()=> {
        loadScriptPromise.setProvider(providerId, {
            src: urlPrefix + "/testlibProviderLoadDependencyDetectProvider.js",
            windowKey: windowKey,
        });
    });


    it('is load plugin add with detectProvider using loader.loadProvider(providerId) [loader as argument passed to detectProvider] and return Promise success', async function() {

        //plugin add setProvider
        loadScriptPromise.setProvider(providerId + ".plugin.add", {
            src:  urlPrefix + "/plugin.add.js",
            detectProvider: function(loader){
                //return promise mode, and promise load main testlibProviderLoadDependencyDetectProvider first.
                return loader.loadProvider(providerId).then(() => {
                    if(window[windowKey].hasPlugin("add")){
                        return window[windowKey].getPlugin("add");    //return plugin function
                    }
                    return false;
                });
            },
        });


        //plugin add usage
        const pluginAdd = await loadScriptPromise.loadProvider(providerId + ".plugin.add");

        const pluginAddResult = pluginAdd(3, 2);
        if(pluginAddResult != 5){
            throw new Error("plugin add failed");
        }

    });


    it('is load plugin sub with detectProvider using return boolean', async function() {

        //plugin version setProvider
        loadScriptPromise.setProvider(providerId + ".plugin.sub", {
            src:  urlPrefix + "/plugin.sub.js",
            detectProvider: function(loader){

                //This does not load main testlibProviderLoadDependencyDetectProvider. You have to do it manually.
                if(!window[windowKey]){
                    return false;
                }

                if(!window[windowKey].hasPlugin){
                    return false;
                }

                if(window[windowKey].hasPlugin("sub")){
                    return true;    //return success detect result only
                }

                return false;
            },
        });

        //plugin version usage
        //detectProvider does not load main testlibProviderLoadDependencyDetectProvider. You have to do it manually.
        await loadScriptPromise.loadProvider(providerId);
        await loadScriptPromise.loadProvider(providerId + ".plugin.sub");
        const pluginSub = window[windowKey].getPlugin("sub");
        const result = pluginSub(3, 2);
        if(result != 1){
            throw new Error("plugin sub failed");
        }


    });

});

