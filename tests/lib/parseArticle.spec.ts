import { expect } from "chai"
import { JSDOM } from "jsdom"
import MockDate from "mockdate"
import { parseArticle } from "../../src/lib/parseArticle.ts"
import { body, mwApiResponse } from "../fixtures/mwApiResponse.ts"

describe("parseArticle", () => {
	it(
		"should extract metadata and body from current events portal's wikitext",
		() => {
			const now = new Date(2025, 9, 1, 0, 1, 0)

			MockDate.set(now)

			// necessary for newline preservation and html entity decoding
			// https://github.com/jsdom/jsdom/issues/3690#issuecomment-1980913251
			const parsedBody = (new JSDOM(`<div>${body}</div>`).window.document.body.firstChild as HTMLDivElement)?.innerHTML

			expect(parseArticle(mwApiResponse)).to.deep.eq({
				title: "Current events – 2025 September 30",
				url: "https://en.wikipedia.org/wiki/Portal:Current_events/2025_September_30",
				publishedAt: new Date(Date.UTC(2025, 8, 30, 23, 59, 0, 0))
					.toISOString(),
				updatedAt: now.toISOString(),
				body: parsedBody,
			})
		},
	)
})

