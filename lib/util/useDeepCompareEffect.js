import isEqualWith from "lodash/isEqualWith";
import { useEffect, useRef } from "react";
/**
 * Custom version of isEqual to handle function comparison
 */
var isEqual = function (x, y) {
    return isEqualWith(x, y, function (a, b) {
        // Deal with the function comparison case
        if (typeof a === "function" && typeof b === "function") {
            return a.toString() === b.toString();
        }
        // Fallback on the method
        return undefined;
    });
};
function useDeepCompareMemoize(value) {
    var ref = useRef();
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
export function useDeepCompareEffect(effect, deps) {
    useEffect(effect, useDeepCompareMemoize(deps));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlRGVlcENvbXBhcmVFZmZlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC91c2VEZWVwQ29tcGFyZUVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFjLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVqRDs7R0FFRztBQUNILElBQU0sT0FBTyxHQUFHLFVBQUMsQ0FBTSxFQUFFLENBQU07SUFDN0IsT0FBQSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3JCLHlDQUF5QztRQUN6QyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDdEQsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3RDO1FBQ0QseUJBQXlCO1FBQ3pCLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUMsQ0FBQztBQVBGLENBT0UsQ0FBQztBQUVMLFNBQVMscUJBQXFCLENBQUMsS0FBb0I7SUFDakQsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFPLENBQUM7SUFFMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2hDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0tBQ3JCO0lBRUQsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQ3JCLENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUksTUFBNEIsRUFBRSxJQUFPO0lBQzNFLFNBQVMsQ0FBQyxNQUFNLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNqRCxDQUFDIn0=