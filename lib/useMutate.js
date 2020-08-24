import { __assign, __awaiter, __generator, __read } from "tslib";
import merge from "lodash/merge";
import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "./Context";
import { resolvePath } from "./useGet";
import { processResponse } from "./util/processResponse";
import { useAbort } from "./useAbort";
export function useMutate() {
    var _this = this;
    var props = typeof arguments[0] === "object" ? arguments[0] : __assign(__assign({}, arguments[2]), { path: arguments[1], verb: arguments[0] });
    var context = useContext(Context);
    var verb = props.verb, _a = props.base, base = _a === void 0 ? context.base : _a, path = props.path, _b = props.queryParams, queryParams = _b === void 0 ? {} : _b, resolve = props.resolve, _c = props.pathParams, pathParams = _c === void 0 ? {} : _c;
    var isDelete = verb === "DELETE";
    var _d = __read(useState({
        error: null,
        loading: false,
    }), 2), state = _d[0], setState = _d[1];
    var _e = useAbort(), abort = _e.abort, getAbortSignal = _e.getAbortSignal;
    // Cancel the fetch on unmount
    useEffect(function () { return function () { return abort(); }; }, [abort]);
    var mutate = useCallback(function (body, mutateRequestOptions) { return __awaiter(_this, void 0, void 0, function () {
        var pathStr, pathParts, options, signal, url, propsRequestOptions, _a, contextRequestOptions, _b, request, response, e_1, error, _c, rawData, responseError, data, error_1, error_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (state.error || !state.loading) {
                        setState(function (prevState) { return (__assign(__assign({}, prevState), { loading: true, error: null })); });
                    }
                    if (state.loading) {
                        // Abort previous requests
                        abort();
                    }
                    pathStr = typeof path === "function" ? path((mutateRequestOptions === null || mutateRequestOptions === void 0 ? void 0 : mutateRequestOptions.pathParams) || pathParams) : path;
                    pathParts = [pathStr];
                    options = {
                        method: verb,
                    };
                    // don't set content-type when body is of type FormData
                    if (!(body instanceof FormData)) {
                        options.headers = { "content-type": typeof body === "object" ? "application/json" : "text/plain" };
                    }
                    if (body instanceof FormData) {
                        options.body = body;
                    }
                    else if (typeof body === "object") {
                        options.body = JSON.stringify(body);
                    }
                    else if (isDelete) {
                        pathParts.push(body);
                    }
                    else {
                        options.body = body;
                    }
                    signal = getAbortSignal();
                    url = resolvePath(base, pathParts.join("/"), __assign(__assign(__assign({}, context.queryParams), queryParams), mutateRequestOptions === null || mutateRequestOptions === void 0 ? void 0 : mutateRequestOptions.queryParams), __assign(__assign({}, context.queryParamStringifyOptions), props.queryParamStringifyOptions));
                    if (!(typeof props.requestOptions === "function")) return [3 /*break*/, 2];
                    return [4 /*yield*/, props.requestOptions(url, verb, body)];
                case 1:
                    _a = _d.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = props.requestOptions;
                    _d.label = 3;
                case 3:
                    propsRequestOptions = (_a) || {};
                    if (!(typeof context.requestOptions === "function")) return [3 /*break*/, 5];
                    return [4 /*yield*/, context.requestOptions(url, verb, body)];
                case 4:
                    _b = _d.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _b = context.requestOptions;
                    _d.label = 6;
                case 6:
                    contextRequestOptions = (_b) || {};
                    request = new Request(url, merge({}, contextRequestOptions, options, propsRequestOptions, mutateRequestOptions, { signal: signal }));
                    if (context.onRequest)
                        context.onRequest(request);
                    _d.label = 7;
                case 7:
                    _d.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, fetch(request)];
                case 8:
                    response = _d.sent();
                    if (context.onResponse)
                        context.onResponse(response.clone());
                    return [3 /*break*/, 10];
                case 9:
                    e_1 = _d.sent();
                    error = {
                        message: "Failed to fetch: " + e_1.message,
                        data: "",
                    };
                    setState({
                        error: error,
                        loading: false,
                    });
                    if (!props.localErrorOnly && context.onError) {
                        context.onError(error, function () { return mutate(body, mutateRequestOptions); });
                    }
                    throw error;
                case 10: return [4 /*yield*/, processResponse(response)];
                case 11:
                    _c = _d.sent(), rawData = _c.data, responseError = _c.responseError;
                    try {
                        data = resolve ? resolve(rawData) : rawData;
                    }
                    catch (e) {
                        // avoid state updates when component has been unmounted
                        // and when fetch/processResponse threw an error
                        if (signal && signal.aborted) {
                            return [2 /*return*/];
                        }
                        error_1 = {
                            data: e.message,
                            message: "Failed to resolve: " + e.message,
                        };
                        setState(function (prevState) { return (__assign(__assign({}, prevState), { error: error_1, loading: false })); });
                        throw e;
                    }
                    if (signal && signal.aborted) {
                        return [2 /*return*/];
                    }
                    if (!response.ok || responseError) {
                        error_2 = {
                            data: data,
                            message: "Failed to fetch: " + response.status + " " + response.statusText,
                            status: response.status,
                        };
                        setState(function (prevState) { return (__assign(__assign({}, prevState), { error: error_2, loading: false })); });
                        if (!props.localErrorOnly && context.onError) {
                            context.onError(error_2, function () { return mutate(body); }, response);
                        }
                        throw error_2;
                    }
                    setState(function (prevState) { return (__assign(__assign({}, prevState), { loading: false })); });
                    if (props.onMutate) {
                        props.onMutate(body, data);
                    }
                    return [2 /*return*/, data];
            }
        });
    }); }, 
    /* eslint-disable react-hooks/exhaustive-deps */
    [context.base, context.requestOptions, context.resolve, state.error, state.loading, path, abort, getAbortSignal]);
    return __assign(__assign(__assign(__assign({}, state), { mutate: mutate }), props.mock), { cancel: function () {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { loading: false })); });
            abort();
        } });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlTXV0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VzZU11dGF0ZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUNqQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFcEMsT0FBTyxFQUFRLFdBQVcsRUFBZSxNQUFNLFVBQVUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQTJEdEMsTUFBTSxVQUFVLFNBQVM7SUFBekIsaUJBbUxDO0lBNUtDLElBQU0sS0FBSyxHQUNULE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQU0sU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDO0lBRWhILElBQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QixJQUFBLElBQUksR0FBNEUsS0FBSyxLQUFqRixFQUFFLEtBQTBFLEtBQUssS0FBNUQsRUFBbkIsSUFBSSxtQkFBRyxPQUFPLENBQUMsSUFBSSxLQUFBLEVBQUUsSUFBSSxHQUFpRCxLQUFLLEtBQXRELEVBQUUsS0FBK0MsS0FBSyxZQUFwQyxFQUFoQixXQUFXLG1CQUFHLEVBQUUsS0FBQSxFQUFFLE9BQU8sR0FBc0IsS0FBSyxRQUEzQixFQUFFLEtBQW9CLEtBQUssV0FBVixFQUFmLFVBQVUsbUJBQUcsRUFB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