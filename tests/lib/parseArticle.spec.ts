import { expect } from "chai"
import { parseArticle } from "../../src/lib/parseArticle.ts"

describe("parseArticle", () => {
	it(
		"should extract metadata and body from current events portal's wikitext",
		() => {
			const wikitext = `{{Current events|year=2025|month=09|day=20|content=

	<!-- All news items below this line -->
	'''Armed conflicts and attacks'''
*[[Druze insurgency in Southern Syria (2025–present)]]
**Pro-government [[Bedouin]] tribes issue a 10 day ultimatum to [[Druze]] insurgents to release hostages held in the [[Suwayda Governorate]] under the threat of a resumption of hostilities. [https://www.syriahr.com/en/370136/ (SOHR)]
<!-- All news items above this line -->}}`

			expect(parseArticle(wikitext)).to.contain({
				title: "Current events — 2025 September 20",
				url: "https://en.wikipedia.org/w/index.php?title=Portal:Current_events/2025_September_20",
				publishedAt: new Date(2025, 8, 20, 0, 0, 0, 0).toISOString(),
				updatedAt: new Date(2025, 8, 20, 0, 0, 0, 0).toISOString(),
				body: "<b>Armed conflicts and attacks</b>\n<ul><li><a href=\"/wiki/Druze_insurgency_in_Southern_Syria_(2025%E2%80%93present)\" title=\"Druze insurgency in Southern Syria (2025–present)\">Druze insurgency in Southern Syria (2025–present)</a>\n<ul><li>Pro-government <a href=\"/wiki/Bedouin\" title=\"Bedouin\">Bedouin</a> tribes issue a 10 day ultimatum to <a href=\"/wiki/Druze\" title=\"Druze\">Druze</a> insurgents to release hostages held in the <a href=\"/wiki/Suwayda_Governorate\" title=\"Suwayda Governorate\">Suwayda Governorate</a> under the threat of a resumption of hostilities. <a rel=\"nofollow\" class=\"external\" href=\"https://www.syriahr.com/en/370136/\">(SOHR)</a></li></ul></li></ul>",
			})
		},
	)
})

