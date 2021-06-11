/**
 * @link http://blog.csdn.net/lihongxun945/article/details/48529371
 */

const cfg = {
	"ver": "0.1",
	//remove script tag when load error
	"scriptRemoveOnerror": true,
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
	"set": function(val){
		for(var i in val){
			cfg[i] = val[i];
		}
	}
};

export default config;