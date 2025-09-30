import { expect } from "chai"
import { stub } from "sinon"
import { fetchArticle } from "../../src/lib/fetchArticle.ts"
import { mwApiResponse, responseString } from "../fixtures/mwApiResponse.ts"

describe("fetchArticle", () => {
	it("should fetch an article based on the date", async () => {
		const date = new Date(2025, 8, 30)

		stub(globalThis, "fetch")
			.withArgs(
				"https://en.wikipedia.org/w/api.php?page=Portal:Current_events/2025_September_30&action=parse&format=json&origin=*")
			.resolves(new globalThis.Response(
				responseString,
				{
					status: 200,
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
				},
			))

		expect(await fetchArticle(date)).to.deep.eq(mwApiResponse)
	})
})
