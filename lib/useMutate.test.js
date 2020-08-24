import { __awaiter, __generator } from "tslib";
import { renderHook } from "@testing-library/react-hooks";
import "isomorphic-fetch";
import nock from "nock";
import React from "react";
import { RestfulProvider, useMutate } from ".";
describe("useMutate", function () {
    // Mute console.error -> https://github.com/kentcdodds/react-testing-library/issues/281
    // tslint:disable:no-console
    var originalConsoleError = console.error;
    beforeEach(function () {
        console.error = jest.fn;
    });
    afterEach(function () {
        console.error = originalConsoleError;
    });
    describe("DELETE", function () {
        it("should set loading to true after a call", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result;
            return __generator(this, function (_a) {
                nock("https://my-awesome-api.fake")
                    .delete("/plop")
                    .reply(200, { id: 1 });
                wrapper = function (_a) {
                    var children = _a.children;
                    return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                };
                result = renderHook(function () { return useMutate("DELETE", ""); }, { wrapper: wrapper }).result;
                result.current.mutate("plop");
                expect(result.current).toMatchObject({
                    error: null,
                    loading: true,
                });
                return [2 /*return*/];
            });
        }); });
        it("should call the correct url with a specific id", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/plop")
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("DELETE", ""); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate("plop")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the correct url with a specific id (base in options)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/plop")
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://not-here.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("DELETE", "", { base: "https://my-awesome-api.fake" }); }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("plop")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the correct url with a specific id (base and path in options)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/user")
                            .delete("/plop")
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://not-here.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("DELETE", "user", { base: "https://my-awesome-api.fake" }); }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("plop")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should send the correct body", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/", { foo: "bar" })
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("DELETE", ""); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate({ foo: "bar" })];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should send the empty body object", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/", {})
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("DELETE", ""); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate({})];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the correct url without id", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/")
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("DELETE", ""); }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should deal with query parameters", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/")
                            .query({
                            myParam: true,
                        })
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("DELETE", "", { queryParams: { myParam: true } }); }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Query Params", function () {
        it("should inherit the provider's query parameters if none specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/")
                            .query({
                            cheese: "yummy",
                        })
                            .reply(200, { vegan: false });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { queryParams: { cheese: "yummy" }, base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("DELETE", ""); }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ vegan: false });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override the provider's query parameters if own specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/")
                            .query({
                            cheese: "yucky",
                        })
                            .reply(200, { vegan: true });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { queryParams: { cheese: "yummy" }, base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("DELETE", "", { queryParams: { cheese: "yucky" } }); }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ vegan: true });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should merge with the provider's query parameters if both specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/")
                            .query({
                            cheese: "yucky",
                            meat: "omg amazing",
                        })
                            .reply(200, { vegan: "confused" });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { queryParams: { meat: "omg amazing" }, base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("DELETE", "", { queryParams: { cheese: "yucky" } }); }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ vegan: "confused" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override query parameters if specified in mutate method", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/")
                            .query({
                            cheese: "yucky",
                            meat: "omg amazing",
                        })
                            .reply(200, { vegan: "confused" });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { queryParams: { meat: "omg amazing" }, base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("DELETE", "", { queryParams: { cheese: "chucky" } }); }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("", { queryParams: { cheese: "yucky" } })];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ vegan: "confused" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should parse the querystring regarding the options", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/")
                            .query(function (i) {
                            return i["anArray[]"] === "nice";
                        })
                            .reply(200, function () { return ({ vegan: true }); });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () {
                            return useMutate("DELETE", "", {
                                queryParams: { anArray: ["nice"] },
                                queryParamStringifyOptions: { arrayFormat: "brackets" },
                            });
                        }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ vegan: true });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should inherit global queryParamStringifyOptions if none specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/")
                            .query(function (i) {
                            return i["anArray[]"] === "nice";
                        })
                            .reply(200, function () { return ({ vegan: true }); });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { queryParamStringifyOptions: { arrayFormat: "brackets" }, base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () {
                            return useMutate("DELETE", "", {
                                queryParams: { anArray: ["nice"] },
                            });
                        }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ vegan: true });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override global queryParamStringifyOptions if own queryParamStringifyOptions are specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/")
                            .query(function (i) {
                            return i["anArray"] === "foo,bar";
                        })
                            .reply(200, function () { return ({ vegan: true }); });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { queryParamStringifyOptions: { arrayFormat: "brackets" }, base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () {
                            return useMutate("DELETE", "", {
                                queryParams: { anArray: ["foo", "bar"] },
                                queryParamStringifyOptions: { arrayFormat: "comma" },
                            });
                        }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ vegan: true });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should merge global queryParamStringifyOptions if both queryParamStringifyOptions are specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/?anArray[]=nice;foo=bar")
                            .reply(200, function () { return ({ vegan: true }); });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { queryParamStringifyOptions: { arrayFormat: "brackets" }, base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () {
                            return useMutate("DELETE", "", {
                                queryParams: { anArray: ["nice"], foo: "bar" },
                                queryParamStringifyOptions: { delimiter: ";" },
                            });
                        }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate("")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ vegan: true });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Path Params", function () {
        it("should resolve path parameters if specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/plop/one")
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () {
                            return useMutate("POST", function (_a) {
                                var id = _a.id;
                                return "plop/" + id;
                            }, {
                                pathParams: { id: "one" },
                            });
                        }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate({})];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override path parameters if specified in mutate method", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/plop/one")
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () {
                            return useMutate("POST", function (_a) {
                                var id = _a.id;
                                return "plop/" + id;
                            }, {
                                pathParams: { id: "two" },
                            });
                        }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate({}, { pathParams: { id: "one" } })];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("POST", function () {
        it("should set loading to true after a call", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result;
            return __generator(this, function (_a) {
                nock("https://my-awesome-api.fake")
                    .post("/plop")
                    .reply(200, { id: 1 });
                wrapper = function (_a) {
                    var children = _a.children;
                    return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                };
                result = renderHook(function () { return useMutate("POST", "plop"); }, {
                    wrapper: wrapper,
                }).result;
                result.current.mutate({});
                expect(result.current).toMatchObject({
                    error: null,
                    loading: true,
                });
                return [2 /*return*/];
            });
        }); });
        it("should call the correct url", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("POST", ""); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate({})];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should send the correct body", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/", { foo: "bar" })
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("POST", ""); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate({ foo: "bar" })];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return the data and the message on error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(500, { error: "I can't, I'm just a chicken!" });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("POST", ""); }, { wrapper: wrapper }).result;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, result.current.mutate({ foo: "bar" })];
                    case 2:
                        _a.sent();
                        expect("this statement").toBe("not executed");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(result.current).toMatchObject({
                            error: {
                                data: { error: "I can't, I'm just a chicken!" },
                                message: "Failed to fetch: 500 Internal Server Error",
                                status: 500,
                            },
                            loading: false,
                        });
                        expect(e_1).toEqual({
                            data: { error: "I can't, I'm just a chicken!" },
                            message: "Failed to fetch: 500 Internal Server Error",
                            status: 500,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("should call onMutation", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, onMutate, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, { ok: true });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        onMutate = jest.fn();
                        result = renderHook(function () { return useMutate("POST", "", { onMutate: onMutate }); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate({ foo: "bar" })];
                    case 1:
                        _a.sent();
                        expect(onMutate).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should deal with non standard server error response (nginx style)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, "<html>404 - this is not a json!</html>", {
                            "content-type": "application/json",
                        });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useMutate("POST", ""); }, { wrapper: wrapper }).result;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, result.current.mutate({ foo: "bar" })];
                    case 2:
                        _a.sent();
                        expect("this statement").toBe("not executed");
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(result.current).toMatchObject({
                            error: {
                                data: "invalid json response body at https://my-awesome-api.fake/ reason: Unexpected token < in JSON at position 0",
                                message: "Failed to fetch: 200 OK",
                                status: 200,
                            },
                            loading: false,
                        });
                        expect(e_2).toEqual({
                            data: "invalid json response body at https://my-awesome-api.fake/ reason: Unexpected token < in JSON at position 0",
                            message: "Failed to fetch: 200 OK",
                            status: 200,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("should call the provider onError", function () { return __awaiter(void 0, void 0, void 0, function () {
            var onError, wrapper, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(500, { error: "I can't, I'm just a chicken!" });
                        onError = jest.fn();
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: onError }, children));
                        };
                        result = renderHook(function () { return useMutate("POST", ""); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate({ foo: "bar" }).catch(function () {
                                /* noop */
                            })];
                    case 1:
                        _a.sent();
                        expect(onError).toBeCalledWith({
                            data: { error: "I can't, I'm just a chicken!" },
                            message: "Failed to fetch: 500 Internal Server Error",
                            status: 500,
                        }, expect.any(Function), // retry
                        expect.any(Object));
                        return [2 /*return*/];
                }
            });
        }); });
        it("should be able to retry after error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var onError, wrapper, result, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(401, { message: "You shall not pass!" });
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, { message: "You shall pass :)" });
                        onError = jest.fn();
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: onError }, children));
                        };
                        result = renderHook(function () { return useMutate("POST", ""); }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.mutate({}).catch(function () {
                                /* noop */
                            })];
                    case 1:
                        _a.sent();
                        expect(onError).toBeCalledWith({
                            data: { message: "You shall not pass!" },
                            message: "Failed to fetch: 401 Unauthorized",
                            status: 401,
                        }, expect.any(Function), // retry
                        expect.any(Object));
                        return [4 /*yield*/, onError.mock.calls[0][1]()];
                    case 2:
                        data = _a.sent();
                        expect(data).toEqual({ message: "You shall pass :)" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should not call the provider onError if localErrorOnly is true", function () { return __awaiter(void 0, void 0, void 0, function () {
            var onError, wrapper, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(500, { error: "I can't, I'm just a chicken!" });
                        onError = jest.fn();
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: onError }, children));
                        };
                        result = renderHook(function () { return useMutate("POST", "", { localErrorOnly: true }); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate({ foo: "bar" }).catch(function () {
                                /* noop */
                            })];
                    case 1:
                        _a.sent();
                        expect(onError).not.toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should transform the data with the resolve function", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () {
                            return useMutate("POST", "", {
                                resolve: function (data) { return ({ id: data.id * 2 }); },
                            });
                        }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate({})];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 2 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should forward the resolve error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () {
                            return useMutate("POST", "", {
                                resolve: function () {
                                    throw new Error("I don't like your data!");
                                },
                            });
                        }, { wrapper: wrapper }).result;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, result.current.mutate({})];
                    case 2:
                        _a.sent();
                        expect("this statement").toBe("not executed");
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        expect(result.current).toMatchObject({
                            error: {
                                data: "I don't like your data!",
                                message: "Failed to resolve: I don't like your data!",
                            },
                            loading: false,
                        });
                        expect(e_3.message).toEqual("I don't like your data!");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("should call the provider onRequest", function () { return __awaiter(void 0, void 0, void 0, function () {
            var onRequest, wrapper, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, { hello: "world" });
                        onRequest = jest.fn();
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onRequest: onRequest }, children));
                        };
                        result = renderHook(function () { return useMutate("POST", ""); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate({ foo: "bar" })];
                    case 1:
                        _a.sent();
                        expect(onRequest).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the provider onResponse", function () { return __awaiter(void 0, void 0, void 0, function () {
            var body, onResponse, wrapper, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, { hello: "world" });
                        onResponse = jest.fn(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, res.json()];
                                    case 1:
                                        body = _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onResponse: onResponse }, children));
                        };
                        result = renderHook(function () { return useMutate("POST", ""); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate({ foo: "bar" })];
                    case 1:
                        _a.sent();
                        expect(onResponse).toBeCalled();
                        expect(body).toMatchObject({ hello: "world" });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("generation pattern", function () {
        it("should call the correct endpoint (DELETE)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var useDeleteMyCustomEndpoint, wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/plop")
                            .query({ force: true })
                            .reply(200, { id: 1 });
                        useDeleteMyCustomEndpoint = function (props) {
                            return useMutate("DELETE", "", props);
                        };
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useDeleteMyCustomEndpoint({ queryParams: { force: true } }); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate("plop")];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the correct endpoint (POST)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var useDeleteMyCustomEndpoint, wrapper, result, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/plop", { id: 1 })
                            .query({ force: true })
                            .reply(200, { id: 1 });
                        useDeleteMyCustomEndpoint = function (props) {
                            return useMutate("POST", "plop", props);
                        };
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () { return useDeleteMyCustomEndpoint({ queryParams: { force: true } }); }, { wrapper: wrapper }).result;
                        return [4 /*yield*/, result.current.mutate({ id: 1 })];
                    case 1:
                        res = _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(res).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlTXV0YXRlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlTXV0YXRlLnRlc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFrQixNQUFNLEdBQUcsQ0FBQztBQUcvRCxRQUFRLENBQUMsV0FBVyxFQUFFO0lBQ3BCLHVGQUF1RjtJQUN2Riw0QkFBNEI7SUFDNUIsSUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzNDLFVBQVUsQ0FBQztRQUNULE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUNILFNBQVMsQ0FBQztRQUNSLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQ2pCLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRTs7O2dCQUM1QyxJQUFJLENBQUMsNkJBQTZCLENBQUM7cUJBQ2hDLE1BQU0sQ0FBQyxPQUFPLENBQUM7cUJBQ2YsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVuQixPQUFPLEdBQWEsVUFBQyxFQUFZO3dCQUFWLFFBQVEsY0FBQTtvQkFBTyxPQUFBLENBQzFDLG9CQUFDLGVBQWUsSUFBQyxJQUFJLEVBQUMsNkJBQTZCLElBQUUsUUFBUSxDQUFtQixDQUNqRjtnQkFGMkMsQ0FFM0MsQ0FBQztnQkFDTSxNQUFNLEdBQUssVUFBVSxDQUFDLGNBQU0sT0FBQSxTQUFTLENBQUMs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