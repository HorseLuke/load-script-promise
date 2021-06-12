describe('loadScriptPromise.load test', async function() {

    const load = loadScriptPromise.load;
    const src = "./static/testlibDirectPromiseLoad@0.0.1/testlibDirectPromiseLoad.js";
    const windowKey = "testlibDirectPromiseLoad";

    it('is load success', async function() {
        const defaultVal = Math.random() + "_" + Date.now();

        await load(src);

        if(!Object.prototype.hasOwnProperty.call(window, windowKey)){
            throw new Error("load failed");
        }
        
        window[windowKey].setVal(defaultVal);

        if(window[windowKey].getVal() !== defaultVal){
            throw new Error("load failed, can not set value");
        }

        var loadSrcMultiTimes = [];

        for(let i = 0; i < 100; i++){
            loadSrcMultiTimes.push(load(src));
        }

        await Promise.all(loadSrcMultiTimes);

        if(window[windowKey].getVal() !== defaultVal){
            throw new Error("load failed, is not restricted to load only once");
        }

    });

});

