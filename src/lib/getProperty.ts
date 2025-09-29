import { Token } from "wikiparser-node/dist/src/index.js"

export const getProperty = (ast: Token, key: string) => ast.children.find(
	(child) => child?.children[0]?.outerText.includes(key),
)!.children[1].toHtml().trim()
