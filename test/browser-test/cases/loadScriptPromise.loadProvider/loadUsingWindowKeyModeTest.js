describe('loadScriptPromise.setProvider and loadScriptPromise.loadProvider using windowKey mode by promise mode test', function() {

    const providerId= "testlibProviderLoadVersion1";
    const windowKey = "testlibProviderLoad";

    before(function (){

    });

    it('is load success', function() {
        
        const defaultVal = Math.random() + "_" + Date.now();

        loadScriptPromise.setProvider(providerId, {
            src: "./static/testlibProviderLoad@0.0.1/testlibProviderLoad.js",
            windowKey: windowKey,
        });

        return loadScriptPromise.loadProvider(providerId).then(function(resource){

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

        }).then(function(){

            var loadSrcMultiTimes = [];

            for(var i = 0; i < 100; i++){
                loadSrcMultiTimes.push(loadScriptPromise.loadProvider(providerId));
            }
    
            return Promise.all(loadSrcMultiTimes);
        
        }).then(function(){

            if(window[windowKey].getVal() !== defaultVal){
                throw new Error("load failed, is not restricted to load only once");
            }    
        });

    });

});

