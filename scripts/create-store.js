const fs = require("fs")
const path = require("path")
const yargs = require("yargs")

const toPascalCase = (str) => {
	return str
	  .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => word.toUpperCase())
	  .replace(/[\s\-]/g, "")
}

const toCamelCase = (str) => {
	return str
	  .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
	  .replace(/[\s\-]/g, "")
}

const argv = yargs
	.usage("Usage: $0 <storeName>")
	.demandCommand(1, "Please provide a store name.")
	.argv

const storeName = argv._[0]
const pascalStoreName = toPascalCase(storeName)
const camelStoreName = toCamelCase(storeName)

const storePath = path.join("src", "lib", "stores", storeName)

const storeContent = `import { create } from "zustand"
import type { ${pascalStoreName}Type, ${pascalStoreName}State } from "."

export const use${pascalStoreName}Store = create<${pascalStoreName}State>()(set => ({
	${camelStoreName}: null,
	set${pascalStoreName}: (${camelStoreName}: ${pascalStoreName}Type | null) => set({ ${camelStoreName} })
}))`

const typeContent = `export type ${pascalStoreName}Type = {
    
}

export type ${pascalStoreName}State = {
    ${camelStoreName}: ${pascalStoreName}Type | null
    set${pascalStoreName}: (${camelStoreName}: ${pascalStoreName}Type | null) => void
}`

const indexContent = `export { use${pascalStoreName}Store } from "./${storeName}.store"
export type { ${pascalStoreName}Type, ${pascalStoreName}State } from "./${storeName}.type"`

try {
	fs.mkdirSync(storePath)
} catch (e) {
	console.error(`Store ${storeName} already exists at ${storePath}.`)
	process.exit(1)
}

fs.writeFileSync(path.join(storePath, `${storeName}.store.ts`), storeContent)
fs.writeFileSync(path.join(storePath, `${storeName}.type.ts`), typeContent)
fs.writeFileSync(path.join(storePath, "index.ts"), indexContent)

console.log(`Store ${storeName} created at ${storePath}.`)