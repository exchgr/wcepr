import Parser from "wikiparser-node"
import { getProperty } from "../../src/lib/getProperty.ts"

export const parseArticle = (wikitext: string) => {
	const ast = Parser.parse(wikitext).children[0]

	const date = new Date(
		parseInt(getProperty(ast, "year")),
		parseInt(getProperty(ast, "month")) - 1,
		parseInt(getProperty(ast, "day")),
	)

	const year = date.toLocaleDateString("en-US", {year: "numeric"})
	const month = date.toLocaleDateString("en-US", {month: "long"})
	const day = date.toLocaleDateString("en-US", {day: "numeric"})

	return {
		url: `https://en.wikipedia.org/w/index.php?title=Portal:Current_events/${year}_${month}_${day}`,
		publishedAt: date.toISOString(),
		updatedAt: date.toISOString(),
		title: `Current events — ${year} ${month} ${day}`,
		body: getProperty(ast, "content"),
	}
}
