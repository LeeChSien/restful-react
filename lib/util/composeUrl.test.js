import { composePath, composeUrl } from "./composeUrl";
describe("compose paths and urls", function () {
    it("should handle empty parentPath with absolute path", function () {
        var parentPath = "";
        var path = "/absolute";
        expect(composePath(parentPath, path)).toBe("/absolute");
        var base = "https://my-awesome-api.fake";
        expect(composeUrl(base, parentPath, path)).toBe("https://my-awesome-api.fake/absolute");
        var baseWithSubpath = "https://my-awesome-api.fake/MY_SUBROUTE";
        expect(composeUrl(baseWithSubpath, parentPath, path)).toBe("https://my-awesome-api.fake/MY_SUBROUTE/absolute");
    });
    it("should handle empty parentPath with relative path", function () {
        var parentPath = "";
        var path = "relative";
        expect(composePath(parentPath, path)).toBe("/relative");
        var base = "https://my-awesome-api.fake";
        expect(composeUrl(base, parentPath, path)).toBe("https://my-awesome-api.fake/relative");
        var baseWithSubpath = "https://my-awesome-api.fake/MY_SUBROUTE";
        expect(composeUrl(baseWithSubpath, parentPath, path)).toBe("https://my-awesome-api.fake/MY_SUBROUTE/relative");
    });
    it("should ignore empty string from path", function () {
        var parentPath = "/someBasePath";
        var path = "";
        expect(composePath(parentPath, path)).toBe("/someBasePath");
        var base = "https://my-awesome-api.fake";
        expect(composeUrl(base, parentPath, path)).toBe("https://my-awesome-api.fake/someBasePath");
        var baseWithSubpath = "https://my-awesome-api.fake/MY_SUBROUTE";
        expect(composeUrl(baseWithSubpath, parentPath, path)).toBe("https://my-awesome-api.fake/MY_SUBROUTE/someBasePath");
    });
    it("should ignore lone forward slash from path", function () {
        var parentPath = "/someBasePath";
        var path = "/";
        expect(composePath(parentPath, path)).toBe("/someBasePath");
        var base = "https://my-awesome-api.fake";
        expect(composeUrl(base, parentPath, path)).toBe("https://my-awesome-api.fake/someBasePath");
        var baseWithSubpath = "https://my-awesome-api.fake/MY_SUBROUTE";
        expect(composeUrl(baseWithSubpath, parentPath, path)).toBe("https://my-awesome-api.fake/MY_SUBROUTE/someBasePath");
    });
    it("should not include parentPath value when path is absolute", function () {
        var parentPath = "/someBasePath";
        var path = "/absolute";
        expect(composePath(parentPath, path)).toBe("/absolute");
        var base = "https://my-awesome-api.fake";
        expect(composeUrl(base, parentPath, path)).toBe("https://my-awesome-api.fake/absolute");
        var baseWithSubpath = "https://my-awesome-api.fake/MY_SUBROUTE";
        expect(composeUrl(baseWithSubpath, parentPath, path)).toBe("https://my-awesome-api.fake/MY_SUBROUTE/absolute");
    });
    it("should include parentPath value when path is relative", function () {
        var parentPath = "/someBasePath";
        var path = "relative";
        expect(composePath(parentPath, path)).toBe("/someBasePath/relative");
        var base = "https://my-awesome-api.fake";
        expect(composeUrl(base, parentPath, path)).toBe("https://my-awesome-api.fake/someBasePath/relative");
        var baseWithSubpath = "https://my-awesome-api.fake/MY_SUBROUTE";
        expect(composeUrl(baseWithSubpath, parentPath, path)).toBe("https://my-awesome-api.fake/MY_SUBROUTE/someBasePath/relative");
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZVVybC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvY29tcG9zZVVybC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZELFFBQVEsQ0FBQyx3QkFBd0IsRUFBRTtJQUNqQyxFQUFFLENBQUMsbURBQW1ELEVBQUU7UUFDdEQsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV4RCxJQUFNLElBQUksR0FBRyw2QkFBNkIsQ0FBQztRQUMzQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUV4RixJQUFNLGVBQWUsR0FBRyx5Q0FBeUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0RBQWtELENBQUMsQ0FBQztJQUNqSCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtRQUN0RCxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXhELElBQU0sSUFBSSxHQUFHLDZCQUE2QixDQUFDO1FBQzNDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJ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