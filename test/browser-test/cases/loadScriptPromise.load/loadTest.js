describe('loadScriptPromise.load test', function() {

    it('is load success', function() {

        const src = "./static/testlibDirectPromiseLoad@0.0.1/testlibDirectPromiseLoad.js";
        const windowKey = "testlibDirectPromiseLoad";
    
        const defaultVal = Math.random() + "_" + Date.now();

        return loadScriptPromise.load(src).then(function (script){

            console.log(script);

            if(!Object.prototype.hasOwnProperty.call(window, windowKey)){
                throw new Error("load failed");
            }
            
            window[windowKey].setVal(defaultVal);
    
            if(window[windowKey].getVal() !== defaultVal){
                throw new Error("load failed, can not set value");
            }

        }).then(function (){

            var loadSrcMultiTimes = [];

            for(var i = 0; i < 100; i++){
                loadSrcMultiTimes.push(loadScriptPromise.load(src));
            }
    
            return Promise.all(loadSrcMultiTimes);
    
        }).then(function (){
            
            if(window[windowKey].getVal() !== defaultVal){
                throw new Error("load failed, is not restricted to load only once");
            }

        });

    });

});

