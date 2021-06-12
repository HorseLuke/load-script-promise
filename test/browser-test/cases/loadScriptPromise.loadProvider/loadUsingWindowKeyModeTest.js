describe('loadScriptPromise.setProvider and loadScriptPromise.loadProvider using windowKey mode test', async function() {

    const providerId= "testlibProviderLoadVersion1";
    const windowKey = "testlibProviderLoad";

    loadScriptPromise.setProvider(providerId, {
        src: "./static/testlibProviderLoad@0.0.1/testlibProviderLoad.js",
        windowKey: windowKey,
    });

    it('is load success', async function() {
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

        var loadSrcMultiTimes = [];

        for(let i = 0; i < 100; i++){
            loadSrcMultiTimes.push(loadScriptPromise.loadProvider(providerId));
        }

        await Promise.all(loadSrcMultiTimes);

        if(window[windowKey].getVal() !== defaultVal){
            throw new Error("load failed, is not restricted to load only once");
        }

    });

});

