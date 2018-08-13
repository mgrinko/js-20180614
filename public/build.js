/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

var _phonesPage = _interopRequireDefault(__webpack_require__(2));

new _phonesPage.default({
  element: document.querySelector('[data-page-container]')
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(3));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(6));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var _phoneCatalog = _interopRequireDefault(__webpack_require__(9));

var _phoneViewer = _interopRequireDefault(__webpack_require__(17));

var _phonesFilter = _interopRequireDefault(__webpack_require__(20));

var _shoppingCart = _interopRequireDefault(__webpack_require__(21));

var _phoneService = _interopRequireDefault(__webpack_require__(22));

var PhonesPage =
/*#__PURE__*/
function () {
  function PhonesPage(_ref) {
    var element = _ref.element;
    (0, _classCallCheck2.default)(this, PhonesPage);
    this._element = element;

    this._render();

    this._initCatalog();

    this._initViewer();

    this._initShoppingCart();

    this._initFilters();
  }

  (0, _createClass2.default)(PhonesPage, [{
    key: "_initCatalog",
    value: function _initCatalog() {
      var _this = this;

      this._catalog = new _phoneCatalog.default({
        element: this._element.querySelector('[data-component="phone-catalog"]')
      });

      _phoneService.default.getAll().then(function (phones) {
        _this._catalog.showPhones(phones);
      });

      this._catalog.on('phoneSelected', function (event) {
        var phoneId = event.detail;

        _phoneService.default.get(phoneId).then(function (phone) {
          _this._catalog.hide();

          _this._viewer.showPhone(phone);
        });
      });

      this._catalog.on('addToShoppingCart', function (event) {
        var phoneId = event.detail;

        _this._shoppingCart.addItem(phoneId);
      });
    }
  }, {
    key: "_initViewer",
    value: function _initViewer() {
      var _this2 = this;

      this._viewer = new _phoneViewer.default({
        element: this._element.querySelector('[data-component="phone-viewer"]')
      });

      this._viewer.on('back', function () {
        _this2._viewer.hide();

        _this2._catalog.show();
      });

      this._viewer.on('add', function (event) {
        var phoneId = event.detail;

        _this2._shoppingCart.addItem(phoneId);
      });
    }
  }, {
    key: "_initShoppingCart",
    value: function _initShoppingCart() {
      this._shoppingCart = new _shoppingCart.default({
        element: this._element.querySelector('[data-component="shopping-cart"]')
      });
    }
  }, {
    key: "_initFilters",
    value: function _initFilters() {
      var _this3 = this;

      this._filter = new _phonesFilter.default({
        element: this._element.querySelector('[data-component="phones-filter"]')
      });

      this._filter.on('sort',
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(event) {
          var phones;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _phoneService.default.getAll({
                    orderField: event.detail
                  });

                case 2:
                  phones = _context.sent;

                  _this3._catalog.showPhones(phones);

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());

      this._filter.on('search',
      /*#__PURE__*/
      function () {
        var _ref3 = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee2(event) {
          var phones;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _phoneService.default.getAll({
                    query: event.detail
                  }).catch(function (e) {
                    return console.log(e);
                  });

                case 2:
                  phones = _context2.sent;

                  _this3._catalog.showPhones(phones);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function (_x2) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "_render",
    value: function _render() {
      this._element.innerHTML = "\n      <div class=\"container-fluid\">\n        <div class=\"row\">\n      \n          <!--Sidebar-->\n          <div class=\"col-md-2\">\n            <section>\n              <div data-component=\"phones-filter\"></div>\n            </section>\n      \n            <section>\n              <div data-component=\"shopping-cart\"></div>\n            </section>\n          </div>\n      \n          <!--Main content-->\n          <div class=\"col-md-10\">\n            <div data-component=\"phone-catalog\"></div>\n            <div data-component=\"phone-viewer\" class=\"js-hidden\"></div>\n          </div>\n        </div>\n      </div>\n    ";
    }
  }]);
  return PhonesPage;
}();

exports.default = PhonesPage;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(5);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

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
  runtime.wrap = wrap;

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
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
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
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
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
        return new Promise(function(resolve, reject) {
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
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
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
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
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
        context.arg = undefined;
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

  Gp[toStringTagSymbol] = "Generator";

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

  runtime.keys = function(object) {
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

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
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
          context.arg = undefined;
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
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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

module.exports = _asyncToGenerator;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(10));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(13));

var _inherits2 = _interopRequireDefault(__webpack_require__(14));

var _component = _interopRequireDefault(__webpack_require__(16));

var PhoneCatalog =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PhoneCatalog, _Component);

  function PhoneCatalog(_ref) {
    var _this;

    var element = _ref.element;
    (0, _classCallCheck2.default)(this, PhoneCatalog);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PhoneCatalog).call(this, {
      element: element
    }));

    _this.on('click', '[data-element="phone-link"]', function (event) {
      var phoneLink = event.delegateTarget;
      var phoneElement = phoneLink.closest('[data-element="phone"]');

      _this._trigger('phoneSelected', phoneElement.dataset.phoneId);
    });

    _this.on('click', '[data-element="button-add"]', function (event) {
      var addButton = event.delegateTarget;
      var phoneElement = addButton.closest('[data-element="phone"]');

      _this._trigger('addToShoppingCart', phoneElement.dataset.phoneId);
    });

    return _this;
  }

  (0, _createClass2.default)(PhoneCatalog, [{
    key: "showPhones",
    value: function showPhones(phones) {
      this._phones = phones;

      this._render();

      this.show();
    }
  }, {
    key: "_render",
    value: function _render() {
      this._element.innerHTML = "\n      <ul class=\"phones\">\n        ".concat(this._phones.map(function (phone) {
        return "\n        \n          <li\n            class=\"thumbnail\"\n            data-element=\"phone\"\n            data-phone-id=\"".concat(phone.id, "\"\n          >\n            <a\n              href=\"#!/phones/").concat(phone.id, "\"\n              class=\"thumb\"\n              data-element=\"phone-link\"\n            >\n              <img alt=\"").concat(phone.name, "\" src=\"").concat(phone.imageUrl, "\">\n            </a>\n  \n            <div class=\"phones__btn-buy-wrapper\">\n              <a class=\"btn btn-success\" data-element=\"button-add\">\n                Add\n              </a>\n            </div>\n  \n            <a \n              href=\"#!/phones/").concat(phone.id, "\"\n              data-element=\"phone-link\"\n            >\n              ").concat(phone.name, "\n            </a>\n            \n            <p>").concat(phone.snippet, "</p>\n          </li>\n        \n        ");
      }).join(''), "\n      </ul>\n    ");
    }
  }]);
  return PhoneCatalog;
}(_component.default);

exports.default = PhoneCatalog;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(11);

var assertThisInitialized = __webpack_require__(12);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(15);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var HIDDEN_CLASS = 'js-hidden';

var Component =
/*#__PURE__*/
function () {
  function Component(_ref) {
    var element = _ref.element;
    (0, _classCallCheck2.default)(this, Component);
    this._element = element;
  }

  (0, _createClass2.default)(Component, [{
    key: "show",
    value: function show() {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }, {
    key: "hide",
    value: function hide() {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }, {
    key: "_trigger",
    value: function _trigger(eventName, data) {
      var customEvent = new CustomEvent(eventName, {
        detail: data
      });

      this._element.dispatchEvent(customEvent);
    }
  }, {
    key: "on",
    value: function on(eventName, selector, callback) {
      if (!callback) {
        callback = selector;

        this._element.addEventListener(eventName, callback);

        return;
      }

      this._element.addEventListener(eventName, function (event) {
        var delegateTarget = event.target.closest(selector);

        if (!delegateTarget) {
          return;
        }

        event.delegateTarget = delegateTarget;
        callback(event);
      });
    }
  }]);
  return Component;
}();

exports.default = Component;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(10));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(13));

var _get2 = _interopRequireDefault(__webpack_require__(18));

var _inherits2 = _interopRequireDefault(__webpack_require__(14));

var _component = _interopRequireDefault(__webpack_require__(16));

var PhoneViewer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PhoneViewer, _Component);

  function PhoneViewer(_ref) {
    var _this;

    var element = _ref.element;
    (0, _classCallCheck2.default)(this, PhoneViewer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PhoneViewer).call(this, {
      element: element
    }));

    _this.on('click', '[data-element="button-back"]', function () {
      _this._trigger('back');
    });

    _this.on('click', '[data-element="button-add"]', function () {
      _this._trigger('add', _this._phone.id);
    });

    return _this;
  }

  (0, _createClass2.default)(PhoneViewer, [{
    key: "showPhone",
    value: function showPhone(phone) {
      this._phone = phone;

      this._render(phone);

      (0, _get2.default)((0, _getPrototypeOf2.default)(PhoneViewer.prototype), "show", this).call(this);
    }
  }, {
    key: "_render",
    value: function _render(phone) {
      this._element.innerHTML = "\n      <img class=\"phone\" src=\"".concat(phone.images[0], "\">\n\n      <button data-element=\"button-back\">Back</button>\n      <button data-element=\"button-add\">Add to basket</button>\n  \n  \n      <h1>").concat(phone.name, "</h1>\n\n      <p>").concat(phone.description, "</p>  \n  \n      <ul class=\"phone-thumbs\">\n        ").concat(phone.images.map(function (image) {
        return "\n\n          <li>\n            <img src=\"".concat(image, "\">\n          </li>\n          \n        ");
      }).join(''), "\n      </ul>\n    ");
    }
  }]);
  return PhoneViewer;
}(_component.default);

exports.default = PhoneViewer;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(13);

var superPropBase = __webpack_require__(19);

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(13);

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(10));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(13));

var _inherits2 = _interopRequireDefault(__webpack_require__(14));

var _component = _interopRequireDefault(__webpack_require__(16));

var PhoneFilters =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PhoneFilters, _Component);

  function PhoneFilters(_ref) {
    var _this;

    var element = _ref.element;
    (0, _classCallCheck2.default)(this, PhoneFilters);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PhoneFilters).call(this, {
      element: element
    }));

    _this._render();

    window.handlePhonesSort = function (event) {
      _this._trigger('sort', event.target.value);
    };

    window.handlePhonesSearch = function (event) {
      _this._trigger('search', event.target.value);
    };

    return _this;
  }

  (0, _createClass2.default)(PhoneFilters, [{
    key: "handlePhonesSort",
    value: function handlePhonesSort(event) {}
  }, {
    key: "_render",
    value: function _render() {
      this._element.innerHTML = "\n      <p>\n        Search:\n        <input\n          oninput=\"window.handlePhonesSearch(event)\"\n          type=\"text\"\n        >\n      </p>\n\n      <p>\n        Sort by:\n        <select onchange=\"window.handlePhonesSort(event)\">\n          <option value=\"name\">Alphabetical</option>\n          <option value=\"age\">Newest</option>\n        </select>\n      </p>\n    ";
    }
  }]);
  return PhoneFilters;
}(_component.default);

exports.default = PhoneFilters;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(10));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(13));

var _inherits2 = _interopRequireDefault(__webpack_require__(14));

var _component = _interopRequireDefault(__webpack_require__(16));

var ShoppingCart =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ShoppingCart, _Component);

  function ShoppingCart(_ref) {
    var _this;

    var element = _ref.element;
    (0, _classCallCheck2.default)(this, ShoppingCart);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ShoppingCart).call(this, {
      element: element
    }));
    _this._items = {};

    _this._render();

    _this.on('click', '[data-element="button-remove"]', function (event) {
      var item = event.delegateTarget.dataset.item;

      _this.removeItem(item);
    });

    return _this;
  }

  (0, _createClass2.default)(ShoppingCart, [{
    key: "addItem",
    value: function addItem(item) {
      if (!this._items[item]) {
        this._items[item] = 0;
      }

      this._items[item]++;

      this._render();
    }
  }, {
    key: "removeItem",
    value: function removeItem(item) {
      if (this._items[item]) {
        this._items[item]--;
      }

      if (this._items[item] === 0) {
        delete this._items[item];
      }

      this._render();
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this2 = this;

      this._element.innerHTML = "\n      <p>Shopping Cart</p>\n      <ul>\n        ".concat(Object.keys(this._items).map(function (item) {
        return "\n        \n          <li>\n            ".concat(item, " (").concat(_this2._items[item], ")\n            <button\n              data-element=\"button-remove\"\n              data-item=\"").concat(item, "\"\n            >\n              x\n            </button>\n          </li>\n        \n        ");
      }).join(''), "\n      </ul>\n    ");
    }
  }]);
  return ShoppingCart;
}(_component.default);

exports.default = ShoppingCart;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpService = _interopRequireDefault(__webpack_require__(23));

var PhoneService = {
  getAll: function getAll() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$query = _ref.query,
        query = _ref$query === void 0 ? '' : _ref$query,
        _ref$orderField = _ref.orderField,
        orderField = _ref$orderField === void 0 ? '' : _ref$orderField;

    return _httpService.default.sendRequest('phones.json').then(function (phones) {
      var filteredPhones = _this._filter(phones, query);

      var sortedPhones = _this._sort(filteredPhones, orderField);

      return sortedPhones;
    });
  },
  get: function get(phoneId) {
    return _httpService.default.sendRequest("phones/".concat(phoneId, ".json"));
  },
  _filter: function _filter(phones, query) {
    var lowerQuery = query.toLowerCase();
    return phones.filter(function (phone) {
      return phone.name.toLowerCase().includes(lowerQuery);
    });
  },
  _sort: function _sort(phones, field) {
    return phones.sort(function (a, b) {
      return a[field] > b[field] ? 1 : -1;
    });
  }
};
var _default = PhoneService; // function getAcademy (subdomain, successCallback, errorCallback) {}
// function getUser (token, successCallback) {}
// function getCourse (courseId, successCallback) {}
// function getUserCourse (userId, courseId, successCallback) {}
//
//
// getUser('qweqweqweqwe', (user) => {
//   if (!academy) {
//     return
//   }
//
// }, () => {})
//
//
// getAcademy('academy', (academy) => {
//   if (!user) {
//     return
//   }
//
//   if (!user.hasAccessTo(academy) ) {
//     // redirect to error page
//   }
//
//   getCourse(123, (course) => {
//     getUserCourse(user.id, course.id, (progress) => {
//
//       getTopic(progress.lastTopicId, (topic) => {
//         renderTopic(topic)
//       }, () => {})
//     }, () => {})
//   }, () => {})
// }, () => {})
//
// getAcademy()
//   .then(academy => {
//
//     return getUser()
//   })
//   .then(user => {
//
//     return getCourse()
//   })
//   .then(course => {
//
//
//     return getUserCourse()
//   })
//   .catch(() => {})
//
//
// if (academy) {
//   return
// }
//
// let user = getuser()
// let user = getuser()
// let user = getuser()
// let user = getuser()
// let user = getuser()

exports.default = _default;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

// const API_URL = 'https://mgrinko.github.io/js-20180614/api/'
var API_URL = '/api/';
var HttpService = {
  sendRequest: function sendRequest(url) {
    return fetch(API_URL + url).then(function (response) {
      return response.json();
    }); // return new Promise((resolve, reject) => {
    //   let method = 'GET';
    //   let xhr = new XMLHttpRequest();
    //
    //   xhr.open(method, API_URL + url, true);
    //   xhr.send();
    //
    //   xhr.onload = () => {
    //     if (xhr.status !== 200) {
    //       reject(new Error(xhr.status + ': ' + xhr.statusText));
    //
    //       return;
    //     }
    //
    //     let responseData = JSON.parse(xhr.responseText);
    //
    //     resolve(responseData);
    //   };
    //
    //   xhr.onerror = () => {
    //     reject(new Error(xhr.status + ': ' + xhr.statusText));
    //   }
    // })
  }
};
var _default = HttpService;
exports.default = _default;

var MyPromise =
/*#__PURE__*/
function () {
  function MyPromise(behaviorFunction) {
    (0, _classCallCheck2.default)(this, MyPromise);
    this._result = null;
    this._status = 'pending';
    this._successCallbacks = [];
    this._errorCallbacks = [];
    behaviorFunction(this._resolve.bind(this), this._reject.bind(this));
  }

  (0, _createClass2.default)(MyPromise, [{
    key: "then",
    value: function then(successCallback, errorCallback) {
      if (this._status === 'fulfilled') {
        successCallback(this._result);
      } else if (this._status === 'rejected') {
        errorCallback(this._result);
      } else {
        this._successCallbacks.push(successCallback);

        this._errorCallbacks.push(errorCallback);
      }

      return new MyPromise(function () {// ...
      });
    }
  }, {
    key: "catch",
    value: function _catch(errorCallback) {
      if (this._status === 'rejected') {
        errorCallback(this._result);
      } else {
        this._errorCallbacks.push(errorCallback);
      }
    }
  }, {
    key: "_resolve",
    value: function _resolve(data) {
      this._status = 'fulfilled';
      this._result = data;

      this._successCallbacks.forEach(function (callback) {
        callback(data);
      });
    }
  }, {
    key: "_reject",
    value: function _reject(error) {
      this._status = 'rejected';
      this._result = error;

      this._errorCallbacks.forEach(function (callback) {
        callback(error);
      });
    }
  }]);
  return MyPromise;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map