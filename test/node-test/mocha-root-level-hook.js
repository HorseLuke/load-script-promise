import { fileURLToPath } from "url";
import { dirname } from "path";
import BootstarpService from "./lib/service/BootstarpService.js";

if(!process.env.NODE_ENV){
    process.env.NODE_ENV = "production";
}


console.log("process.env.NODE_ENV is " + process.env.NODE_ENV);



//https://stackoverflow.com/questions/50268077/dirname-is-not-defined-in-node-js-10-experimental
const appDirPath = dirname(dirname(dirname(fileURLToPath(import.meta.url)))) + "/";


/**
 * @var {BootstarpService}
 */
BootstarpService.instance;    //init BootstarpService

BootstarpService.instance.setAppdir(appDirPath);
Object.freeze(BootstarpService.instance);

//init
(async () => {
    
    //run test
    setTimeout(function() {

        //await BootstarpService.instance.ESMImportFromAppdir("lib/config/config.js");

        console.log(BootstarpService.instance.getAppdir());
        
        describe('Root level', function() {
    
            it('Test can run', function(done) {
                done();
            });
        
        });
        
        run();
    
    }, 1000);
    
})();


