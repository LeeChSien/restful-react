import { __awaiter, __generator } from "tslib";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, wait } from "@testing-library/react";
import "isomorphic-fetch";
import nock from "nock";
import React from "react";
import Get from "./Get";
import { Mutate, RestfulProvider } from "./index";
describe("Mutate", function () {
    afterEach(function () {
        cleanup();
        nock.cleanAll();
    });
    describe("DELETE", function () {
        it("should call the correct url with a specific id", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/plop")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "DELETE", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // delete action
                        children.mock.calls[0][0]("plop");
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after delete state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the correct url with a specific id (with base in Mutate)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/plop")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "DELETE", path: "", base: "https://my-awesome-api.fake" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // delete action
                        children.mock.calls[0][0]("plop");
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after delete state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the correct url with a specific id (with base and path in Mutate)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/user")
                            .delete("/plop")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "DELETE", base: "https://my-awesome-api.fake", path: "user" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // delete action
                        children.mock.calls[0][0]("plop");
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after delete state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should send the correct body", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/", { foo: "bar" })
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "DELETE", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // delete action
                        children.mock.calls[0][0]({ foo: "bar" });
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after delete state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should send the empty body object", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/", {})
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "DELETE", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // delete action
                        children.mock.calls[0][0]({});
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after delete state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the correct url without id", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "DELETE", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // delete action
                        children.mock.calls[0][0](); // no id specified here
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after delete state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should deal with query parameters", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .delete("/plop")
                            .query({
                            myParam: true,
                        })
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "DELETE", path: "", queryParams: { myParam: true } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // delete action
                        children.mock.calls[0][0]("plop");
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after delete state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("POST", function () {
        it("should call the correct url", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "POST", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should send the correct body", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/", { foo: "bar" })
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "POST", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]({ foo: "bar" });
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return the correct data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "POST", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _b.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        _a = expect;
                        return [4 /*yield*/, children.mock.calls[0][0]()];
                    case 2:
                        // post action
                        _a.apply(void 0, [_b.sent()]).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return the data and the message on error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(500, { error: "oh no… not again…" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "POST", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        return [2 /*return*/, children.mock.calls[0][0]().catch(function (error) {
                                expect(error).toEqual({
                                    data: { error: "oh no… not again…" },
                                    message: "Failed to fetch: 500 Internal Server Error",
                                    status: 500,
                                });
                                expect(children.mock.calls[2][1].error).toEqual({
                                    data: { error: "oh no… not again…" },
                                    message: "Failed to fetch: 500 Internal Server Error",
                                    status: 500,
                                });
                            })];
                }
            });
        }); });
        it("should call the provider onError", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, onError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(401, { message: "You shall not pass!" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        onError = jest.fn();
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: onError },
                            React.createElement(Mutate, { verb: "POST", path: "" }, children)));
                        // post action
                        return [4 /*yield*/, children.mock.calls[0][0]().catch(function () {
                                /* noop */
                            })];
                    case 1:
                        // post action
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
            var children, onError, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(401, { message: "You shall not pass!" });
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, { message: "You shall pass :)" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        onError = jest.fn();
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: onError },
                            React.createElement(Mutate, { verb: "POST", path: "" }, children)));
                        // post action
                        return [4 /*yield*/, children.mock.calls[0][0]().catch(function () {
                                /* noop */
                            })];
                    case 1:
                        // post action
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
            var children, onError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(401, { message: "You shall not pass!" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        onError = jest.fn();
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: onError },
                            React.createElement(Mutate, { verb: "POST", path: "", localErrorOnly: true }, children)));
                        // post action
                        return [4 /*yield*/, children.mock.calls[0][0]().catch(function () {
                                /* noop */
                            })];
                    case 1:
                        // post action
                        _a.sent();
                        expect(onError.mock.calls.length).toEqual(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should have the correct type definition", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                    React.createElement(Mutate, { path: "", verb: "POST" }, function (mutate) { return React.createElement("button", { onClick: function () { return mutate({ id: "my-id", name: "fabien" }); } }, "test"); }),
                    React.createElement(Mutate, { path: "", verb: "DELETE" }, function (mutate) { return React.createElement("button", { onClick: function () { return mutate("my-id"); } }, "test"); })));
                return [2 /*return*/];
            });
        }); });
        it("should call onMutate", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, onMutate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        onMutate = jest.fn();
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "POST", path: "", onMutate: onMutate }, children)));
                        // call mutate
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        // call mutate
                        _a.sent();
                        return [4 /*yield*/, children.mock.calls[0][0]()];
                    case 2:
                        _a.sent();
                        expect(onMutate).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("PUT", function () {
        it("should deal with empty response", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .put("/")
                            .reply(204);
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "PUT", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // put action
                        children.mock.calls[0][0]()
                            .then(function (data) { return expect(data).toBe(undefined); })
                            .catch(function () { return expect("should not").toBe("called"); });
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Compose paths, urls, and query parameters", function () {
        it("should compose absolute urls", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/absolute")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "POST", path: "/people" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "/absolute" }, children)); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        expect(children.mock.calls[2][1].loading).toEqual(false);
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
                            .post("/people/relative")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "POST", path: "/people" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "relative" }, children)); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose with base subpath", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .post("/people/relative")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/MY_SUBROUTE" },
                            React.createElement(Mutate, { verb: "POST", path: "/people" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "relative" }, children)); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should rewrite the base and handle path accordingly", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-other-api.fake")
                            .post("/")
                            .reply(200, { id: 1 });
                        nock("https://my-awesome-api.fake/eaegae")
                            .get("/LOL")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/eaegae" },
                            React.createElement(Get, { path: "/LOL" }, function () { return (React.createElement(Mutate, { verb: "POST", base: "https://my-other-api.fake", path: "" }, children)); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(2); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, children.mock.calls[0][0]()];
                    case 2:
                        response = _a.sent();
                        expect(children.mock.calls.length).toBe(4);
                        expect(response).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose base with trailing slash", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/MY_SUBROUTE")
                            .post("/people/relative")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/MY_SUBROUTE/" },
                            React.createElement(Mutate, { verb: "POST", path: "/people" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "relative" }, children)); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose properly when one of the nested paths is empty string", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/absolute-1")
                            .post("/absolute-2/relative-2/relative-3")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/absolute-1" },
                            React.createElement(Mutate, { verb: "POST", path: "" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "relative-1" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "/absolute-2" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "relative-2" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "relative-3" }, children)); })); })); })); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should compose properly when one of the nested paths is lone slash and base has trailing slash", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake/absolute-1")
                            .post("/absolute-2/relative-2/relative-3")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake/absolute-1/" },
                            React.createElement(Mutate, { verb: "POST", path: "/" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "relative-1" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "/absolute-2" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "relative-2" }, function () { return (React.createElement(Mutate, { verb: "POST", path: "relative-3" }, children)); })); })); })); })));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should deal with query params", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .query({
                            myParam: true,
                        })
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(Mutate, { verb: "POST", path: "", queryParams: { myParam: true } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should inherit provider's query params if present", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .query({
                            myParam: true,
                        })
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", queryParams: { myParam: true } },
                            React.createElement(Mutate, { verb: "POST", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override provider's query params if own present", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .query({
                            myParam: false,
                        })
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", queryParams: { myParam: true } },
                            React.createElement(Mutate, { verb: "POST", path: "", queryParams: { myParam: false } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should merge provider's query params with own if present", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .post("/")
                            .query({
                            myParam: false,
                            otherParam: true,
                        })
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        // setup - first render
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", queryParams: { otherParam: true } },
                            React.createElement(Mutate, { verb: "POST", path: "", queryParams: { myParam: false } }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
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
                            .post("/")
                            .reply(200, { hello: "world" });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        onRequest = jest.fn();
                        request = new Request(path, {
                            method: "POST",
                            headers: { "content-type": "text/plain" },
                        });
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onRequest: onRequest },
                            React.createElement(Mutate, { verb: "POST", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        // expect onRequest to be called
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
                            .post("/")
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
                            React.createElement(Mutate, { verb: "POST", path: "" }, children)));
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(1); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[0][1].loading).toEqual(false);
                        expect(children.mock.calls[0][0]).toBeDefined();
                        // post action
                        children.mock.calls[0][0]();
                        return [4 /*yield*/, wait(function () { return expect(children.mock.calls.length).toBe(3); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[1][1].loading).toEqual(true);
                        // after post state
                        expect(children.mock.calls[2][1].loading).toEqual(false);
                        // expect onResponse to be called
                        expect(onResponse).toBeCalled();
                        expect(body).toMatchObject({ hello: "world" });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXV0YXRlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvTXV0YXRlLnRlc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLHlDQUF5QyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9ELE9BQU8sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUM7QUFDeEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFbEQsUUFBUSxDQUFDLFFBQVEsRUFBRTtJQUNqQixTQUFTLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQztRQUNWLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDakIsRUFBRSxDQUFDLGdEQUFnRCxFQUFFOzs7Ozt3QkFDbkQsSUFBSSxDQUFDLDZCQUE2QixDQUFDOzZCQUNoQyxNQUFNLENBQUMsT0FBTyxDQUFDOzZCQUNmLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFFbkIsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDM0IsUUFBUSxDQUFDLGVBQWUsQ0FBQyxnQ0FBTyxDQUFDLENBQUM7d0JBRWxDLHVCQUF1Qjt3QkFDdkIsTUFBTSxDQUNKLG9CQUFDLGVBQWUsSUFBQyxJQUFJLEVBQUMsNkJBQTZCOzRCQUNqRCxvQkFBQyxNQUFNLElBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBRSxJQUMxQixRQUFRLENBQ0YsQ0FDTyxDQUNuQixDQUFDO3dCQUVGLHFC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