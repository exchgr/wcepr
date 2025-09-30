import { JSDOM } from "jsdom"
import type { ParsedArticle } from "src/types/parsedArticle.js"
import type { MwApiResponse } from "../types/mwApiResponse.ts"

export const parseArticle = (mwApiResponse: MwApiResponse): ParsedArticle => {
	const separator = " – "

	const title = mwApiResponse.parse.title.replace(/Portal:/, "").replace(
		/\//,
		separator,
	)

	const date = new Date(
		title.split(separator)[1],
	)

	return {
		url: `https://en.wikipedia.org/wiki/Portal:Current_events/${
			date.toLocaleDateString("en-US", {year: "numeric"})
		}_${
			date.toLocaleDateString("en-US", {month: "long"})
		}_${
			date.toLocaleDateString("en-US", {day: "numeric"})
		}`,
		publishedAt: date.toISOString(),
		updatedAt: date.toISOString(),
		title,
		body: new JSDOM(mwApiResponse.parse.text["*"])
			.window.document.body.querySelector(
				".current-events-content.description",
			)?.innerHTML,
	}
}
