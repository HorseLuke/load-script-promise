describe('loadScriptPromise.loadTraditionMode test', async function() {

    const src = "./static/testlibDirectTraditionLoad@0.0.1/testlibDirectTraditionLoad.js";
    const windowKey = "testlibDirectTraditionLoad";

    it('is load success', function(done) {

        const defaultVal = Math.random() + "_" + Date.now();

        loadScriptPromise.loadTraditionMode(src, {}, function(err, script){

            if(err){
                done(err);
                return false;
            }

            if(!Object.prototype.hasOwnProperty.call(window, windowKey)){
                done(new Error("load failed"));
            }

            window[windowKey].setVal(defaultVal);

            if(window[windowKey].getVal() !== defaultVal){
                throw new Error("load failed, can not set value");
            }

            //done();

            var looped = 0;
            var maxLooped = 100;

            //simulate load many times
            for(let i = 1; i <= maxLooped; i++){
                
                loadScriptPromise.loadTraditionMode(src, function(err, script){

                    looped++;

                    if(err){
                        done(err);
                        return false;
                    }

                    if(window[windowKey].getVal() !== defaultVal){
                        throw new Error("load failed, is not restricted to load only once");
                    }

                    if(looped >= maxLooped){
                        done();
                    }

                });
            }


        });




    });

});

