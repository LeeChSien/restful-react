import { __awaiter, __generator } from "tslib";
import { readFileSync } from "fs";
import { join } from "path";
import importOpenApi, { generateResponsesDefinition, generateRestfulComponent, generateSchemasDefinition, getArray, getObject, getParamsInPath, getRef, getResReqTypes, getScalar, isReference, reactPropsValueToObjectValue, resolveDiscriminator, } from "../import-open-api";
describe("scripts/import-open-api", function () {
    it("should parse correctly petstore-expanded.yaml", function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = readFileSync(join(__dirname, "./petstore-expanded.yaml"), "utf-8");
                    return [4 /*yield*/, importOpenApi({ data: input, format: "yaml" })];
                case 1:
                    data = _a.sent();
                    expect(data).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("isReference", function () {
        it("should return true if the property is a ref", function () {
            var property = {
                $ref: "#/components/schemas/FieldResponse",
            };
            expect(isReference(property)).toBe(true);
        });
        it("should return false if the property is not a ref", function () {
            var property = {
                type: "string",
            };
            expect(isReference(property)).toBe(false);
        });
    });
    describe("getParamsInPath", function () {
        it("should return all params in the path", function () {
            expect(getParamsInPath("/pet/{category}/{name}/")).toEqual(["category", "name"]);
        });
    });
    describe("getScalar", function () {
        [
            { item: { type: "integer" }, expected: "number" },
            { item: { type: "long" }, expected: "number" },
            { item: { type: "int32" }, expected: "number" },
            { item: { type: "int64" }, expected: "number" },
            { item: { type: "float" }, expected: "number" },
            { item: { type: "number" }, expected: "number" },
            { item: { type: "double" }, expected: "number" },
            { item: { type: "boolean" }, expected: "boolean" },
            { item: { type: "array", items: { type: "string" } }, expected: "string[]" },
            { item: { type: "array", items: { type: "integer" } }, expected: "number[]" },
            { item: { type: "array", items: { type: "customType" } }, expected: "any[]" },
            { item: { type: "object", properties: { value: { type: "integer" } } }, expected: "{\n  value?: number;\n}" },
            { item: { type: "object" }, expected: "{[key: string]: any}" },
            { item: { type: "object", $ref: "#/components/schemas/Foo" }, expected: "Foo" },
            { item: { type: "string" }, expected: "string" },
            { item: { type: "byte" }, expected: "string" },
            { item: { type: "binary" }, expected: "string" },
            { item: { type: "date" }, expected: "string" },
            { item: { type: "dateTime" }, expected: "string" },
            { item: { type: "date-time" }, expected: "string" },
            { item: { type: "password" }, expected: "string" },
            { item: { type: "string", enum: ["foo", "bar"] }, expected: "\"foo\" | \"bar\"" },
            { item: { type: "customType" }, expected: "any" },
            { item: { type: "integer", nullable: true }, expected: "number | null" },
            { item: { type: "boolean", nullable: true }, expected: "boolean | null" },
            { item: { type: "string", nullable: true }, expected: "string | null" },
            { item: { type: "object", nullable: true }, expected: "{[key: string]: any} | null" },
            { item: { type: "object", $ref: "#/components/schemas/Foo", nullable: true }, expected: "Foo | null" },
            { item: { type: "null", nullable: true }, expected: "null" },
            { item: { type: "null" }, expected: "null" },
        ].map(function (_a) {
            var item = _a.item, expected = _a.expected;
            return it("should return " + expected + " as type for " + item.type, function () {
                expect(getScalar(item)).toEqual(expected);
            });
        });
    });
    describe("getRef", function () {
        it("should return the name from `#/components/schemas`", function () {
            expect(getRef("#/components/schemas/foo")).toEqual("Foo");
        });
        it("should return the name from `#/components/responses`", function () {
            expect(getRef("#/components/responses/foo")).toEqual("FooResponse");
        });
        it("should return the name from `#/components/parameters`", function () {
            expect(getRef("#/components/parameters/foo")).toEqual("FooParameter");
        });
        it("should return the name from `#/components/requestBodies`", function () {
            expect(getRef("#/components/requestBodies/foo")).toEqual("FooRequestBody");
        });
        it("should throw if the ref is not in `#/components/schemas`", function () {
            expect(function () { return getRef("#/somewhere/schemas/foo"); }).toThrowError("This library only resolve $ref that are include into `#/components/*` for now");
        });
    });
    describe("getArray", function () {
        it("should return an array of number", function () {
            var item = {
                type: "array",
                items: {
                    type: "integer",
                },
            };
            expect(getArray(item)).toEqual("number[]");
        });
        it("should return an array of ref", function () {
            var item = {
                type: "array",
                items: {
                    $ref: "#/components/schemas/foo",
                },
            };
            expect(getArray(item)).toEqual("Foo[]");
        });
        it("should return an array of oneOf", function () {
            var item = {
                items: {
                    oneOf: [
                        {
                            type: "boolean",
                        },
                        {
                            type: "number",
                        },
                        {
                            type: "string",
                        },
                    ],
                    title: "Result field",
                },
                title: "Result row",
                type: "array",
            };
            expect(getArray(item)).toEqual("(boolean | number | string)[]");
        });
        it("should return an array of allOf", function () {
            var item = {
                items: {
                    allOf: [
                        {
                            $ref: "#/components/schemas/foo",
                        },
                        {
                            $ref: "#/components/schemas/bar",
                        },
                        {
                            $ref: "#/components/schemas/baz",
                        },
                    ],
                },
                type: "array",
            };
            expect(getArray(item)).toEqual("(Foo & Bar & Baz)[]");
        });
    });
    describe("getObject", function () {
        it("should return the type of a standard object", function () {
            var item = {
                type: "object",
                required: ["name", "age"],
                properties: {
                    name: {
                        type: "string",
                    },
                    age: {
                        type: "integer",
                    },
                },
            };
            expect(getObject(item)).toMatchInlineSnapshot("\n                                                                \"{\n                                                                  name: string;\n                                                                  age: number;\n                                                                }\"\n                                                ");
        });
        it("should return the type of an object with optional values", function () {
            var item = {
                type: "object",
                required: ["name"],
                properties: {
                    name: {
                        type: "string",
                    },
                    age: {
                        type: "integer",
                    },
                },
            };
            expect(getObject(item)).toMatchInlineSnapshot("\n                                                                \"{\n                                                                  name: string;\n                                                                  age?: number;\n                                                                }\"\n                                                ");
        });
        it("should deal with additionalProperties", function () {
            var item = {
                type: "object",
                additionalProperties: {
                    type: "string",
                },
            };
            expect(getObject(item)).toMatchInlineSnapshot("\n                                                                \"{\n                                                                  [key: string]: string;\n                                                                }\"\n                                                ");
        });
        it("should deal with ref additionalProperties", function () {
            var item = {
                type: "object",
                additionalProperties: {
                    $ref: "#/components/schemas/foo",
                },
            };
            expect(getObject(item)).toMatchInlineSnapshot("\n                                                        \"{\n                                                          [key: string]: Foo;\n                                                        }\"\n                                          ");
        });
        it("should deal with true as additionalProperties", function () {
            var item = {
                type: "object",
                additionalProperties: true,
            };
            expect(getObject(item)).toMatchInlineSnapshot("\"{[key: string]: any}\"");
        });
        it("should deal with ref additionalProperties", function () {
            var item = {
                type: "object",
                additionalProperties: {
                    $ref: "#/components/schemas/foo",
                },
            };
            expect(getObject(item)).toMatchInlineSnapshot("\n                                                                \"{\n                                                                  [key: string]: Foo;\n                                                                }\"\n                                                ");
        });
        it("should deal with oneOf additionalProperties", function () {
            var item = {
                type: "object",
                additionalProperties: {
                    oneOf: [{ $ref: "#/components/schemas/foo" }, { $ref: "#/components/schemas/bar" }],
                },
            };
            expect(getObject(item)).toMatchInlineSnapshot("\n                                                                \"{\n                                                                  [key: string]: Foo | Bar;\n                                                                }\"\n                                                ");
        });
        it("should deal with array as additionalProperties", function () {
            var item = {
                type: "object",
                additionalProperties: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
            };
            expect(getObject(item)).toMatchInlineSnapshot("\n                                                                \"{\n                                                                  [key: string]: string[];\n                                                                }\"\n                                                ");
        });
        it("should deal with additionalProperties on top of define properties", function () {
            var item = {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                },
                additionalProperties: true,
            };
            expect(getObject(item)).toMatchInlineSnapshot("\n                                                                \"{\n                                                                  name?: string;\n                                                                  [key: string]: any;\n                                                                }\"\n                                                ");
        });
        it("should deal with allOf", function () {
            var item = {
                type: "object",
                allOf: [
                    { $ref: "#/components/schemas/foo" },
                    {
                        type: "object",
                        required: ["name"],
                        properties: {
                            name: { type: "string" },
                        },
                    },
                ],
            };
            expect(getObject(item)).toMatchInlineSnapshot("\n                                                                \"Foo & {\n                                                                  name: string;\n                                                                }\"\n                                                ");
        });
        it("should deal with oneOf with null", function () {
            var item = {
                type: "object",
                oneOf: [
                    { $ref: "#/components/schemas/foo" },
                    {
                        type: "null",
                    },
                ],
            };
            expect(getObject(item)).toMatchInlineSnapshot("\"Foo | null\"");
        });
        it("should handle empty properties (1)", function () {
            var item = {
                properties: {},
            };
            expect(getObject(item)).toMatchInlineSnapshot("\"{}\"");
        });
        it("should handle empty properties (2)", function () {
            var item = {};
            expect(getObject(item)).toMatchInlineSnapshot("\"{}\"");
        });
        it("should handle free form object (1)", function () {
            var item = {
                type: "object",
            };
            expect(getObject(item)).toMatchInlineSnapshot("\"{[key: string]: any}\"");
        });
        it("should handle free form object (2)", function () {
            var item = {
                type: "object",
                additionalProperties: true,
            };
            expect(getObject(item)).toMatchInlineSnapshot("\"{[key: string]: any}\"");
        });
        it("should handle free form object (3)", function () {
            var item = {
                type: "object",
                additionalProperties: {},
            };
            expect(getObject(item)).toMatchInlineSnapshot("\"{[key: string]: any}\"");
        });
    });
    describe("resolveDiscriminator", function () {
        it("should propagate any discrimator value as enum", function () {
            var _a, _b, _c, _d;
            var specs = {
                openapi: "3.0.0",
                info: {
                    title: "Test",
                    description: "Test",
                    version: "0.0.1",
                    contact: {
                        name: "Fabien Bernard",
                        url: "https://fabien0102.com",
                        email: "fabien@contiamo.com",
                    },
                },
                paths: {},
                components: {
                    schemas: {
                        Error: {
                            oneOf: [{ $ref: "#/components/schemas/GeneralError" }, { $ref: "#/components/schemas/FieldError" }],
                            discriminator: {
                                propertyName: "type",
                                mapping: {
                                    GeneralError: "#/components/schemas/GeneralError",
                                    FieldError: "#/components/schemas/FieldError",
                                },
                            },
                        },
                        GeneralError: {
                            type: "object",
                            properties: {
                                type: {
                                    type: "string",
                                },
                                message: {
                                    type: "string",
                                },
                            },
                            required: ["type", "message"],
                        },
                        FieldError: {
                            type: "object",
                            properties: {
                                type: {
                                    type: "string",
                                },
                                message: {
                                    type: "string",
                                },
                                key: {
                                    type: "string",
                                },
                            },
                            required: ["type", "message", "key"],
                        },
                    },
                },
            };
            resolveDiscriminator(specs);
            expect((_b = (_a = specs === null || specs === void 0 ? void 0 : specs.components) === null || _a === void 0 ? void 0 : _a.schemas) === null || _b === void 0 ? void 0 : _b.GeneralError).toEqual({
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        enum: ["GeneralError"],
                    },
                    message: {
                        type: "string",
                    },
                },
                required: ["type", "message"],
            });
            expect((_d = (_c = specs === null || specs === void 0 ? void 0 : specs.components) === null || _c === void 0 ? void 0 : _c.schemas) === null || _d === void 0 ? void 0 : _d.FieldError).toEqual({
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        enum: ["FieldError"],
                    },
                    message: {
                        type: "string",
                    },
                    key: {
                        type: "string",
                    },
                },
                required: ["type", "message", "key"],
            });
        });
    });
    describe("generateSchemasDefinition", function () {
        it("should declare an interface for simple object", function () {
            var schema = {
                NewPet: {
                    required: ["name"],
                    properties: {
                        name: {
                            type: "string",
                        },
                        tag: {
                            type: "string",
                        },
                    },
                },
            };
            expect(generateSchemasDefinition(schema)).toMatchInlineSnapshot("\n                        \"export interface NewPet {\n                          name: string;\n                          tag?: string;\n                        }\n                        \"\n                  ");
        });
        it("should declare an interface for simple object (nullable)", function () {
            var schema = {
                NewPet: {
                    required: ["name"],
                    nullable: true,
                    properties: {
                        name: {
                            type: "string",
                        },
                        tag: {
                            type: "string",
                        },
                    },
                },
            };
            expect(generateSchemasDefinition(schema)).toMatchInlineSnapshot("\n                        \"export type NewPet = {\n                          name: string;\n                          tag?: string;\n                        } | null;\n                        \"\n                  ");
        });
        it("should declare a type for union object", function () {
            var schema = {
                Pet: {
                    allOf: [
                        { $ref: "#/components/schemas/NewPet" },
                        { required: ["id"], properties: { id: { type: "integer", format: "int64" } } },
                    ],
                },
            };
            expect(generateSchemasDefinition(schema)).toMatchInlineSnapshot("\n                        \"export type Pet = NewPet & {\n                          id: number;\n                        };\n                        \"\n                  ");
        });
        it("should declare a discriminate object", function () {
            var schema = {
                Pet: {
                    oneOf: [
                        { $ref: "#/components/schemas/NewPet" },
                        { required: ["id"], properties: { id: { type: "integer", format: "int64" } } },
                    ],
                },
            };
            expect(generateSchemasDefinition(schema)).toMatchInlineSnapshot("\n                        \"export type Pet = NewPet | {\n                          id: number;\n                        };\n                        \"\n                  ");
        });
        it("should declare a type for all others types", function () {
            var schema = {
                PetName: {
                    type: "string",
                },
            };
            expect(generateSchemasDefinition(schema)).toContain("export type PetName = string;");
        });
        it("should declare a type for all others types (nullable)", function () {
            var schema = {
                PetName: {
                    type: "string",
                    nullable: true,
                },
            };
            expect(generateSchemasDefinition(schema)).toContain("export type PetName = string | null;");
        });
        it("should deal with aliases", function () {
            var schema = {
                Wolf: {
                    $ref: "#/components/schemas/Dog",
                },
            };
            expect(generateSchemasDefinition(schema)).toContain("export type Wolf = Dog;");
        });
        it("should deal with empty object", function () {
            var schema = {
                Wolf: {
                    type: "object",
                    properties: {},
                    additionalProperties: false,
                },
            };
            expect(generateSchemasDefinition(schema)).toContain("// tslint:disable-next-line:no-empty-interface");
            expect(generateSchemasDefinition(schema)).toContain("export interface Wolf {}");
        });
    });
    describe("generateResponsesDefinition", function () {
        it("should declare an interface for simple object", function () {
            var responses = {
                JobRun: {
                    description: "Job is starting",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    executionID: {
                                        description: "ID of the job execution",
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
            };
            expect(generateResponsesDefinition(responses)).toMatchInlineSnapshot("\n                                                                        \"\n                                                                        /**\n                                                                         * Job is starting\n                                                                         */\n                                                                        export interface JobRunResponse {\n                                                                          /**\n                                                                           * ID of the job execution\n                                                                           */\n                                                                          executionID?: string;\n                                                                        }\n                                                                        \"\n                                                      ");
        });
        it("should declare an interface for wildcard content-type", function () {
            var responses = {
                JobRun: {
                    description: "Job is starting",
                    content: {
                        "*/*": {
                            schema: {
                                type: "object",
                                properties: {
                                    executionID: {
                                        description: "ID of the job execution",
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
            };
            expect(generateResponsesDefinition(responses)).toMatchInlineSnapshot("\n                                                                        \"\n                                                                        /**\n                                                                         * Job is starting\n                                                                         */\n                                                                        export interface JobRunResponse {\n                                                                          /**\n                                                                           * ID of the job execution\n                                                                           */\n                                                                          executionID?: string;\n                                                                        }\n                                                                        \"\n                                                      ");
        });
        it("should give double quotes for special properties", function () {
            var responses = {
                JobRun: {
                    description: "Job is starting",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "execution-id": {
                                        description: "ID of the job execution",
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
            };
            expect(generateResponsesDefinition(responses)).toMatchInlineSnapshot("\n                                                                        \"\n                                                                        /**\n                                                                         * Job is starting\n                                                                         */\n                                                                        export interface JobRunResponse {\n                                                                          /**\n                                                                           * ID of the job execution\n                                                                           */\n                                                                          \\\"execution-id\\\"?: string;\n                                                                        }\n                                                                        \"\n                                                      ");
        });
        it("should declare a a type for composed object", function () {
            var responses = {
                JobRun: {
                    description: "Job is starting",
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    {
                                        type: "object",
                                        properties: {
                                            executionID: {
                                                description: "ID of the job execution",
                                                type: "string",
                                            },
                                        },
                                    },
                                    { $ref: "#/components/schemas/ExecutionID" },
                                ],
                            },
                        },
                    },
                },
            };
            expect(generateResponsesDefinition(responses)).toMatchInlineSnapshot("\n                                                                        \"\n                                                                        /**\n                                                                         * Job is starting\n                                                                         */\n                                                                        export type JobRunResponse = {\n                                                                          /**\n                                                                           * ID of the job execution\n                                                                           */\n                                                                          executionID?: string;\n                                                                        } & ExecutionID;\n                                                                        \"\n                                                      ");
        });
        it("should declare a a type for union object", function () {
            var responses = {
                JobRun: {
                    description: "Job is starting",
                    content: {
                        "application/json": {
                            schema: {
                                oneOf: [
                                    {
                                        type: "object",
                                        properties: {
                                            executionID: {
                                                description: "ID of the job execution",
                                                type: "string",
                                            },
                                        },
                                    },
                                    { $ref: "#/components/schemas/ExecutionID" },
                                ],
                            },
                        },
                    },
                },
            };
            expect(generateResponsesDefinition(responses)).toMatchInlineSnapshot("\n                                                                        \"\n                                                                        /**\n                                                                         * Job is starting\n                                                                         */\n                                                                        export type JobRunResponse = {\n                                                                          /**\n                                                                           * ID of the job execution\n                                                                           */\n                                                                          executionID?: string;\n                                                                        } | ExecutionID;\n                                                                        \"\n                                                      ");
        });
    });
    describe("getResponseTypes", function () {
        it("should return the type of application/json", function () {
            var responses = [
                [
                    "200",
                    {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                ],
            ];
            expect(getResReqTypes(responses)).toEqual("FieldListResponse");
        });
        it("should return the type of application/json;charset=utf-8", function () {
            var responses = [
                [
                    "200",
                    {
                        description: "An array of schema fields",
                        content: {
                            "application/json;charset=utf-8": { schema: { $ref: "#/components/schemas/FieldListResponse" } },
                        },
                    },
                ],
            ];
            expect(getResReqTypes(responses)).toEqual("FieldListResponse");
        });
        it("should return the type of application/octet-stream if we don't have application/json response", function () {
            var responses = [
                [
                    "200",
                    {
                        description: "An array of schema fields",
                        content: { "application/octet-stream": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                ],
            ];
            expect(getResReqTypes(responses)).toEqual("FieldListResponse");
        });
        it("should return a union if we have multi responses", function () {
            var responses = [
                [
                    "200",
                    {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                ],
                [
                    "201",
                    {
                        description: "An array of schema fields",
                        content: {
                            "application/json": {
                                schema: { type: "object", required: ["id"], properties: { id: { type: "string" } } },
                            },
                        },
                    },
                ],
            ];
            expect(getResReqTypes(responses)).toMatchInlineSnapshot("\n                                                        \"FieldListResponse | {\n                                                          id: string;\n                                                        }\"\n                                          ");
        });
        it("should not generate type duplication", function () {
            var responses = [
                [
                    "200",
                    {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                ],
                [
                    "201",
                    {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                ],
            ];
            expect(getResReqTypes(responses)).toEqual("FieldListResponse");
        });
    });
    describe("generateGetComponent", function () {
        it("should generate a fully typed component", function () {
            var operation = {
                summary: "List all fields for the use case schema",
                operationId: "listFields",
                tags: ["schema"],
                responses: {
                    "200": {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "get", "/fields", [])).toMatchInlineSnapshot("\n        \"\n        export type ListFieldsProps = Omit<GetProps<FieldListResponse, APIError, void, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const ListFields = (props: ListFieldsProps) => (\n          <Get<FieldListResponse, APIError, void, void>\n            path={`/fields`}\n            {...props}\n          />\n        );\n\n        export type UseListFieldsProps = Omit<UseGetProps<FieldListResponse, APIError, void, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const useListFields = (props: UseListFieldsProps) => useGet<FieldListResponse, APIError, void, void>(`/fields`, props);\n\n        \"\n      ");
        });
        it("should have a nice documentation with summary and description", function () {
            var operation = {
                summary: "List all fields for the use case schema",
                description: "This is a longer description to describe my endpoint",
                operationId: "listFields",
                tags: ["schema"],
                responses: {
                    "200": {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "get", "/fields", [])).toMatchInlineSnapshot("\n        \"\n        export type ListFieldsProps = Omit<GetProps<FieldListResponse, unknown, void, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         * \n         * This is a longer description to describe my endpoint\n         */\n        export const ListFields = (props: ListFieldsProps) => (\n          <Get<FieldListResponse, unknown, void, void>\n            path={`/fields`}\n            {...props}\n          />\n        );\n\n        export type UseListFieldsProps = Omit<UseGetProps<FieldListResponse, unknown, void, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         * \n         * This is a longer description to describe my endpoint\n         */\n        export const useListFields = (props: UseListFieldsProps) => useGet<FieldListResponse, unknown, void, void>(`/fields`, props);\n\n        \"\n      ");
        });
        it("should add a fallback if the error is not defined", function () {
            var operation = {
                summary: "List all fields for the use case schema",
                operationId: "listFields",
                tags: ["schema"],
                responses: {
                    "200": {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "get", "/fields", [])).toMatchInlineSnapshot("\n        \"\n        export type ListFieldsProps = Omit<GetProps<FieldListResponse, unknown, void, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const ListFields = (props: ListFieldsProps) => (\n          <Get<FieldListResponse, unknown, void, void>\n            path={`/fields`}\n            {...props}\n          />\n        );\n\n        export type UseListFieldsProps = Omit<UseGetProps<FieldListResponse, unknown, void, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const useListFields = (props: UseListFieldsProps) => useGet<FieldListResponse, unknown, void, void>(`/fields`, props);\n\n        \"\n      ");
        });
        it("should remove duplicate types", function () {
            var operation = {
                summary: "List all fields for the use case schema",
                operationId: "listFields",
                tags: ["schema"],
                responses: {
                    "200": {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                    "404": {
                        description: "file not found or field is not a file type",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/APIError" } } },
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "get", "/fields", [])).toMatchInlineSnapshot("\n        \"\n        export type ListFieldsProps = Omit<GetProps<FieldListResponse, APIError, void, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const ListFields = (props: ListFieldsProps) => (\n          <Get<FieldListResponse, APIError, void, void>\n            path={`/fields`}\n            {...props}\n          />\n        );\n\n        export type UseListFieldsProps = Omit<UseGetProps<FieldListResponse, APIError, void, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const useListFields = (props: UseListFieldsProps) => useGet<FieldListResponse, APIError, void, void>(`/fields`, props);\n\n        \"\n      ");
        });
        it("should deal with parameters in query", function () {
            var operation = {
                summary: "List all fields for the use case schema",
                operationId: "listFields",
                tags: ["schema"],
                parameters: [
                    {
                        name: "tenantId",
                        in: "query",
                        required: true,
                        description: "The id of the Contiamo tenant",
                        schema: { type: "string" },
                    },
                    {
                        name: "projectId",
                        in: "query",
                        description: "The id of the project",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                    "404": {
                        description: "file not found or field is not a file type",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/APIError" } } },
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "get", "/fields", [])).toMatchInlineSnapshot("\n        \"\n        export interface ListFieldsQueryParams {\n          /**\n           * The id of the Contiamo tenant\n           */\n          tenantId: string;\n          /**\n           * The id of the project\n           */\n          projectId?: string;\n        }\n\n        export type ListFieldsProps = Omit<GetProps<FieldListResponse, APIError, ListFieldsQueryParams, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const ListFields = (props: ListFieldsProps) => (\n          <Get<FieldListResponse, APIError, ListFieldsQueryParams, void>\n            path={`/fields`}\n            {...props}\n          />\n        );\n\n        export type UseListFieldsProps = Omit<UseGetProps<FieldListResponse, APIError, ListFieldsQueryParams, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const useListFields = (props: UseListFieldsProps) => useGet<FieldListResponse, APIError, ListFieldsQueryParams, void>(`/fields`, props);\n\n        \"\n      ");
        });
        it("should deal with parameters in query (root level)", function () {
            var operation = {
                summary: "List all fields for the use case schema",
                operationId: "listFields",
                tags: ["schema"],
                responses: {
                    "200": {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                    "404": {
                        description: "file not found or field is not a file type",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/APIError" } } },
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "get", "/fields", [], [
                {
                    name: "tenantId",
                    in: "query",
                    required: true,
                    description: "The id of the Contiamo tenant",
                    schema: { type: "string" },
                },
                {
                    name: "projectId",
                    in: "query",
                    description: "The id of the project",
                    schema: { type: "string" },
                },
            ])).toMatchInlineSnapshot("\n        \"\n        export interface ListFieldsQueryParams {\n          /**\n           * The id of the Contiamo tenant\n           */\n          tenantId: string;\n          /**\n           * The id of the project\n           */\n          projectId?: string;\n        }\n\n        export type ListFieldsProps = Omit<GetProps<FieldListResponse, APIError, ListFieldsQueryParams, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const ListFields = (props: ListFieldsProps) => (\n          <Get<FieldListResponse, APIError, ListFieldsQueryParams, void>\n            path={`/fields`}\n            {...props}\n          />\n        );\n\n        export type UseListFieldsProps = Omit<UseGetProps<FieldListResponse, APIError, ListFieldsQueryParams, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const useListFields = (props: UseListFieldsProps) => useGet<FieldListResponse, APIError, ListFieldsQueryParams, void>(`/fields`, props);\n\n        \"\n      ");
        });
        it("should deal with parameters in path", function () {
            var operation = {
                summary: "List all fields for the use case schema",
                operationId: "listFields",
                tags: ["schema"],
                parameters: [
                    {
                        name: "tenantId",
                        in: "path",
                        required: true,
                        description: "The id of the Contiamo tenant",
                        schema: { type: "string" },
                    },
                    {
                        name: "id",
                        required: true,
                        in: "path",
                        description: "The id of the project",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                    "404": {
                        description: "file not found or field is not a file type",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/APIError" } } },
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "get", "/fields/{id}", [])).toMatchInlineSnapshot("\n        \"\n        export interface ListFieldsPathParams {\n          /**\n           * The id of the project\n           */\n          id: string\n        }\n\n        export type ListFieldsProps = Omit<GetProps<FieldListResponse, APIError, void, ListFieldsPathParams>, \\\"path\\\"> & ListFieldsPathParams;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const ListFields = ({id, ...props}: ListFieldsProps) => (\n          <Get<FieldListResponse, APIError, void, ListFieldsPathParams>\n            path={`/fields/${id}`}\n            {...props}\n          />\n        );\n\n        export type UseListFieldsProps = Omit<UseGetProps<FieldListResponse, APIError, void, ListFieldsPathParams>, \\\"path\\\"> & ListFieldsPathParams;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const useListFields = ({id, ...props}: UseListFieldsProps) => useGet<FieldListResponse, APIError, void, ListFieldsPathParams>((paramsInPath: ListFieldsPathParams) => `/fields/${paramsInPath.id}`, { pathParams: { id }, ...props });\n\n        \"\n      ");
        });
        it("should deal with parameters in path (root level)", function () {
            var operation = {
                summary: "List all fields for the use case schema",
                operationId: "listFields",
                tags: ["schema"],
                responses: {
                    "200": {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                    "404": {
                        description: "file not found or field is not a file type",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/APIError" } } },
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "get", "/fields/{id}", [], [
                {
                    name: "tenantId",
                    in: "path",
                    required: true,
                    description: "The id of the Contiamo tenant",
                    schema: { type: "string" },
                },
                {
                    name: "id",
                    required: true,
                    in: "path",
                    description: "The id of the project",
                    schema: { type: "string" },
                },
            ])).toMatchInlineSnapshot("\n        \"\n        export interface ListFieldsPathParams {\n          /**\n           * The id of the project\n           */\n          id: string\n        }\n\n        export type ListFieldsProps = Omit<GetProps<FieldListResponse, APIError, void, ListFieldsPathParams>, \\\"path\\\"> & ListFieldsPathParams;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const ListFields = ({id, ...props}: ListFieldsProps) => (\n          <Get<FieldListResponse, APIError, void, ListFieldsPathParams>\n            path={`/fields/${id}`}\n            {...props}\n          />\n        );\n\n        export type UseListFieldsProps = Omit<UseGetProps<FieldListResponse, APIError, void, ListFieldsPathParams>, \\\"path\\\"> & ListFieldsPathParams;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const useListFields = ({id, ...props}: UseListFieldsProps) => useGet<FieldListResponse, APIError, void, ListFieldsPathParams>((paramsInPath: ListFieldsPathParams) => `/fields/${paramsInPath.id}`, { pathParams: { id }, ...props });\n\n        \"\n      ");
        });
        it("should generate a Mutate type component", function () {
            var operation = {
                summary: "Update use case details",
                operationId: "updateUseCase",
                tags: ["use-case"],
                parameters: [
                    {
                        name: "tenantId",
                        in: "path",
                        required: true,
                        description: "The id of the Contiamo tenant",
                        schema: { type: "string" },
                    },
                    {
                        name: "useCaseId",
                        in: "path",
                        required: true,
                        description: "The id of the use case",
                        schema: { type: "string", format: "uuid" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/UseCaseInstance" } } },
                },
                responses: {
                    "204": {
                        description: "Use case updated",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/UseCaseResponse" } } },
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "put", "/use-cases/{useCaseId}", [])).toMatchInlineSnapshot("\n        \"\n        export interface UpdateUseCasePathParams {\n          /**\n           * The id of the use case\n           */\n          useCaseId: string\n        }\n\n        export type UpdateUseCaseProps = Omit<MutateProps<UseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>, \\\"path\\\" | \\\"verb\\\"> & UpdateUseCasePathParams;\n\n        /**\n         * Update use case details\n         */\n        export const UpdateUseCase = ({useCaseId, ...props}: UpdateUseCaseProps) => (\n          <Mutate<UseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>\n            verb=\\\"PUT\\\"\n            path={`/use-cases/${useCaseId}`}\n            {...props}\n          />\n        );\n\n        export type UseUpdateUseCaseProps = Omit<UseMutateProps<UseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>, \\\"path\\\" | \\\"verb\\\"> & UpdateUseCasePathParams;\n\n        /**\n         * Update use case details\n         */\n        export const useUpdateUseCase = ({useCaseId, ...props}: UseUpdateUseCaseProps) => useMutate<UseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>(\\\"PUT\\\", (paramsInPath: UpdateUseCasePathParams) => `/use-cases/${paramsInPath.useCaseId}`, { pathParams: { useCaseId }, ...props });\n\n        \"\n      ");
        });
        it("should generate a request body type if it's inline in the specs", function () {
            var operation = {
                summary: "Update use case details",
                operationId: "updateUseCase",
                tags: ["use-case"],
                parameters: [
                    {
                        name: "useCaseId",
                        in: "path",
                        required: true,
                        description: "The id of the use case",
                        schema: { type: "string", format: "uuid" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name"],
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "The use case name",
                                    },
                                    description: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "204": {
                        description: "Use case updated",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/UseCaseResponse" } } },
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "put", "/use-cases/{useCaseId}", [])).toMatchInlineSnapshot("\n        \"\n        export interface UpdateUseCasePathParams {\n          /**\n           * The id of the use case\n           */\n          useCaseId: string\n        }\n\n        export interface UpdateUseCaseRequestBody {\n          /**\n           * The use case name\n           */\n          name: string;\n          description?: string;\n        }\n\n        export type UpdateUseCaseProps = Omit<MutateProps<UseCaseResponse, APIError, void, UpdateUseCaseRequestBody, UpdateUseCasePathParams>, \\\"path\\\" | \\\"verb\\\"> & UpdateUseCasePathParams;\n\n        /**\n         * Update use case details\n         */\n        export const UpdateUseCase = ({useCaseId, ...props}: UpdateUseCaseProps) => (\n          <Mutate<UseCaseResponse, APIError, void, UpdateUseCaseRequestBody, UpdateUseCasePathParams>\n            verb=\\\"PUT\\\"\n            path={`/use-cases/${useCaseId}`}\n            {...props}\n          />\n        );\n\n        export type UseUpdateUseCaseProps = Omit<UseMutateProps<UseCaseResponse, APIError, void, UpdateUseCaseRequestBody, UpdateUseCasePathParams>, \\\"path\\\" | \\\"verb\\\"> & UpdateUseCasePathParams;\n\n        /**\n         * Update use case details\n         */\n        export const useUpdateUseCase = ({useCaseId, ...props}: UseUpdateUseCaseProps) => useMutate<UseCaseResponse, APIError, void, UpdateUseCaseRequestBody, UpdateUseCasePathParams>(\\\"PUT\\\", (paramsInPath: UpdateUseCasePathParams) => `/use-cases/${paramsInPath.useCaseId}`, { pathParams: { useCaseId }, ...props });\n\n        \"\n      ");
        });
        it("should generate a proper ComponentResponse type if the type is custom", function () {
            var operation = {
                summary: "Update use case details",
                operationId: "updateUseCase",
                tags: ["use-case"],
                parameters: [
                    {
                        name: "tenantId",
                        in: "path",
                        required: true,
                        description: "The id of the Contiamo tenant",
                        schema: { type: "string" },
                    },
                    {
                        name: "useCaseId",
                        in: "path",
                        required: true,
                        description: "The id of the use case",
                        schema: { type: "string", format: "uuid" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/UseCaseInstance" } } },
                },
                responses: {
                    "204": {
                        description: "Use case updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["id"],
                                    properties: {
                                        id: {
                                            type: "string",
                                        },
                                        name: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "put", "/use-cases/{useCaseId}", [])).toMatchInlineSnapshot("\n        \"\n        export interface UpdateUseCaseResponse {\n          id: string;\n          name?: string;\n        }\n\n        export interface UpdateUseCasePathParams {\n          /**\n           * The id of the use case\n           */\n          useCaseId: string\n        }\n\n        export type UpdateUseCaseProps = Omit<MutateProps<UpdateUseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>, \\\"path\\\" | \\\"verb\\\"> & UpdateUseCasePathParams;\n\n        /**\n         * Update use case details\n         */\n        export const UpdateUseCase = ({useCaseId, ...props}: UpdateUseCaseProps) => (\n          <Mutate<UpdateUseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>\n            verb=\\\"PUT\\\"\n            path={`/use-cases/${useCaseId}`}\n            {...props}\n          />\n        );\n\n        export type UseUpdateUseCaseProps = Omit<UseMutateProps<UpdateUseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>, \\\"path\\\" | \\\"verb\\\"> & UpdateUseCasePathParams;\n\n        /**\n         * Update use case details\n         */\n        export const useUpdateUseCase = ({useCaseId, ...props}: UseUpdateUseCaseProps) => useMutate<UpdateUseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>(\\\"PUT\\\", (paramsInPath: UpdateUseCasePathParams) => `/use-cases/${paramsInPath.useCaseId}`, { pathParams: { useCaseId }, ...props });\n\n        \"\n      ");
        });
        it("should ignore 3xx responses", function () {
            var operation = {
                summary: "Update use case details",
                operationId: "updateUseCase",
                tags: ["use-case"],
                parameters: [
                    {
                        name: "tenantId",
                        in: "path",
                        required: true,
                        description: "The id of the Contiamo tenant",
                        schema: { type: "string" },
                    },
                    {
                        name: "useCaseId",
                        in: "path",
                        required: true,
                        description: "The id of the use case",
                        schema: { type: "string", format: "uuid" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/UseCaseInstance" } } },
                },
                responses: {
                    "204": {
                        description: "Use case updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["id"],
                                    properties: {
                                        id: {
                                            type: "string",
                                        },
                                        name: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "302": {
                        $ref: "#/components/responses/LongPollingTimeout",
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "put", "/use-cases/{useCaseId}", [])).toMatchInlineSnapshot("\n        \"\n        export interface UpdateUseCaseResponse {\n          id: string;\n          name?: string;\n        }\n\n        export interface UpdateUseCasePathParams {\n          /**\n           * The id of the use case\n           */\n          useCaseId: string\n        }\n\n        export type UpdateUseCaseProps = Omit<MutateProps<UpdateUseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>, \\\"path\\\" | \\\"verb\\\"> & UpdateUseCasePathParams;\n\n        /**\n         * Update use case details\n         */\n        export const UpdateUseCase = ({useCaseId, ...props}: UpdateUseCaseProps) => (\n          <Mutate<UpdateUseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>\n            verb=\\\"PUT\\\"\n            path={`/use-cases/${useCaseId}`}\n            {...props}\n          />\n        );\n\n        export type UseUpdateUseCaseProps = Omit<UseMutateProps<UpdateUseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>, \\\"path\\\" | \\\"verb\\\"> & UpdateUseCasePathParams;\n\n        /**\n         * Update use case details\n         */\n        export const useUpdateUseCase = ({useCaseId, ...props}: UseUpdateUseCaseProps) => useMutate<UpdateUseCaseResponse, APIError, void, UseCaseInstance, UpdateUseCasePathParams>(\\\"PUT\\\", (paramsInPath: UpdateUseCasePathParams) => `/use-cases/${paramsInPath.useCaseId}`, { pathParams: { useCaseId }, ...props });\n\n        \"\n      ");
        });
        it("should ignore the last param of a delete call (the id is give after)", function () {
            var operation = {
                summary: "Delete use case",
                operationId: "deleteUseCase",
                tags: ["use-case"],
                parameters: [
                    {
                        name: "tenantId",
                        in: "path",
                        required: true,
                        description: "The id of the Contiamo tenant",
                        schema: { type: "string" },
                    },
                    {
                        name: "useCaseId",
                        in: "path",
                        required: true,
                        description: "The id of the use case",
                        schema: { type: "string", format: "uuid" },
                    },
                ],
                responses: {
                    "204": {
                        description: "Empty response",
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "delete", "/use-cases/{useCaseId}", [])).toMatchInlineSnapshot("\n        \"\n        export type DeleteUseCaseProps = Omit<MutateProps<void, APIError, void, string, void>, \\\"path\\\" | \\\"verb\\\">;\n\n        /**\n         * Delete use case\n         */\n        export const DeleteUseCase = (props: DeleteUseCaseProps) => (\n          <Mutate<void, APIError, void, string, void>\n            verb=\\\"DELETE\\\"\n            path={`/use-cases`}\n            {...props}\n          />\n        );\n\n        export type UseDeleteUseCaseProps = Omit<UseMutateProps<void, APIError, void, string, void>, \\\"path\\\" | \\\"verb\\\">;\n\n        /**\n         * Delete use case\n         */\n        export const useDeleteUseCase = (props: UseDeleteUseCaseProps) => useMutate<void, APIError, void, string, void>(\\\"DELETE\\\", `/use-cases`, props);\n\n        \"\n      ");
        });
        it("should only remove the last params in delete operation", function () {
            var operation = {
                summary: "Delete use case",
                operationId: "deleteUseCase",
                tags: ["use-case"],
                parameters: [
                    {
                        name: "tenantId",
                        in: "path",
                        required: true,
                        description: "The id of the Contiamo tenant",
                        schema: { type: "string" },
                    },
                    {
                        name: "useCaseId",
                        in: "path",
                        required: true,
                        description: "The id of the use case",
                        schema: { type: "string", format: "uuid" },
                    },
                ],
                responses: {
                    "204": {
                        description: "Empty response",
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "delete", "/use-cases/{useCaseId}/secret", [])).toMatchInlineSnapshot("\n        \"\n        export interface DeleteUseCasePathParams {\n          /**\n           * The id of the use case\n           */\n          useCaseId: string\n        }\n\n        export type DeleteUseCaseProps = Omit<MutateProps<void, APIError, void, void, DeleteUseCasePathParams>, \\\"path\\\" | \\\"verb\\\"> & DeleteUseCasePathParams;\n\n        /**\n         * Delete use case\n         */\n        export const DeleteUseCase = ({useCaseId, ...props}: DeleteUseCaseProps) => (\n          <Mutate<void, APIError, void, void, DeleteUseCasePathParams>\n            verb=\\\"DELETE\\\"\n            path={`/use-cases/${useCaseId}/secret`}\n            {...props}\n          />\n        );\n\n        export type UseDeleteUseCaseProps = Omit<UseMutateProps<void, APIError, void, void, DeleteUseCasePathParams>, \\\"path\\\" | \\\"verb\\\"> & DeleteUseCasePathParams;\n\n        /**\n         * Delete use case\n         */\n        export const useDeleteUseCase = ({useCaseId, ...props}: UseDeleteUseCaseProps) => useMutate<void, APIError, void, void, DeleteUseCasePathParams>(\\\"DELETE\\\", (paramsInPath: DeleteUseCasePathParams) => `/use-cases/${paramsInPath.useCaseId}/secret`, { pathParams: { useCaseId }, ...props });\n\n        \"\n      ");
        });
        it("should take the type from open-api specs", function () {
            var operation = {
                summary: "Delete use case",
                operationId: "deleteUseCase",
                tags: ["use-case"],
                parameters: [
                    {
                        name: "tenantId",
                        in: "path",
                        required: true,
                        description: "The id of the Contiamo tenant",
                        schema: { type: "string" },
                    },
                    {
                        name: "useCaseId",
                        in: "path",
                        required: true,
                        description: "The id of the use case",
                        schema: { type: "integer", format: "uuid" },
                    },
                ],
                responses: {
                    "204": {
                        description: "Empty response",
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "delete", "/use-cases/{useCaseId}", [])).toMatchInlineSnapshot("\n        \"\n        export type DeleteUseCaseProps = Omit<MutateProps<void, APIError, void, number, void>, \\\"path\\\" | \\\"verb\\\">;\n\n        /**\n         * Delete use case\n         */\n        export const DeleteUseCase = (props: DeleteUseCaseProps) => (\n          <Mutate<void, APIError, void, number, void>\n            verb=\\\"DELETE\\\"\n            path={`/use-cases`}\n            {...props}\n          />\n        );\n\n        export type UseDeleteUseCaseProps = Omit<UseMutateProps<void, APIError, void, number, void>, \\\"path\\\" | \\\"verb\\\">;\n\n        /**\n         * Delete use case\n         */\n        export const useDeleteUseCase = (props: UseDeleteUseCaseProps) => useMutate<void, APIError, void, number, void>(\\\"DELETE\\\", `/use-cases`, props);\n\n        \"\n      ");
        });
        it("should take the type from open-api specs (ref)", function () {
            var operation = {
                summary: "Delete use case",
                operationId: "deleteUseCase",
                tags: ["use-case"],
                parameters: [
                    {
                        name: "useCaseId",
                        in: "path",
                        required: true,
                        description: "The id of the use case",
                        schema: {
                            $ref: "#/components/schemas/UseCaseId",
                        },
                    },
                ],
                responses: {
                    "204": {
                        description: "Empty response",
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "delete", "/use-cases/{useCaseId}", [])).toMatchInlineSnapshot("\n        \"\n        export type DeleteUseCaseProps = Omit<MutateProps<void, APIError, void, UseCaseId, void>, \\\"path\\\" | \\\"verb\\\">;\n\n        /**\n         * Delete use case\n         */\n        export const DeleteUseCase = (props: DeleteUseCaseProps) => (\n          <Mutate<void, APIError, void, UseCaseId, void>\n            verb=\\\"DELETE\\\"\n            path={`/use-cases`}\n            {...props}\n          />\n        );\n\n        export type UseDeleteUseCaseProps = Omit<UseMutateProps<void, APIError, void, UseCaseId, void>, \\\"path\\\" | \\\"verb\\\">;\n\n        /**\n         * Delete use case\n         */\n        export const useDeleteUseCase = (props: UseDeleteUseCaseProps) => useMutate<void, APIError, void, UseCaseId, void>(\\\"DELETE\\\", `/use-cases`, props);\n\n        \"\n      ");
        });
        it("should resolve parameters ref", function () {
            var operation = {
                summary: "Delete use case",
                operationId: "deleteUseCase",
                tags: ["use-case"],
                parameters: [
                    {
                        $ref: "#/components/parameters/UseCaseId",
                    },
                ],
                responses: {
                    "204": {
                        description: "Empty response",
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            var schemasComponents = {
                parameters: {
                    UseCaseId: {
                        name: "useCaseId",
                        in: "path",
                        description: "Id of the usecase",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "delete", "/use-cases/{useCaseId}", [], undefined, schemasComponents))
                .toMatchInlineSnapshot("\n        \"\n        export type DeleteUseCaseProps = Omit<MutateProps<void, APIError, void, string, void>, \\\"path\\\" | \\\"verb\\\">;\n\n        /**\n         * Delete use case\n         */\n        export const DeleteUseCase = (props: DeleteUseCaseProps) => (\n          <Mutate<void, APIError, void, string, void>\n            verb=\\\"DELETE\\\"\n            path={`/use-cases`}\n            {...props}\n          />\n        );\n\n        export type UseDeleteUseCaseProps = Omit<UseMutateProps<void, APIError, void, string, void>, \\\"path\\\" | \\\"verb\\\">;\n\n        /**\n         * Delete use case\n         */\n        export const useDeleteUseCase = (props: UseDeleteUseCaseProps) => useMutate<void, APIError, void, string, void>(\\\"DELETE\\\", `/use-cases`, props);\n\n        \"\n      ");
        });
        it("should generate a Poll compoment if the `prefer` token is present", function () {
            var operation = {
                summary: "List all fields for the use case schema",
                operationId: "listFields",
                tags: ["schema"],
                parameters: [
                    {
                        name: "prefer",
                        in: "header",
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "An array of schema fields",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/FieldListResponse" } } },
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/APIError" },
                                example: { errors: ["msg1", "msg2"] },
                            },
                        },
                    },
                },
            };
            expect(generateRestfulComponent(operation, "get", "/fields", [])).toMatchInlineSnapshot("\n        \"\n        export type ListFieldsProps = Omit<GetProps<FieldListResponse, APIError, void, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const ListFields = (props: ListFieldsProps) => (\n          <Get<FieldListResponse, APIError, void, void>\n            path={`/fields`}\n            {...props}\n          />\n        );\n\n        export type UseListFieldsProps = Omit<UseGetProps<FieldListResponse, APIError, void, void>, \\\"path\\\">;\n\n        /**\n         * List all fields for the use case schema\n         */\n        export const useListFields = (props: UseListFieldsProps) => useGet<FieldListResponse, APIError, void, void>(`/fields`, props);\n\n        export type PollListFieldsProps = Omit<PollProps<FieldListResponse, APIError, void, void>, \\\"path\\\">;\n\n        // List all fields for the use case schema (long polling)\n        export const PollListFields = (props: PollListFieldsProps) => (\n          <Poll<FieldListResponse, APIError, void, void>\n            path={`/fields`}\n            {...props}\n          />\n        );\n\n        \"\n      ");
        });
    });
    it("should deal with no 2xx response case", function () {
        var operation = {
            summary: "List all fields for the use case schema",
            operationId: "listFields",
            responses: {
                "302": {
                    description: "Just redirect",
                },
                default: {
                    description: "unexpected error",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/APIError" },
                            example: { errors: ["msg1", "msg2"] },
                        },
                    },
                },
            },
        };
        expect(generateRestfulComponent(operation, "get", "/fields", [])).toMatchInlineSnapshot("\n      \"\n      export type ListFieldsProps = Omit<GetProps<void, APIError, void, void>, \\\"path\\\">;\n\n      /**\n       * List all fields for the use case schema\n       */\n      export const ListFields = (props: ListFieldsProps) => (\n        <Get<void, APIError, void, void>\n          path={`/fields`}\n          {...props}\n        />\n      );\n\n      export type UseListFieldsProps = Omit<UseGetProps<void, APIError, void, void>, \\\"path\\\">;\n\n      /**\n       * List all fields for the use case schema\n       */\n      export const useListFields = (props: UseListFieldsProps) => useGet<void, APIError, void, void>(`/fields`, props);\n\n      \"\n    ");
    });
    describe("reactPropsValueToObjectValue", function () {
        it("should remove the curly braces", function () {
            expect(reactPropsValueToObjectValue("{getConfig('plop')}")).toEqual("getConfig('plop')");
        });
        it("should do nothing", function () {
            expect(reactPropsValueToObjectValue('"hello"')).toEqual('"hello"');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LW9wZW4tYXBpLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2NyaXB0cy90ZXN0cy9pbXBvcnQtb3Blbi1hcGkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLElBQUksQ0FBQztBQUNsQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSTVCLE9BQU8sYUFBYSxFQUFFLEVBQ3BCLDJCQUEyQixFQUMzQix3QkFBd0IsRUFDeEIseUJBQXlCLEVBQ3pCLFFBQVEsRUFDUixTQUFTLEVBQ1QsZUFBZSxFQUNmLE1BQU0sRUFDTixjQUFjLEVBQ2QsU0FBUyxFQUNULFdBQVcsRUFDWCw0QkFBNEIsRUFDNUIsb0JBQW9CLEdBQ3JCLE1BQU0sb0JBQW9CLENBQUM7QUFFNUIsUUFBUSxDQUFDLHlCQUF5QixFQUFFO0lBQ2xDLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTs7Ozs7b0JBQzVDLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNwRSxxQkFBTSxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFBOztvQkFBM0QsSUFBSSxHQUFHLFNBQW9EO29CQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7Ozs7U0FDaEMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGFBQWEsRUFBRTtRQUN0QixFQUFFLENBQUMsNkNBQTZDLEVBQUU7WUFDaEQsSUFBTSxRQUFRLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLG9DQUFvQzthQUMzQyxDQUFDO1lBQ0YsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMz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QUFFLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7WUFDaEQsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtZQUM5QyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO1lBQ2xELEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7WUFDbkQsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtZQUNsRCxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLG1CQUFlLEVBQUU7WUFDN0UsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUNqRCxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7WUFDeEUsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7WUFDekUsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO1lBQ3ZFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLDZCQUE2QixFQUFFO1lBQ3JGLEVBQUUsSUFBSSxFQUFFLEVBQUUs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