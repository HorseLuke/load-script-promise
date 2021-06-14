var loadScriptPromise = (function () {
    'use strict';

    /**
     * Store load callback function
     */
    var srcCbList = {};

    function addCallback(id, cb) {
      if (!Object.prototype.hasOwnProperty.call(srcCbList, id)) {
        srcCbList[id] = [];
      }

      srcCbList[id].push(cb);
    }

    function getList(id) {
      if (!Object.prototype.hasOwnProperty.call(srcCbList, id)) {
        return [];
      }

      return srcCbList[id];
    }

    function clearList(id) {
      if (!Object.prototype.hasOwnProperty.call(srcCbList, id)) {
        return true;
      }

      delete srcCbList[id];
      return true;
    }

    function getAndClearList(id) {
      var cbList = getList(id);

      if (cbList.length > 0) {
        clearList(id);
      }

      return cbList;
    }

    var dataScriptMark = "data-is-dynamic-script-loader-aZIX-tzZo51pnPMwX";
    var idScriptMark = "dynamic_script_loader_adj2_sdfds63__";
    var srcLoadCount = 0;

    function setAttributes(script, attrs) {
      for (var attr in attrs) {
        script.setAttribute(attr, attrs[attr]);
      }
    }

    function generateId() {
      return idScriptMark + ++srcLoadCount + "_" + Date.now() + "_" + parseInt(Math.random() * 100000);
    }

    function findScriptDomsBySrc(src) {
      var list = document.querySelectorAll("head script[" + dataScriptMark + "]");

      for (var i = 0; i < list.length; i++) {
        var scriptDom = list[i];

        if (scriptDom.getAttribute(dataScriptMark) != "1") {
          continue;
        }

        if (scriptDom.getAttribute("data-load-status") == "error") {
          continue;
        }

        if (scriptDom.getAttribute("data-origin-src") === src) {
          return scriptDom;
        }
      }

      return null;
    }

    function markScriptDomBelongThisModule(script, src) {
      script.setAttribute(dataScriptMark, "1");
      script.setAttribute("data-load-status", "loading");
      script.setAttribute("data-load-time", Date.now());
      script.setAttribute("data-origin-src", src);
      script.id = generateId();
    }

    /**
     * @link http://blog.csdn.net/lihongxun945/article/details/48529371
     */
    var cfg = {
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
    var config = {
      'get': function get(str, def) {
        if (str) {
          def = def || null;
          return cfg[str] === undefined ? def : cfg[str];
        } else {
          return cfg;
        }
      },
      "set": function set(key, val) {
        if (typeof key === 'string') {
          cfg[key] = val;
          return;
        }

        for (var i in key) {
          cfg[i] = key[i];
        }
      }
    };

    /**
     * Code is from load-script
     * @link https://github.com/eldargab/load-script
     */

    function runCallbackListOnSuccess(script) {
      var list = getAndClearList(script.id);

      if (list.length < 1) {
        return false;
      }

      for (var i = 0; i < list.length; i++) {
        try {
          list[i](null, script);
        } catch (e) {
          if (console) {
            console.error(e);
          }
        }
      }
    }

    function runCallbackListOnError(script, error) {
      var list = getAndClearList(script.id);

      if (list.length < 1) {
        return false;
      }

      var errorMessage = "Failed to load script[id=" + script.id + "],[src=" + script.getAttribute("data-origin-src") + "]. Error detail: " + error;
      var errorInstance = new Error(errorMessage);
      errorInstance.customScript = script;
      errorInstance.customError = error;

      for (var i = 0; i < list.length; i++) {
        try {
          list[i](errorInstance);
        } catch (e) {
          if (console) {
            console.error(e);
          }
        }
      }
    }

    function stdOnEnd(script) {
      script.onload = function () {
        this.onerror = this.onload = null;
        this.setAttribute("data-load-status", "success");
        runCallbackListOnSuccess(this);
      };

      script.onerror = function (error) {
        // this.onload = null here is necessary
        // because even IE9 works not like others
        this.onerror = this.onload = null;
        this.setAttribute("data-load-status", "error");
        runCallbackListOnError(this, error);

        if (config.get("scriptRemoveOnerror") != false) {
          this.remove();
        }
      };
    }

    function ieOnEnd(script) {
      script.onreadystatechange = function () {
        if (this.readyState != 'complete' && this.readyState != 'loaded') {
          return;
        }

        this.onreadystatechange = null;
        this.setAttribute("data-load-status", "success");
        runCallbackListOnSuccess(this); // there is no way to catch loading errors in IE8
      };
    }

    function load(src, opts, cb) {
      if (typeof opts === 'function') {
        cb = opts;
        opts = {};
      }

      opts = opts || {};

      cb = cb || function () {};

      do {
        var existScriptDom = findScriptDomsBySrc(src);

        if (existScriptDom == null) {
          break;
        }

        if (existScriptDom.getAttribute("data-load-status") == "loading") {
          addCallback(existScriptDom.id, cb);
          return;
        }

        if (existScriptDom.getAttribute("data-load-status") == "success") {
          cb(null, existScriptDom);
          return;
        }
      } while (false);

      var script = document.createElement('script');
      script.type = opts.type || 'text/javascript';
      script.charset = opts.charset || 'utf-8';
      script.async = 'async' in opts ? !!opts.async : true;
      script.src = src;

      if (opts.attrs) {
        setAttributes(script, opts.attrs);
      }

      if (opts.text) {
        script.text = '' + opts.text;
      }

      markScriptDomBelongThisModule(script, src);
      addCallback(script.id, cb);

      if ('onload' in script) {
        stdOnEnd(script);
      } else {
        ieOnEnd(script);
      } // some good legacy browsers (firefox) fail the 'in' detection above
      // so as a fallback we always set onload
      // old IE will ignore this and new IE will set onload


      if (!script.onload) {
        stdOnEnd(script);
      }

      var head = document.head || document.getElementsByTagName('head')[0];
      head.appendChild(script);
    }

    /**
     * code from load-script issues 20
     * @link https://github.com/eldargab/load-script/issues/20
     */

    function loadPromise(src, options) {
      return new Promise(function (resolve, reject) {
        load(src, options, function (err, script) {
          if (err) {
            reject(err);
          } else {
            resolve(script);
          }
        });
      });
    }

    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn) {
      return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
          var gen = fn.apply(self, args);

          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }

          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }

          _next(undefined);
        });
      };
    }

    var runtime = {exports: {}};

    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    (function (module) {
    var runtime = (function (exports) {

      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.
      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
        return obj[key];
      }
      try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
      } catch (err) {
        define = function(obj, key, value) {
          return obj[key] = value;
        };
      }

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);

        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);

        return generator;
      }
      exports.wrap = wrap;

      // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.
      function tryCatch(fn, obj, arg) {
        try {
          return { type: "normal", arg: fn.call(obj, arg) };
        } catch (err) {
          return { type: "throw", arg: err };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed";

      // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.
      var ContinueSentinel = {};

      // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}

      // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.
      var IteratorPrototype = {};
      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (NativeIteratorPrototype &&
          NativeIteratorPrototype !== Op &&
          hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype =
        Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunction.displayName = define(
        GeneratorFunctionPrototype,
        toStringTagSymbol,
        "GeneratorFunction"
      );

      // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function(method) {
          define(prototype, method, function(arg) {
            return this._invoke(method, arg);
          });
        });
      }

      exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor
          ? ctor === GeneratorFunction ||
            // For the native GeneratorFunction constructor, the best we can
            // do is to check its .name property.
            (ctor.displayName || ctor.name) === "GeneratorFunction"
          : false;
      };

      exports.mark = function(genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };

      // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.
      exports.awrap = function(arg) {
        return { __await: arg };
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;
            if (value &&
                typeof value === "object" &&
                hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function(value) {
                invoke("next", value, resolve, reject);
              }, function(err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return PromiseImpl.resolve(value).then(function(unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            }, function(error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            });
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function(resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise =
            // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(
              callInvokeWithMethodAndArg,
              // Avoid propagating failures to Promises returned by later
              // invocations of the iterator.
              callInvokeWithMethodAndArg
            ) : callInvokeWithMethodAndArg();
        }

        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);
      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };
      exports.AsyncIterator = AsyncIterator;

      // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.
      exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;

        var iter = new AsyncIterator(
          wrap(innerFn, outerFn, self, tryLocsList),
          PromiseImpl
        );

        return exports.isGeneratorFunction(outerFn)
          ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then(function(result) {
              return result.done ? result.value : iter.next();
            });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;

        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            }

            // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;

            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);

            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;

            var record = tryCatch(innerFn, self, context);
            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done
                ? GenStateCompleted
                : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };

            } else if (record.type === "throw") {
              state = GenStateCompleted;
              // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.
              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      }

      // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.
      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator["return"]) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError(
              "The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (! info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value;

          // Resume execution at the desired location (see delegateYield).
          context.next = delegate.nextLoc;

          // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.
          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }

        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        }

        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
      }

      // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.
      defineIteratorMethods(Gp);

      define(Gp, toStringTagSymbol, "Generator");

      // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.
      Gp[iteratorSymbol] = function() {
        return this;
      };

      Gp.toString = function() {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        var entry = { tryLoc: locs[0] };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{ tryLoc: "root" }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function(object) {
        var keys = [];
        for (var key in object) {
          keys.push(key);
        }
        keys.reverse();

        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
          while (keys.length) {
            var key = keys.pop();
            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          }

          // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.
          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1, next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;

              return next;
            };

            return next.next = next;
          }
        }

        // Return an iterator with no values.
        return { next: doneResult };
      }
      exports.values = values;

      function doneResult() {
        return { value: undefined$1, done: true };
      }

      Context.prototype = {
        constructor: Context,

        reset: function(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.
          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;

          this.method = "next";
          this.arg = undefined$1;

          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" &&
                  hasOwn.call(this, name) &&
                  !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },

        stop: function() {
          this.done = true;

          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },

        dispatchException: function(exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;
          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !! caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }

              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }

              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }

              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },

        abrupt: function(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev &&
                hasOwn.call(entry, "finallyLoc") &&
                this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry &&
              (type === "break" ||
               type === "continue") &&
              finallyEntry.tryLoc <= arg &&
              arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },

        complete: function(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" ||
              record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },

        finish: function(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },

        "catch": function(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }

          // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.
          throw new Error("illegal catch attempt");
        },

        delegateYield: function(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      };

      // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.
      return exports;

    }(
      // If this script is executing as a CommonJS module, use module.exports
      // as the regeneratorRuntime namespace. Otherwise create a new empty
      // object. Either way, the resulting object will be used to initialize
      // the regeneratorRuntime variable at the top of this file.
      module.exports 
    ));

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      Function("r", "regeneratorRuntime = r")(runtime);
    }
    }(runtime));

    var regenerator = runtime.exports;

    /**
     * Store provider
     */
    var providerListStore = {};

    function checkOption(option, id) {
      id = id || "unknown";

      if (!Object.prototype.hasOwnProperty.call(option, "src")) {
        throw new Error("Specific provider options does not have src value. Provider id is " + id);
      }

      do {
        if (Object.prototype.hasOwnProperty.call(option, "windowKey")) {
          break;
        }

        if (Object.prototype.hasOwnProperty.call(option, "detectProvider")) {
          break;
        }

        throw new Error("Specific provider options must have 'windowKey' value or 'detectProvider' anonymous function. Provider id is " + id);
      } while (false);

      return true;
    }

    function has(id) {
      if (!Object.prototype.hasOwnProperty.call(providerListStore, id)) {
        return false;
      }

      return true;
    }

    function get(id) {
      if (!Object.prototype.hasOwnProperty.call(providerListStore, id)) {
        return {};
      }

      return providerListStore[id];
    }

    function set(id, option) {
      checkOption(option, id);
      providerListStore[id] = option;
    }

    function del(id) {
      if (!Object.prototype.hasOwnProperty.call(providerListStore, id)) {
        return true;
      }

      delete providerListStore[id];
    }

    function clear() {
      providerListStore = {};
    }

    var providerListStore$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        has: has,
        get: get,
        set: set,
        del: del,
        clear: clear,
        checkOption: checkOption
    });

    function generateErrorFromLoader(msg, loader) {
      var errorInstance = new Error(msg);
      errorInstance.customId = loader.id;
      errorInstance.customOption = loader.option;
      errorInstance.customStatus = loader.status;
      errorInstance.customScript = loader.script;
      return errorInstance;
    }

    function isValidReturnResource(resource) {
      if (resource === true) {
        return true;
      }

      if (resource === false) {
        return false;
      }

      if (typeof resource == "undefined") {
        return false;
      }

      if (resource === null) {
        return false;
      }

      return true;
    }

    function getOptionOrConfigFormatInt(option, optionKey, configKey) {
      configKey = configKey || optionKey;
      var value = 0;

      if (Object.prototype.hasOwnProperty.call(option, optionKey)) {
        value = option[optionKey];
      } else {
        value = config.get(configKey);
      }

      value = parseInt(value);

      if (isNaN(value)) {
        value = 0;
      }

      return value;
    }

    function runDetectProviderByOption(_x) {
      return _runDetectProviderByOption.apply(this, arguments);
    }

    function _runDetectProviderByOption() {
      _runDetectProviderByOption = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(loader) {
        var errorInstance;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!Object.prototype.hasOwnProperty.call(loader.option, "windowKey")) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return runDetectProviderByOptionWindowKey(loader);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
                if (!Object.prototype.hasOwnProperty.call(loader.option, "detectProvider")) {
                  _context.next = 8;
                  break;
                }

                _context.next = 7;
                return runDetectProviderByOptionDetectProvider(loader);

              case 7:
                return _context.abrupt("return", _context.sent);

              case 8:
                errorInstance = generateErrorFromLoader("Specific provider options does not have 'windowKey' value nor 'detectProvider' anonymous function.", loader);
                throw errorInstance;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _runDetectProviderByOption.apply(this, arguments);
    }

    function runDetectProviderByOptionWindowKey(_x2) {
      return _runDetectProviderByOptionWindowKey.apply(this, arguments);
    } //


    function _runDetectProviderByOptionWindowKey() {
      _runDetectProviderByOptionWindowKey = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(loader) {
        var windowKeyRetryDetectDelay, windowKeyRetryCount, i, errorInstance;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                windowKeyRetryDetectDelay = getOptionOrConfigFormatInt(loader.option, "windowKeyRetryDetectDelay");
                windowKeyRetryCount = getOptionOrConfigFormatInt(loader.option, "windowKeyRetryCount") - 1;

                if (!window[loader.option.windowKey]) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", window[loader.option.windowKey]);

              case 4:
                if (!(loader.status == "detect")) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", undefined);

              case 6:
                i = 1;

              case 7:
                if (!(i <= windowKeyRetryCount)) {
                  _context2.next = 16;
                  break;
                }

                if (!(windowKeyRetryDetectDelay > 0)) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 11;
                return new Promise(function (resolve, reject) {
                  setTimeout(function () {
                    resolve(true);
                  }, windowKeyRetryDetectDelay);
                });

              case 11:
                if (!window[loader.option.windowKey]) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", window[loader.option.windowKey]);

              case 13:
                i++;
                _context2.next = 7;
                break;

              case 16:
                errorInstance = generateErrorFromLoader("'windowKey' is used for search specific provider in window object, but found nothing. provider id is " + loader.id + "; 'windowKey' is " + loader.option.windowKey, loader);
                throw errorInstance;

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return _runDetectProviderByOptionWindowKey.apply(this, arguments);
    }

    function runDetectProviderByOptionDetectProvider(_x3) {
      return _runDetectProviderByOptionDetectProvider.apply(this, arguments);
    }

    function _runDetectProviderByOptionDetectProvider() {
      _runDetectProviderByOptionDetectProvider = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(loader) {
        var resource, errorInstance;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resource = loader.option.detectProvider(loader);

                if (!(resource instanceof Promise)) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 4;
                return resource;

              case 4:
                resource = _context3.sent;

              case 5:
                if (!isValidReturnResource(resource)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", resource);

              case 7:
                if (!(loader.status == "detect")) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", undefined);

              case 9:
                errorInstance = generateErrorFromLoader("'detectProvider' is used for search specific provider, but return not true, nor valid resource. provider id is " + loader.id + ".", loader);
                throw errorInstance;

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return _runDetectProviderByOptionDetectProvider.apply(this, arguments);
    }

    function loadProvider(_x) {
      return _loadProvider.apply(this, arguments);
    }

    function _loadProvider() {
      _loadProvider = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(id) {
        var dependencyTree, addProviderToDependency, generateProviderLoader, runProviderLoader, _runProviderLoader, loadProviderWithCheckConflict, _loadProviderWithCheckConflict;

        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _loadProviderWithCheckConflict = function _loadProviderWithChec2() {
                  _loadProviderWithCheckConflict = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(id) {
                    var loader;
                    return regenerator.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            //console.log(["loadProviderWithCheckConflict", id]);
                            loader = generateProviderLoader(id, loadProviderWithCheckConflict);
                            _context2.next = 3;
                            return runProviderLoader(loader);

                          case 3:
                            return _context2.abrupt("return", _context2.sent);

                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                  return _loadProviderWithCheckConflict.apply(this, arguments);
                };

                loadProviderWithCheckConflict = function _loadProviderWithChec(_x3) {
                  return _loadProviderWithCheckConflict.apply(this, arguments);
                };

                _runProviderLoader = function _runProviderLoader3() {
                  _runProviderLoader = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(loader) {
                    var resource, opts;
                    return regenerator.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            checkOption(loader.option);
                            loader.status = "detect";
                            _context.next = 4;
                            return runDetectProviderByOption(loader);

                          case 4:
                            resource = _context.sent;

                            if (!(resource === true)) {
                              _context.next = 7;
                              break;
                            }

                            return _context.abrupt("return", resource);

                          case 7:
                            if (!isValidReturnResource(resource)) {
                              _context.next = 9;
                              break;
                            }

                            return _context.abrupt("return", resource);

                          case 9:
                            opts = loader.option.opts || {};
                            _context.next = 12;
                            return loadPromise(loader.option.src, opts);

                          case 12:
                            loader.script = _context.sent;
                            loader.status = "load";
                            _context.next = 16;
                            return runDetectProviderByOption(loader);

                          case 16:
                            return _context.abrupt("return", _context.sent);

                          case 17:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));
                  return _runProviderLoader.apply(this, arguments);
                };

                runProviderLoader = function _runProviderLoader2(_x2) {
                  return _runProviderLoader.apply(this, arguments);
                };

                generateProviderLoader = function _generateProviderLoad(id, loadProviderFunction) {
                  var dependencyTreeId = addProviderToDependency(id);
                  var loader = {
                    dependencyTreeId: dependencyTreeId,
                    id: id,
                    option: get(id),
                    status: "init",
                    script: null,
                    loadProvider: loadProviderFunction
                  };
                  return loader;
                };

                addProviderToDependency = function _addProviderToDepende(id) {
                  var recursiveCount = 0;
                  var recursiveMaxAllow = config.get("loadProviderDependencyMaxRecusiveAllow");

                  for (var i = 0; i < dependencyTree.length; i++) {
                    if (id !== dependencyTree[i]) {
                      continue;
                    }

                    recursiveCount++; //console.error([recursiveCount, dependencyTree.length]);

                    if (recursiveCount <= recursiveMaxAllow) {
                      continue;
                    }

                    throw new Error("Recursive provider dependency detect, abort as reaching config 'loadProviderDependencyMaxRecusiveAllow'. Recursive provider chain: " + dependencyTree.join(" -> ") + " -> " + id + " [STOP AT THIS]");
                  }

                  dependencyTree.push(id);
                  return dependencyTree.length - 1;
                };

                dependencyTree = [];
                _context3.next = 9;
                return loadProviderWithCheckConflict(id);

              case 9:
                return _context3.abrupt("return", _context3.sent);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return _loadProvider.apply(this, arguments);
    }

    var loadScript = {};
    loadScript.load = loadPromise;
    loadScript.loadTraditionMode = load;
    loadScript.setProvider = set;
    loadScript.loadProvider = loadProvider;
    loadScript.providerListStore = providerListStore$1;
    loadScript.dataScriptMark = dataScriptMark;
    loadScript.findScriptDomsBySrc = findScriptDomsBySrc;
    loadScript.config = config;

    return loadScript;

}());
