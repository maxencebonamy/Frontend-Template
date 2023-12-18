const fs = require("fs")
const path = require("path")
const yargs = require("yargs")

const argv = yargs
	.usage("Usage: $0 <hookName>")
	.demandCommand(1, "Please provide a hook name.")
	.argv

const hookName = argv._[0]

const hookPath = path.join("src", "lib", "hooks", hookName)

try {
	fs.mkdirSync(hookPath)
} catch (e) {
	console.error(`Hook ${hookName} already exists at ${hookPath}.`)
	process.exit(1)
}

fs.writeFileSync(path.join(hookPath, `${hookName}.hook.ts`), "")
fs.writeFileSync(path.join(hookPath, `${hookName}.type.ts`), "")
fs.writeFileSync(path.join(hookPath, "index.ts"), "")

console.log(`Hook ${hookName} created at ${hookPath}.`)