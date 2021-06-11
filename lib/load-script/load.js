/**
 * Code is from load-script
 * @link https://github.com/eldargab/load-script
 */

import * as callbackListStore from "./callbackListStore";
import {setAttributes, findScriptDomsBySrc, markScriptDomBelongThisModule} from "./helper";
import config from "../config/config";

function runCallbackListOnSuccess(script){
  let list = callbackListStore.getAndClearList(script.id);

  if(list.length < 1){
    return false;
  }
  
  for(let i = 0; i < list.length; i++){
    try{
      list[i](null, script);
    }catch(e){
      if(console){
        console.error(e);
      }
    }
  }
}


function runCallbackListOnError(script, error){

  let list = getAndClearList(script.id);

  if(list.length < 1){
    return false;
  }

  let errorMessage = "Failed to load script[id=" + script.id + "],[src=" + script.getAttribute("data-origin-src") + "]. Error detail: " + error;
  let errorInstance = new Error(errorMessage);
  errorInstance.script = script;
  errorInstance.originError = error;

  for(let i = 0; i < list.length; i++){
    try{
      list[i](errorInstance);
    }catch(e){
      if(console){
        console.error(e);
      }
    }
  }
}


function stdOnEnd (script) {
  script.onload = function () {
    this.onerror = this.onload = null;
    this.setAttribute("data-load-status", "success");
    runCallbackListOnSuccess(this);
  };
  script.onerror = function (error) {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null;
    this.setAttribute("data-load-status", "error");
    runCallbackListOnError(this, error);
    if(config.get("scriptRemoveOnerror") != false){
      this.remove();
    }
  };
}


function ieOnEnd (script) {
  script.onreadystatechange = function () {
    if (this.readyState != 'complete' && this.readyState != 'loaded'){
      return ;
    }
    this.onreadystatechange = null;
    this.setAttribute("data-load-status", "success");
    runCallbackListOnSuccess(this);    // there is no way to catch loading errors in IE8
  };
}


function load (src, opts, cb) {

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  
  opts = opts || {};
  cb = cb || function() {};

  do{
    var existScriptDom = findScriptDomsBySrc(src);
    if(existScriptDom == null){
      break;
    }

    if(existScriptDom.getAttribute("data-load-status") == "loading"){
      callbackListStore.addCallback(existScriptDom.id, cb);
      return ;
    }

    if(existScriptDom.getAttribute("data-load-status") == "success"){
      cb(null, existScriptDom);
      return ;
    }

  }while(false);

  var script = document.createElement('script');
  
  script.type = opts.type || 'text/javascript';
  script.charset = opts.charset || 'utf-8';
  script.async = 'async' in opts ? !!opts.async : true;
  script.src = src;
  
  if (opts.attrs) {
      setAttributes(script, opts.attrs);
  }
  
  if (opts.text) {
      script.text = '' + opts.text;
  }

  markScriptDomBelongThisModule(script);
  callbackListStore.addCallback(script.id, cb);

  if('onload' in script){
    stdOnEnd(script);
  }else{
    ieOnEnd(script);
  }
  
  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script);
  }
  
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(script);
}

export default load;


