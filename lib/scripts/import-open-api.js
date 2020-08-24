import { __awaiter, __generator, __read, __spread, __values } from "tslib";
import { pascal } from "case";
import chalk from "chalk";
import openApiValidator from "ibm-openapi-validator";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import isEmpty from "lodash/isEmpty";
import set from "lodash/set";
import uniq from "lodash/uniq";
import swagger2openapi from "swagger2openapi";
import YAML from "js-yaml";
var IdentifierRegexp = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
/**
 * Discriminator helper for `ReferenceObject`
 *
 * @param property
 */
export var isReference = function (property) {
    return Boolean(property.$ref);
};
/**
 * Return the typescript equivalent of open-api data type
 *
 * @param item
 * @ref https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#data-types
 */
export var getScalar = function (item) {
    var nullable = item.nullable ? " | null" : "";
    switch (item.type) {
        case "int32":
        case "int64":
        case "number":
        case "integer":
        case "long":
        case "float":
        case "double":
            return "number" + nullable;
        case "boolean":
            return "boolean" + nullable;
        case "array":
            return getArray(item) + nullable;
        case "null":
            return "null";
        case "string":
        case "byte":
        case "binary":
        case "date":
        case "dateTime":
        case "date-time":
        case "password":
            return (item.enum ? "\"" + item.enum.join("\" | \"") + "\"" : "string") + nullable;
        case "object":
        default:
            return getObject(item) + nullable;
    }
};
/**
 * Return the output type from the $ref
 *
 * @param $ref
 */
export var getRef = function ($ref) {
    if ($ref.startsWith("#/components/schemas")) {
        return pascal($ref.replace("#/components/schemas/", ""));
    }
    else if ($ref.startsWith("#/components/responses")) {
        return pascal($ref.replace("#/components/responses/", "")) + "Response";
    }
    else if ($ref.startsWith("#/components/parameters")) {
        return pascal($ref.replace("#/components/parameters/", "")) + "Parameter";
    }
    else if ($ref.startsWith("#/components/requestBodies")) {
        return pascal($ref.replace("#/components/requestBodies/", "")) + "RequestBody";
    }
    else {
        throw new Error("This library only resolve $ref that are include into `#/components/*` for now");
    }
};
/**
 * Return the output type from an array
 *
 * @param item item with type === "array"
 */
export var getArray = function (item) {
    if (item.items) {
        if (!isReference(item.items) && (item.items.oneOf || item.items.allOf || item.items.enum)) {
            return "(" + resolveValue(item.items) + ")[]";
        }
        else {
            return resolveValue(item.items) + "[]";
        }
    }
    else {
        throw new Error("All arrays must have an `items` key define");
    }
};
/**
 * Return the output type from an object
 *
 * @param item item with type === "object"
 */
export var getObject = function (item) {
    if (isReference(item)) {
        return getRef(item.$ref);
    }
    if (item.allOf) {
        return item.allOf.map(resolveValue).join(" & ");
    }
    if (item.oneOf) {
        return item.oneOf.map(resolveValue).join(" | ");
    }
    if (!item.type && !item.properties && !item.additionalProperties) {
        return "{}";
    }
    // Free form object (https://swagger.io/docs/specification/data-models/data-types/#free-form)
    if (item.type === "object" &&
        !item.properties &&
        (!item.additionalProperties || item.additionalProperties === true || isEmpty(item.additionalProperties))) {
        return "{[key: string]: any}";
    }
    // Consolidation of item.properties & item.additionalProperties
    var output = "{\n";
    if (item.properties) {
        output += Object.entries(item.properties)
            .map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], prop = _b[1];
            var doc = isReference(prop) ? "" : formatDescription(prop.description, 2);
            var isRequired = (item.required || []).includes(key);
            var processedKey = IdentifierRegexp.test(key) ? key : "\"" + key + "\"";
            return "  " + doc + processedKey + (isRequired ? "" : "?") + ": " + resolveValue(prop) + ";";
        })
            .join("\n");
    }
    if (item.additionalProperties) {
        if (item.properties) {
            output += "\n";
        }
        output += "  [key: string]: " + (item.additionalProperties === true ? "any" : resolveValue(item.additionalProperties)) + ";";
    }
    if (item.properties || item.additionalProperties) {
        if (output === "{\n")
            return "{}";
        return output + "\n}";
    }
    return item.type === "object" ? "{[key: string]: any}" : "any";
};
/**
 * Resolve the value of a schema object to a proper type definition.
 * @param schema
 */
export var resolveValue = function (schema) { return (isReference(schema) ? getRef(schema.$ref) : getScalar(schema)); };
/**
 * Extract responses / request types from open-api specs
 *
 * @param responsesOrRequests reponses or requests object from open-api specs
 */
export var getResReqTypes = function (responsesOrRequests) {
    return uniq(responsesOrRequests.map(function (_a) {
        var e_1, _b;
        var _c = __read(_a, 2), _ = _c[0], res = _c[1];
        if (!res) {
            return "void";
        }
        if (isReference(res)) {
            return getRef(res.$ref);
        }
        if (res.content) {
            try {
                for (var _d = __values(Object.keys(res.content)), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var contentType = _e.value;
                    if (contentType.startsWith("*/*") ||
                        contentType.startsWith("application/json") ||
                        contentType.startsWith("application/octet-stream")) {
                        var schema = res.content[contentType].schema;
                        return resolveValue(schema);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return "void";
        }
        return "void";
    })).join(" | ");
};
/**
 * Return every params in a path
 *
 * @example
 * ```
 * getParamsInPath("/pet/{category}/{name}/");
 * // => ["category", "name"]
 * ```
 * @param path
 */
export var getParamsInPath = function (path) {
    var n;
    var output = [];
    var templatePathRegex = /\{(\w+)}/g;
    // tslint:disable-next-line:no-conditional-assignment
    while ((n = templatePathRegex.exec(path)) !== null) {
        output.push(n[1]);
    }
    return output;
};
/**
 * Import and parse the openapi spec from a yaml/json
 *
 * @param data raw data of the spec
 * @param format format of the spec
 */
var importSpecs = function (data, extension) {
    var schema = extension === "yaml" ? YAML.safeLoad(data) : JSON.parse(data);
    return new Promise(function (resolve, reject) {
        if (!schema.openapi || !schema.openapi.startsWith("3.0")) {
            swagger2openapi.convertObj(schema, {}, function (err, convertedObj) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(convertedObj.openapi);
                }
            });
        }
        else {
            resolve(schema);
        }
    });
};
/**
 * Take a react props value style and convert it to object style
 *
 * Example:
 *  reactPropsValueToObjectValue(`{ getConfig("myVar") }`) // `getConfig("myVar")`
 */
export var reactPropsValueToObjectValue = function (value) { return value.replace(/^{(.*)}$/, "$1"); };
/**
 * Generate a restful-react component from openapi operation specs
 *
 * @param operation
 * @param verb
 * @param route
 * @param baseUrl
 * @param operationIds - List of `operationId` to check duplication
 */
export var generateRestfulComponent = function (operation, verb, route, operationIds, parameters, schemasComponents, customProps, customGenerator) {
    if (parameters === void 0) { parameters = []; }
    if (customProps === void 0) { customProps = {}; }
    if (!operation.operationId) {
        throw new Error("Every path must have a operationId - No operationId set for " + verb + " " + route);
    }
    if (operationIds.includes(operation.operationId)) {
        throw new Error("\"" + operation.operationId + "\" is duplicated in your schema definition!");
    }
    operationIds.push(operation.operationId);
    route = route.replace(/\{/g, "${"); // `/pet/{id}` => `/pet/${id}`
    // Remove the last param of the route if we are in the DELETE case
    var lastParamInTheRoute = null;
    if (verb === "delete") {
        var lastParamInTheRouteRegExp = /\/\$\{(\w+)\}\/?$/;
        lastParamInTheRoute = (route.match(lastParamInTheRouteRegExp) || [])[1];
        route = route.replace(lastParamInTheRouteRegExp, ""); // `/pet/${id}` => `/pet`
    }
    var componentName = pascal(operation.operationId);
    var Component = verb === "get" ? "Get" : "Mutate";
    var isOk = function (_a) {
        var _b = __read(_a, 1), statusCode = _b[0];
        return statusCode.toString().startsWith("2");
    };
    var isError = function (_a) {
        var _b = __read(_a, 1), statusCode = _b[0];
        return statusCode.toString().startsWith("4") || statusCode.toString().startsWith("5") || statusCode === "default";
    };
    var responseTypes = getResReqTypes(Object.entries(operation.responses).filter(isOk)) || "void";
    var errorTypes = getResReqTypes(Object.entries(operation.responses).filter(isError)) || "unknown";
    var requestBodyTypes = getResReqTypes([["body", operation.requestBody]]);
    var needARequestBodyComponent = requestBodyTypes.includes("{");
    var needAResponseComponent = responseTypes.includes("{");
    /**
     * We strip the ID from the URL in order to pass it as an argument to the
     * `delete` function for generated <DeleteResource /> components.
     *
     * For example:
     *
     *  A given request
     *    DELETE https://my.api/resource/123
     *
     *  Becomes
     *    <DeleteResource>
     *      {(deleteThisThing) => <Button onClick={() => deleteThisThing("123")}>DELETE IT</Button>}
     *    </DeleteResource>
     */
    var paramsInPath = getParamsInPath(route).filter(function (param) { return !(verb === "delete" && param === lastParamInTheRoute); });
    var _a = groupBy(__spread(parameters, (operation.parameters || [])).map(function (p) {
        if (isReference(p)) {
            return get(schemasComponents, p.$ref.replace("#/components/", "").replace("/", "."));
        }
        else {
            return p;
        }
    }), "in"), _b = _a.query, queryParams = _b === void 0 ? [] : _b, _c = _a.path, pathParams = _c === void 0 ? [] : _c, _d = _a.header, headerParams = _d === void 0 ? [] : _d;
    var paramsTypes = paramsInPath
        .map(function (p) {
        try {
            var _a = pathParams.find(function (i) { return i.name === p; }), name_1 = _a.name, required = _a.required, schema = _a.schema, description_1 = _a.description;
            return "" + (description_1 ? formatDescription(description_1, 2) : "") + name_1 + (required ? "" : "?") + ": " + resolveValue(schema);
        }
        catch (err) {
            throw new Error("The path params " + p + " can't be found in parameters (" + operation.operationId + ")");
        }
    })
        .join(";\n  ");
    var queryParamsType = queryParams
        .map(function (p) {
        var processedName = IdentifierRegexp.test(p.name) ? p.name : "\"" + p.name + "\"";
        return "" + formatDescription(p.description, 2) + processedName + (p.required ? "" : "?") + ": " + resolveValue(p.schema);
    })
        .join(";\n  ");
    // Retrieve the type of the param for delete verb
    var lastParamInTheRouteDefinition = operation.parameters && lastParamInTheRoute
        ? operation.parameters
            .map(function (p) {
            return isReference(p)
                ? get(schemasComponents, p.$ref.replace("#/components/", "").replace("/", "."))
                : p;
        })
            .find(function (p) { return p.name === lastParamInTheRoute; })
        : { schema: { type: "string" } };
    if (!lastParamInTheRouteDefinition) {
        throw new Error("The path params " + lastParamInTheRoute + " can't be found in parameters (" + operation.operationId + ")");
    }
    var lastParamInTheRouteType = !isReference(lastParamInTheRouteDefinition.schema) && lastParamInTheRouteDefinition.schema
        ? getScalar(lastParamInTheRouteDefinition.schema)
        : isReference(lastParamInTheRouteDefinition.schema)
            ? getRef(lastParamInTheRouteDefinition.schema.$ref)
            : "string";
    var genericsTypes = verb === "get"
        ? (needAResponseComponent ? componentName + "Response" : responseTypes) + ", " + errorTypes + ", " + (queryParamsType ? componentName + "QueryParams" : "void") + ", " + (paramsInPath.length ? componentName + "PathParams" : "void")
        : (needAResponseComponent ? componentName + "Response" : responseTypes) + ", " + errorTypes + ", " + (queryParamsType ? componentName + "QueryParams" : "void") + ", " + (verb === "delete" && lastParamInTheRoute
            ? lastParamInTheRouteType
            : needARequestBodyComponent
                ? componentName + "RequestBody"
                : requestBodyTypes) + ", " + (paramsInPath.length ? componentName + "PathParams" : "void");
    var genericsTypesForHooksProps = verb === "get"
        ? (needAResponseComponent ? componentName + "Response" : responseTypes) + ", " + errorTypes + ", " + (queryParamsType ? componentName + "QueryParams" : "void") + ", " + (paramsInPath.length ? componentName + "PathParams" : "void")
        : (needAResponseComponent ? componentName + "Response" : responseTypes) + ", " + errorTypes + ", " + (queryParamsType ? componentName + "QueryParams" : "void") + ", " + (verb === "delete" && lastParamInTheRoute
            ? lastParamInTheRouteType
            : needARequestBodyComponent
                ? componentName + "RequestBody"
                : requestBodyTypes) + ", " + (paramsInPath.length ? componentName + "PathParams" : "void");
    var customPropsEntries = Object.entries(customProps);
    var description = formatDescription(operation.summary && operation.description
        ? operation.summary + "\n\n" + operation.description
        : "" + (operation.summary || "") + (operation.description || ""));
    var output = "" + (needAResponseComponent
        ? "\nexport " + (responseTypes.includes("|") ? "type " + componentName + "Response =" : "interface " + componentName + "Response") + " " + responseTypes + "\n"
        : "") + (queryParamsType
        ? "\nexport interface " + componentName + "QueryParams {\n  " + queryParamsType + ";\n}\n"
        : "") + (paramsInPath.length
        ? "\nexport interface " + componentName + "PathParams {\n  " + paramsTypes + "\n}\n"
        : "") + (needARequestBodyComponent
        ? "\nexport interface " + componentName + "RequestBody " + requestBodyTypes + "\n"
        : "") + "\nexport type " + componentName + "Props = Omit<" + Component + "Props<" + genericsTypes + ">, \"path\"" + (verb === "get" ? "" : " | \"verb\"") + ">" + (paramsInPath.length ? " & " + componentName + "PathParams" : "") + ";\n\n" + description + "export const " + componentName + " = (" + (paramsInPath.length ? "{" + paramsInPath.join(", ") + ", ...props}" : "props") + ": " + componentName + "Props) => (\n  <" + Component + "<" + genericsTypes + ">" + (verb === "get"
        ? ""
        : "\n    verb=\"" + verb.toUpperCase() + "\"") + "\n    path={`" + route + "`}" + (customPropsEntries.length
        ? "\n    " + customPropsEntries.map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return key + "=" + value;
        }).join("\n    ")
        : "") + "\n    {...props}\n  />\n);\n\n";
    // Hooks version
    output += "export type Use" + componentName + "Props = Omit<Use" + Component + "Props<" + genericsTypesForHooksProps + ">, \"path\"" + (verb === "get" ? "" : " | \"verb\"") + ">" + (paramsInPath.length ? " & " + componentName + "PathParams" : "") + ";\n\n" + description + "export const use" + componentName + " = (" + (paramsInPath.length ? "{" + paramsInPath.join(", ") + ", ...props}" : "props") + ": Use" + componentName + "Props) => use" + Component + "<" + genericsTypes + ">(" + (verb === "get" ? "" : "\"" + verb.toUpperCase() + "\", ") + (paramsInPath.length
        ? "(paramsInPath: " + componentName + "PathParams) => `" + route.replace(/\$\{/g, "${paramsInPath.") + "`"
        : "`" + route + "`") + ", " + (customPropsEntries.length || paramsInPath.length
        ? "{ " + (customPropsEntries.length
            ? customPropsEntries
                .map(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                return key + ":" + reactPropsValueToObjectValue(value || "");
            })
                .join(", ") + ","
            : "") + (paramsInPath.length ? "pathParams: { " + paramsInPath.join(", ") + " }," : "") + " ...props }"
        : "props") + ");\n\n";
    // Custom version
    if (customGenerator) {
        output += customGenerator({
            componentName: componentName,
            verb: verb,
            route: route,
            description: description,
            genericsTypes: genericsTypes,
            paramsInPath: paramsInPath,
            paramsTypes: paramsTypes,
            operation: operation,
        });
    }
    if (headerParams.map(function (_a) {
        var name = _a.name;
        return name.toLocaleLowerCase();
    }).includes("prefer")) {
        output += "export type Poll" + componentName + "Props = Omit<PollProps<" + genericsTypes + ">, \"path\">" + (paramsInPath.length ? " & {" + paramsTypes + "}" : "") + ";\n\n" + (operation.summary ? "// " + operation.summary + " (long polling)" : "") + "\nexport const Poll" + componentName + " = (" + (paramsInPath.length ? "{" + paramsInPath.join(", ") + ", ...props}" : "props") + ": Poll" + componentName + "Props) => (\n  <Poll<" + genericsTypes + ">\n    path={`" + route + "`}\n    {...props}\n  />\n);\n\n";
    }
    return output;
};
/**
 * Generate the interface string
 *
 * @param name interface name
 * @param schema
 */
export var generateInterface = function (name, schema) {
    var scalar = getScalar(schema);
    var isEmptyInterface = scalar === "{}";
    return "" + formatDescription(schema.description) + (isEmptyInterface ? "// tslint:disable-next-line:no-empty-interface\n" : "") + "export interface " + pascal(name) + " " + scalar;
};
/**
 * Propagate every `discriminator.propertyName` mapping to the original ref
 *
 * Note: This method directly mutate the `specs` object.
 *
 * @param specs
 */
export var resolveDiscriminator = function (specs) {
    if (specs.components && specs.components.schemas) {
        Object.values(specs.components.schemas).forEach(function (schema) {
            if (isReference(schema) || !schema.discriminator || !schema.discriminator.mapping) {
                return;
            }
            var _a = schema.discriminator, mapping = _a.mapping, propertyName = _a.propertyName;
            Object.entries(mapping).forEach(function (_a) {
                var _b = __read(_a, 2), name = _b[0], ref = _b[1];
                if (!ref.startsWith("#/components/schemas/")) {
                    throw new Error("Discriminator mapping outside of `#/components/schemas` is not supported");
                }
                set(specs, "components.schemas." + ref.slice("#/components/schemas/".length) + ".properties." + propertyName + ".enum", [
                    name,
                ]);
            });
        });
    }
};
/**
 * Extract all types from #/components/schemas
 *
 * @param schemas
 */
export var generateSchemasDefinition = function (schemas) {
    if (schemas === void 0) { schemas = {}; }
    if (isEmpty(schemas)) {
        return "";
    }
    return (Object.entries(schemas)
        .map(function (_a) {
        var _b = __read(_a, 2), name = _b[0], schema = _b[1];
        return !isReference(schema) &&
            (!schema.type || schema.type === "object") &&
            !schema.allOf &&
            !schema.oneOf &&
            !isReference(schema) &&
            !schema.nullable
            ? generateInterface(name, schema)
            : formatDescription(isReference(schema) ? undefined : schema.description) + "export type " + pascal(name) + " = " + resolveValue(schema) + ";";
    })
        .join("\n\n") + "\n");
};
/**
 * Extract all types from #/components/requestBodies
 *
 * @param requestBodies
 */
export var generateRequestBodiesDefinition = function (requestBodies) {
    if (requestBodies === void 0) { requestBodies = {}; }
    if (isEmpty(requestBodies)) {
        return "";
    }
    return ("\n" +
        Object.entries(requestBodies)
            .map(function (_a) {
            var _b = __read(_a, 2), name = _b[0], requestBody = _b[1];
            var doc = isReference(requestBody) ? "" : formatDescription(requestBody.description);
            var type = getResReqTypes([["", requestBody]]);
            var isEmptyInterface = type === "{}";
            if (isEmptyInterface) {
                return "// tslint:disable-next-line:no-empty-interface\nexport interface " + pascal(name) + "RequestBody " + type;
            }
            else if (type.includes("{") && !type.includes("|") && !type.includes("&")) {
                return doc + "export interface " + pascal(name) + "RequestBody " + type;
            }
            else {
                return doc + "export type " + pascal(name) + "RequestBody = " + type + ";";
            }
        })
            .join("\n\n") +
        "\n");
};
/**
 * Extract all types from #/components/responses
 *
 * @param responses
 */
export var generateResponsesDefinition = function (responses) {
    if (responses === void 0) { responses = {}; }
    if (isEmpty(responses)) {
        return "";
    }
    return ("\n" +
        Object.entries(responses)
            .map(function (_a) {
            var _b = __read(_a, 2), name = _b[0], response = _b[1];
            var doc = isReference(response) ? "" : formatDescription(response.description);
            var type = getResReqTypes([["", response]]);
            var isEmptyInterface = type === "{}";
            if (isEmptyInterface) {
                return "// tslint:disable-next-line:no-empty-interface\nexport interface " + pascal(name) + "Response " + type;
            }
            else if (type.includes("{") && !type.includes("|") && !type.includes("&")) {
                return doc + "export interface " + pascal(name) + "Response " + type;
            }
            else {
                return doc + "export type " + pascal(name) + "Response = " + type + ";";
            }
        })
            .join("\n\n") +
        "\n");
};
/**
 * Format a description to code documentation.
 *
 * @param description
 */
export var formatDescription = function (description, tabSize) {
    if (tabSize === void 0) { tabSize = 0; }
    return description
        ? "/**\n" + description
            .split("\n")
            .map(function (i) { return " ".repeat(tabSize) + " * " + i; })
            .join("\n") + "\n" + " ".repeat(tabSize) + " */\n" + " ".repeat(tabSize)
        : "";
};
/**
 * Validate the spec with ibm-openapi-validator (with a custom pretty logger).
 *
 * @param specs openAPI spec
 */
var validate = function (specs) { return __awaiter(void 0, void 0, void 0, function () {
    var log, wasConsoleLogCalledFromBlackBox, _a, errors, warnings;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                log = console.log;
                wasConsoleLogCalledFromBlackBox = false;
                console.log = function () {
                    var props = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        props[_i] = arguments[_i];
                    }
                    wasConsoleLogCalledFromBlackBox = true;
                    log.apply(void 0, __spread(props));
                };
                return [4 /*yield*/, openApiValidator(specs)];
            case 1:
                _a = _b.sent(), errors = _a.errors, warnings = _a.warnings;
                console.log = log; // reset console.log because we're done with the black box
                if (wasConsoleLogCalledFromBlackBox) {
                    log("More information: https://github.com/IBM/openapi-validator/#configuration");
                }
                if (warnings.length) {
                    log(chalk.yellow("(!) Warnings"));
                    warnings.forEach(function (i) {
                        return log(chalk.yellow("\nMessage : " + i.message + "\nPath    : " + i.path));
                    });
                }
                if (errors.length) {
                    log(chalk.red("(!) Errors"));
                    errors.forEach(function (i) {
                        return log(chalk.red("\nMessage : " + i.message + "\nPath    : " + i.path));
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
/**
 * Main entry of the generator. Generate restful-react component from openAPI.
 *
 * @param options.data raw data of the spec
 * @param options.format format of the spec
 * @param options.transformer custom function to transform your spec
 * @param options.validation validate the spec with ibm-openapi-validator tool
 */
var importOpenApi = function (_a) {
    var data = _a.data, format = _a.format, transformer = _a.transformer, validation = _a.validation, customImport = _a.customImport, customProps = _a.customProps, customGenerator = _a.customGenerator;
    return __awaiter(void 0, void 0, void 0, function () {
        var operationIds, specs, output, haveGet, haveMutate, havePoll, imports;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    operationIds = [];
                    return [4 /*yield*/, importSpecs(data, format)];
                case 1:
                    specs = _b.sent();
                    if (transformer) {
                        specs = transformer(specs);
                    }
                    if (!validation) return [3 /*break*/, 3];
                    return [4 /*yield*/, validate(specs)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    resolveDiscriminator(specs);
                    output = "";
                    output += generateSchemasDefinition(specs.components && specs.components.schemas);
                    output += generateRequestBodiesDefinition(specs.components && specs.components.requestBodies);
                    output += generateResponsesDefinition(specs.components && specs.components.responses);
                    Object.entries(specs.paths).forEach(function (_a) {
                        var _b = __read(_a, 2), route = _b[0], verbs = _b[1];
                        Object.entries(verbs).forEach(function (_a) {
                            var _b = __read(_a, 2), verb = _b[0], operation = _b[1];
                            if (["get", "post", "patch", "put", "delete"].includes(verb)) {
                                output += generateRestfulComponent(operation, verb, route, operationIds, verbs.parameters, specs.components, customProps, customGenerator);
                            }
                        });
                    });
                    haveGet = Boolean(output.match(/<Get</));
                    haveMutate = Boolean(output.match(/<Mutate</));
                    havePoll = Boolean(output.match(/<Poll</));
                    imports = [];
                    if (haveGet) {
                        imports.push("Get", "GetProps", "useGet", "UseGetProps");
                    }
                    if (haveMutate) {
                        imports.push("Mutate", "MutateProps", "useMutate", "UseMutateProps");
                    }
                    if (havePoll) {
                        imports.push("Poll", "PollProps");
                    }
                    output =
                        "/* Generated by restful-react */\n\nimport React from \"react\";\nimport { " + imports.join(", ") + " } from \"restful-react\";" + (customImport ? "\n" + customImport + "\n" : "") + "\n\nexport type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;\n\n" + output;
                    return [2 /*return*/, output];
            }
        });
    });
};
export default importOpenApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LW9wZW4tYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdHMvaW1wb3J0LW9wZW4tYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLGdCQUFnQixNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sR0FBRyxNQUFNLFlBQVksQ0FBQztBQUM3QixPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEdBQUcsTUFBTSxZQUFZLENBQUM7QUFDN0IsT0FBTyxJQUFJLE1BQU0sYUFBYSxDQUFDO0FBYy9CLE9BQU8sZUFBZSxNQUFNLGlCQUFpQixDQUFDO0FBRTlDLE9BQU8sSUFBSSxNQUFNLFNBQVMsQ0FBQztBQUczQixJQUFNLGdCQUFnQixHQUFHLDRCQUE0QixDQUFDO0FBRXREOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsSUFBTSxXQUFXLEdBQUcsVUFBQyxRQUFhO0lBQ3ZDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBRyxVQUFDLElBQWtCO0lBQzFDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRWhELFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNqQixLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssT0FBTyxDQUFDO1FBQ2IsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFNBQVMsQ0FBQztRQUNmLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxPQUFPLENBQUM7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