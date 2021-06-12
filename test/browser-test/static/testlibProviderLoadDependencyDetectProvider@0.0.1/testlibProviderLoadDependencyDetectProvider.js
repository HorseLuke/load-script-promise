(function(global){

    let plugins = {};

    function getPlugin(id){
        if(!Object.prototype.hasOwnProperty.call(plugins, id)){
            throw new Error("Does not have plugin "+ id);
        }
        return plugins[id];
    }

    function addPlugin(id, func){
        plugins[id] = func;
    }

    function delPlugin(id){
        if(!Object.prototype.hasOwnProperty.call(plugins, id)){
            return true;
        }
        delete plugins[id];
        return true;
    }

    function hasPlugin(id){
        if(!Object.prototype.hasOwnProperty.call(plugins, id)){
            return false;
        }
        return true;
    }

    global.testlibProviderLoadDependencyDetectProvider = {
        getPlugin: getPlugin,
        addPlugin: addPlugin,
        delPlugin: delPlugin,
        hasPlugin: hasPlugin
    };

})(window);