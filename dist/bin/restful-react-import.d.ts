import { OperationObject } from "openapi3-ts";
export interface Options {
    output: string;
    file?: string;
    url?: string;
    github?: string;
    transformer?: string;
    validation?: boolean;
}
export declare type AdvancedOptions = Options & {
    customImport?: string;
    customProps?: {
        base?: string;
    };
    customGenerator?: (data: {
        componentName: string;
        verb: string;
        route: string;
        description: string;
        genericsTypes: string;
        operation: OperationObject;
        paramsInPath: string[];
        paramsTypes: string;
    }) => string;
};
export interface ExternalConfigFile {
    [backend: string]: AdvancedOptions;
}
//# sourceMappingURL=restful-react-import.d.ts.map