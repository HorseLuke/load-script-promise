import { createRequire } from 'module';

// http://stackoverflow.com/a/26227662/1527470
// https://www.jianshu.com/p/f40a77bbd74e
// https://stackoverflow.com/questions/50268077/dirname-is-not-defined-in-node-js-10-experimental

const singletonEnforcer = Symbol();

/**
 * @var {BootstarpService}
 */
let _instance = null;

/**
 * Global debug Level
 */
let _globalDebugLevel = 0;

/**
 * Global Bootstarp Service
 * Has and only has one bootstarp Service instance during runtime (singleton mode)
 */
class BootstarpService{


    constructor(enforcer){
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton. Please use Bootstarp.instance');
        }
        this._init();
    }

    /**
     * Get singleton BootstarpService
     * @return {BootstarpService} BootstarpService instance
     */
    static get instance(){
        if(!_instance){
            _instance = new BootstarpService(singletonEnforcer);
        }

        return _instance;
    }

    /**
     * Get global debug level
     * @return {Number}
     */
    static get debugLevel(){
        return _globalDebugLevel;
    }

    /**
     * Set globaldebug level
     */
    static set debugLevel(level){
        if(Number.isInteger(level)){
            _globalDebugLevel = level;
        }
    }

    /**
     * (Internal method) init
     */
    _init(){
        this.appdir = "";
    }

    /**
     * set appdir.
     * This method should be called only one. Use "Object.freeze" after BootstarpService has been set.
     * @param {string} dir appdir
     */
    setAppdir(dir){
        this.appdir = dir;
    }

    /**
     * Get appdir.
     * @return {string}
     */
    getAppdir(){
        return this.appdir;
    }

    /**
     * Use ES Module import method to import a file under appdir dir
     * @param {string} filepath
     * @return {Promise}
     */
    ESMImportFromAppdir(filepath){
        return import("file://" + this.appdir + "/" + filepath);
    }

    /**
     * Use ES Module import method to import a file under appdir dir, then return default
     * @param {string} filepath
     * @return {Promise}
     */
    async ESMImportFromAppdirAndReturnDefault(filepath){
        const module = await import("file://" + this.appdir + "/" + filepath);
        return module.default;
    }
    

    /**
     * Use Common JS require method (by Node.js) to require a file under appdir dir
     * @see https://nodejs.org/api/esm.html#esm_differences_between_es_modules_and_commonjs
     * @param {string} filepath
     * @return {any} exported module content
     */
    CJSRequireFromAppdir(filepath){
        const require = createRequire("file://" + this.appdir + "/");
        return require('./' + filepath);
    }

}

export default BootstarpService;