import load from "../load-script/load";

/**
 * code from load-script issues 20
 * @link https://github.com/eldargab/load-script/issues/20
 */
export default async (src, options) => new Promise((resolve, reject) => load(src, options, (err, script) => {
  if (err) {
    reject(err);
  } else {
    resolve(script);
  }
}));