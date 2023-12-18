const fs = require("fs")
const path = require("path")
const yargs = require("yargs")

const toPascalCase = (str) => {
	return str
	  .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => word.toUpperCase())
	  .replace(/[\s\-]/g, "")
}

const argv = yargs
	.usage("Usage: $0 <componentName> [options]")
	.demandCommand(1, "Please provide a component name.")
	.option("type", {
		alias: "t",
		describe: "Component type (atom, molecule, organism)",
		default: null
	})
	.argv

const componentName = argv._[0]
const pascalComponentName = toPascalCase(componentName)
let componentType = ""

if (argv.type && ["atom", "molecule", "organism"].includes(argv.type)) {
	componentType = argv.type + "s"
}

const componentPath = path.join("src", "lib", "components", componentType ?? "", componentName)

const componentContent = `import type { ReactElement } from "react"
import type { ${pascalComponentName}Props } from "."

export const ${pascalComponentName} = ({}: ${pascalComponentName}Props): ReactElement => {
	return (
		<></>
	)
}`

const typeContent = `export type ${pascalComponentName}Props = {

}`

const indexContent = `export { ${pascalComponentName} } from "./${componentName}"
export type { ${pascalComponentName}Props } from "./${componentName}.type"`

fs.mkdirSync(componentPath)

fs.writeFileSync(path.join(componentPath, `${componentName}.tsx`), componentContent)
fs.writeFileSync(path.join(componentPath, `${componentName}.type.ts`), typeContent)
fs.writeFileSync(path.join(componentPath, "index.ts"), indexContent)

console.log(`Component ${componentName} created at ${componentPath}.`)