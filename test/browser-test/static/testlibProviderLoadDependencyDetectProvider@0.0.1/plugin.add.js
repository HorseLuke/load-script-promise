(function(){

    if(!window.testlibProviderLoadDependencyDetectProvider){
        throw new Error("Can not find window.testlibProviderLoadDependencyDetectProvider");
    }

    window.testlibProviderLoadDependencyDetectProvider.addPlugin("add", function(a, b){
        return a + b;
    });

})();