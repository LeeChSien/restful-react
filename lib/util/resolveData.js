import { __awaiter, __generator } from "tslib";
export var resolveData = function (_a) {
    var data = _a.data, resolve = _a.resolve;
    return __awaiter(void 0, void 0, void 0, function () {
        var resolvedData, resolveError, resolvedDataOrPromise, _b, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    resolvedData = null;
                    resolveError = null;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 7, , 8]);
                    if (!resolve) return [3 /*break*/, 5];
                    resolvedDataOrPromise = resolve(data);
                    if (!resolvedDataOrPromise.then) return [3 /*break*/, 3];
                    return [4 /*yield*/, resolvedDataOrPromise];
                case 2:
                    _b = (_c.sent());
                    return [3 /*break*/, 4];
                case 3:
                    _b = resolvedDataOrPromise;
                    _c.label = 4;
                case 4:
                    resolvedData = _b;
                    return [3 /*break*/, 6];
                case 5:
                    resolvedData = data;
                    _c.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_1 = _c.sent();
                    resolvedData = null;
                    resolveError = {
                        message: "RESOLVE_ERROR",
                        data: JSON.stringify(err_1),
                    };
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/, {
                        data: resolvedData,
                        error: resolveError,
                    }];
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9yZXNvbHZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxDQUFDLElBQU0sV0FBVyxHQUFHLFVBQXNCLEVBTWhEO1FBTEMsSUFBSSxVQUFBLEVBQ0osT0FBTyxhQUFBOzs7Ozs7b0JBS0gsWUFBWSxHQUFpQixJQUFJLENBQUM7b0JBQ2xDLFlBQVksR0FBZ0MsSUFBSSxDQUFDOzs7O3lCQUUvQyxPQUFPLEVBQVAsd0JBQU87b0JBQ0gscUJBQXFCLEdBQTJCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDcEQscUJBQXdDLENBQUMsSUFBSSxFQUE5Qyx3QkFBOEM7b0JBQ3ZELHFCQUFNLHFCQUFxQixFQUFBOztvQkFBN0IsS0FBQyxDQUFDLFNBQTJCLENBQVcsQ0FBQTs7O29CQUN4QyxLQUFDLHFCQUErQixDQUFBOzs7b0JBRnBDLFlBQVksS0FFd0IsQ0FBQzs7O29CQUVyQyxZQUFZLEdBQUcsSUFBSSxDQUFDOzs7OztvQkFHdEIsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDcEIsWUFBWSxHQUFHO3dCQUNiLE9BQU8sRUFBRSxlQUFlO3dCQUN4QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFHLENBQUM7cUJBQzFCLENBQUM7O3dCQUVKLHNCQUFPO3dCQUNMLElBQUksRUFBRSxZQUFZO3dCQUNsQixLQUFLLEVBQUUsWUFBWTtxQkFDcEIsRUFBQzs7OztDQUNILENBQUMifQ==