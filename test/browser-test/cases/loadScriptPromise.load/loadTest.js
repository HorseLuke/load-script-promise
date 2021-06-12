describe('loadScriptPromise.load test', async function() {


    it('is load success', async function() {

        const src = "./static/testlibDirectPromiseLoad@0.0.1/testlibDirectPromiseLoad.js";
        const windowKey = "testlibDirectPromiseLoad";
    
        const defaultVal = Math.random() + "_" + Date.now();

        await loadScriptPromise.load(src);

        if(!Object.prototype.hasOwnProperty.call(window, windowKey)){
            throw new Error("load failed");
        }
        
        window[windowKey].setVal(defaultVal);

        if(window[windowKey].getVal() !== defaultVal){
            throw new Error("load failed, can not set value");
        }

        var loadSrcMultiTimes = [];

        for(let i = 0; i < 100; i++){
            loadSrcMultiTimes.push(loadScriptPromise.load(src));
        }

        await Promise.all(loadSrcMultiTimes);

        if(window[windowKey].getVal() !== defaultVal){
            throw new Error("load failed, is not restricted to load only once");
        }

    });

});

