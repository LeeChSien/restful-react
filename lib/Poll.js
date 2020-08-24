import { __assign, __awaiter, __extends, __generator } from "tslib";
import merge from "lodash/merge";
import * as qs from "qs";
import * as React from "react";
import equal from "react-fast-compare";
import { RestfulReactConsumer } from "./Context";
import { composeUrl } from "./util/composeUrl";
import { processResponse } from "./util/processResponse";
/**
 * The <Poll /> component without context.
 */
var ContextlessPoll = /** @class */ (function (_super) {
    __extends(ContextlessPoll, _super);
    function ContextlessPoll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            data: null,
            previousData: null,
            loading: !_this.props.lazy,
            lastResponse: null,
            polling: !_this.props.lazy,
            finished: false,
            error: null,
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
            return typeof _this.props.requestOptions === "function"
                ? _this.props.requestOptions(url, "GET")
                : _this.props.requestOptions || {};
        };
        // 304 is not a OK status code but is green in Chrome 🤦🏾‍♂️
        _this.isResponseOk = function (response) { return response.ok || response.status === 304; };
        /**
         * This thing does the actual poll.
         */
        _this.cycle = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, base, path, interval, wait, onError, onRequest, onResponse, lastPollIndex, url, requestOptions, request, response_1, _b, data_1, responseError, error, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // Have we stopped?
                        if (!this.keepPolling) {
                            return [2 /*return*/]; // stop.
                        }
                        if (!(this.props.until && this.props.until(this.state.data, this.state.lastResponse))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.stop()];
                    case 1:
                        _c.sent(); // stop.
                        return [2 /*return*/];
                    case 2:
                        _a = this.props, base = _a.base, path = _a.path, interval = _a.interval, wait = _a.wait, onError = _a.onError, onRequest = _a.onRequest, onResponse = _a.onResponse;
                        lastPollIndex = this.state.lastPollIndex;
                        url = composeUrl(base, "", path);
                        // We use a ! because it's in defaultProps
                        if (Object.keys(this.props.queryParams).length) {
                            url += "?" + qs.stringify(this.props.queryParams);
                        }
                        return [4 /*yield*/, this.getRequestOptions(url)];
                    case 3:
                        requestOptions = _c.sent();
                        request = new Request(url, __assign(__assign({}, requestOptions), { headers: __assign({ Prefer: "wait=" + wait + "s;" + (lastPollIndex ? "index=" + lastPollIndex : "") }, requestOptions.headers) }));
                        if (onRequest)
                            onRequest(request);
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 8, , 9]);
                        return [4 /*yield*/, fetch(request, { signal: this.signal })];
                    case 5:
                        response_1 = _c.sent();
                        if (onResponse)
                            onResponse(response_1.clone());
                        return [4 /*yield*/, processResponse(response_1)];
                    case 6:
                        _b = _c.sent(), data_1 = _b.data, responseError = _b.responseError;
                        if (!this.keepPolling || this.signal.aborted) {
                            // Early return if we have stopped polling or component was unmounted
                            // to avoid memory leaks
                            return [2 /*return*/];
                        }
                        if (!this.isResponseOk(response_1) || responseError) {
                            error = {
                                message: "Failed to poll: " + response_1.status + " " + response_1.statusText + (responseError ? " - " + data_1 : ""),
                                data: data_1,
                                status: response_1.status,
                            };
                            this.setState({ loading: false, lastResponse: response_1, error: error });
                            if (!this.props.localErrorOnly && onError) {
                                onError(error, function () { return Promise.resolve(); }, response_1);
                            }
                        }
                        else if (this.isModified(response_1, data_1)) {
                            this.setState(function (prevState) { return ({
                                loading: false,
                                lastResponse: response_1,
                                previousData: prevState.data,
                                data: data_1,
                                error: null,
                                lastPollIndex: response_1.headers.get("x-polling-index") || undefined,
                            }); });
                        }
                        // Wait for interval to pass.
                        return [4 /*yield*/, new Promise(function (resolvePromise) { return setTimeout(resolvePromise, interval); })];
                    case 7:
                        // Wait for interval to pass.
                        _c.sent();
                        this.cycle(); // Do it all again!
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _c.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        _this.start = function () {
            _this.keepPolling = true;
            if (!_this.state.polling) {
                _this.setState(function () { return ({ polling: true }); }); // let everyone know we're done here.
            }
            _this.cycle();
        };
        _this.stop = function () {
            _this.keepPolling = false;
            _this.setState(function () { return ({ polling: false, finished: true }); }); // let everyone know we're done here.
        };
        return _this;
    }
    ContextlessPoll.prototype.componentDidMount = function () {
        var _a = this.props, path = _a.path, lazy = _a.lazy;
        if (path === undefined) {
            throw new Error("[restful-react]: You're trying to poll something without a path. Please specify a \"path\" prop on your Poll component.");
        }
        if (!lazy) {
            this.start();
        }
    };
    ContextlessPoll.prototype.componentWillUnmount = function () {
        // Cancel the current query
        this.abortController.abort();
        // Stop the polling cycle
        this.stop();
    };
    ContextlessPoll.prototype.render = function () {
        var _a = this.state, response = _a.lastResponse, previousData = _a.previousData, data = _a.data, polling = _a.polling, loading = _a.loading, error = _a.error, finished = _a.finished;
        var _b = this.props, children = _b.children, base = _b.base, path = _b.path, resolve = _b.resolve;
        var meta = {
            response: response,
            absolutePath: composeUrl(base, "", path),
        };
        var states = {
            polling: polling,
            loading: loading,
            error: error,
            finished: finished,
        };
        var actions = {
            stop: this.stop,
            start: this.start,
        };
        // data is parsed only when poll has already resolved so response is defined
        var resolvedData = response && resolve ? resolve(data, previousData) : data;
        return children(resolvedData, states, actions, meta);
    };
    ContextlessPoll.defaultProps = {
        interval: 1000,
        wait: 60,
        base: "",
        resolve: function (data) { return data; },
        queryParams: {},
    };
    return ContextlessPoll;
}(React.Component));
function Poll(props) {
    var _this = this;
    // Compose Contexts to allow for URL nesting
    return (React.createElement(RestfulReactConsumer, null, function (contextProps) {
        return (React.createElement(ContextlessPoll, __assign({}, contextProps, props, { queryParams: __assign(__assign({}, contextProps.queryParams), props.queryParams), requestOptions: function (url, method) { return __awaiter(_this, void 0, void 0, function () {
                var contextRequestOptions, _a, propsRequestOptions, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(typeof contextProps.requestOptions === "function")) return [3 /*break*/, 2];
                            return [4 /*yield*/, contextProps.requestOptions(url, method)];
                        case 1:
                            _a = _c.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = contextProps.requestOptions || {};
                            _c.label = 3;
                        case 3:
                            contextRequestOptions = _a;
                            if (!(typeof props.requestOptions === "function")) return [3 /*break*/, 5];
                            return [4 /*yield*/, props.requestOptions(url, method)];
                        case 4:
                            _b = _c.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            _b = props.requestOptions || {};
                            _c.label = 6;
                        case 6:
                            propsRequestOptions = _b;
                            return [2 /*return*/, merge(contextRequestOptions, propsRequestOptions)];
                    }
                });
            }); } })));
    }));
}
export default Poll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Qb2xsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBQ2pDLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxNQUFNLG9CQUFvQixDQUFDO0FBRXZDLE9BQU8sRUFBaUIsb0JBQW9CLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWtKekQ7O0dBRUc7QUFDSDtJQUFrRixtQ0FHakY7SUFIRDtRQUFBLHFFQXlMQztRQXJMaUIsV0FBSyxHQUF1QztZQUMxRCxJQUFJLEVBQUUsSUFBSTtZQUNWLFlBQVksRUFBRSxJQUFJO1lBQ2xCLE9BQU8sRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtZQUN6QixZQUFZLEVBQUUsSUFBSTtZQUNsQixPQUFPLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDekIsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUM7UUFVTSxpQkFBVyxHQUFHLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFFdkM7O1dBRUc7UUFDSyxxQkFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDeEMsWUFBTSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBRXJDLGdCQUFVLEdBQUcsVUFBQyxRQUFrQixFQUFFLFFBQWU7WUFDdkQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDM0IsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELElBQUksS0FB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