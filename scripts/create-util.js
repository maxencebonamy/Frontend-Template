const fs = require("fs")
const path = require("path")
const yargs = require("yargs")

const argv = yargs
	.usage("Usage: $0 <utilName>")
	.demandCommand(1, "Please provide a util name.")
	.argv

const utilName = argv._[0]

const utilPath = path.join("src", "lib", "utils", utilName)

try {
	fs.mkdirSync(utilPath)
} catch (e) {
	console.error(`Util ${utilName} already exists at ${utilPath}.`)
	process.exit(1)
}

fs.writeFileSync(path.join(utilPath, `${utilName}.util.ts`), "")
fs.writeFileSync(path.join(utilPath, `${utilName}.type.ts`), "")
fs.writeFileSync(path.join(utilPath, "index.ts"), "")

console.log(`Util ${utilName} created at ${utilPath}.`)