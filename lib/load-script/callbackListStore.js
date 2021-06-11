/**
 * Store load callback function
 */

const srcCbList = {};

function addCallback(id, cb){
    if(!Object.prototype.hasOwnProperty.call(srcCbList, id)){
        srcCbList[id] = [];
    }

    srcCbList[id].push(cb);

}

function getList(id){
    if(!Object.prototype.hasOwnProperty.call(srcCbList, id)){
        return [];
    }

    return srcCbList[id];

}


function hasList(id){
    if(!Object.prototype.hasOwnProperty.call(srcCbList, id)){
        return false;
    }

    return true;
}

function clearList(id){
    if(!Object.prototype.hasOwnProperty.call(srcCbList, id)){
        return true;
    }
    delete srcCbList[id];
    return true;
}


function getAndClearList(id){
    let cbList = getList(id);
    if(cbList.length > 0){
        clearList(id);
    }
    return cbList;
}


export {
    addCallback,
    getList,
    hasList,
    clearList,
    getAndClearList
};