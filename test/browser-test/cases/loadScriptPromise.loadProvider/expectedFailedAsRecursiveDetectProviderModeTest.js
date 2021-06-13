describe('expectedFailedAsRecursiveDetectProviderModeTest test', async function() {

    const providerId= "testlibProviderErrorLoadRecusiveDetectProvider";
    const windowKey = "testlibProviderErrorLoadRecusiveDetectProvider";

    const urlPrefix = "./static/testlibProviderErrorLoadRecusiveDetectProvider@0.0.1";


    it('is failed as expected because recursive provider dependency detect', async function() {

        loadScriptPromise.setProvider(providerId, {
            src: urlPrefix + "/error.js",
            detectProvider: async function(loader){
                console.log(["detectProvider-start"]);
                const res = await loader.loadProvider(providerId);  //recursive call
                console.log(["detectProvider-end", res]);
                return res;
            },
        });

        try{
            await loadScriptPromise.loadProvider(providerId); 
        }catch(e){
            if(e.message.indexOf("Recursive provider dependency detect") == 0){
                //This is expected result
                console.error(e);
                return ;
            }
            throw e;
        }

        throw new Error("Does not failed as expected");

    });


});

