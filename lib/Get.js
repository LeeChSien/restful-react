import { __assign, __awaiter, __extends, __generator } from "tslib";
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";
import * as qs from "qs";
import * as React from "react";
import RestfulReactProvider, { RestfulReactConsumer } from "./Context";
import { composePath, composeUrl } from "./util/composeUrl";
import { processResponse } from "./util/processResponse";
import { resolveData } from "./util/resolveData";
/**
 * The <Get /> component without Context. This
 * is a named class because it is useful in
 * debugging.
 */
var ContextlessGet = /** @class */ (function (_super) {
    __extends(ContextlessGet, _super);
    function ContextlessGet(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Abort controller to cancel the current fetch query
         */
        _this.abortController = new AbortController();
        _this.signal = _this.abortController.signal;
        _this.state = {
            data: null,
            response: null,
            loading: !_this.props.lazy,
            error: null,
        };
        _this.getRequestOptions = function (url, extraOptions, extraHeaders) { return __awaiter(_this, void 0, void 0, function () {
            var requestOptions, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestOptions = this.props.requestOptions;
                        if (!(typeof requestOptions === "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, requestOptions(url, "GET")];
                    case 1:
                        options = (_a.sent()) || {};
                        return [2 /*return*/, __assign(__assign(__assign({}, extraOptions), options), { headers: new Headers(__assign(__assign(__assign({}, (typeof extraHeaders !== "boolean" ? extraHeaders : {})), (extraOptions || {}).headers), options.headers)) })];
                    case 2: return [2 /*return*/, __assign(__assign(__assign({}, extraOptions), requestOptions), { headers: new Headers(__assign(__assign(__assign({}, (typeof extraHeaders !== "boolean" ? extraHeaders : {})), (extraOptions || {}).headers), (requestOptions || {}).headers)) })];
                }
            });
        }); };
        _this.fetch = function (requestPath, thisRequestOptions) { return __awaiter(_this, void 0, void 0, function () {
            var _a, base, __internal_hasExplicitBase, parentPath, path, resolve, onError, onRequest, onResponse, makeRequestPath, request, _b, _c, response, _d, data, responseError, error, resolved, e_1;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this.props, base = _a.base, __internal_hasExplicitBase = _a.__internal_hasExplicitBase, parentPath = _a.parentPath, path = _a.path, resolve = _a.resolve, onError = _a.onError, onRequest = _a.onRequest, onResponse = _a.onResponse;
                        if (this.state.error || !this.state.loading) {
                            this.setState(function () { return ({ error: null, loading: true }); });
                        }
                        makeRequestPath = function () {
                            var url;
                            if (__internal_hasExplicitBase) {
                                url = composeUrl(base, "", path || "");
                            }
                            else {
                                url = composeUrl(base, parentPath, requestPath || path || "");
                            }
                            // We use ! because it's in defaultProps
                            if (Object.keys(_this.props.queryParams).length) {
                                url += "?" + qs.stringify(_this.props.queryParams);
                            }
                            return url;
                        };
                        _b = Request.bind;
                        _c = [void 0, makeRequestPath()];
                        return [4 /*yield*/, this.getRequestOptions(makeRequestPath(), thisRequestOptions)];
                    case 1:
                        request = new (_b.apply(Request, _c.concat([_e.sent()])))();
                        if (onRequest)
                            onRequest(request);
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, fetch(request, { signal: this.signal })];
                    case 3:
                        response = _e.sent();
                        if (onResponse)
                            onResponse(response.clone());
                        return [4 /*yield*/, processResponse(response)];
                    case 4:
                        _d = _e.sent(), data = _d.data, responseError = _d.responseError;
                        // avoid state updates when component has been unmounted
                        if (this.signal.aborted) {
                            return [2 /*return*/];
                        }
                        if (!response.ok || responseError) {
                            error = {
                                message: "Failed to fetch: " + response.status + " " + response.statusText + (responseError ? " - " + data : ""),
                                data: data,
                                status: response.status,
                            };
                            this.setState({
                                loading: false,
                                error: error,
                            });
                            if (!this.props.localErrorOnly && onError) {
                                onError(error, function () { return _this.fetch(requestPath, thisRequestOptions); }, response);
                            }
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, resolveData({ data: data, resolve: resolve })];
                    case 5:
                        resolved = _e.sent();
                        this.setState({ loading: false, data: resolved.data, error: resolved.error });
                        return [2 /*return*/, data];
                    case 6:
                        e_1 = _e.sent();
                        // avoid state updates when component has been unmounted
                        // and when fetch/processResponse threw an error
                        if (this.signal.aborted) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            loading: false,
                            error: {
                                message: "Failed to fetch: " + e_1.message,
                                data: e_1,
                            },
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        if (typeof props.debounce === "object") {
            _this.fetch = debounce(_this.fetch, props.debounce.wait, props.debounce.options);
        }
        else if (typeof props.debounce === "number") {
            _this.fetch = debounce(_this.fetch, props.debounce);
        }
        else if (props.debounce) {
            _this.fetch = debounce(_this.fetch);
        }
        return _this;
    }
    ContextlessGet.prototype.componentDidMount = function () {
        if (!this.props.lazy) {
            this.fetch();
        }
    };
    ContextlessGet.prototype.componentDidUpdate = function (prevProps) {
        var base = prevProps.base, parentPath = prevProps.parentPath, path = prevProps.path, resolve = prevProps.resolve, queryParams = prevProps.queryParams, requestOptions = prevProps.requestOptions;
        if (base !== this.props.base ||
            parentPath !== this.props.parentPath ||
            path !== this.props.path ||
            !isEqual(queryParams, this.props.queryParams) ||
            // both `resolve` props need to _exist_ first, and then be equivalent.
            (resolve && this.props.resolve && resolve.toString() !== this.props.resolve.toString()) ||
            (requestOptions &&
                this.props.requestOptions &&
                requestOptions.toString() !== this.props.requestOptions.toString())) {
            if (!this.props.lazy) {
                this.fetch();
            }
        }
    };
    ContextlessGet.prototype.componentWillUnmount = function () {
        this.abortController.abort();
    };
    ContextlessGet.prototype.render = function () {
        var _a = this.props, children = _a.children, wait = _a.wait, path = _a.path, base = _a.base, parentPath = _a.parentPath;
        var _b = this.state, data = _b.data, error = _b.error, loading = _b.loading, response = _b.response;
        if (wait && data === null && !error) {
            return React.createElement(React.Fragment, null); // Show nothing until we have data.
        }
        return children(data, { loading: loading, error: error }, { refetch: this.fetch }, { response: response, absolutePath: composeUrl(base, parentPath, path) });
    };
    ContextlessGet.defaultProps = {
        base: "",
        parentPath: "",
        resolve: function (unresolvedData) { return unresolvedData; },
        queryParams: {},
    };
    return ContextlessGet;
}(React.Component));
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
    return (React.createElement(RestfulReactConsumer, null, function (contextProps) { return (React.createElement(RestfulReactProvider, __assign({}, contextProps, { parentPath: composePath(contextProps.parentPath, props.path) }),
        React.createElement(ContextlessGet, __assign({}, contextProps, props, { queryParams: __assign(__assign({}, contextProps.queryParams), props.queryParams), __internal_hasExplicitBase: Boolean(props.base) })))); }));
}
export default Get;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0dldC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sT0FBTyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRS9CLE9BQU8sb0JBQW9CLEVBQUUsRUFBaUIsb0JBQW9CLEVBQTZCLE1BQU0sV0FBVyxDQUFDO0FBQ2pILE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQXNJakQ7Ozs7R0FJRztBQUNIO0lBQWlGLGtDQUdoRjtJQUNDLHdCQUFZLEtBQXlFO1FBQXJGLFlBQ0Usa0JBQU0sS0FBSyxDQUFDLFNBU2I7UUFFRDs7V0FFRztRQUNLLHFCQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUN4QyxZQUFNLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFFN0IsV0FBSyxHQUFzQztZQUN6RCxJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQztRQXNDSyx1QkFBaUIsR0FBRyxVQUN6QixHQUFXLEVBQ1gsWUFBbUMsRUFDbkMsWUFBa0Q7Ozs7O3dCQUUxQyxjQUFjLEdBQUssSUFBSSxDQUFDLEtBQUssZUFBZixDQUFnQjs2QkFFbEMsQ0FBQSxPQUFPLGNBQWMsS0FBSyxVQUFVLENBQUEsRUFBcEMsd0JBQW9DO3dCQUNyQixxQkFBTSxjQUFjLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFBOzt3QkFBM0MsT0FBTyxHQUFHLENBQUMsU0FBZ0MsQ0FBQyxJQUFJLEVBQUU7d0JBQ3hELHFEQUNLLFlBQVksR0FDWixPQUFPLEtBQ1YsT0FBTyxFQUFFLElBQUksT0FBTyxnQ0FDZixDQUFDLE9BQU8sWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FDdkQsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxHQUM1QixPQUFPLENBQUMsT0FBTyxFQUNsQixLQUNGOzRCQUdKLHFEQUNLLFlBQVksR0FDWixjQUFjLEtBQ2pCLE9BQU8sRUFBRSxJQUFJLE9BQU8sZ0NBQ2YsQ0FBQyxPQUFPLFlBQVksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQ3ZELENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FDNUIsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUNqQyxLQUNGOzs7YUFDSCxDQUFDO1FBRUssV0FBSyxHQUFHLFVBQU8sV0FBb0IsRUFBRSxrQkFBZ0M7Ozs7Ozt3QkFDcEUsS0FBa0csSUFBSSxDQUFDLEtBQUssRUFBMUcsSUFBSSxVQUFBLEVBQUUsMEJBQTBCLGdDQUFBLEVBQUUsVUFBVSxnQkFBQSxFQUFFLElBQUksVUFBQSxFQUFFLE9BQU8sYUFBQSxFQUFFLE9BQU8sYUFBQSxFQUFFLFNBQVMsZUFBQSxFQUFFLFVBQVUsZ0JBQUEsQ0FBZ0I7d0JBRW5ILElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTs0QkFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQzt5QkFDdkQ7d0JBRUssZUFBZSxHQUFHOzRCQUN0QixJQUFJLEdBQVcsQ0FBQzs0QkFDaEIsSUFBSSwwQkFBMEIsRUFBRTtnQ0FDOUIsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQzs2QkFDekM7aUNBQU07Z0NBQ0wsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFLLEVBQUUsVUFBVyxFQUFFLFdBQVcsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7NkJBQ2pFOzRCQUVELHdDQUF3Qzs0QkFDeEMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBWSxDQUFDLENBQUMsTUFBTSxFQUFFO2dDQUMvQyxHQUFHLElBQUksTUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFHLENBQUM7NkJBQ25EOzRCQUNELE9BQU8sR0FBRyxDQUFDO3dCQUNiLENBQUMsQ0FBQzs2QkFFa0IsT0FBTztzQ0FBQyxlQUFlLEVBQUU7d0JBQUUscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxFQUFFLGtCQUFrQixDQUFDLEVBQUE7O3dCQUE1RyxPQUFPLEdBQUcsY0FBSSxPQUFPLGFBQW9CLFNBQW1FLE1BQUM7d0JBQ25ILElBQUksU0FBUzs0QkFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7d0JBRWYscUJBQU0sS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBQTs7d0JBQXhELFFBQVEsR0FBRyxTQUE2Qzt3QkFDOUQsSUFBSSxVQUFVOzRCQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDYixxQkFBTSxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUE7O3dCQUF6RCxLQUEwQixTQUErQixFQUF2RCxJQUFJLFVBQUEsRUFBRSxhQUFhLG1CQUFBO3dCQUUzQix3REFBd0Q7d0JBQ3hELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NEJBQ3ZCLHNCQUFPO3lCQUNSO3dCQUVELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLGFBQWEsRUFBRTs0QkFDM0IsS0FBSyxHQUFHO2dDQUNaLE9BQU8sRUFBRSxzQkFBb0IsUUFBUSxDQUFDLE1BQU0sU0FBSSxRQUFRLENBQUMsVUFBVSxJQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFO2dDQUN6RyxJQUFJLE1BQUE7Z0NBQ0osTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNOzZCQUN4QixDQUFDOzRCQUVGLElBQUksQ0FBQyxRQUFRLENBQUM7Z0NBQ1osT0FBTyxFQUFFLEtBQUs7Z0NBQ2QsS0FBSyxPQUFBOzZCQUNOLENBQUMsQ0FBQzs0QkFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLElBQUksT0FBTyxFQUFFO2dDQUN6QyxPQUFPLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxFQUEzQyxDQUEyQyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzZCQUM3RTs0QkFFRCxzQkFBTyxJQUFJLEVBQUM7eUJBQ2I7d0JBRWdCLHFCQUFNLFdBQVcsQ0FBZ0IsRUFBRSxJQUFJLE1BQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLEVBQUE7O3dCQUE5RCxRQUFRLEdBQUcsU0FBbUQ7d0JBRXBFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDOUUsc0JBQU8sSUFBSSxFQUFDOzs7d0JBRVosd0RBQXdEO3dCQUN4RCxnREFBZ0Q7d0JBQ2hELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NEJBQ3ZCLHNCQUFPO3lCQUNSO3dCQUVELElBQUksQ0FBQyxRQUFRLENBQUM7NEJBQ1osT0FBTyxFQUFFLEtBQUs7NEJBQ2QsS0FBSyxFQUFFO2dDQUNMLE9BQU8sRUFBRSxzQkFBb0IsR0FBQyxDQUFDLE9BQVM7Z0NBQ3hDLElBQUksRUFBRSxHQUFDOzZCQUNSO3lCQUNGLENBQUMsQ0FBQzs7Ozs7YUFFTixDQUFDO1FBaktBLElBQUksT0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUN0QyxLQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEY7YUFBTSxJQUFJLE9BQU8sS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDN0MsS0FBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkQ7YUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDekIsS0FBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DOztJQUNILENBQUM7SUFzQk0sMENBQWlCLEdBQXhCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVNLDJDQUFrQixHQUF6QixVQUEwQixTQUE2RDtRQUM3RSxJQUFBLElBQUksR0FBNkQsU0FBUyxLQUF0RSxFQUFFLFVBQVUsR0FBaUQsU0FBUyxXQUExRCxFQUFFLElBQUksR0FBMkMsU0FBUyxLQUFwRCxFQUFFLE9BQU8sR0FBa0MsU0FBUyxRQUEzQyxFQUFFLFdBQVcsR0FBcUIsU0FBUyxZQUE5QixFQUFFLGNBQWMsR0FBSyxTQUFTLGVBQWQsQ0FBZTtRQUNuRixJQUNFLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDeEIsVUFBVSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtZQUNwQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQ3hCLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUM3QyxzRUFBc0U7WUFDdEUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZGLENBQUMsY0FBYztnQkFDYixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWM7Z0JBQ3pCLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUNyRTtZQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDcEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Q7U0FDRjtJQUNILENBQUM7SUFFTSw2Q0FBb0IsR0FBM0I7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQy9CLENBQUM7SUEyR00sK0JBQU0sR0FBYjtRQUNRLElBQUEsS0FBNkMsSUFBSSxDQUFDLEtBQUssRUFBckQsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsVUFBVSxnQkFBZSxDQUFDO1FBQ3hELElBQUEsS0FBcUMsSUFBSSxDQUFDLEtBQUssRUFBN0MsSUFBSSxVQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUUsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFlLENBQUM7UUFFdEQsSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNuQyxPQUFPLHlDQUFLLENBQUMsQ0FBQyxtQ0FBbUM7U0FDbEQ7UUFFRCxPQUFPLFFBQVEsQ0FDYixJQUFJLEVBQ0osRUFBRSxPQUFPLFNBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxFQUNsQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQ3ZCLEVBQUUsUUFBUSxVQUFBLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQyxJQUFLLEVBQUUsVUFBVyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQ2pFLENBQUM7SUFDSixDQUFDO0lBM0phLDJCQUFZLEdBQUc7UUFDM0IsSUFBSSxFQUFFLEVBQUU7UUFDUixVQUFVLEVBQUUsRUFBRTtRQUNkLE9BQU8sRUFBRSxVQUFDLGNBQW1CLElBQUssT0FBQSxjQUFjLEVBQWQsQ0FBYztRQUNoRCxXQUFXLEVBQUUsRUFBRTtLQUNoQixDQUFDO0lBdUpKLHFCQUFDO0NBQUEsQUF6TEQsQ0FBaUYsS0FBSyxDQUFDLFNBQVMsR0F5TC9GO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBUyxHQUFHLENBQ1YsS0FBeUQ7SUFFekQsT0FBTyxDQUNMLG9CQUFDLG9CQUFvQixRQUNsQixVQUFBLFlBQVksSUFBSSxPQUFBLENBQ2Ysb0JBQUMsb0JBQW9CLGVBQUssWUFBWSxJQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ2xHLG9CQUFDLGNBQWMsZUFDVCxZQUFZLEVBQ1osS0FBSyxJQUNULFdBQVcsd0JBQU8sWUFBWSxDQUFDLFdBQVcsR0FBSyxLQUFLLENBQUMsV0FBVyxHQUNoRSwwQkFBMEIsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUMvQyxDQUNtQixDQUN4QixFQVRnQixDQVNoQixDQUNvQixDQUN4QixDQUFDO0FBQ0osQ0FBQztBQUVELGVBQWUsR0FBRyxDQUFDIn0=