describe('loadScriptPromise.loadProvider expected failed as Wrong windowKey in loadScriptPromise.setProvider test', async function() {

    const providerId = "not-exist-windowkey";

    before(() => {
        loadScriptPromise.setProvider(providerId, {
            src: "./static/testlibNotExistWindowKey@0.0.1/testlibNotExistWindowKey.js",
            windowKey: "not-exist-windowkey-1100000",    //Set the wrong value that window object does not have
        });
    });

    
    it('is load failed as expected because provider option windowKey is wrong value. Error message must begin with "\'windowKey\' is used for search specific provider in window object, but found nothing."', async function() {
        try{
            await loadScriptPromise.loadProvider(providerId);
        }catch(e){
            if(e.message.indexOf("'windowKey' is used for search specific provider in window object, but found nothing.") == 0){
                //This is expected result
                console.error(e);
                return ;
            }
            throw e;
        }

        throw new Error("Does not failed as expected");

    });

});

