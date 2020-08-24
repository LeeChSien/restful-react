import { useCallback, useRef } from "react";
function createAbortController() {
    try {
        return new AbortController();
    }
    catch (_a) {
        return undefined;
    }
}
export function useAbort() {
    var instance = useRef(createAbortController());
    var abort = useCallback(function () {
        if (instance && instance.current) {
            instance.current.abort();
            instance.current = createAbortController();
        }
    }, [instance]);
    return {
        abort: abort,
        getAbortSignal: function () {
            var _a;
            return (_a = instance === null || instance === void 0 ? void 0 : instance.current) === null || _a === void 0 ? void 0 : _a.signal;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQWJvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlQWJvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFNUMsU0FBUyxxQkFBcUI7SUFDNUIsSUFBSTtRQUNGLE9BQU8sSUFBSSxlQUFlLEVBQUUsQ0FBQztLQUM5QjtJQUFDLFdBQU07UUFDTixPQUFPLFNBQVMsQ0FBQztLQUNsQjtBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsUUFBUTtJQUN0QixJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBRWpELElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUN4QixJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsUUFBUSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsRUFBRSxDQUFDO1NBQzVDO0lBQ0gsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUVmLE9BQU87UUFDTCxLQUFLLE9BQUE7UUFDTCxjQUFjOztZQUNaLGFBQU8sUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sMENBQUUsTUFBTSxDQUFDO1FBQ25DLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyJ9