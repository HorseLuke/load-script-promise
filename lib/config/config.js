/**
 * @link http://blog.csdn.net/lihongxun945/article/details/48529371
 */

const cfg = {
	"ver": "0.1",
	//remove script tag when load error
	"scriptRemoveOnerror": true,
	//provider using windowKey detect mode retry between mil seconds
	"windowKeyRetryDetectDelay": 100,
	//provider using windowKey detect mode retry count
	"windowKeyRetryCount": 3,
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