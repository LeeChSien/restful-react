'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var debounce = _interopDefault(require('lodash/debounce'));
var isEqual$1 = _interopDefault(require('lodash/isEqual'));
var qs = require('qs');
var qs__default = _interopDefault(qs);
var React = require('react');
var noop = _interopDefault(require('lodash/noop'));
var url = _interopDefault(require('url'));
var merge = _interopDefault(require('lodash/merge'));
var equal = _interopDefault(require('react-fast-compare'));
var isEqualWith = _interopDefault(require('lodash/isEqualWith'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var Context = /*#__PURE__*/React.createContext({
  base: "",
  parentPath: "",
  resolve: function resolve(data) {
    return data;
  },
  requestOptions: {},
  onError: noop,
  onRequest: noop,
  onResponse: noop,
  queryParams: {},
  queryParamStringifyOptions: {}
});

var RestfulReactProvider = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(RestfulReactProvider, _React$Component);

  function RestfulReactProvider() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = RestfulReactProvider.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        value = _objectWithoutPropertiesLoose(_this$props, ["children"]);

    return React.createElement(Context.Provider, {
      value: _extends({
        onError: noop,
        onRequest: noop,
        onResponse: noop,
        resolve: function resolve(data) {
          return data;
        },
        requestOptions: {},
        parentPath: "",
        queryParams: value.queryParams || {},
        queryParamStringifyOptions: value.queryParamStringifyOptions || {}
      }, value)
    }, children);
  };

  return RestfulReactProvider;
}(React.Component);
RestfulReactProvider.displayName = "RestfulProviderContext";
var RestfulReactConsumer = Context.Consumer;

var composeUrl = function composeUrl(base, parentPath, path) {
  if (base === void 0) {
    base = "";
  }

  if (parentPath === void 0) {
    parentPath = "";
  }

  if (path === void 0) {
    path = "";
  }

  var composedPath = composePath(parentPath, path);
  /* If the base is empty, preceding slash will be trimmed during composition */

  if (base === "" && composedPath.startsWith("/")) {
    return composedPath;
  }
  /* If the base contains a trailing slash, it will be trimmed during composition */


  return base.endsWith("/") ? "" + base.slice(0, -1) + composedPath : "" + base + composedPath;
};
/**
 * If the path starts with slash, it is considered as absolute url.
 * If not, it is considered as relative url.
 * For example,
 * parentPath = "/someBasePath" and path = "/absolute" resolves to "/absolute"
 * whereas,
 * parentPath = "/someBasePath" and path = "relative" resolves to "/someBasePath/relative"
 */

var composePath = function composePath(parentPath, path) {
  if (parentPath === void 0) {
    parentPath = "";
  }

  if (path === void 0) {
    path = "";
  }

  if (path.startsWith("/") && path.length > 1) {
    return url.resolve(parentPath, path);
  } else if (path !== "" && path !== "/") {
    return parentPath + "/" + path;
  } else {
    return parentPath;
  }
};

var processResponse = function processResponse(response) {
  try {
    if (response.status === 204) {
      return Promise.resolve({
        data: undefined,
        responseError: false
      });
    }

    if ((response.headers.get("content-type") || "").includes("application/json")) {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(response.json()).then(function (_response$json) {
          return {
            data: _response$json,
            responseError: false
          };
        });
      }, function (e) {
        return {
          data: e.message,
          responseError: true
        };
      }));
    } else if ((response.headers.get("content-type") || "").includes("text/plain") || (response.headers.get("content-type") || "").includes("text/html")) {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(response.text()).then(function (_response$text) {
          return {
            data: _response$text,
            responseError: false
          };
        });
      }, function (e) {
        return {
          data: e.message,
          responseError: true
        };
      }));
    } else {
      return Promise.resolve({
        data: response,
        responseError: false
      });
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

var resolveData = function resolveData(_ref) {
  var data = _ref.data,
      resolve = _ref.resolve;

  try {
    var _temp5 = function _temp5() {
      return {
        data: resolvedData,
        error: resolveError
      };
    };

    var resolvedData = null;
    var resolveError = null;

    var _temp6 = _catch(function () {
      var _temp2 = function () {
        if (resolve) {
          var _temp7 = function _temp7(_resolvedDataOrPromis) {
            resolvedData = _resolvedDataOrPromis;
          };

          var resolvedDataOrPromise = resolve(data);
          var _resolvedDataOrPromis3 = resolvedDataOrPromise.then;
          return _resolvedDataOrPromis3 ? Promise.resolve(resolvedDataOrPromise).then(_temp7) : _temp7(resolvedDataOrPromise);
        } else {
          resolvedData = data;
        }
      }();

      if (_temp2 && _temp2.then) return _temp2.then(function () {});
    }, function (err) {
      resolvedData = null;
      resolveError = {
        message: "RESOLVE_ERROR",
        data: JSON.stringify(err)
      };
    });

    return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(_temp5) : _temp5(_temp6));
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 * The <Get /> component without Context. This
 * is a named class because it is useful in
 * debugging.
 */

var ContextlessGet = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ContextlessGet, _React$Component);

  function ContextlessGet(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    /**
     * Abort controller to cancel the current fetch query
     */

    _this.abortController = new AbortController();
    _this.signal = _this.abortController.signal;
    _this.state = {
      data: null,
      response: null,
      loading: !_this.props.lazy,
      error: null
    };

    _this.getRequestOptions = function (url, extraOptions, extraHeaders) {
      try {
        var _temp3 = function _temp3(_result) {
          return _exit2 ? _result : _extends({}, extraOptions, requestOptions, {
            headers: new Headers(_extends({}, typeof extraHeaders !== "boolean" ? extraHeaders : {}, (extraOptions || {}).headers, (requestOptions || {}).headers))
          });
        };

        var _exit2 = false;
        var requestOptions = _this.props.requestOptions;

        var _temp4 = function () {
          if (typeof requestOptions === "function") {
            return Promise.resolve(requestOptions(url, "GET")).then(function (options) {
              _exit2 = true;
              return _extends({}, extraOptions, options, {
                headers: new Headers(_extends({}, typeof extraHeaders !== "boolean" ? extraHeaders : {}, (extraOptions || {}).headers, options.headers))
              });
            });
          }
        }();

        return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
      } catch (e) {
        return Promise.reject(e);
      }
    };

    _this.fetch = function (requestPath, thisRequestOptions) {
      try {
        var _this$props = _this.props,
            base = _this$props.base,
            __internal_hasExplicitBase = _this$props.__internal_hasExplicitBase,
            parentPath = _this$props.parentPath,
            path = _this$props.path,
            resolve = _this$props.resolve,
            onError = _this$props.onError,
            onRequest = _this$props.onRequest,
            onResponse = _this$props.onResponse;

        if (_this.state.error || !_this.state.loading) {
          _this.setState(function () {
            return {
              error: null,
              loading: true
            };
          });
        }

        var makeRequestPath = function makeRequestPath() {
          var url;

          if (__internal_hasExplicitBase) {
            url = composeUrl(base, "", path || "");
          } else {
            url = composeUrl(base, parentPath, requestPath || path || "");
          } // We use ! because it's in defaultProps


          if (Object.keys(_this.props.queryParams).length) {
            url += "?" + qs.stringify(_this.props.queryParams);
          }

          return url;
        };

        return Promise.resolve(_this.getRequestOptions(makeRequestPath(), thisRequestOptions)).then(function (_this$getRequestOptio) {
          var request = new Request(makeRequestPath(), _this$getRequestOptio);
          if (onRequest) onRequest(request);
          return _catch(function () {
            return Promise.resolve(fetch(request, {
              signal: _this.signal
            })).then(function (response) {
              if (onResponse) onResponse(response.clone());
              return Promise.resolve(processResponse(response)).then(function (_ref) {
                var data = _ref.data,
                    responseError = _ref.responseError;

                // avoid state updates when component has been unmounted
                if (_this.signal.aborted) {
                  return;
                }

                if (!response.ok || responseError) {
                  var error = {
                    message: "Failed to fetch: " + response.status + " " + response.statusText + (responseError ? " - " + data : ""),
                    data: data,
                    status: response.status
                  };

                  _this.setState({
                    loading: false,
                    error: error
                  });

                  if (!_this.props.localErrorOnly && onError) {
                    onError(error, function () {
                      return _this.fetch(requestPath, thisRequestOptions);
                    }, response);
                  }

                  return null;
                }

                return Promise.resolve(resolveData({
                  data: data,
                  resolve: resolve
                })).then(function (resolved) {
                  _this.setState({
                    loading: false,
                    data: resolved.data,
                    error: resolved.error
                  });

                  return data;
                });
              });
            });
          }, function (e) {
            // avoid state updates when component has been unmounted
            // and when fetch/processResponse threw an error
            if (_this.signal.aborted) {
              return;
            }

            _this.setState({
              loading: false,
              error: {
                message: "Failed to fetch: " + e.message,
                data: e
              }
            });
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };

    if (typeof props.debounce === "object") {
      _this.fetch = debounce(_this.fetch, props.debounce.wait, props.debounce.options);
    } else if (typeof props.debounce === "number") {
      _this.fetch = debounce(_this.fetch, props.debounce);
    } else if (props.debounce) {
      _this.fetch = debounce(_this.fetch);
    }

    return _this;
  }

  var _proto = ContextlessGet.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (!this.props.lazy) {
      this.fetch();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var base = prevProps.base,
        parentPath = prevProps.parentPath,
        path = prevProps.path,
        resolve = prevProps.resolve,
        queryParams = prevProps.queryParams,
        requestOptions = prevProps.requestOptions;

    if (base !== this.props.base || parentPath !== this.props.parentPath || path !== this.props.path || !isEqual$1(queryParams, this.props.queryParams) || // both `resolve` props need to _exist_ first, and then be equivalent.
    resolve && this.props.resolve && resolve.toString() !== this.props.resolve.toString() || requestOptions && this.props.requestOptions && requestOptions.toString() !== this.props.requestOptions.toString()) {
      if (!this.props.lazy) {
        this.fetch();
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.abortController.abort();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        wait = _this$props2.wait,
        path = _this$props2.path,
        base = _this$props2.base,
        parentPath = _this$props2.parentPath;
    var _this$state = this.state,
        data = _this$state.data,
        error = _this$state.error,
        loading = _this$state.loading,
        response = _this$state.response;

    if (wait && data === null && !error) {
      return React.createElement(React.Fragment, null); // Show nothing until we have data.
    }

    return children(data, {
      loading: loading,
      error: error
    }, {
      refetch: this.fetch
    }, {
      response: response,
      absolutePath: composeUrl(base, parentPath, path)
    });
  };

  return ContextlessGet;
}(React.Component);

ContextlessGet.defaultProps = {
  base: "",
  parentPath: "",
  resolve: function resolve(unresolvedData) {
    return unresolvedData;
  },
  queryParams: {}
};
/**
 * The <Get /> component _with_ context.
 * Context is used to compose path props,
 * and to maintain the base property against
 * which all requests will be made.
 *
 * We compose Consumers immediately with providers
 * in order to provide new `parentPath` props that contain
 * a segment of the path, creating composable URLs.
 */

function Get(props) {
  return React.createElement(RestfulReactConsumer, null, function (contextProps) {
    return React.createElement(RestfulReactProvider, Object.assign({}, contextProps, {
      parentPath: composePath(contextProps.parentPath, props.path)
    }), React.createElement(ContextlessGet, Object.assign({}, contextProps, props, {
      queryParams: _extends({}, contextProps.queryParams, props.queryParams),
      __internal_hasExplicitBase: Boolean(props.base)
    })));
  });
}

/**
 * The <Poll /> component without context.
 */

var ContextlessPoll = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ContextlessPoll, _React$Component);

  function ContextlessPoll() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.state = {
      data: null,
      previousData: null,
      loading: !_this.props.lazy,
      lastResponse: null,
      polling: !_this.props.lazy,
      finished: false,
      error: null
    };
    _this.keepPolling = !_this.props.lazy;
    /**
     * Abort controller to cancel the current fetch query
     */

    _this.abortController = new AbortController();
    _this.signal = _this.abortController.signal;

    _this.isModified = function (response, nextData) {
      if (response.status === 304) {
        return false;
      }

      if (equal(_this.state.data, nextData)) {
        return false;
      }

      return true;
    };

    _this.getRequestOptions = function (url) {
      return typeof _this.props.requestOptions === "function" ? _this.props.requestOptions(url, "GET") : _this.props.requestOptions || {};
    }; // 304 is not a OK status code but is green in Chrome 🤦🏾‍♂️


    _this.isResponseOk = function (response) {
      return response.ok || response.status === 304;
    };
    /**
     * This thing does the actual poll.
     */


    _this.cycle = function () {
      try {
        var _temp3 = function _temp3(_result) {
          if (_exit2) return _result;
          // If we should keep going,
          var _this$props = _this.props,
              base = _this$props.base,
              path = _this$props.path,
              interval = _this$props.interval,
              wait = _this$props.wait,
              onError = _this$props.onError,
              onRequest = _this$props.onRequest,
              onResponse = _this$props.onResponse;
          var lastPollIndex = _this.state.lastPollIndex;
          var url = composeUrl(base, "", path); // We use a ! because it's in defaultProps

          if (Object.keys(_this.props.queryParams).length) {
            url += "?" + qs.stringify(_this.props.queryParams);
          }

          return Promise.resolve(_this.getRequestOptions(url)).then(function (requestOptions) {
            var request = new Request(url, _extends({}, requestOptions, {
              headers: _extends({
                Prefer: "wait=" + wait + "s;" + (lastPollIndex ? "index=" + lastPollIndex : "")
              }, requestOptions.headers)
            }));
            if (onRequest) onRequest(request);
            return _catch(function () {
              return Promise.resolve(fetch(request, {
                signal: _this.signal
              })).then(function (response) {
                if (onResponse) onResponse(response.clone());
                return Promise.resolve(processResponse(response)).then(function (_ref) {
                  var data = _ref.data,
                      responseError = _ref.responseError;

                  if (!_this.keepPolling || _this.signal.aborted) {
                    // Early return if we have stopped polling or component was unmounted
                    // to avoid memory leaks
                    return;
                  }

                  if (!_this.isResponseOk(response) || responseError) {
                    var error = {
                      message: "Failed to poll: " + response.status + " " + response.statusText + (responseError ? " - " + data : ""),
                      data: data,
                      status: response.status
                    };

                    _this.setState({
                      loading: false,
                      lastResponse: response,
                      error: error
                    });

                    if (!_this.props.localErrorOnly && onError) {
                      onError(error, function () {
                        return Promise.resolve();
                      }, response);
                    }
                  } else if (_this.isModified(response, data)) {
                    _this.setState(function (prevState) {
                      return {
                        loading: false,
                        lastResponse: response,
                        previousData: prevState.data,
                        data: data,
                        error: null,
                        lastPollIndex: response.headers.get("x-polling-index") || undefined
                      };
                    });
                  } // Wait for interval to pass.


                  return Promise.resolve(new Promise(function (resolvePromise) {
                    return setTimeout(resolvePromise, interval);
                  })).then(function () {
                    _this.cycle(); // Do it all again!

                  });
                });
              });
            }, function () {});
          });
        };

        var _exit2 = false;

        // Have we stopped?
        if (!_this.keepPolling) {
          return Promise.resolve(); // stop.
        } // Should we stop?


        var _temp4 = function () {
          if (_this.props.until && _this.props.until(_this.state.data, _this.state.lastResponse)) {
            return Promise.resolve(_this.stop()).then(function () {
              // stop.
              _exit2 = true;
            });
          }
        }();

        return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
      } catch (e) {
        return Promise.reject(e);
      }
    };

    _this.start = function () {
      _this.keepPolling = true;

      if (!_this.state.polling) {
        _this.setState(function () {
          return {
            polling: true
          };
        }); // let everyone know we're done here.

      }

      _this.cycle();
    };

    _this.stop = function () {
      _this.keepPolling = false;

      _this.setState(function () {
        return {
          polling: false,
          finished: true
        };
      }); // let everyone know we're done here.

    };

    return _this;
  }

  var _proto = ContextlessPoll.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props2 = this.props,
        path = _this$props2.path,
        lazy = _this$props2.lazy;

    if (path === undefined) {
      throw new Error("[restful-react]: You're trying to poll something without a path. Please specify a \"path\" prop on your Poll component.");
    }

    if (!lazy) {
      this.start();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    // Cancel the current query
    this.abortController.abort(); // Stop the polling cycle

    this.stop();
  };

  _proto.render = function render() {
    var _this$state = this.state,
        response = _this$state.lastResponse,
        previousData = _this$state.previousData,
        data = _this$state.data,
        polling = _this$state.polling,
        loading = _this$state.loading,
        error = _this$state.error,
        finished = _this$state.finished;
    var _this$props3 = this.props,
        children = _this$props3.children,
        base = _this$props3.base,
        path = _this$props3.path,
        resolve = _this$props3.resolve;
    var meta = {
      response: response,
      absolutePath: composeUrl(base, "", path)
    };
    var states = {
      polling: polling,
      loading: loading,
      error: error,
      finished: finished
    };
    var actions = {
      stop: this.stop,
      start: this.start
    }; // data is parsed only when poll has already resolved so response is defined

    var resolvedData = response && resolve ? resolve(data, previousData) : data;
    return children(resolvedData, states, actions, meta);
  };

  return ContextlessPoll;
}(React.Component);

ContextlessPoll.defaultProps = {
  interval: 1000,
  wait: 60,
  base: "",
  resolve: function resolve(data) {
    return data;
  },
  queryParams: {}
};

function Poll(props) {
  // Compose Contexts to allow for URL nesting
  return React.createElement(RestfulReactConsumer, null, function (contextProps) {
    return React.createElement(ContextlessPoll, Object.assign({}, contextProps, props, {
      queryParams: _extends({}, contextProps.queryParams, props.queryParams),
      requestOptions: function (url, method) {
        try {
          var _temp9 = function _temp9(contextRequestOptions) {
            function _temp7(propsRequestOptions) {
              return merge(contextRequestOptions, propsRequestOptions);
            }

            var _temp6 = typeof props.requestOptions === "function";

            return _temp6 ? Promise.resolve(props.requestOptions(url, method)).then(_temp7) : _temp7(props.requestOptions || {});
          };

          var _temp10 = typeof contextProps.requestOptions === "function";

          return Promise.resolve(_temp10 ? Promise.resolve(contextProps.requestOptions(url, method)).then(_temp9) : _temp9(contextProps.requestOptions || {}));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }));
  });
}

/**
 * The <Mutate /> component without Context. This
 * is a named class because it is useful in
 * debugging.
 */

var ContextlessMutate = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ContextlessMutate, _React$Component);

  function ContextlessMutate() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.state = {
      loading: false,
      error: null
    };
    /**
     * Abort controller to cancel the current fetch query
     */

    _this.abortController = new AbortController();
    _this.signal = _this.abortController.signal;

    _this.mutate = function (body, mutateRequestOptions) {
      try {
        var _temp6 = function _temp6(_providerRequestOptio) {
          function _temp4(_providerRequestOptio2) {
            var _exit = false;

            function _temp3(_result) {
              return _exit ? _result : Promise.resolve(processResponse(response)).then(function (_ref) {
                var data = _ref.data,
                    responseError = _ref.responseError;

                // avoid state updates when component has been unmounted
                if (_this.signal.aborted) {
                  return;
                }

                if (!response.ok || responseError) {
                  var error = {
                    data: data,
                    message: "Failed to fetch: " + response.status + " " + response.statusText,
                    status: response.status
                  };

                  _this.setState({
                    error: error,
                    loading: false
                  });

                  if (!_this.props.localErrorOnly && onError) {
                    onError(error, function () {
                      return _this.mutate(body, mutateRequestOptions);
                    }, response);
                  }

                  throw error;
                }

                _this.setState({
                  loading: false
                });

                if (_this.props.onMutate) {
                  _this.props.onMutate(body, data);
                }

                return data;
              });
            }

            var request = new Request(makeRequestPath(), _extends({
              method: verb,
              body: _temp7
            }, _providerRequestOptio, mutateRequestOptions, {
              headers: _extends({
                "content-type": typeof body === "object" ? "application/json" : "text/plain"
              }, typeof providerRequestOptions === "function" ? _providerRequestOptio2.headers : _providerRequestOptio2, mutateRequestOptions ? mutateRequestOptions.headers : {})
            }));
            // Type assertion for version of TypeScript that can't yet discriminate.
            if (onRequest) onRequest(request);
            var response;

            var _temp2 = _catch(function () {
              return Promise.resolve(fetch(request, {
                signal: _this.signal
              })).then(function (_fetch) {
                response = _fetch;
                if (onResponse) onResponse(response.clone());
              });
            }, function (e) {
              var error = {
                message: "Failed to fetch: " + e.message,
                data: ""
              };

              _this.setState({
                error: error,
                loading: false
              });

              if (!_this.props.localErrorOnly && onError) {
                onError(error, function () {
                  return _this.mutate(body, mutateRequestOptions);
                });
              }

              throw error;
            });

            return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
          }

          return typeof providerRequestOptions === "function" ? Promise.resolve(typeof providerRequestOptions === "function" ? providerRequestOptions(makeRequestPath(), verb, body) : (providerRequestOptions || {}).headers).then(_temp4) : _temp4(typeof providerRequestOptions === "function" ? providerRequestOptions(makeRequestPath(), verb, body) : (providerRequestOptions || {}).headers);
        };

        var _this$props = _this.props,
            __internal_hasExplicitBase = _this$props.__internal_hasExplicitBase,
            base = _this$props.base,
            parentPath = _this$props.parentPath,
            path = _this$props.path,
            verb = _this$props.verb,
            providerRequestOptions = _this$props.requestOptions,
            onError = _this$props.onError,
            onRequest = _this$props.onRequest,
            onResponse = _this$props.onResponse;

        _this.setState(function () {
          return {
            error: null,
            loading: true
          };
        });

        var makeRequestPath = function makeRequestPath() {
          var url;

          if (__internal_hasExplicitBase) {
            url = verb === "DELETE" && typeof body === "string" ? composeUrl(base, "", composePath(path, body)) : composeUrl(base, "", path || "");
          } else {
            url = verb === "DELETE" && typeof body === "string" ? composeUrl(base, parentPath, composePath(path, body)) : composeUrl(base, parentPath, path);
          } // We use ! because it's in defaultProps


          if (Object.keys(_this.props.queryParams).length) {
            url += "?" + qs.stringify(_extends({}, _this.props.queryParams, mutateRequestOptions === null || mutateRequestOptions === void 0 ? void 0 : mutateRequestOptions.queryParams));
          }

          return url;
        };

        var _temp7 = typeof body === "object" ? JSON.stringify(body) : body;

        return Promise.resolve(typeof providerRequestOptions === "function" ? Promise.resolve(typeof providerRequestOptions === "function" ? providerRequestOptions(makeRequestPath(), verb, body) : providerRequestOptions).then(_temp6) : _temp6(typeof providerRequestOptions === "function" ? providerRequestOptions(makeRequestPath(), verb, body) : providerRequestOptions));
      } catch (e) {
        return Promise.reject(e);
      }
    };

    return _this;
  }

  var _proto = ContextlessMutate.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.abortController.abort();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        path = _this$props2.path,
        base = _this$props2.base,
        parentPath = _this$props2.parentPath;
    var _this$state = this.state,
        error = _this$state.error,
        loading = _this$state.loading;
    return children(this.mutate, {
      loading: loading,
      error: error
    }, {
      absolutePath: composeUrl(base, parentPath, path)
    });
  };

  return ContextlessMutate;
}(React.Component);

ContextlessMutate.defaultProps = {
  base: "",
  parentPath: "",
  path: "",
  queryParams: {}
};
/**
 * The <Mutate /> component _with_ context.
 * Context is used to compose path props,
 * and to maintain the base property against
 * which all requests will be made.
 *
 * We compose Consumers immediately with providers
 * in order to provide new `parentPath` props that contain
 * a segment of the path, creating composable URLs.
 */

function Mutate(props) {
  return React.createElement(RestfulReactConsumer, null, function (contextProps) {
    return React.createElement(RestfulReactProvider, Object.assign({}, contextProps, {
      parentPath: composePath(contextProps.parentPath, props.path)
    }), React.createElement(ContextlessMutate, Object.assign({}, contextProps, props, {
      queryParams: _extends({}, contextProps.queryParams, props.queryParams),
      __internal_hasExplicitBase: Boolean(props.base)
    })));
  });
}

/**
 * Custom version of isEqual to handle function comparison
 */

var isEqual = function isEqual(x, y) {
  return isEqualWith(x, y, function (a, b) {
    // Deal with the function comparison case
    if (typeof a === "function" && typeof b === "function") {
      return a.toString() === b.toString();
    } // Fallback on the method


    return undefined;
  });
};

function useDeepCompareMemoize(value) {
  var ref = React.useRef();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
/**
 * Accepts a function that contains imperative, possibly effectful code.
 *
 * This is the deepCompare version of the `React.useEffect` hooks (that is shallowed compare)
 *
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list change.
 *
 * @see https://gist.github.com/kentcdodds/fb8540a05c43faf636dd68647747b074#gistcomment-2830503
 */


function useDeepCompareEffect(effect, deps) {
  React.useEffect(effect, useDeepCompareMemoize(deps));
}

function createAbortController() {
  try {
    return new AbortController();
  } catch (_unused) {
    return undefined;
  }
}

function useAbort() {
  var instance = React.useRef(createAbortController());
  var abort = React.useCallback(function () {
    if (instance && instance.current) {
      instance.current.abort();
      instance.current = createAbortController();
    }
  }, [instance]);
  return {
    abort: abort,
    getAbortSignal: function getAbortSignal() {
      var _instance$current;

      return instance === null || instance === void 0 ? void 0 : (_instance$current = instance.current) === null || _instance$current === void 0 ? void 0 : _instance$current.signal;
    }
  };
}

var _fetchData = function _fetchData(props, state, setState, context, abort, getAbortSignal) {
  try {
    var _temp4 = function _temp4(propsRequestOptions) {
      function _temp2(contextRequestOptions) {
        var signal = getAbortSignal();
        var request = new Request(_url, merge({}, contextRequestOptions, propsRequestOptions, {
          signal: signal
        }));
        if (context.onRequest) context.onRequest(request);
        return _catch(function () {
          return Promise.resolve(fetch(request)).then(function (response) {
            if (context.onResponse) context.onResponse(response.clone());
            return Promise.resolve(processResponse(response)).then(function (_ref) {
              var data = _ref.data,
                  responseError = _ref.responseError;

              if (signal && signal.aborted) {
                return;
              }

              if (!response.ok || responseError) {
                var error = {
                  message: "Failed to fetch: " + response.status + " " + response.statusText + (responseError ? " - " + data : ""),
                  data: data,
                  status: response.status
                };
                setState(_extends({}, state, {
                  loading: false,
                  error: error
                }));

                if (!props.localErrorOnly && context.onError) {
                  context.onError(error, function () {
                    return _fetchData(props, state, setState, context, abort, getAbortSignal);
                  }, response);
                }

                return;
              }

              setState(_extends({}, state, {
                error: null,
                loading: false,
                data: resolve(data)
              }));
            });
          });
        }, function (e) {
          // avoid state updates when component has been unmounted
          // and when fetch/processResponse threw an error
          if (signal && signal.aborted) {
            return;
          }

          var error = {
            message: "Failed to fetch: " + e.message,
            data: e.message
          };
          setState(_extends({}, state, {
            loading: false,
            error: error
          }));

          if (!props.localErrorOnly && context.onError) {
            context.onError(error, function () {
              return _fetchData(props, state, setState, context, abort, getAbortSignal);
            });
          }
        });
      }

      var _temp = typeof context.requestOptions === "function";

      return _temp ? Promise.resolve(context.requestOptions(_url, "GET")).then(_temp2) : _temp2(context.requestOptions);
    };

    var _props$base = props.base,
        base = _props$base === void 0 ? context.base : _props$base,
        path = props.path,
        _props$resolve = props.resolve,
        resolve = _props$resolve === void 0 ? function (d) {
      return d;
    } : _props$resolve,
        _props$queryParams = props.queryParams,
        queryParams = _props$queryParams === void 0 ? {} : _props$queryParams,
        _props$queryParamStri = props.queryParamStringifyOptions,
        queryParamStringifyOptions = _props$queryParamStri === void 0 ? {} : _props$queryParamStri,
        requestOptions = props.requestOptions,
        _props$pathParams2 = props.pathParams,
        pathParams = _props$pathParams2 === void 0 ? {} : _props$pathParams2;

    if (state.loading) {
      // Abort previous requests
      abort();
    }

    if (state.error || !state.loading) {
      setState(_extends({}, state, {
        error: null,
        loading: true
      }));
    }

    var pathStr = typeof path === "function" ? path(pathParams) : path;

    var _url = resolvePath(base, pathStr, _extends({}, context.queryParams, queryParams), _extends({}, context.queryParamStringifyOptions, queryParamStringifyOptions));

    return Promise.resolve(typeof requestOptions === "function" ? Promise.resolve(typeof requestOptions === "function" ? requestOptions(_url, "GET") : requestOptions).then(_temp4) : _temp4(typeof requestOptions === "function" ? requestOptions(_url, "GET") : requestOptions));
  } catch (e) {
    return Promise.reject(e);
  }
};

function resolvePath(base, path, queryParams, queryParamOptions) {
  if (queryParamOptions === void 0) {
    queryParamOptions = {};
  }

  var appendedBase = base.endsWith("/") ? base : base + "/";
  var trimmedPath = path.startsWith("/") ? path.slice(1) : path;
  return url.resolve(appendedBase, Object.keys(queryParams).length ? trimmedPath + "?" + qs__default.stringify(queryParams, queryParamOptions) : trimmedPath);
}

var isCancellable = function isCancellable(func) {
  return typeof func.cancel === "function" && typeof func.flush === "function";
};

function useGet() {
  var props = typeof arguments[0] === "object" ? arguments[0] : _extends({}, arguments[1], {
    path: arguments[0]
  });
  var context = React.useContext(Context);
  var path = props.path,
      _props$pathParams = props.pathParams,
      pathParams = _props$pathParams === void 0 ? {} : _props$pathParams;
  var fetchData = React.useCallback(typeof props.debounce === "object" ? debounce(_fetchData, props.debounce.wait, props.debounce.options) : typeof props.debounce === "number" ? debounce(_fetchData, props.debounce) : props.debounce ? debounce(_fetchData) : _fetchData, [props.debounce]); // Cancel fetchData on unmount (if debounce)

  React.useEffect(function () {
    return isCancellable(fetchData) ? function () {
      return fetchData.cancel();
    } : undefined;
  }, [fetchData]);

  var _useState = React.useState({
    data: null,
    response: null,
    loading: !props.lazy,
    error: null
  }),
      state = _useState[0],
      setState = _useState[1];

  var _useAbort = useAbort(),
      abort = _useAbort.abort,
      getAbortSignal = _useAbort.getAbortSignal;

  var pathStr = typeof path === "function" ? path(pathParams) : path;
  useDeepCompareEffect(function () {
    if (!props.lazy && !props.mock) {
      fetchData(props, state, setState, context, abort, getAbortSignal);
    }

    return function () {
      abort();
    };
  }, [props.lazy, props.mock, props.path, props.base, props.resolve, props.queryParams, props.requestOptions, props.pathParams, context.base, context.parentPath, context.queryParams, context.requestOptions, abort]);
  return _extends({}, state, props.mock, {
    absolutePath: resolvePath(props.base || context.base, pathStr, _extends({}, context.queryParams, props.queryParams), _extends({}, context.queryParamStringifyOptions, props.queryParamStringifyOptions)),
    cancel: function cancel() {
      setState(_extends({}, state, {
        loading: false
      }));
      abort();
    },
    refetch: function refetch(options) {
      if (options === void 0) {
        options = {};
      }

      return fetchData(_extends({}, props, options), state, setState, context, abort, getAbortSignal);
    }
  });
}

function useMutate() {
  var props = typeof arguments[0] === "object" ? arguments[0] : _extends({}, arguments[2], {
    path: arguments[1],
    verb: arguments[0]
  });
  var context = React.useContext(Context);
  var verb = props.verb,
      _props$base = props.base,
      base = _props$base === void 0 ? context.base : _props$base,
      path = props.path,
      _props$queryParams = props.queryParams,
      queryParams = _props$queryParams === void 0 ? {} : _props$queryParams,
      resolve = props.resolve,
      _props$pathParams = props.pathParams,
      pathParams = _props$pathParams === void 0 ? {} : _props$pathParams;
  var isDelete = verb === "DELETE";

  var _useState = React.useState({
    error: null,
    loading: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _useAbort = useAbort(),
      abort = _useAbort.abort,
      getAbortSignal = _useAbort.getAbortSignal; // Cancel the fetch on unmount


  React.useEffect(function () {
    return function () {
      return abort();
    };
  }, [abort]);
  var mutate = React.useCallback(function (body, mutateRequestOptions) {
    try {
      var _temp7 = function _temp7(propsRequestOptions) {
        function _temp5(contextRequestOptions) {
          var _exit = false;

          function _temp4(_result) {
            return _exit ? _result : Promise.resolve(processResponse(response)).then(function (_ref) {
              var rawData = _ref.data,
                  responseError = _ref.responseError;
              var data; // `any` -> data in error case

              try {
                data = resolve ? resolve(rawData) : rawData;
              } catch (e) {
                // avoid state updates when component has been unmounted
                // and when fetch/processResponse threw an error
                if (signal && signal.aborted) {
                  return;
                }

                var error = {
                  data: e.message,
                  message: "Failed to resolve: " + e.message
                };
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    error: error,
                    loading: false
                  });
                });
                throw e;
              }

              if (signal && signal.aborted) {
                return;
              }

              if (!response.ok || responseError) {
                var _error = {
                  data: data,
                  message: "Failed to fetch: " + response.status + " " + response.statusText,
                  status: response.status
                };
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    error: _error,
                    loading: false
                  });
                });

                if (!props.localErrorOnly && context.onError) {
                  context.onError(_error, function () {
                    return mutate(body);
                  }, response);
                }

                throw _error;
              }

              setState(function (prevState) {
                return _extends({}, prevState, {
                  loading: false
                });
              });

              if (props.onMutate) {
                props.onMutate(body, data);
              }

              return data;
            });
          }

          var request = new Request(url, merge({}, contextRequestOptions, options, propsRequestOptions, mutateRequestOptions, {
            signal: signal
          }));
          if (context.onRequest) context.onRequest(request);
          var response;

          var _temp3 = _catch(function () {
            return Promise.resolve(fetch(request)).then(function (_fetch) {
              response = _fetch;
              if (context.onResponse) context.onResponse(response.clone());
            });
          }, function (e) {
            var error = {
              message: "Failed to fetch: " + e.message,
              data: ""
            };
            setState({
              error: error,
              loading: false
            });

            if (!props.localErrorOnly && context.onError) {
              context.onError(error, function () {
                return mutate(body, mutateRequestOptions);
              });
            }

            throw error;
          });

          return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
        }

        var _temp2 = typeof context.requestOptions === "function";

        return _temp2 ? Promise.resolve(context.requestOptions(url, verb, body)).then(_temp5) : _temp5(context.requestOptions);
      };

      if (state.error || !state.loading) {
        setState(function (prevState) {
          return _extends({}, prevState, {
            loading: true,
            error: null
          });
        });
      }

      if (state.loading) {
        // Abort previous requests
        abort();
      }

      var pathStr = typeof path === "function" ? path((mutateRequestOptions === null || mutateRequestOptions === void 0 ? void 0 : mutateRequestOptions.pathParams) || pathParams) : path;
      var pathParts = [pathStr];
      var options = {
        method: verb
      }; // don't set content-type when body is of type FormData

      if (!(body instanceof FormData)) {
        options.headers = {
          "content-type": typeof body === "object" ? "application/json" : "text/plain"
        };
      }

      if (body instanceof FormData) {
        options.body = body;
      } else if (typeof body === "object") {
        options.body = JSON.stringify(body);
      } else if (isDelete) {
        pathParts.push(body);
      } else {
        options.body = body;
      }

      var signal = getAbortSignal();
      var url = resolvePath(base, pathParts.join("/"), _extends({}, context.queryParams, queryParams, mutateRequestOptions === null || mutateRequestOptions === void 0 ? void 0 : mutateRequestOptions.queryParams), _extends({}, context.queryParamStringifyOptions, props.queryParamStringifyOptions));

      var _temp8 = typeof props.requestOptions === "function";

      return Promise.resolve(_temp8 ? Promise.resolve(props.requestOptions(url, verb, body)).then(_temp7) : _temp7(props.requestOptions));
    } catch (e) {
      return Promise.reject(e);
    }
  },
  /* eslint-disable react-hooks/exhaustive-deps */
  [context.base, context.requestOptions, context.resolve, state.error, state.loading, path, abort, getAbortSignal]);
  return _extends({}, state, {
    mutate: mutate
  }, props.mock, {
    cancel: function cancel() {
      setState(function (prevState) {
        return _extends({}, prevState, {
          loading: false
        });
      });
      abort();
    }
  });
}

exports.Get = Get;
exports.Mutate = Mutate;
exports.Poll = Poll;
exports.RestfulProvider = RestfulReactProvider;
exports.default = Get;
exports.useGet = useGet;
exports.useMutate = useMutate;
//# sourceMappingURL=restful-react.cjs.development.js.map