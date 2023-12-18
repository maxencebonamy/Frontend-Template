const fs = require("fs")
const path = require("path")
const yargs = require("yargs")

const toPascalCase = (str) => {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => word.toUpperCase())
		.replace(/[\s\-]/g, "")
}

const argv = yargs
	.usage("Usage: $0 <pagePath> [options]")
	.demandCommand(1, "Please provide a page path.")
	.argv

const pagePath = path.join("src", "app", argv._[0])

const pageContent = `import type { ReactElement } from "react"

export default (): ReactElement => {
	return (
		<></>
	)
}`

const folderSegments = pagePath.split('\\')

let currentPath = ''

for (const segment of folderSegments) {
	currentPath = path.join(currentPath, segment)

	if (!fs.existsSync(currentPath)) {
		fs.mkdirSync(currentPath)
	}
}

fs.writeFileSync(path.join(pagePath, `page.tsx`), pageContent)

console.log(`New page created at ${pagePath}.`)