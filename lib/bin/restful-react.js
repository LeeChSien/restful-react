import program from "commander";
import { readFileSync } from "fs";
import { join } from "path";
var version = JSON.parse(readFileSync(join(__dirname, "../../package.json"), "utf-8")).version;
program
    .version(version)
    .command("import [open-api-file]", "generate restful-react type-safe components from OpenAPI specs")
    .parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGZ1bC1yZWFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vcmVzdGZ1bC1yZWFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxXQUFXLENBQUM7QUFDaEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLElBQUksQ0FBQztBQUNsQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBCLElBQUEsT0FBTyxHQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUE3RSxDQUE4RTtBQUU3RixPQUFPO0tBQ0osT0FBTyxDQUFDLE9BQU8sQ0FBQztLQUNoQixPQUFPLENBQUMsd0JBQXdCLEVBQUUsZ0VBQWdFLENBQUM7S0FDbkcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9