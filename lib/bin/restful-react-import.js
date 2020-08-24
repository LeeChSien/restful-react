import { __awaiter, __generator, __read } from "tslib";
import chalk from "chalk";
import program from "commander";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import inquirer from "inquirer";
import difference from "lodash/difference";
import { join, parse } from "path";
import request from "request";
import { homedir } from "os";
import slash from "slash";
import importOpenApi from "../scripts/import-open-api";
var log = console.log; // tslint:disable-line:no-console
program.option("-o, --output [value]", "output file destination");
program.option("-f, --file [value]", "input file (yaml or json openapi specs)");
program.option("-u, --url [value]", "url to spec (yaml or json openapi specs)");
program.option("-g, --github [value]", "github path (format: `owner:repo:branch:path`)");
program.option("-t, --transformer [value]", "transformer function path");
program.option("--validation", "add the validation step (provided by ibm-openapi-validator)");
program.option("--config [value]", "override flags by a config file");
program.parse(process.argv);
var createSuccessMessage = function (backend) {
    return chalk.green((backend ? "[" + backend + "] " : "") + "\uD83C\uDF89  Your OpenAPI spec has been converted into ready to use restful-react components!");
};
var successWithoutOutputMessage = chalk.yellow("Success! No output path specified; printed to standard output.");
var importSpecs = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var transformer, data, ext, format, url_1, urlSpecReq_1, github_1, accessToken, githubTokenPath_1, answers, _a, owner, repo, branch, path, githubSpecReq_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                transformer = options.transformer ? require(join(process.cwd(), options.transformer)) : undefined;
                if (!options.file && !options.url && !options.github) {
                    throw new Error("You need to provide an input specification with `--file`, '--url', or `--github`");
                }
                if (!options.file) return [3 /*break*/, 1];
                data = readFileSync(join(process.cwd(), options.file), "utf-8");
                ext = parse(options.file).ext;
                format = [".yaml", ".yml"].includes(ext.toLowerCase()) ? "yaml" : "json";
                return [2 /*return*/, importOpenApi({
                        data: data,
                        format: format,
                        transformer: transformer,
                        validation: options.validation,
                        customImport: options.customImport,
                        customProps: options.customProps,
                        customGenerator: options.customGenerator,
                    })];
            case 1:
                if (!options.url) return [3 /*break*/, 2];
                url_1 = options.url;
                urlSpecReq_1 = {
                    method: "GET",
                    url: url_1,
                    headers: {
                        "user-agent": "restful-react-importer",
                    },
                };
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        request(urlSpecReq_1, function (error, response, body) { return __awaiter(void 0, void 0, void 0, function () {
                            var format;
                            return __generator(this, function (_a) {
                                if (error) {
                                    return [2 /*return*/, reject(error)];
                                }
                                format = "yaml";
                                if (url_1.endsWith(".json") || response.headers["content-type"] === "application/json") {
                                    format = "json";
                                }
                                resolve(importOpenApi({
                                    data: body,
                                    format: format,
                                    transformer: transformer,
                                    validation: options.validation,
                                    customImport: options.customImport,
                                    customProps: options.customProps,
                                    customGenerator: options.customGenerator,
                                }));
                                return [2 /*return*/];
                            });
                        }); });
                    })];
            case 2:
                if (!options.github) return [3 /*break*/, 6];
                github_1 = options.github;
                accessToken = void 0;
                githubTokenPath_1 = join(homedir(), ".restful-react");
                if (!existsSync(githubTokenPath_1)) return [3 /*break*/, 3];
                accessToken = readFileSync(githubTokenPath_1, "utf-8");
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, inquirer.prompt([
                    {
                        type: "input",
                        name: "githubToken",
                        message: "Please provide a GitHub token with `repo` rules checked ( https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line )",
                    },
                    {
                        type: "confirm",
                        name: "saveToken",
                        message: "Would you like to store your token for the next time? (stored in your " + slash(githubTokenPath_1) + ")",
                    },
                ])];
            case 4:
                answers = _b.sent();
                if (answers.saveToken) {
                    writeFileSync(githubTokenPath_1, answers.githubToken);
                }
                accessToken = answers.githubToken;
                _b.label = 5;
            case 5:
                _a = __read(github_1.split(":"), 4), owner = _a[0], repo = _a[1], branch = _a[2], path = _a[3];
                githubSpecReq_1 = {
                    method: "POST",
                    url: "https://api.github.com/graphql",
                    headers: {
                        "content-type": "application/json",
                        "user-agent": "restful-react-importer",
                        authorization: "bearer " + accessToken,
                    },
                    body: JSON.stringify({
                        query: "query {\n          repository(name: \"" + repo + "\", owner: \"" + owner + "\") {\n            object(expression: \"" + branch + ":" + path + "\") {\n              ... on Blob {\n                text\n              }\n            }\n          }\n        }",
                    }),
                };
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        request(githubSpecReq_1, function (error, _, rawBody) { return __awaiter(void 0, void 0, void 0, function () {
                            var body, answers, format;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (error) {
                                            return [2 /*return*/, reject(error)];
                                        }
                                        body = JSON.parse(rawBody);
                                        if (!!body.data) return [3 /*break*/, 3];
                                        if (!(body.message === "Bad credentials")) return [3 /*break*/, 2];
                                        return [4 /*yield*/, inquirer.prompt([
                                                {
                                                    type: "confirm",
                                                    name: "removeToken",
                                                    message: "Your token doesn't have the correct permissions, should we remove it?",
                                                },
                                            ])];
                                    case 1:
                                        answers = _a.sent();
                                        if (answers.removeToken) {
                                            unlinkSync(githubTokenPath_1);
                                        }
                                        _a.label = 2;
                                    case 2: return [2 /*return*/, reject(body.message)];
                                    case 3:
                                        format = github_1.toLowerCase().includes(".yaml") || github_1.toLowerCase().includes(".yml") ? "yaml" : "json";
                                        resolve(importOpenApi({
                                            data: body.data.repository.object.text,
                                            format: format,
                                            transformer: transformer,
                                            validation: options.validation,
                                            customImport: options.customImport,
                                            customProps: options.customProps,
                                            customGenerator: options.customGenerator,
                                        }));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            case 6: return [2 /*return*/, Promise.reject("Please provide a file (--file), a url (--url), or a github (--github) input")];
        }
    });
}); };
if (program.config) {
    // Use config file as configuration (advanced usage)
    // tslint:disable-next-line: no-var-requires
    var config = require(join(process.cwd(), program.config));
    var mismatchArgs = difference(program.args, Object.keys(config));
    if (mismatchArgs.length) {
        log(chalk.yellow(mismatchArgs.join(", ") + " " + (mismatchArgs.length === 1 ? "is" : "are") + " not defined in your configuration!"));
    }
    Object.entries(config)
        .filter(function (_a) {
        var _b = __read(_a, 1), backend = _b[0];
        return (program.args.length === 0 ? true : program.args.includes(backend));
    })
        .forEach(function (_a) {
        var _b = __read(_a, 2), backend = _b[0], options = _b[1];
        importSpecs(options)
            .then(function (data) {
            if (options.output) {
                writeFileSync(join(process.cwd(), options.output), data);
                log(createSuccessMessage(backend));
            }
            else {
                log(data);
                log(successWithoutOutputMessage);
            }
        })
            .catch(function (err) {
            log(chalk.red(err));
            process.exit(1);
        });
    });
}
else {
    // Use flags as configuration
    importSpecs(program)
        .then(function (data) {
        if (program.output) {
            writeFileSync(join(process.cwd(), program.output), data);
            log(createSuccessMessage());
        }
        else {
            log(data);
            log(successWithoutOutputMessage);
        }
    })
        .catch(function (err) {
        log(chalk.red(err));
        process.exit(1);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGZ1bC1yZWFjdC1pbXBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluL3Jlc3RmdWwtcmVhY3QtaW1wb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDekUsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25DLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQzdCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixPQUFPLGFBQWEsTUFBTSw0QkFBNEIsQ0FBQztBQUd2RCxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsaUNBQWlDO0FBZ0MxRCxPQUFPLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFDbEUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ2hGLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsMENBQTBDLENBQUMsQ0FBQztBQUNoRixPQUFPLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLGdEQUFnRCxDQUFDLENBQUM7QUFDekYsT0FBTyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0FBQ3pFLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLDZEQUE2RCxDQUFDLENB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