const dataScriptMark = "data-is-dynamic-script-loader-aZIX-tzZo51pnPMwX";
const idScriptMark = "dynamic_script_loader_adj2_sdfds63__";

let srcLoadCount = 0;

function setAttributes(script, attrs) {
    for (var attr in attrs) {
      script.setAttribute(attr, attrs[attr]);
    }
}


function generateId(){
    return idScriptMark + (++srcLoadCount) + "_" + Date.now() + "_" +  parseInt(Math.random() * 100000);
}


function findScriptDomsBySrc(src){
    let list = document.querySelectorAll("head script[" + dataScriptMark + "]");
    for(let i=0; i<list.length; i++){
      let scriptDom = list[i];
      if(scriptDom.getAttribute(dataScriptMark) != "1"){
        continue;
      }
      if(scriptDom.getAttribute("data-load-status") == "error"){
        continue;
      }
      if(scriptDom.getAttribute("data-origin-src") === src){
        return scriptDom;
      }

    }
    return null;
}


function markScriptDomBelongThisModule(script){
    script.setAttribute(dataScriptMark, "1");
    script.setAttribute("data-load-status", "loading");
    script.setAttribute("data-load-time", Date.now());
    script.setAttribute("data-origin-src", src);
    script.id = generateId();
}

export {
    dataScriptMark,
    idScriptMark,
    setAttributes,
    generateId,
    findScriptDomsBySrc,
    markScriptDomBelongThisModule
}