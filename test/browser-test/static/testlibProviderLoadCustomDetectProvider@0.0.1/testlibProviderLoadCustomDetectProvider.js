(function(global){

    var testVal = "";

    function setVal(t){
        testVal = t;
    }

    function getVal(){
        return testVal;
    }

    global.testlibProviderLoadCustomDetectProvider = {
        setVal: setVal,
        getVal: getVal
    };

})(window);