import load from "../load-script/load";

/**
 * code from load-script issues 20
 * @link https://github.com/eldargab/load-script/issues/20
 */
 const loadPromise = async (src, options) => new Promise((resolve, reject) => load(src, options, (err, script) => {
  if (err) {
    reject(err);
  } else {
    resolve(script);
  }
}));


export default loadPromise;