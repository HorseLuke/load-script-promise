import load from "../load-script/load";

/**
 * code from load-script issues 20
 * @link https://github.com/eldargab/load-script/issues/20
 */
function loadPromise(src, options){
  return new Promise((resolve, reject) => {
    load(src, options, (err, script) => {
      if (err) {
        reject(err);
      } else {
        resolve(script);
      }
    });
  });
}

export default loadPromise;