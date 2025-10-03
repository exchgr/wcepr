import { JSDOM } from "jsdom"
import type { MwApiResponse } from "../types/mwApiResponse.ts"
import type { ParsedArticle } from "../types/parsedArticle.ts"

export const parseArticle = (mwApiResponse: MwApiResponse): ParsedArticle => {
	const separator = " – "

	const title = mwApiResponse.parse.title.replace(/Portal:/, "").replace(
		/\//,
		separator,
	)

	const date = new Date(
		title.split(separator)[1],
	)

	const datePreMidnight = new Date(Date.UTC(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
		23,
		59,
		0,
	))

	const now = new Date()

	return {
		url: `https://en.wikipedia.org/wiki/Portal:Current_events/${
			date.toLocaleDateString("en-US", {year: "numeric"})
		}_${
			date.toLocaleDateString("en-US", {month: "long"})
		}_${
			date.toLocaleDateString("en-US", {day: "numeric"})
		}`,
		publishedAt: datePreMidnight.toISOString(),
		updatedAt: now.toISOString(),
		title,
		body: new JSDOM(mwApiResponse.parse.text["*"])
			.window.document.body.querySelector(
				".current-events-content.description",
			)?.innerHTML,
	}
}
