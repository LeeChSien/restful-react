import { __assign, __awaiter, __generator } from "tslib";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, wait } from "@testing-library/react";
import "isomorphic-fetch";
import nock from "nock";
import React from "react";
import { Poll, RestfulProvider } from "./index";
describe("Poll", function () {
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
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;index=1",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "2" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose the url with the base", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;",
                            },
                        })
                            .get("/plop")
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;index=1",
                            },
                        })
                            .get("/plop")
                            .reply(200, { data: "hello" }, { "x-polling-index": "2" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { path: "/plop" }, children)));
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
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;index=1",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "2" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { path: "" }, children)));
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
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;index=1",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "2" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { path: "" }, children)));
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
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=0s;",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=0s;index=1",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "2" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { path: "", wait: 0 }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0]).toEqual({ data: "hello" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should update data if the response change", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=0s;",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=0s;index=1",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello you" }, { "x-polling-index": "2" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { path: "", wait: 0 }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[2][0]).toEqual({ data: "hello you" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should stop polling if no polling index returned", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lastResponseWithoutIndex, children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // render 1: loading
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=1s;",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        lastResponseWithoutIndex = { data: "new data" };
                        // render 3 data (new data)
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=1s;index=1",
                            },
                        })
                            .get("/")
                            .reply(200, lastResponseWithoutIndex);
                        // render 4 (shouldn't happen)
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=1s;",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "You shouldn't get here because the previous one had no polling index." }, { "x-polling-index": "3" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { wait: 1, path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, wait(function () {
                                return expect(children.mock.calls[children.mock.calls.length - 1][0]).toEqual(lastResponseWithoutIndex);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should deal with query parameters", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;",
                            },
                        })
                            .get("/")
                            .query({
                            myParam: true,
                        })
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;index=1",
                            },
                        })
                            .get("/")
                            .query({
                            myParam: true,
                        })
                            .reply(200, { data: "hello" }, { "x-polling-index": "2" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { path: "", queryParams: { myParam: true } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should inherit query parameters from provider if none specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;",
                            },
                        })
                            .get("/")
                            .query({
                            myParam: true,
                        })
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;index=1",
                            },
                        })
                            .get("/")
                            .query({
                            myParam: true,
                        })
                            .reply(200, { data: "hello" }, { "x-polling-index": "2" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", queryParams: { myParam: true } },
                            React.createElement(Poll, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override query parameters from provider if own specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;",
                            },
                        })
                            .get("/")
                            .query({
                            myParam: false,
                        })
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;index=1",
                            },
                        })
                            .get("/")
                            .query({
                            myParam: true,
                        })
                            .reply(200, { data: "hello" }, { "x-polling-index": "2" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", queryParams: { myParam: true } },
                            React.createElement(Poll, { path: "", queryParams: { myParam: false } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should merge query parameters from provider when both specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;",
                            },
                        })
                            .get("/")
                            .query({
                            myParam: false,
                            otherParam: true,
                        })
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=60s;index=1",
                            },
                        })
                            .get("/")
                            .query({
                            myParam: true,
                        })
                            .reply(200, { data: "hello" }, { "x-polling-index": "2" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", queryParams: { otherParam: true } },
                            React.createElement(Poll, { path: "", queryParams: { myParam: false } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
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
                        request = new Request(path, { headers: { prefer: "wait=60s;" } });
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onRequest: onRequest },
                            React.createElement(Poll, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length > 0).toBe(true); })];
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
                            React.createElement(Poll, { path: "" }, children)));
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
                            React.createElement(Poll, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0]).toEqual(null);
                        expect(children.mock.calls[1][1].error).toEqual({
                            data: { message: "You shall not pass!" },
                            message: "Failed to poll: 401 Unauthorized",
                            status: 401,
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
                            React.createElement(Poll, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0]).toEqual(null);
                        expect(children.mock.calls[1][1].error).toEqual({
                            data: "invalid json response body at https://my-awesome-api.fake reason: Unexpected token < in JSON at position 0",
                            message: "Failed to poll: 200 OK - invalid json response body at https://my-awesome-api.fake reason: Unexpected token < in JSON at position 0",
                            status: 200,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should continue polling after an error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(504, "<html>504 Gateway Time-out</html>", {
                            "content-type": "text/html",
                        });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=0s;",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "1", "content-type": "application/json" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { path: "", wait: 0 }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 1:
                        _a.sent();
                        // first res (error)
                        expect(children.mock.calls[1][0]).toEqual(null);
                        expect(children.mock.calls[1][1].error).toEqual({
                            data: "<html>504 Gateway Time-out</html>",
                            message: "Failed to poll: 504 Gateway Timeout",
                            status: 504,
                        });
                        // second res (success)
                        expect(children.mock.calls[2][0]).toEqual({ data: "hello" });
                        expect(children.mock.calls[2][1].error).toEqual(null);
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
                            React.createElement(Poll, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(onError).toBeCalledWith({
                            data: { message: "You shall not pass!" },
                            message: "Failed to poll: 401 Unauthorized",
                            status: 401,
                        }, expect.any(Function), // retry
                        expect.any(Object));
                        return [2 /*return*/];
                }
            });
        }); });
        it("should set the `error` object properly", function () { return __awaiter(void 0, void 0, void 0, function () {
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
                            React.createElement(Poll, { path: "", localErrorOnly: true }, children)));
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
        it("should use the provider resolver", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", resolve: function (data) { return (__assign(__assign({}, data), { foo: "bar" })); } },
                            React.createElement(Poll, { path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0]).toEqual({ hello: "world", foo: "bar" });
                        return [2 /*return*/];
                }
            });
        }); });
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
                            React.createElement(Poll, { path: "", resolve: function (data) { return (__assign(__assign({}, data), { foo: "bar" })); } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0]).toEqual({ hello: "world", foo: "bar" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should be able to consolidate data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=0s;",
                            },
                        })
                            .get("/")
                            .reply(200, { data: "hello" }, { "x-polling-index": "1" });
                        nock("https://my-awesome-api.fake", {
                            reqheaders: {
                                prefer: "wait=0s;index=1",
                            },
                        })
                            .get("/")
                            .reply(200, { data: " you" }, { "x-polling-index": "2" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { path: "", wait: 0, resolve: function (data, prevData) { return ({
                                    data: (prevData || { data: "" }).data + data.data,
                                }); } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[2][0]).toEqual({ data: "hello you" });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should update data when resolver changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, resolve, newResolve, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        resolve = function (data) { return (__assign(__assign({}, data), { too: "bar" })); };
                        newResolve = function (data) { return (__assign(__assign({}, data), { foo: "bar" })); };
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { path: "", resolve: resolve }, children))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Poll, { path: "", resolve: newResolve }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[2][0]).toEqual({ hello: "world", foo: "bar" });
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
                            React.createElement(Poll, { path: "", lazy: true }, children)));
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
                            React.createElement(Poll, { path: "", base: "https://my-awesome-api.fake" }, children)));
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
                            React.createElement(Poll, { path: "/plop", base: "https://my-awesome-api.fake" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].loading).toEqual(false);
                        expect(children.mock.calls[1][0]).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose urls with base subpath", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/absolute")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/MY_SUBROUTE" },
                            React.createElement(Poll, { path: "/absolute" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].loading).toEqual(false);
                        expect(children.mock.calls[1][0]).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose urls properly when base has a trailing slash", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .get("/absolute")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/MY_SUBROUTE/" },
                            React.createElement(Poll, { path: "/absolute" }, children)));
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
                            React.createElement(Poll, { path: "", requestOptions: { headers: { foo: "bar" } } }, children)));
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
                            React.createElement(Poll, { path: "", requestOptions: function () { return ({ headers: { foo: "bar" } }); } }, children)));
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
                            React.createElement(Poll, { path: "", requestOptions: function () { return new Promise(function (res) { return setTimeout(function () { return res({ headers: { foo: "bar" } }); }, 1000); }); } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][1].loading).toEqual(false);
                        expect(children.mock.calls[1][0]).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should merge headers with providers", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", { reqheaders: { foo: "bar", baz: "qux" } })
                            .get("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", requestOptions: { headers: { baz: "qux" } } },
                            React.createElement(Poll, { path: "", requestOptions: function () { return ({ headers: { foo: "bar" } }); } }, children)));
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9sbC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1BvbGwudGVzdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRTFCLE9BQU8sRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRWhELFFBQVEsQ0FBQyxNQUFNLEVBQUU7SUFDZixTQUFTLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQztRQUNWLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDeEIsRUFBRSxDQUFDLHFDQUFxQyxFQUFFOzs7Ozt3QkFDeEMsSUFBSSxDQUFDLDZCQUE2QixFQUFFOzRCQUNsQyxVQUFVLEVBQUU7Z0NBQ1YsTUFBTSxFQUFFLFdBQVc7NkJBQ3BCO3lCQUNGLENBQUM7NkJBQ0MsR0FBRyxDQUFDLEdBQUcsQ0FBQzs2QkFDUixLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFFN0QsSUFBSSxDQUFDLDZCQUE2QixFQUFFOzRCQUNsQyxVQUFVLEVBQUU7Z0NBQ1YsTUFBTSxFQUFFLGtCQUFrQjs2QkFDM0I7eUJBQ0YsQ0FBQzs2QkFDQyxHQUFHLENBQUMsR0FBRyxDQUFDOzZCQUNSLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUs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