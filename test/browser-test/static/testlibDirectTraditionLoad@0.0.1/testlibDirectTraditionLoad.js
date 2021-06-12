(function(global){

    var testVal = "";

    function setVal(t){
        testVal = t;
    }

    function getVal(){
        return testVal;
    }

    global.testlibDirectTraditionLoad = {
        setVal: setVal,
        getVal: getVal
    };

})(window);