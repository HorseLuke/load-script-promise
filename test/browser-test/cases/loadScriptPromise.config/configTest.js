describe('loadScriptPromise.config Test', async function() {

    it('is get with default value in Module config', async function(done) {
        const defaultVal = Math.random();
        const getValue = loadScriptPromise.config.get("not_exists_key__________", defaultVal);
        done(defaultVal == getValue ? null : new Error("get with default value failed"));
    });

    
    it('is get all config values in Module config', async function(done) {
        const d = loadScriptPromise.config.get();
        done(typeof d === "object" ? null : new Error("get all config values failed"));
    });


    it('is set one value in Module config', async function(done) {
        const configKey = "key_test_11111112222222";
        const value = Math.random();
        loadScriptPromise.config.set(configKey, value);
        const getValue = loadScriptPromise.config.get(configKey);
        done(value == getValue ? null : new Error("set one value failed"));
    });

    it('is set object values in Module config', async function(done) {

        const configKey = "key_test_11111112222222_objd";
        const value = Math.random();
        const obj = {};
        obj[configKey] = value;

        loadScriptPromise.config.set(obj);

        const getValue = loadScriptPromise.config.get(configKey);
        done(value == getValue ? null : new Error("set object values failed"));
    });

});

