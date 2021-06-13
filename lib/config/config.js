/**
 * @link http://blog.csdn.net/lihongxun945/article/details/48529371
 */

const cfg = {

	//version
	"ver": "0.1",

	//remove script tag when load error
	"scriptRemoveOnerror": true,

	//provider using windowKey detect mode retry between mil seconds
	"windowKeyRetryDetectDelay": 100,

	//provider using windowKey detect mode retry count
	"windowKeyRetryCount": 3,

	//loadProvider detect dependency recusive max allow count.
	//Because detect provider would run twice, sometimes may detect dependency recusive twice (although is fake report).
	//Setting to 10 is a trade off value.
	"loadProviderDependencyMaxRecusiveAllow": 10
};

const config = {
	'get': function(str, def){
		if(str){
			def = def || null;
			return cfg[str] === undefined ? def : cfg[str];
		}else{
			return cfg;
		}
	},
	"set": function(key, val){
		
		if(typeof key === 'string'){
			cfg[key] = val;
			return ;
		}

		for(var i in key){
			cfg[i] = key[i];
		}
	}
};

export default config;