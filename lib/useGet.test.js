import { __awaiter, __generator, __read } from "tslib";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, wait, waitForElement } from "@testing-library/react";
import "isomorphic-fetch";
import times from "lodash/times";
import nock from "nock";
import React, { useState } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { RestfulProvider, useGet } from "./index";
describe("useGet hook", function () {
    // Mute console.error -> https://github.com/kentcdodds/react-testing-library/issues/281
    // tslint:disable:no-console
    var originalConsoleError = console.error;
    beforeEach(function () {
        console.error = jest.fn;
    });
    afterEach(function () {
        console.error = originalConsoleError;
        cleanup();
        nock.cleanAll();
    });
    describe("classic usage", function () {
        it("should have a loading state on mount", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                nock("https://my-awesome-api.fake")
                    .get("/")
                    .reply(200, { oh: "my god 😍" });
                MyAwesomeComponent = function () {
                    var _a = useGet({ path: "/" }), data = _a.data, loading = _a.loading;
                    return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                };
                getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                    React.createElement(MyAwesomeComponent, null))).getByTestId;
                expect(getByTestId("loading")).toHaveTextContent("Loading…");
                return [2 /*return*/];
            });
        }); });
        it("should have data from the request after loading", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { oh: "my god 😍" });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/" }), data = _a.data, loading = _a.loading;
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("data"); })];
                    case 1:
                        _a.sent();
                        expect(getByTestId("data")).toHaveTextContent("my god 😍");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should have data from the request after loading (alternative syntax)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { oh: "my god 😍" });
                        MyAwesomeComponent = function () {
                            var _a = useGet("/"), data = _a.data, loading = _a.loading;
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("data"); })];
                    case 1:
                        _a.sent();
                        expect(getByTestId("data")).toHaveTextContent("my god 😍");
                        return [2 /*return*/];
                }
            });
        }); });
        it("shouldn't resolve after component unmount", function () { return __awaiter(void 0, void 0, void 0, function () {
            var requestResolves, pendingRequestFinishes, resolve, MyAwesomeComponent, unmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pendingRequestFinishes = new Promise(function (resolvePromise) {
                            requestResolves = resolvePromise;
                        });
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, function () { return pendingRequestFinishes; });
                        resolve = jest.fn(function (val) { return val; });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/", resolve: resolve }), data = _a.data, loading = _a.loading;
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        unmount = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null))).unmount;
                        unmount();
                        requestResolves();
                        return [4 /*yield*/, wait(function () { return expect(resolve).not.toHaveBeenCalled(); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call provider onRequest", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, onRequest;
            return __generator(this, function (_a) {
                nock("https://my-awesome-api.fake")
                    .get("/")
                    .reply(200, { oh: "my god 😍" });
                MyAwesomeComponent = function () {
                    var _a = useGet({ path: "/" }), data = _a.data, loading = _a.loading;
                    return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                };
                onRequest = jest.fn();
                render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onRequest: onRequest },
                    React.createElement(MyAwesomeComponent, null)));
                expect(onRequest).toBeCalled();
                return [2 /*return*/];
            });
        }); });
        it("should call provider onResponse", function () { return __awaiter(void 0, void 0, void 0, function () {
            var body, MyAwesomeComponent, onResponse, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { oh: "my god 😍" });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/" }), data = _a.data, loading = _a.loading;
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        onResponse = jest.fn().mockImplementation(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, response.json()];
                                    case 1:
                                        body = _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onResponse: onResponse },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("data"); })];
                    case 1:
                        _a.sent();
                        expect(onResponse).toBeCalled();
                        expect(body).toMatchObject({ oh: "my god 😍" });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("url composition", function () {
        // this follow the rules of compositions from the `url` package
        return [
            { base: "https://my-awesome-api.fake", path: "/", expected: ["https://my-awesome-api.fake", "/"] },
            { base: "https://my-awesome-api.fake", path: "/plop", expected: ["https://my-awesome-api.fake", "/plop"] },
            { base: "https://my-awesome-api.fake/plop", path: "/", expected: ["https://my-awesome-api.fake", "/plop/"] },
            { base: "https://my-awesome-api.fake/plop/", path: "/", expected: ["https://my-awesome-api.fake", "/plop/"] },
            { base: "https://my-awesome-api.fake/plop/", path: "", expected: ["https://my-awesome-api.fake", "/plop/"] },
            { base: "https://my-awesome-api.fake/plop/", path: "../", expected: ["https://my-awesome-api.fake", "/"] },
            { base: "https://my-awesome-api.fake/a", path: "/b", expected: ["https://my-awesome-api.fake", "/a/b"] },
            {
                base: "https://my-awesome-api.fake/a",
                path: "/tejas/",
                expected: ["https://my-awesome-api.fake", "/a/tejas/"],
            },
            { base: "https://my-awesome-api.fake/a/", path: "", expected: ["https://my-awesome-api.fake", "/a/"] },
        ].forEach(function (_a, i) {
            var base = _a.base, path = _a.path, expected = _a.expected;
            it("should call " + expected.join("") + "(" + i + ")", function () { return __awaiter(void 0, void 0, void 0, function () {
                var MyAwesomeComponent, getByTestId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            nock(expected[0])
                                .get(expected[1])
                                .reply(200, { oh: "my god 😍" });
                            MyAwesomeComponent = function () {
                                var _a = useGet({ path: path }), data = _a.data, loading = _a.loading;
                                return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                            };
                            getByTestId = render(React.createElement(RestfulProvider, { base: base },
                                React.createElement(MyAwesomeComponent, null))).getByTestId;
                            return [4 /*yield*/, waitForElement(function () { return getByTestId("data"); })];
                        case 1:
                            _a.sent();
                            expect(getByTestId("data")).toHaveTextContent("my god 😍");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("with error", function () {
        it("should set the `error` object properly", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(401, { message: "You shall not pass!" });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/" }), data = _a.data, loading = _a.loading, error = _a.error;
                            if (error) {
                                return React.createElement("div", { "data-testid": "error" }, error.message);
                            }
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("error"); })];
                    case 1:
                        _a.sent();
                        expect(getByTestId("error")).toHaveTextContent("Failed to fetch: 401 Unauthorized");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should handle network error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .replyWithError({ message: "You shall not pass!" });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "" }), data = _a.data, loading = _a.loading, error = _a.error;
                            if (error) {
                                return React.createElement("div", { "data-testid": "error" }, error.message);
                            }
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("error"); })];
                    case 1:
                        _a.sent();
                        expect(getByTestId("error")).toHaveTextContent("Failed to fetch: request to https://my-awesome-api.fake/ failed, reason: You shall not pass!");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should deal with non standard server error response (nginx style)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, "<html>404 - this is not a json!</html>", {
                            "content-type": "application/json",
                        });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "" }), data = _a.data, loading = _a.loading, error = _a.error;
                            if (error) {
                                return React.createElement("div", { "data-testid": "error" }, error.message);
                            }
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("error"); })];
                    case 1:
                        _a.sent();
                        expect(getByTestId("error")).toHaveTextContent("Failed to fetch: 200 OK - invalid json response body at https://my-awesome-api.fake/ reason: Unexpected token < in JSON at position 0");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the provider onError", function () { return __awaiter(void 0, void 0, void 0, function () {
            var onError, MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(401, { message: "You shall not pass!" });
                        onError = jest.fn();
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/" }), data = _a.data, loading = _a.loading, error = _a.error;
                            if (error) {
                                return React.createElement("div", { "data-testid": "error" }, error.message);
                            }
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: onError },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("error"); })];
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
            var MyAwesomeComponent, App, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(401, { message: "You shall not pass!" });
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { message: "You shall pass :)" });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "" }), data = _a.data, loading = _a.loading, error = _a.error;
                            if (error) {
                                return React.createElement("div", { "data-testid": "error" }, error.message);
                            }
                            return loading ? React.createElement("div", null, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.message);
                        };
                        App = function () {
                            var _a = __read(useState(), 2), retry = _a[0], setRetry = _a[1];
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: function (_, r) { return setRetry(function () { return r; }); } },
                                React.createElement(MyAwesomeComponent, null),
                                retry && React.createElement("button", { "data-testid": "retry", onClick: function () { return retry(); } })));
                        };
                        getByTestId = render(React.createElement(App, null)).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("retry"); })];
                    case 1:
                        _a.sent();
                        fireEvent.click(getByTestId("retry"));
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("data"); })];
                    case 2:
                        _a.sent();
                        expect(getByTestId("data")).toHaveTextContent("You shall pass :)");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should clear up the old error on refetching", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ page: 1 })
                            .reply(404, { id: 0 });
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ page: 2 })
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var _b = __read(useState(1), 2), page = _b[0], setPage = _b[1];
                            var params = useGet({ path: path, queryParams: { page: page } });
                            return (React.createElement(React.Fragment, null,
                                React.createElement("button", { "data-testid": "set-page-button", onClick: function () { return setPage(2); } }),
                                children(params)));
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "" }))).getByTestId;
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        fireEvent.click(getByTestId("set-page-button"));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(5); })];
                    case 2:
                        _a.sent();
                        expect(children.mock.calls[1][0].error).not.toEqual(null);
                        expect(children.mock.calls[4][0].loading).toEqual(false);
                        expect(children.mock.calls[4][0].data).toEqual({ id: 1 });
                        expect(children.mock.calls[4][0].error).toEqual(null);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should not call the provider onError if localErrorOnly is true", function () { return __awaiter(void 0, void 0, void 0, function () {
            var onError, MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(401, { message: "You shall not pass!" });
                        onError = jest.fn();
                        MyAwesomeComponent = function () {
                            var _a = useGet({
                                path: "",
                                localErrorOnly: true,
                            }), data = _a.data, loading = _a.loading, error = _a.error;
                            if (error) {
                                return React.createElement("div", { "data-testid": "error" }, error.message);
                            }
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.message);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", onError: onError },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("error"); })];
                    case 1:
                        _a.sent();
                        expect(onError).not.toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with custom resolver", function () {
        it("should transform data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { oh: "my god 😍" });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/", resolve: function (res) { return ({ oh: res.oh + "🎉" }); } }), data = _a.data, loading = _a.loading;
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("data"); })];
                    case 1:
                        _a.sent();
                        expect(getByTestId("data")).toHaveTextContent("my god 😍🎉");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass an error when the resolver throws a runtime error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { oh: "my god 😍" });
                        MyAwesomeComponent = function () {
                            var _a = useGet({
                                path: "/",
                                resolve: function () {
                                    throw new Error("oh no!");
                                },
                            }), data = _a.data, error = _a.error, loading = _a.loading;
                            if (error) {
                                return React.createElement("div", { "data-testid": "error" }, error.message);
                            }
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("error"); })];
                    case 1:
                        _a.sent();
                        expect(getByTestId("error")).toHaveTextContent("Failed to fetch: oh no!");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with lazy", function () {
        it("should not fetch on mount", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/", lazy: true }), data = _a.data, error = _a.error, loading = _a.loading;
                            return children({ data: data, error: error, loading: loading });
                        };
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null)));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(1); })];
                    case 1:
                        _a.sent();
                        expect(children).toHaveBeenCalledWith({ data: null, error: null, loading: false });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with base", function () {
        it("should override the base url", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { oh: "my god 😍" });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/", base: "https://my-awesome-api.fake" }), data = _a.data, loading = _a.loading;
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https:/not-here.fake" },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("data"); })];
                    case 1:
                        _a.sent();
                        expect(getByTestId("data")).toHaveTextContent("my god 😍");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override the base url and compose with the path", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/plop")
                            .reply(200, { oh: "my god 😍" });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/plop", base: "https://my-awesome-api.fake" }), data = _a.data, loading = _a.loading;
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https:/not-here.fake" },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("data"); })];
                    case 1:
                        _a.sent();
                        expect(getByTestId("data")).toHaveTextContent("my god 😍");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with custom request options", function () {
        it("should add a custom header", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", { reqheaders: { foo: "bar" } })
                            .get("/")
                            .reply(200, { oh: "my god 😍" });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/", requestOptions: { headers: { foo: "bar" } } }), data = _a.data, loading = _a.loading;
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("data"); })];
                    case 1:
                        _a.sent();
                        expect(getByTestId("data")).toHaveTextContent("my god 😍");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should merge headers with providers", function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyAwesomeComponent, getByTestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake", {
                            reqheaders: { foo: "bar", bar: "foo", visitUrl: "https://my-awesome-api.fake/", visitMethod: "GET" },
                        })
                            .get("/")
                            .reply(200, { oh: "my god 😍" });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/", requestOptions: { headers: { foo: "bar" } } }), data = _a.data, loading = _a.loading;
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        getByTestId = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", requestOptions: function (url, method) {
                                return { headers: { bar: "foo", visitUrl: url, visitMethod: method } };
                            } },
                            React.createElement(MyAwesomeComponent, null))).getByTestId;
                        return [4 /*yield*/, waitForElement(function () { return getByTestId("data"); })];
                    case 1:
                        _a.sent();
                        expect(getByTestId("data")).toHaveTextContent("my god 😍");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("actions", function () {
        it("should refetch", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function () {
                            var params = useGet({ path: "/" });
                            return children(params);
                        };
                        // initial fetch
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null)));
                        expect(children.mock.calls[0][0].loading).toEqual(true);
                        expect(children.mock.calls[0][0].data).toEqual(null);
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0].loading).toEqual(false);
                        expect(children.mock.calls[1][0].data).toEqual({ id: 1 });
                        // refetch
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { id: 2 });
                        children.mock.calls[1][0].refetch();
                        return [4 /*yield*/, wait(function () { return expect(children).toHaveBeenCalledTimes(4); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[2][0].loading).toEqual(true);
                        expect(children.mock.calls[2][0].data).toEqual({ id: 1 });
                        // after refetch state
                        expect(children.mock.calls[3][0].loading).toEqual(false);
                        expect(children.mock.calls[3][0].data).toEqual({ id: 2 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should refetch with custom options", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function () {
                            var params = useGet({ path: "/" });
                            return children(params);
                        };
                        // initial fetch
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null)));
                        expect(children.mock.calls[0][0].loading).toEqual(true);
                        expect(children.mock.calls[0][0].data).toEqual(null);
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0].loading).toEqual(false);
                        expect(children.mock.calls[1][0].data).toEqual({ id: 1 });
                        // refetch
                        nock("https://my-awesome-api.fake")
                            .get("/plop")
                            .reply(200, { id: 2 });
                        children.mock.calls[1][0].refetch({ path: "/plop" });
                        return [4 /*yield*/, wait(function () { return expect(children).toHaveBeenCalledTimes(4); })];
                    case 2:
                        _a.sent();
                        // transition state
                        expect(children.mock.calls[2][0].loading).toEqual(true);
                        expect(children.mock.calls[2][0].data).toEqual({ id: 1 });
                        // after refetch state
                        expect(children.mock.calls[3][0].loading).toEqual(false);
                        expect(children.mock.calls[3][0].data).toEqual({ id: 2 });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with debounce", function () {
        it("should call the API only 1 time", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, children, MyAwesomeComponent, rerender;
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
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var params = useGet({ path: path, debounce: true });
                            return children(params);
                        };
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "?test=1" }))).rerender;
                        times(10, function (i) {
                            return rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                                React.createElement(MyAwesomeComponent, { path: "?test=" + (i + 1) })));
                        });
                        return [4 /*yield*/, wait(function () { return expect(apiCalls).toEqual(1); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call the API only 10 times without debounce", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, children, MyAwesomeComponent, rerender;
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
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var params = useGet({ path: path });
                            return children(params);
                        };
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "?test=1" }))).rerender;
                        times(10, function (i) {
                            return rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                                React.createElement(MyAwesomeComponent, { path: "?test=" + (i + 1) })));
                        });
                        return [4 /*yield*/, wait(function () { return expect(apiCalls).toEqual(10); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should cancel the debounce on unmount", function () { return __awaiter(void 0, void 0, void 0, function () {
            var resolve, MyAwesomeComponent, unmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, function () { return ({ oh: "yeah" }); });
                        resolve = jest.fn(function (val) { return val; });
                        MyAwesomeComponent = function () {
                            var _a = useGet({ path: "/", resolve: resolve, debounce: true }), data = _a.data, loading = _a.loading;
                            return loading ? React.createElement("div", { "data-testid": "loading" }, "Loading\u2026") : React.createElement("div", { "data-testid": "data" }, data === null || data === void 0 ? void 0 : data.oh);
                        };
                        unmount = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null))).unmount;
                        unmount();
                        return [4 /*yield*/, new Promise(function (res) {
                                setTimeout(res, 100);
                            })];
                    case 1:
                        _a.sent();
                        expect(resolve).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("refetch after provider props update", function () {
        it("should refetch when base changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var firstAPI, secondAPI, children, MyAwesomeComponent, rerender;
            return __generator(this, function (_a) {
                firstAPI = nock("https://my-awesome-api.fake")
                    .get("/")
                    .reply(200, { id: 1 });
                secondAPI = nock("https://my-new-api.fake")
                    .get("/")
                    .reply(200, { id: 2 });
                children = jest.fn();
                children.mockReturnValue(React.createElement("div", null));
                MyAwesomeComponent = function (_a) {
                    var path = _a.path;
                    var params = useGet({ path: path });
                    return children(params);
                };
                rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                    React.createElement(MyAwesomeComponent, { path: "" }))).rerender;
                rerender(React.createElement(RestfulProvider, { base: "https://my-new-api.fake" },
                    React.createElement(MyAwesomeComponent, { path: "" })));
                expect(firstAPI.isDone()).toBeTruthy();
                expect(secondAPI.isDone()).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        it("should refetch when parentPath changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, children, MyAwesomeComponent, rerender;
            return __generator(this, function (_a) {
                apiCalls = 0;
                nock("https://my-awesome-api.fake")
                    .get("/")
                    .reply(200, function () { return ++apiCalls; });
                children = jest.fn();
                children.mockReturnValue(React.createElement("div", null));
                MyAwesomeComponent = function (_a) {
                    var path = _a.path;
                    var params = useGet({ path: path });
                    return children(params);
                };
                rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                    React.createElement(MyAwesomeComponent, { path: "" }))).rerender;
                rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", parentPath: "parent" },
                    React.createElement(MyAwesomeComponent, { path: "" })));
                expect(apiCalls).toEqual(2);
                return [2 /*return*/];
            });
        }); });
        it("should refetch when queryParams change", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { id: 0 });
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ page: 2 })
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var params = useGet({ path: path });
                            return children(params);
                        };
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", queryParams: { page: 1 } },
                            React.createElement(MyAwesomeComponent, { path: "" }))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", queryParams: { page: 2 } },
                            React.createElement(MyAwesomeComponent, { path: "" })));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(3); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[2][0].loading).toEqual(false);
                        expect(children.mock.calls[2][0].data).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should refetch when requestOptions change", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .matchHeader("header1", "value1")
                            .reply(200, { id: 0 });
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .matchHeader("header2", "value2")
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var params = useGet({ path: path });
                            return children(params);
                        };
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", requestOptions: function () { return ({ headers: { header1: "value1" } }); } },
                            React.createElement(MyAwesomeComponent, { path: "" }))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake", requestOptions: function () { return ({ headers: { header2: "value2" } }); } },
                            React.createElement(MyAwesomeComponent, { path: "" })));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(4); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[3][0].loading).toEqual(false);
                        expect(children.mock.calls[3][0].data).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("refetch after useGet props update", function () {
        it("should not refetch when base, path or resolve don't change", function () {
            var apiCalls = 0;
            nock("https://my-awesome-api.fake")
                .get("/")
                .reply(200, function () { return ++apiCalls; })
                .persist();
            var children = jest.fn();
            children.mockReturnValue(React.createElement("div", null));
            var MyAwesomeComponent = function (_a) {
                var path = _a.path;
                var params = useGet({ path: path });
                return children(params);
            };
            var rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                React.createElement(MyAwesomeComponent, { path: "" }))).rerender;
            rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                React.createElement(MyAwesomeComponent, { path: "" })));
            expect(apiCalls).toEqual(1);
        });
        it("should refetch when path changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var firstAPI, secondAPI, children, MyAwesomeComponent, rerender;
            return __generator(this, function (_a) {
                firstAPI = nock("https://my-awesome-api.fake")
                    .get("/")
                    .reply(200, { id: 1 });
                secondAPI = nock("https://my-new-api.fake")
                    .get("/plop")
                    .reply(200, { id: 2 });
                children = jest.fn();
                children.mockReturnValue(React.createElement("div", null));
                MyAwesomeComponent = function (_a) {
                    var path = _a.path;
                    var params = useGet({ path: path });
                    return children(params);
                };
                rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                    React.createElement(MyAwesomeComponent, { path: "" }))).rerender;
                rerender(React.createElement(RestfulProvider, { base: "https://my-new-api.fake" },
                    React.createElement(MyAwesomeComponent, { path: "plop" })));
                expect(firstAPI.isDone()).toBeTruthy();
                expect(secondAPI.isDone()).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        it("should refetch when resolve changes", function () {
            var apiCalls = 0;
            nock("https://my-awesome-api.fake")
                .get("/")
                .reply(200, function () { return ++apiCalls; })
                .persist();
            var children = jest.fn();
            children.mockReturnValue(React.createElement("div", null));
            var MyAwesomeComponent = function (_a) {
                var path = _a.path, resolve = _a.resolve;
                var params = useGet({ path: path, resolve: resolve });
                return children(params);
            };
            var rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                React.createElement(MyAwesomeComponent, { path: "", resolve: function () { return ({ id: 1 }); } }))).rerender;
            rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                React.createElement(MyAwesomeComponent, { path: "", resolve: function () { return ({ id: 2 }); } })));
            expect(apiCalls).toBe(2);
        });
        it("should not refetch when resolve is the same", function () {
            var apiCalls = 0;
            nock("https://my-awesome-api.fake")
                .get("/")
                .reply(200, function () { return ++apiCalls; })
                .persist();
            var children = jest.fn();
            children.mockReturnValue(React.createElement("div", null));
            var MyAwesomeComponent = function (_a) {
                var path = _a.path, resolve = _a.resolve;
                var params = useGet({ path: path, resolve: resolve });
                return children(params);
            };
            var rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                React.createElement(MyAwesomeComponent, { path: "", resolve: function () { return ({ id: 1 }); } }))).rerender;
            rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                React.createElement(MyAwesomeComponent, { path: "", resolve: function () { return ({ id: 1 }); } })));
            expect(apiCalls).toBe(1);
        });
        it("should refetch when queryParams changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent, rerender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .reply(200, { id: 0 });
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ page: 2 })
                            .reply(200, { id: 1 });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path, queryParams = _a.queryParams;
                            var params = useGet({ path: path, queryParams: queryParams });
                            return children(params);
                        };
                        rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "", queryParams: { page: 1 } }))).rerender;
                        rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "", queryParams: { page: 2 } })));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(3); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[2][0].loading).toEqual(false);
                        expect(children.mock.calls[2][0].data).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should not refetch when queryParams are the same", function () {
            var apiCalls = 0;
            nock("https://my-awesome-api.fake")
                .get("/")
                .query({ page: 2 })
                .reply(200, function () { return ++apiCalls; })
                .persist();
            var children = jest.fn();
            children.mockReturnValue(React.createElement("div", null));
            var MyAwesomeComponent = function (_a) {
                var path = _a.path, queryParams = _a.queryParams;
                var params = useGet({ path: path, queryParams: queryParams });
                return children(params);
            };
            var rerender = render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                React.createElement(MyAwesomeComponent, { path: "", queryParams: { page: 2 } }))).rerender;
            rerender(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                React.createElement(MyAwesomeComponent, { path: "", queryParams: { page: 2 } })));
            expect(apiCalls).toBe(1);
        });
    });
    describe("with queryParams", function () {
        it("should call the correct endpoint", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ page: 2 })
                            .reply(200, function () { return ({ id: 42 }); })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path, queryParams = _a.queryParams;
                            var params = useGet({ path: path, queryParams: queryParams });
                            return children(params);
                        };
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "", queryParams: { page: 2 } })));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0].loading).toEqual(false);
                        expect(children.mock.calls[1][0].data).toEqual({ id: 42 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should inherit global queryParams if none specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ apiKey: "unsafe-as-heck" })
                            .reply(200, function () { return ({ authenticated: true }); })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var params = useGet({ path: path });
                            return children(params);
                        };
                        render(React.createElement(RestfulProvider, { queryParams: { apiKey: "unsafe-as-heck" }, base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "" })));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0].loading).toEqual(false);
                        expect(children.mock.calls[1][0].data).toEqual({ authenticated: true });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override global queryParams if own queryParams are specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ apiKey: "safer" })
                            .reply(200, function () { return ({ authenticated: true }); })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var params = useGet({ path: path, queryParams: { apiKey: "safer" } });
                            return children(params);
                        };
                        render(React.createElement(RestfulProvider, { queryParams: { apiKey: "unsafe-as-heck" }, base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "" })));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0].loading).toEqual(false);
                        expect(children.mock.calls[1][0].data).toEqual({ authenticated: true });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should merge global queryParams if both queryParams are specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ apiKey: "unsafe-as-heck", cheese: "nice" })
                            .reply(200, function () { return ({ authenticated: true }); })
                            .persist();
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var params = useGet({ path: path, queryParams: { cheese: "nice" } });
                            return children(params);
                        };
                        render(React.createElement(RestfulProvider, { queryParams: { apiKey: "unsafe-as-heck" }, base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "" })));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0].loading).toEqual(false);
                        expect(children.mock.calls[1][0].data).toEqual({ authenticated: true });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("querystring custom params", function () {
        it("should parse the querystring regarding the options", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query(function (i) {
                            return i["anArray[]"] === "nice";
                        })
                            .reply(200, function () { return ({ id: 42 }); });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var params = useGet({
                                path: path,
                                queryParams: { anArray: ["nice"] },
                                queryParamStringifyOptions: { arrayFormat: "brackets" },
                            });
                            return children(params);
                        };
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "" })));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0].loading).toEqual(false);
                        expect(children.mock.calls[1][0].data).toEqual({ id: 42 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should inherit global queryParamStringifyOptions if none specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query(function (i) {
                            return i["anArray[]"] === "nice";
                        })
                            .reply(200, function () { return ({ id: 42 }); });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var params = useGet({
                                path: path,
                                queryParams: { anArray: ["nice"] },
                            });
                            return children(params);
                        };
                        render(React.createElement(RestfulProvider, { queryParamStringifyOptions: { arrayFormat: "brackets" }, base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "" })));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0].loading).toEqual(false);
                        expect(children.mock.calls[1][0].data).toEqual({ id: 42 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override global queryParamStringifyOptions if own queryParamStringifyOptions are specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query(function (i) {
                            return i["anArray"] === "foo,bar";
                        })
                            .reply(200, function () { return ({ id: 42 }); });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var params = useGet({
                                path: path,
                                queryParams: { anArray: ["foo", "bar"] },
                                queryParamStringifyOptions: { arrayFormat: "comma" },
                            });
                            return children(params);
                        };
                        render(React.createElement(RestfulProvider, { queryParamStringifyOptions: { arrayFormat: "brackets" }, base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "" })));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0].loading).toEqual(false);
                        expect(children.mock.calls[1][0].data).toEqual({ id: 42 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should merge global queryParamStringifyOptions if both queryParamStringifyOptions are specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/?anArray[]=nice;foo=bar")
                            .reply(200, function () { return ({ id: 42 }); });
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function (_a) {
                            var path = _a.path;
                            var params = useGet({
                                path: path,
                                queryParams: { anArray: ["nice"], foo: "bar" },
                                queryParamStringifyOptions: { delimiter: ";" },
                            });
                            return children(params);
                        };
                        render(React.createElement(RestfulProvider, { queryParamStringifyOptions: { arrayFormat: "brackets" }, base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, { path: "" })));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0].loading).toEqual(false);
                        expect(children.mock.calls[1][0].data).toEqual({ id: 42 });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("generation pattern", function () {
        it("should call the correct endpoint", function () { return __awaiter(void 0, void 0, void 0, function () {
            var useGetMyCustomEndpoint, children, MyAwesomeComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/")
                            .query({ page: 2 })
                            .reply(200, function () { return ({ id: 42 }); });
                        useGetMyCustomEndpoint = function (props) {
                            return useGet("/", props);
                        };
                        children = jest.fn();
                        children.mockReturnValue(React.createElement("div", null));
                        MyAwesomeComponent = function () {
                            var res = useGetMyCustomEndpoint({ queryParams: { page: 2 } });
                            return children(res);
                        };
                        render(React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" },
                            React.createElement(MyAwesomeComponent, null)));
                        return [4 /*yield*/, wait(function () { return expect(children).toBeCalledTimes(2); })];
                    case 1:
                        _a.sent();
                        expect(children.mock.calls[1][0].loading).toEqual(false);
                        expect(children.mock.calls[1][0].data).toEqual({ id: 42 });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with pathParams", function () {
        it("should resolve path parameters if specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/plop/one")
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () {
                            return useGet(function (_a) {
                                var id = _a.id;
                                return "plop/" + id;
                            }, {
                                pathParams: { id: "two" },
                                lazy: true,
                            });
                        }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.refetch({ pathParams: { id: "one" } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, wait(function () {
                                return expect(result.current).toMatchObject({
                                    error: null,
                                    loading: false,
                                });
                            })];
                    case 2:
                        _a.sent();
                        expect(result.current.data).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should override path parameters if specified in refetch method", function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock("https://my-awesome-api.fake")
                            .get("/plop/one")
                            .reply(200, { id: 1 });
                        wrapper = function (_a) {
                            var children = _a.children;
                            return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                        };
                        result = renderHook(function () {
                            return useGet(function (_a) {
                                var id = _a.id;
                                return "plop/" + id;
                            }, {
                                pathParams: { id: "two" },
                                lazy: true,
                            });
                        }, {
                            wrapper: wrapper,
                        }).result;
                        return [4 /*yield*/, result.current.refetch({ pathParams: { id: "one" } })];
                    case 1:
                        _a.sent();
                        expect(result.current).toMatchObject({
                            error: null,
                            loading: false,
                        });
                        expect(result.current.data).toEqual({ id: 1 });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("with mock", function () {
        it("should not call the api and return the mock", function () { return __awaiter(void 0, void 0, void 0, function () {
            var apiCalls, wrapper, result;
            return __generator(this, function (_a) {
                apiCalls = 0;
                nock("https://my-awesome-api.fake")
                    .get("/plop/one")
                    .reply(200, function () {
                    apiCalls++;
                    return { id: 1 };
                });
                wrapper = function (_a) {
                    var children = _a.children;
                    return (React.createElement(RestfulProvider, { base: "https://my-awesome-api.fake" }, children));
                };
                result = renderHook(function () {
                    return useGet(function (_a) {
                        var id = _a.id;
                        return "plop/" + id;
                    }, {
                        pathParams: { id: "one" },
                        mock: {
                            data: { id: 2 },
                            loading: false,
                        },
                    });
                }, {
                    wrapper: wrapper,
                }).result;
                expect(result.current).toMatchObject({
                    error: null,
                    loading: false,
                    data: { id: 2 },
                });
                expect(apiCalls).toBe(0);
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlR2V0LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlR2V0LnRlc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLHlDQUF5QyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUYsT0FBTyxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFDakMsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUdsRCxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3RCLHVGQUF1RjtJQUN2Riw0QkFBNEI7SUFDNUIsSUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzNDLFVBQVUsQ0FBQztRQUNULE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUNILFNBQVMsQ0FBQztRQUNSLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7UUFDckMsT0FBTyxFQUFFLENBQUM7UUFDVixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZUFBZSxFQUFFO1FBQ3hCLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTs7O2dCQUN6QyxJQUFJLENBQUMsNkJBQTZCLENBQUM7cUJBQ2hDLEdBQUcsQ0FBQyxHQUFHLENBQUM7cUJBQ1IsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFB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