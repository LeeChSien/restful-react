import { __assign, __extends, __rest } from "tslib";
import noop from "lodash/noop";
import * as React from "react";
export var Context = React.createContext({
    base: "",
    parentPath: "",
    resolve: function (data) { return data; },
    requestOptions: {},
    onError: noop,
    onRequest: noop,
    onResponse: noop,
    queryParams: {},
    queryParamStringifyOptions: {},
});
var RestfulReactProvider = /** @class */ (function (_super) {
    __extends(RestfulReactProvider, _super);
    function RestfulReactProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RestfulReactProvider.prototype.render = function () {
        var _a = this.props, children = _a.children, value = __rest(_a, ["children"]);
        return (React.createElement(Context.Provider, { value: __assign({ onError: noop, onRequest: noop, onResponse: noop, resolve: function (data) { return data; }, requestOptions: {}, parentPath: "", queryParams: value.queryParams || {}, queryParamStringifyOptions: value.queryParamStringifyOptions || {} }, value) }, children));
    };
    RestfulReactProvider.displayName = "RestfulProviderContext";
    return RestfulReactProvider;
}(React.Component));
export default RestfulReactProvider;
export var RestfulReactConsumer = Context.Consumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db250ZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxJQUFJLE1BQU0sYUFBYSxDQUFDO0FBQy9CLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBOEQvQixNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBc0M7SUFDOUUsSUFBSSxFQUFFLEVBQUU7SUFDUixVQUFVLEVBQUUsRUFBRTtJQUNkLE9BQU8sRUFBRSxVQUFDLElBQVMsSUFBSyxPQUFBLElBQUksRUFBSixDQUFJO0lBQzVCLGNBQWMsRUFBRSxFQUFFO0lBQ2xCLE9BQU8sRUFBRSxJQUFJO0lBQ2IsU0FBUyxFQUFFLElBQUk7SUFDZixVQUFVLEVBQUUsSUFBSTtJQUNoQixXQUFXLEVBQUUsRUFBRTtJQUNmLDBCQUEwQixFQUFFLEVBQUU7Q0FDL0IsQ0FBQyxDQUFDO0FBUUg7SUFBcUQsd0NBQTZDO0lBQWxHOztJQXVCQSxDQUFDO0lBcEJRLHFDQUFNLEdBQWI7UUFDRSxJQUFNLEtBQXlCLElBQUksQ0FBQyxLQUFLLEVBQWpDLFFBQVEsY0FBQSxFQUFLLEtBQUssY0FBcEIsWUFBc0IsQ0FBYSxDQUFDO1FBQzFDLE9BQU8sQ0FDTCxvQkFBQyxPQUFPLENBQUMsUUFBUSxJQUNmLEtBQUssYUFDSCxPQUFPLEVBQUUsSUFBSSxFQUNiLFNBQVMsRUFBRSxJQUFJLEVBQ2YsVUFBVSxFQUFFLElBQUksRUFDaEIsT0FBTyxFQUFFLFVBQUMsSUFBUyxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksRUFDNUIsY0FBYyxFQUFFLEVBQUUsRUFDbEIsVUFBVSxFQUFFLEVBQUUsRUFDZCxXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQ3BDLDBCQUEwQixFQUFFLEtBQUssQ0FBQywwQkFBMEIsSUFBSSxFQUFFLElBQy9ELEtBQUssS0FHVCxRQUFRLENBQ1EsQ0FDcEIsQ0FBQztJQUNKLENBQUM7SUFyQmEsZ0NBQVcsR0FBRyx3QkFBd0IsQ0FBQztJQXNCdkQsMkJBQUM7Q0FBQSxBQXZCRCxDQUFxRCxLQUFLLENBQUMsU0FBUyxHQXVCbkU7ZUF2Qm9CLG9CQUFvQjtBQXlCekMsTUFBTSxDQUFDLElBQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyJ9