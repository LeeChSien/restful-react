import { __assign, __awaiter, __generator, __read } from "tslib";
import { useCallback, useContext, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import merge from "lodash/merge";
import qs from "qs";
import url from "url";
import { Context } from "./Context";
import { processResponse } from "./util/processResponse";
import { useDeepCompareEffect } from "./util/useDeepCompareEffect";
import { useAbort } from "./useAbort";
export function resolvePath(base, path, queryParams, queryParamOptions) {
    if (queryParamOptions === void 0) { queryParamOptions = {}; }
    var appendedBase = base.endsWith("/") ? base : base + "/";
    var trimmedPath = path.startsWith("/") ? path.slice(1) : path;
    return url.resolve(appendedBase, Object.keys(queryParams).length ? trimmedPath + "?" + qs.stringify(queryParams, queryParamOptions) : trimmedPath);
}
function _fetchData(props, state, setState, context, abort, getAbortSignal) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, base, path, _b, resolve, _c, queryParams, _d, queryParamStringifyOptions, requestOptions, _e, pathParams, pathStr, url, propsRequestOptions, _f, contextRequestOptions, _g, signal, request, response, _h, data, responseError, error, e_1, error;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _a = props.base, base = _a === void 0 ? context.base : _a, path = props.path, _b = props.resolve, resolve = _b === void 0 ? function (d) { return d; } : _b, _c = props.queryParams, queryParams = _c === void 0 ? {} : _c, _d = props.queryParamStringifyOptions, queryParamStringifyOptions = _d === void 0 ? {} : _d, requestOptions = props.requestOptions, _e = props.pathParams, pathParams = _e === void 0 ? {} : _e;
                    if (state.loading) {
                        // Abort previous requests
                        abort();
                    }
                    if (state.error || !state.loading) {
                        setState(__assign(__assign({}, state), { error: null, loading: true }));
                    }
                    pathStr = typeof path === "function" ? path(pathParams) : path;
                    url = resolvePath(base, pathStr, __assign(__assign({}, context.queryParams), queryParams), __assign(__assign({}, context.queryParamStringifyOptions), queryParamStringifyOptions));
                    if (!(typeof requestOptions === "function")) return [3 /*break*/, 2];
                    return [4 /*yield*/, requestOptions(url, "GET")];
                case 1:
                    _f = _j.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _f = requestOptions;
                    _j.label = 3;
                case 3:
                    propsRequestOptions = (_f) || {};
                    if (!(typeof context.requestOptions === "function")) return [3 /*break*/, 5];
                    return [4 /*yield*/, context.requestOptions(url, "GET")];
                case 4:
                    _g = _j.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _g = context.requestOptions;
                    _j.label = 6;
                case 6:
                    contextRequestOptions = (_g) || {};
                    signal = getAbortSignal();
                    request = new Request(url, merge({}, contextRequestOptions, propsRequestOptions, { signal: signal }));
                    if (context.onRequest)
                        context.onRequest(request);
                    _j.label = 7;
                case 7:
                    _j.trys.push([7, 10, , 11]);
                    return [4 /*yield*/, fetch(request)];
                case 8:
                    response = _j.sent();
                    if (context.onResponse)
                        context.onResponse(response.clone());
                    return [4 /*yield*/, processResponse(response)];
                case 9:
                    _h = _j.sent(), data = _h.data, responseError = _h.responseError;
                    if (signal && signal.aborted) {
                        return [2 /*return*/];
                    }
                    if (!response.ok || responseError) {
                        error = {
                            message: "Failed to fetch: " + response.status + " " + response.statusText + (responseError ? " - " + data : ""),
                            data: data,
                            status: response.status,
                        };
                        setState(__assign(__assign({}, state), { loading: false, error: error }));
                        if (!props.localErrorOnly && context.onError) {
                            context.onError(error, function () { return _fetchData(props, state, setState, context, abort, getAbortSignal); }, response);
                        }
                        return [2 /*return*/];
                    }
                    setState(__assign(__assign({}, state), { error: null, loading: false, data: resolve(data) }));
                    return [3 /*break*/, 11];
                case 10:
                    e_1 = _j.sent();
                    // avoid state updates when component has been unmounted
                    // and when fetch/processResponse threw an error
                    if (signal && signal.aborted) {
                        return [2 /*return*/];
                    }
                    error = {
                        message: "Failed to fetch: " + e_1.message,
                        data: e_1.message,
                    };
                    setState(__assign(__assign({}, state), { loading: false, error: error }));
                    if (!props.localErrorOnly && context.onError) {
                        context.onError(error, function () { return _fetchData(props, state, setState, context, abort, getAbortSignal); });
                    }
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
var isCancellable = function (func) {
    return typeof func.cancel === "function" && typeof func.flush === "function";
};
export function useGet() {
    var props = typeof arguments[0] === "object" ? arguments[0] : __assign(__assign({}, arguments[1]), { path: arguments[0] });
    var context = useContext(Context);
    var path = props.path, _a = props.pathParams, pathParams = _a === void 0 ? {} : _a;
    var fetchData = useCallback(typeof props.debounce === "object"
        ? debounce(_fetchData, props.debounce.wait, props.debounce.options)
        : typeof props.debounce === "number"
            ? debounce(_fetchData, props.debounce)
            : props.debounce
                ? debounce(_fetchData)
                : _fetchData, [props.debounce]);
    // Cancel fetchData on unmount (if debounce)
    useEffect(function () { return (isCancellable(fetchData) ? function () { return fetchData.cancel(); } : undefined); }, [fetchData]);
    var _b = __read(useState({
        data: null,
        response: null,
        loading: !props.lazy,
        error: null,
    }), 2), state = _b[0], setState = _b[1];
    var _c = useAbort(), abort = _c.abort, getAbortSignal = _c.getAbortSignal;
    var pathStr = typeof path === "function" ? path(pathParams) : path;
    useDeepCompareEffect(function () {
        if (!props.lazy && !props.mock) {
            fetchData(props, state, setState, context, abort, getAbortSignal);
        }
        return function () {
            abort();
        };
    }, [
        props.lazy,
        props.mock,
        props.path,
        props.base,
        props.resolve,
        props.queryParams,
        props.requestOptions,
        props.pathParams,
        context.base,
        context.parentPath,
        context.queryParams,
        context.requestOptions,
        abort,
    ]);
    return __assign(__assign(__assign({}, state), props.mock), { absolutePath: resolvePath(props.base || context.base, pathStr, __assign(__assign({}, context.queryParams), props.queryParams), __assign(__assign({}, context.queryParamStringifyOptions), props.queryParamStringifyOptions)), cancel: function () {
            setState(__assign(__assign({}, state), { loading: false }));
            abort();
        }, refetch: function (options) {
            if (options === void 0) { options = {}; }
            return fetchData(__assign(__assign({}, props), options), state, setState, context, abort, getAbortSignal);
        } });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlR2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VzZUdldC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFckUsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBQ2pDLE9BQU8sRUFBeUIsTUFBTSxJQUFJLENBQUM7QUFDM0MsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBRXRCLE9BQU8sRUFBRSxPQUFPLEVBQTZCLE1BQU0sV0FBVyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBNkR0QyxNQUFNLFVBQVUsV0FBVyxDQUN6QixJQUFZLEVBQ1osSUFBWSxFQUNaLFdBQXlCLEVBQ3pCLGlCQUF5QztJQUF6QyxrQ0FBQSxFQUFBLHNCQUF5QztJQUV6QyxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFJLElBQUksTUFBRyxDQUFDO0lBQzVELElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUVoRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQ2hCLFlBQVksRUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUksV0FBVyxTQUFJLEVBQUUsQ0FB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