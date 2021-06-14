describe('Load jQuery, with loadScriptPromise.setProvider and loadScriptPromise.loadProvider using windowKey mode by promise mode test', function() {

    it('is load success', function() {
        
        const defaultVal = "3.6.0";

        loadScriptPromise.setProvider("jQuery", {
            src: "https://code.jquery.com/jquery-3.6.0.min.js",
            windowKey: "jQuery",
            opts: {
                attrs: {
                    "integrity": "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=",
                    "crossorigin": "anonymous",
                }
            }
        });

        return loadScriptPromise.loadProvider("jQuery").then(function(jQuery){

            if(!Object.prototype.hasOwnProperty.call(window, "jQuery")){
                throw new Error("load failed");
            }

            if(jQuery !== window["jQuery"]){
                throw new Error("load failed, return is not the same as windowKey");
            }

            if(jQuery().jquery != defaultVal){
                throw new Error("load jquery version failed");
            }
            
        });

    });

});

