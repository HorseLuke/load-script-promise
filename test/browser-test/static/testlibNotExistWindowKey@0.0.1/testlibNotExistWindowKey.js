(function(global){

    var testVal = "";

    function setVal(t){
        testVal = t;
    }

    function getVal(){
        return testVal;
    }

    var doNotRegToGlobalOrWindow = {
        setVal: setVal,
        getVal: getVal
    };

})(window);