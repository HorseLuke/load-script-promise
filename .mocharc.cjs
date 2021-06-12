//https://github.com/mochajs/mocha/tree/master/example/config
//https://mochajs.org/api/mocha
//https://boneskull.com/mocha-v6/

const config = {
    extension: [
        ".js",
        ".cjs",
        ".mjs"
    ],
    file: [
        "./test/node-test/mocha-root-level-hook.js"
    ],
    delay: true, //Delay initial execution of root suite
    spec: [
        "./test/node-test/cases/**/*Test.js"
    ]
};

module.exports = config;
