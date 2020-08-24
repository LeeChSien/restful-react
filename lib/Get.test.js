import { __assign, __awaiter, __generator } from "tslib";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, wait } from "@testing-library/react";
import "isomorphic-fetch";
import times from "lodash/times";
import nock from "nock";
import React from "react";
import { Get, RestfulProvider } from "./index";
import Mutate from "./Mutate";
describe("Get", function () {
    afterEach(function () {
        cleanup();
        nock.cleanAll();
    });
    describe("classic usage", function () {
        it("should call the url set in provider", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200);
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should deal with trailing slashs", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200);
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/" },
                            React.createElement(Get, { path: "/" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should set loading to `true` on mount", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200);
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should set loading to `false` on data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should send data on data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0]).toEqual({ hello: "world" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("shouldn't resolve after component unmounts", function () { return __awaiter(void 0, void 0, void 0, function () {
            var requestResolves, pendingRequestFinishes, children, resolve, unmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pendingRequestFinishes = new Promise(function (resolvePromise) {
                            requestResolves = resolvePromise;
                        });
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, pendingRequestFinishes];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        resolve = jest.fn(function (a) { return a; });
                        unmount = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", resolve: resolve }, children))).unmount;
                        unmount();
                        requestResolves();
                        return [4 /*yield*/, wait(function () { return expect(resolve).not.toHaveBeenCalled(); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the provider onRequest", function () { return __awaiter(void 0, void 0, void 0, function () {
            var path, children, onRequest, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = "https://my-awesome-api.fake";
                        nock(path)
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        onRequest = jest.fn();
                        request = new Request(path);
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onRequest: onRequest },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(onRequest).toBeCalledWith(request);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the provider onResponse", function () { return __awaiter(void 0, void 0, void 0, function () {
            var path, children, body, onResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = "https://my-awesome-api.fake";
                        nock(path)
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
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
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onResponse: onResponse },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(onResponse).toBeCalled();
                        expect(body).toMatchObject({ hello: "world" });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with error", function () {
        it("should set the `error` object properly", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(401, { message: "You shall not pass!" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0]).toEqual(null);
                        expect(children.mock.calls[1][1].error).toEqual({
                            data: { message: "You shall not pass!" },
                            message: "Failed to fetch: 401 Unauthorized",
                            status: 401,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should handle network error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .replyWithError({ message: "You shall not pass!" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0]).toEqual(null);
                        expect(children.mock.calls[1][1].error).toMatchObject({
                            message: "Failed to fetch: request to https://my-awesome-api.fake failed, reason: You shall not pass!",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should deal with non standard server error response (nginx style)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, "<html>404 - this is not a json!</html>", {
                            "content-type": "application/json",
                        });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0]).toEqual(null);
                        expect(children.mock.calls[1][1].error).toEqual({
                            data: "invalid json response body at https://my-awesome-api.fake reason: Unexpected token < in JSON at position 0",
                            message: "Failed to fetch: 200 OK - invalid json response body at https://my-awesome-api.fake reason: Unexpected token < in JSON at position 0",
                            status: 200,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the provider onError", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, onError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(401, { message: "You shall not pass!" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        onError = jest.fn();
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: onError },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(onError).toBeCalledWith({
                            data: { message: "You shall not pass!" },
                            message: "Failed to fetch: 401 Unauthorized",
                            status: 401,
                        }, expect.any(Function), // retry
                        expect.any(Object));
                        return [2 /*return*/];
                }
            });
        }); });
        it("should be able to retry after an error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, onError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(401, { message: "You shall not pass!" });
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { message: "You shall pass :)" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        onError = jest.fn();
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: onError },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(onError).toBeCalledWith({
                            data: { message: "You shall not pass!" },
                            message: "Failed to fetch: 401 Unauthorized",
                            status: 401,
                        }, expect.any(Function), // retry
                        expect.any(Object));
                        onError.mock.calls[0][1]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(4); })];
                    case 2:
                        _a.sent();
                        expect(children.mock.calls[3][0]).toEqual({ message: "You shall pass :)" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should not call the provider onError if localErrorOnly is true", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, onError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(401, { message: "You shall not pass!" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        onError = jest.fn();
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: onError },
                            React.createElement(Get, { path: "", localErrorOnly: true }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(onError.mock.calls.length).toEqual(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with custom resolver", function () {
        it("should transform data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", resolve: function (data) { return (__assign(__assign({}, data), { foo: "bar" })); } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0]).toEqual({ hello: "world", foo: "bar" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should transform data with a promise", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", resolve: function (data) { return Promise.resolve(__assign(__assign({}, data), { foo: "bar" })); } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0]).toEqual({ hello: "world", foo: "bar" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass an error when the resolver throws a runtime error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", resolve: function (data) { return data.apples.oranges; } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].error.message).toEqual("RESOLVE_ERROR");
                        expect(children.mock.calls[1][0]).toEqual(null);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass an error when the resolver is a promise that rejects", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", resolve: function () { return Promise.reject("nogood"); } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].error).toEqual({ message: "RESOLVE_ERROR", data: JSON.stringify("nogood") });
                        expect(children.mock.calls[1][0]).toEqual(null);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with lazy", function () {
        it("should not fetch on mount", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", lazy: true }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toBe(false);
                        expect(children.mock.calls[0][0]).toBe(null);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with wait", function () {
        it("should render nothing if until we have data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .delay(1000)
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", wait: true }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(0); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should render if we have data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", wait: true }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toBe(false);
                        expect(children.mock.calls[0][0]).toEqual({ hello: "world" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should render if we have data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", wait: true }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toBe(false);
                        expect(children.mock.calls[0][0]).toEqual({ hello: "world" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should render if we have an error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(401, "Go away!", { "content-type": "text/plain" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", wait: true }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toBe(false);
                        expect(children.mock.calls[0][1].error).toEqual({
                            data: "Go away!",
                            message: "Failed to fetch: 401 Unauthorized",
                            status: 401,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with base", function () {
        it("should override the base url", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://not-here.fake" },
                            React.createElement(Get, { path: "", base: "https://my-awesome-api.fake" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].loading).toEqual(false);
                        expect(children.mock.calls[1][0]).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override the base url and compose with the path", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/plop")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://not-here.fake" },
                            React.createElement(Get, { path: "/plop", base: "https://my-awesome-api.fake" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].loading).toEqual(false);
                        expect(children.mock.calls[1][0]).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with custom request options", function () {
        it("should add a custom header", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", { reqheaders: { foo: "bar" } })
                            .get("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", requestOptions: { headers: { foo: "bar" } } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].loading).toEqual(false);
                        expect(children.mock.calls[1][0]).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should add a custom header with requestOptions method", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", { reqheaders: { foo: "bar" } })
                            .get("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", requestOptions: function () { return ({ headers: { foo: "bar" } }); } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].loading).toEqual(false);
                        expect(children.mock.calls[1][0]).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should add a promised custom header with the requestOptions method", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", { reqheaders: { foo: "bar" } })
                            .get("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", requestOptions: function () { return new Promise(function (res) { return setTimeout(function () { return res({ headers: { foo: "bar" } }); }, 1000); }); } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].loading).toEqual(false);
                        expect(children.mock.calls[1][0]).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("actions", function () {
        it("should refetch", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // initial fetch
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].loading).toEqual(false);
                        expect(children.mock.calls[1][0]).toEqual({ id: 1 });
                        // refetch
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { id: 2 });
                        children.mock.calls[1][2].refetch();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(4); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[2][1].loading).toEqual(true);
                        expect(children.mock.calls[2][0]).toEqual({ id: 1 });
                        // after refetch state
                        expect(children.mock.calls[3][1].loading).toEqual(false);
                        expect(children.mock.calls[3][0]).toEqual({ id: 2 });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with debounce", function () {
        it("should call the API only 1 time", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, children, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCalls = 0;
                        nock("https://my-awesome-api.fake")
                            .filteringPath(/test=[^&]*/g, "test=XXX")
                            .get("/?test=XXX")
                            .reply(200, function () { return ++apiCalls; })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "?test=1", debounce: true }, children))).rerender;
                        times(10, function (i) {
                            return rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                                React.createElement(Get, { path: "?test=" + (i + 1), debounce: true }, children)));
                        });
                        return [4 /*yield*/, wait(function () { return expect(apiCalls).toEqual(1); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the API only 10 times without debounce", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, children, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCalls = 0;
                        nock("https://my-awesome-api.fake")
                            .filteringPath(/test=[^&]*/g, "test=XXX")
                            .get("/?test=XXX")
                            .reply(200, function () { return ++apiCalls; })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "?test=1" }, children))).rerender;
                        times(10, function (i) {
                            return rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                                React.createElement(Get, { path: "?test=" + (i + 1) }, children)));
                        });
                        return [4 /*yield*/, wait(function () { return expect(apiCalls).toEqual(10); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("refetch after provider props update", function () {
        it("should refetch when base changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var firstAPI, secondAPI, children, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstAPI = nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { id: 1 });
                        secondAPI = nock("https://my-new-api.fake")
                            .get("/")
                            .reply(200, { id: 2 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-new-api.fake" },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(firstAPI.isDone()).toBeTruthy(); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, wait(function () { return expect(secondAPI.isDone()).toBeTruthy(); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should refetch when parentPath changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var firstAPI, secondAPI, children, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstAPI = nock("https://my-awesome-api.fake")
                            .get("/parent1")
                            .reply(200, { id: 1 });
                        secondAPI = nock("https://my-awesome-api.fake")
                            .get("/parent2")
                            .reply(200, { id: 2 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", parentPath: "/parent1" },
                            React.createElement(Get, { path: "" }, children))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", parentPath: "/parent2" },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(firstAPI.isDone()).toBeTruthy(); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, wait(function () { return expect(secondAPI.isDone()).toBeTruthy(); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should refetch when queryParams change", function () { return __awaiter(void 0, void 0, void 0, function () {
            var firstAPI, secondAPI, children, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstAPI = nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { id: 1 })
                            .persist();
                        secondAPI = nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ page: 2 })
                            .reply(200, { id: 2 })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", queryParams: { page: 2 } },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(firstAPI.isDone()).toBeTruthy(); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, wait(function () { return expect(secondAPI.isDone()).toBeTruthy(); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should refetch when requestOptions change", function () { return __awaiter(void 0, void 0, void 0, function () {
            var firstAPI, secondAPI, children, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstAPI = nock("https://my-awesome-api.fake")
                            .get("/")
                            .matchHeader("header1", "value1")
                            .reply(200, { id: 1 });
                        secondAPI = nock("https://my-awesome-api.fake")
                            .get("/")
                            .matchHeader("header2", "value2")
                            .reply(200, { id: 2 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", requestOptions: function () { return ({ headers: { header1: "value1" } }); } },
                            React.createElement(Get, { path: "" }, children))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", requestOptions: function () { return ({ headers: { header2: "value2" } }); } },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(firstAPI.isDone()).toBeTruthy(); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, wait(function () { return expect(secondAPI.isDone()).toBeTruthy(); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("refetch after  get props update", function () {
        it("should not refetch when base, path or resolve don't change", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, children, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCalls = 0;
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, function () { return ++apiCalls; })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", resolve: function (data) { return data; } },
                            React.createElement(Get, { path: "" }, children))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", resolve: function (data) { return data; } },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(apiCalls).toEqual(1); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should rewrite the base and handle path accordingly", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-other-api.fake")
                            .get("/")
                            .reply(200, { id: 1 });
                        nock("https://my-awesome-api.fake/eaegae")
                            .post("/LOL")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/eaegae" },
                            React.createElement(Mutate, { verb: "POST", path: "/LOL" }, function () { return (React.createElement(Get, { base: "https://my-other-api.fake", path: "" }, children)); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should refetch when base changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, children, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCalls = 0;
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, function () { return ++apiCalls; });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children))).rerender;
                        nock("https://my-new-api.fake")
                            .get("/")
                            .reply(200, function () { return ++apiCalls; });
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { base: "https://my-new-api.fake", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(apiCalls).toEqual(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should refetch when path changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, children, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCalls = 0;
                        nock("https://my-awesome-api.fake")
                            .filteringPath(/test=[^&]*/g, "test=XXX")
                            .get("/?test=XXX")
                            .reply(200, function () { return ++apiCalls; })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "/?test=0" }, children))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "/?test=1" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(apiCalls).toEqual(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should refetch when resolve changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, children, providerResolve, rerender, newResolve;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCalls = 0;
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, function () { return ++apiCalls; })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        providerResolve = function (a) { return a; };
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", resolve: providerResolve },
                            React.createElement(Get, { path: "" }, children))).rerender;
                        newResolve = function () { return "hello"; };
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", resolve: newResolve },
                            React.createElement(Get, { path: "", resolve: newResolve }, children)));
                        return [4 /*yield*/, wait(function () { return expect(apiCalls).toEqual(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT refetch when queryParams are the same", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, children, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCalls = 0;
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ page: 2 })
                            .reply(200, function () { return ++apiCalls; })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", queryParams: { page: 2 } }, children))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", queryParams: { page: 2 } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(apiCalls).toEqual(1); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should refetch when queryParams changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, children, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCalls = 0;
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, function () { return ++apiCalls; })
                            .persist();
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ page: 2 })
                            .reply(200, function () { return ++apiCalls; })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", queryParams: { page: 2 } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(apiCalls).toEqual(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Compose paths and urls", function () {
        it("should compose the url with the base", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/plop")
                            .reply(200);
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "/plop" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose absolute urls", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/people")
                            .reply(200);
                        nock("https://my-awesome-api.fake")
                            .get("/absolute")
                            .reply(200);
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "/people" }, function () { return React.createElement(Get, { path: "/absolute" }, children); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose relative urls", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/people")
                            .reply(200);
                        nock("https://my-awesome-api.fake")
                            .get("/people/relative")
                            .reply(200, { path: "/people/relative" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "/people" }, function () { return React.createElement(Get, { path: "relative" }, children); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[2][0]).toEqual({ path: "/people/relative" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose absolute urls with base subpath", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/people")
                            .reply(200);
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/absolute")
                            .reply(200, { path: "/absolute" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/MY_SUBROUTE" },
                            React.createElement(Get, { path: "/people" }, function () { return React.createElement(Get, { path: "/absolute" }, children); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[2][0]).toEqual({ path: "/absolute" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose relative urls with base subpath", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/people")
                            .reply(200);
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/people/relative")
                            .reply(200, { path: "/people/relative" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/MY_SUBROUTE" },
                            React.createElement(Get, { path: "/people" }, function () { return React.createElement(Get, { path: "relative" }, children); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[2][0]).toEqual({ path: "/people/relative" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose properly when base contains a trailing slash", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/people")
                            .reply(200);
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/people/relative")
                            .reply(200, { path: "/people/relative" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/MY_SUBROUTE/" },
                            React.createElement(Get, { path: "/people" }, function () { return React.createElement(Get, { path: "relative" }, children); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[2][0]).toEqual({ path: "/people/relative" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose more nested absolute and relative urls", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/absolute-1")
                            .reply(200);
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/absolute-1/relative-1")
                            .reply(200);
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/absolute-2")
                            .reply(200);
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/absolute-2/relative-2")
                            .reply(200);
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/absolute-2/relative-2/relative-3")
                            .reply(200, { path: "/absolute-2/relative-2/relative-3" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/MY_SUBROUTE/" },
                            React.createElement(Get, { path: "/absolute-1" }, function () { return (React.createElement(Get, { path: "relative-1" }, function () { return (React.createElement(Get, { path: "/absolute-2" }, function () { return React.createElement(Get, { path: "relative-2" }, function () { return React.createElement(Get, { path: "relative-3" }, children); }); })); })); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(6); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[5][0]).toEqual({ path: "/absolute-2/relative-2/relative-3" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose properly when one of the paths is empty string", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/absolute-1")
                            .reply(200);
                        nock("https://my-awesome-api.fake")
                            .get("/absolute-1/relative-1")
                            .reply(200);
                        nock("https://my-awesome-api.fake")
                            .get("/absolute-1/absolute-2")
                            .reply(200);
                        nock("https://my-awesome-api.fake")
                            .get("/absolute-1/absolute-2/relative-2")
                            .reply(200);
                        nock("https://my-awesome-api.fake")
                            .get("/absolute-1/absolute-2/relative-2/relative-3")
                            .reply(200, { path: "/absolute-1/absolute-2/relative-2/relative-3" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/absolute-1" },
                            React.createElement(Get, { path: "" }, function () { return (React.createElement(Get, { path: "relative-1" }, function () { return (React.createElement(Get, { path: "/absolute-2" }, function () { return React.createElement(Get, { path: "relative-2" }, function () { return React.createElement(Get, { path: "relative-3" }, children); }); })); })); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(6); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[5][0]).toEqual({ path: "/absolute-1/absolute-2/relative-2/relative-3" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose properly when one of the paths is lone slash and base has trailing slash", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/absolute-1")
                            .reply(200);
                        nock("https://my-awesome-api.fake")
                            .get("/absolute-1/relative-1")
                            .reply(200);
                        nock("https://my-awesome-api.fake")
                            .get("/absolute-1/absolute-2")
                            .reply(200);
                        nock("https://my-awesome-api.fake")
                            .get("/absolute-1/absolute-2/relative-2")
                            .reply(200);
                        nock("https://my-awesome-api.fake")
                            .get("/absolute-1/absolute-2/relative-2/relative-3")
                            .reply(200, { path: "/absolute-1/absolute-2/relative-2/relative-3" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/absolute-1/" },
                            React.createElement(Get, { path: "/" }, function () { return (React.createElement(Get, { path: "relative-1" }, function () { return (React.createElement(Get, { path: "/absolute-2" }, function () { return React.createElement(Get, { path: "relative-2" }, function () { return React.createElement(Get, { path: "relative-3" }, children); }); })); })); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(6); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[5][0]).toEqual({ path: "/absolute-1/absolute-2/relative-2/relative-3" });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with query params", function () {
        it("should add the correct query params in the url", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({
                            myParam: true,
                        })
                            .reply(200);
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", queryParams: { myParam: true } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should inherit provider's queryParams if none specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({
                            myParam: true,
                        })
                            .reply(200);
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { queryParams: { myParam: true }, base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override provider's queryParams if own specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({
                            myParam: false,
                        })
                            .reply(200);
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { queryParams: { myParam: true }, base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", queryParams: { myParam: false } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should merge provider's queryParams with own", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({
                            myParam: false,
                            otherParam: true,
                        })
                            .reply(200);
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { queryParams: { otherParam: true }, base: "https://my-awesome-api.fake" },
                            React.createElement(Get, { path: "", queryParams: { myParam: false } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvR2V0LnRlc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLHlDQUF5QyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9ELE9BQU8sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBQ2pDLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0MsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBRTlCLFFBQVEsQ0FBQyxLQUFLLEVBQUU7SUFDZCxTQUFTLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQztRQUNWLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDeEIsRUFBRSxDQUFDLHFDQUFxQyxFQUFFOzs7Ozt3QkFDeEMsSUFBSSxDQUFDLDZCQUE2QixDQUFDOzZCQUNoQyxHQUFHLENBQUMsR0FBRyxDQUFDOzZCQUNSLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFFUixRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUMzQixRQUFRLENBQUMsZUFBZSxDQUFDLGdDQUFPLENBQUMsQ0FBQzt3QkFFbEMsTUFBTSxDQUNKLG9CQUFDLGVBQWUsSUFBQyxJQUFJLEVBQUMsNkJBQTZCOzRCQUNqRCxvQkFBQyxHQUFHLElBQUMsSUFBSSxFQUFDLEVBQUUsSUFBRSxRQUFRLENBQU8sQ0FDYixDQUNuQixDQUFDO3dCQUVGLHFCQUFNLElBQUksQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FB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