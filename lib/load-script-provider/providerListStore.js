/**
 * Store provider
 */

let providerListStore = {};

function checkOption(option, id){

    id = id || "unknown";

  
    if(!Object.prototype.hasOwnProperty.call(option, "src")){
        throw new Error("Specific provider options does not have src value. Provider id is " + id);
    }

    do{
        if(Object.prototype.hasOwnProperty.call(option, "windowKey")){
            break;
        }

        if(Object.prototype.hasOwnProperty.call(option, "detectProvider")){
            break;
        }

        throw new Error("Specific provider options must have 'windowKey' value or 'detectProvider' anonymous function. Provider id is " + id);

    }while(false);


    return true;

}

function has(id){
    if(!Object.prototype.hasOwnProperty.call(providerListStore, id)){
        return false;
    }

    return true;
}

function get(id){
    if(!Object.prototype.hasOwnProperty.call(providerListStore, id)){
        return {};
    }
    return providerListStore[id];
}

function reg(id, option){
    return set(id, option);
}

function set(id, option){
    checkOption(option, id);
    providerListStore[id] = option;
}

function del(id){
    if(!Object.prototype.hasOwnProperty.call(providerListStore, id)){
        return true;
    }
    delete providerListStore[id];
}

function clear(){
    providerListStore = {};
}


export {
    has,
    get,
    set,
    reg,
    del,
    clear,
    checkOption
};