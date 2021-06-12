(function(global){

    if(!global.testlibProviderLoadCustomDetectProvider){
        throw new Error("Can not find window.testlibProviderLoadCustomDetectProvider");
    }

    var testVal = "";

    function setUIName(t){
        testVal = t;
    }

    function getUIName(){
        return testVal;
    }

    global.testlibProviderLoadCustomDetectProvider.UI = {
        setUIName: setUIName,
        getUIName: getUIName
    }

})(window);