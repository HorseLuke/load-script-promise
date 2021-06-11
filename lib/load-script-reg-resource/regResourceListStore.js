/**
 * Store reg resource
 */

let regResourceListStore = {};

function checkOption(option, id){

    id = id || "unknown";

  
    if(!Object.prototype.hasOwnProperty.call(option, "src")){
        throw new Error("Specific reg resource options does not have src value. Resource id is " + id);
    }

    do{
        if(Object.prototype.hasOwnProperty.call(option, "windowKey")){
            break;
        }

        if(Object.prototype.hasOwnProperty.call(option, "detectProvider")){
            break;
        }

        throw new Error("Specific reg resource options must have 'windowKey' value or 'detectProvider' anonymous function. Resource id is " + id);

    }while(false);


    return true;

}

function has(id){
    if(!Object.prototype.hasOwnProperty.call(regResourceListStore, id)){
        return false;
    }

    return true;
}

function get(id){
    if(!Object.prototype.hasOwnProperty.call(regResourceListStore, id)){
        return {};
    }
    return regResourceListStore[id];
}

function set(id, option){
    checkOption(option, id);
    regResourceListStore[id] = option;
}

function del(id){
    if(!Object.prototype.hasOwnProperty.call(regResourceListStore, id)){
        return true;
    }
    delete regResourceListStore[id];
}

function clear(){
    regResourceListStore = {};
}


export {
    has,
    get,
    set,
    del,
    clear,
    checkOption
};