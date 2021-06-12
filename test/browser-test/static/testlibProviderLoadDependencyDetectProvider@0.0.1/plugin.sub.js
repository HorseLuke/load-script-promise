(function(){

    if(!window.testlibProviderLoadDependencyDetectProvider){
        throw new Error("Can not find window.testlibProviderLoadDependencyDetectProvider");
    }

    window.testlibProviderLoadDependencyDetectProvider.addPlugin("sub", function(a, b){
        return a - b;
    });

})();