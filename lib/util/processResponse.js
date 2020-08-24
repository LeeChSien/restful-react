import { __awaiter, __generator } from "tslib";
export var processResponse = function (response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, e_1, _b, e_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (response.status === 204) {
                    return [2 /*return*/, { data: undefined, responseError: false }];
                }
                if (!(response.headers.get("content-type") || "").includes("application/json")) return [3 /*break*/, 5];
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                _a = {};
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, (_a.data = _c.sent(),
                    _a.responseError = false,
                    _a)];
            case 3:
                e_1 = _c.sent();
                return [2 /*return*/, {
                        data: e_1.message,
                        responseError: true,
                    }];
            case 4: return [3 /*break*/, 11];
            case 5:
                if (!((response.headers.get("content-type") || "").includes("text/plain") ||
                    (response.headers.get("content-type") || "").includes("text/html"))) return [3 /*break*/, 10];
                _c.label = 6;
            case 6:
                _c.trys.push([6, 8, , 9]);
                _b = {};
                return [4 /*yield*/, response.text()];
            case 7: return [2 /*return*/, (_b.data = _c.sent(),
                    _b.responseError = false,
                    _b)];
            case 8:
                e_2 = _c.sent();
                return [2 /*return*/, {
                        data: e_2.message,
                        responseError: true,
                    }];
            case 9: return [3 /*break*/, 11];
            case 10: return [2 /*return*/, {
                    data: response,
                    responseError: false,
                }];
            case 11: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc1Jlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvcHJvY2Vzc1Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsVUFBTyxRQUFrQjs7Ozs7Z0JBQ3RELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7b0JBQzNCLHNCQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUM7aUJBQ2xEO3FCQUNHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQXpFLHdCQUF5RTs7Ozs7Z0JBR2pFLHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTtvQkFEN0IsdUJBQ0UsT0FBSSxHQUFFLFNBQXFCO29CQUMzQixnQkFBYSxHQUFFLEtBQUs7eUJBQ3BCOzs7Z0JBRUYsc0JBQU87d0JBQ0wsSUFBSSxFQUFFLEdBQUMsQ0FBQyxPQUFPO3dCQUNmLGFBQWEsRUFBRSxJQUFJO3FCQUNwQixFQUFDOzs7cUJBR0osQ0FBQSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7b0JBQ25FLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBLEVBRGxFLHlCQUNrRTs7Ozs7Z0JBSXhELHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTtvQkFEN0IsdUJBQ0UsT0FBSSxHQUFFLFNBQXFCO29CQUMzQixnQkFBYSxHQUFFLEtBQUs7eUJBQ3BCOzs7Z0JBRUYsc0JBQU87d0JBQ0wsSUFBSSxFQUFFLEdBQUMsQ0FBQyxPQUFPO3dCQUNmLGFBQWEsRUFBRSxJQUFJO3FCQUNwQixFQUFDOztxQkFHSixzQkFBTztvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxhQUFhLEVBQUUsS0FBSztpQkFDckIsRUFBQzs7OztLQUVMLENBQUMifQ==