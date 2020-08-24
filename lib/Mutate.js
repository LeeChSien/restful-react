import { __assign, __awaiter, __extends, __generator } from "tslib";
import * as qs from "qs";
import * as React from "react";
import RestfulReactProvider, { RestfulReactConsumer } from "./Context";
import { composePath, composeUrl } from "./util/composeUrl";
import { processResponse } from "./util/processResponse";
/**
 * The <Mutate /> component without Context. This
 * is a named class because it is useful in
 * debugging.
 */
var ContextlessMutate = /** @class */ (function (_super) {
    __extends(ContextlessMutate, _super);
    function ContextlessMutate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loading: false,
            error: null,
        };
        /**
         * Abort controller to cancel the current fetch query
         */
        _this.abortController = new AbortController();
        _this.signal = _this.abortController.signal;
        _this.mutate = function (body, mutateRequestOptions) { return __awaiter(_this, void 0, void 0, function () {
            var _a, __internal_hasExplicitBase, base, parentPath, path, verb, providerRequestOptions, onError, onRequest, onResponse, makeRequestPath, request, _b, _c, _d, _e, _f, _g, _h, _j, response, e_1, error, _k, data, responseError, error;
            var _this = this;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _a = this.props, __internal_hasExplicitBase = _a.__internal_hasExplicitBase, base = _a.base, parentPath = _a.parentPath, path = _a.path, verb = _a.verb, providerRequestOptions = _a.requestOptions, onError = _a.onError, onRequest = _a.onRequest, onResponse = _a.onResponse;
                        this.setState(function () { return ({ error: null, loading: true }); });
                        makeRequestPath = function () {
                            var url;
                            if (__internal_hasExplicitBase) {
                                url =
                                    verb === "DELETE" && typeof body === "string"
                                        ? composeUrl(base, "", composePath(path, body))
                                        : composeUrl(base, "", path || "");
                            }
                            else {
                                url =
                                    verb === "DELETE" && typeof body === "string"
                                        ? composeUrl(base, parentPath, composePath(path, body))
                                        : composeUrl(base, parentPath, path);
                            }
                            // We use ! because it's in defaultProps
                            if (Object.keys(_this.props.queryParams).length) {
                                url += "?" + qs.stringify(__assign(__assign({}, _this.props.queryParams), mutateRequestOptions === null || mutateRequestOptions === void 0 ? void 0 : mutateRequestOptions.queryParams));
                            }
                            return url;
                        };
                        _b = Request.bind;
                        _c = [void 0, makeRequestPath()];
                        _d = [{ method: verb, body: typeof body === "object" ? JSON.stringify(body) : body }];
                        if (!(typeof providerRequestOptions === "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, providerRequestOptions(makeRequestPath(), verb, body)];
                    case 1:
                        _e = _l.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _e = providerRequestOptions;
                        _l.label = 3;
                    case 3:
                        _f = [__assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_e)])), mutateRequestOptions])];
                        _g = {};
                        _h = [{ "content-type": typeof body === "object" ? "application/json" : "text/plain" }];
                        if (!(typeof providerRequestOptions === "function")) return [3 /*break*/, 5];
                        return [4 /*yield*/, providerRequestOptions(makeRequestPath(), verb, body)];
                    case 4:
                        _j = (_l.sent()).headers;
                        return [3 /*break*/, 6];
                    case 5:
                        _j = (providerRequestOptions || {}).headers;
                        _l.label = 6;
                    case 6:
                        request = new (_b.apply(Request, _c.concat([__assign.apply(void 0, _f.concat([(_g.headers = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_j)])), (mutateRequestOptions ? mutateRequestOptions.headers : {})]), _g)]))])))();
                        if (onRequest)
                            onRequest(request);
                        _l.label = 7;
                    case 7:
                        _l.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, fetch(request, { signal: this.signal })];
                    case 8:
                        response = _l.sent();
                        if (onResponse)
                            onResponse(response.clone());
                        return [3 /*break*/, 10];
                    case 9:
                        e_1 = _l.sent();
                        error = {
                            message: "Failed to fetch: " + e_1.message,
                            data: "",
                        };
                        this.setState({
                            error: error,
                            loading: false,
                        });
                        if (!this.props.localErrorOnly && onError) {
                            onError(error, function () { return _this.mutate(body, mutateRequestOptions); });
                        }
                        throw error;
                    case 10: return [4 /*yield*/, processResponse(response)];
                    case 11:
                        _k = _l.sent(), data = _k.data, responseError = _k.responseError;
                        // avoid state updates when component has been unmounted
                        if (this.signal.aborted) {
                            return [2 /*return*/];
                        }
                        if (!response.ok || responseError) {
                            error = {
                                data: data,
                                message: "Failed to fetch: " + response.status + " " + response.statusText,
                                status: response.status,
                            };
                            this.setState({
                                error: error,
                                loading: false,
                            });
                            if (!this.props.localErrorOnly && onError) {
                                onError(error, function () { return _this.mutate(body, mutateRequestOptions); }, response);
                            }
                            throw error;
                        }
                        this.setState({ loading: false });
                        if (this.props.onMutate) {
                            this.props.onMutate(body, data);
                        }
                        return [2 /*return*/, data];
                }
            });
        }); };
        return _this;
    }
    ContextlessMutate.prototype.componentWillUnmount = function () {
        this.abortController.abort();
    };
    ContextlessMutate.prototype.render = function () {
        var _a = this.props, children = _a.children, path = _a.path, base = _a.base, parentPath = _a.parentPath;
        var _b = this.state, error = _b.error, loading = _b.loading;
        return children(this.mutate, { loading: loading, error: error }, { absolutePath: composeUrl(base, parentPath, path) });
    };
    ContextlessMutate.defaultProps = {
        base: "",
        parentPath: "",
        path: "",
        queryParams: {},
    };
    return ContextlessMutate;
}(React.Component));
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
    return (React.createElement(RestfulReactConsumer, null, function (contextProps) { return (React.createElement(RestfulReactProvider, __assign({}, contextProps, { parentPath: composePath(contextProps.parentPath, props.path) }),
        React.createElement(ContextlessMutate, __assign({}, contextProps, props, { queryParams: __assign(__assign({}, contextProps.queryParams), props.queryParams), __internal_hasExplicitBase: Boolean(props.base) })))); }));
}
export default Mutate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXV0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL011dGF0ZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sb0JBQW9CLEVBQUUsRUFBaUIsb0JBQW9CLEVBQTZCLE1BQU0sV0FBVyxDQUFDO0FBRWpILE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBMkd6RDs7OztHQUlHO0FBQ0g7SUFBd0YscUNBR3ZGO0lBSEQ7UUFBQSxxRUErSUM7UUEzSWlCLFdBQUssR0FBeUM7WUFDNUQsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUM7UUFTRjs7V0FFRztRQUNLLHFCQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUN4QyxZQUFNLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFNdEMsWUFBTSxHQUFHLFVBQ2QsSUFBa0IsRUFDbEIsb0JBQXNFOzs7Ozs7d0JBRWhFLEtBVUYsSUFBSSxDQUFDLEtBQUssRUFUWiwwQkFBMEIsZ0NBQUEsRUFDMUIsSUFBSSxVQUFBLEVBQ0osVUFBVSxnQkFBQSxFQUNWLElBQUksVUFBQSxFQUNKLElBQUksVUFBQSxFQUNZLHNCQUFzQixvQkFBQSxFQUN0QyxPQUFPLGFBQUEsRUFDUCxTQUFTLGVBQUEsRUFDVCxVQUFVLGdCQUFBLENBQ0c7d0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQzt3QkFFaEQsZUFBZSxHQUFHOzRCQUN0QixJ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