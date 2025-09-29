import { expect } from "chai"
import Parser from "wikiparser-node"
import { getProperty } from "../../src/lib/getProperty.ts"

describe("getProperty", () => {
	it("should find a property from an AST", () => {
		const wikitext = `{{Current events|year=2025|month=09|day=20|content=

	<!-- All news items below this line -->
	'''Armed conflicts and attacks'''
*[[Druze insurgency in Southern Syria (2025–present)]]
**Pro-government [[Bedouin]] tribes issue a 10 day ultimatum to [[Druze]] insurgents to release hostages held in the [[Suwayda Governorate]] under the threat of a resumption of hostilities. [https://www.syriahr.com/en/370136/ (SOHR)]
<!-- All news items above this line -->}}`

		const ast = Parser.parse(wikitext).children[0]

		expect(getProperty(ast, "year")).to.eq("2025")
		expect(getProperty(ast, "month")).to.eq("09")
		expect(getProperty(ast, "day")).to.eq("20")
		expect(getProperty(ast, "content")).to.eq(
			"<b>Armed conflicts and attacks</b>\n<ul><li><a href=\"/wiki/Druze_insurgency_in_Southern_Syria_(2025%E2%80%93present)\" title=\"Druze insurgency in Southern Syria (2025–present)\">Druze insurgency in Southern Syria (2025–present)</a>\n<ul><li>Pro-government <a href=\"/wiki/Bedouin\" title=\"Bedouin\">Bedouin</a> tribes issue a 10 day ultimatum to <a href=\"/wiki/Druze\" title=\"Druze\">Druze</a> insurgents to release hostages held in the <a href=\"/wiki/Suwayda_Governorate\" title=\"Suwayda Governorate\">Suwayda Governorate</a> under the threat of a resumption of hostilities. <a rel=\"nofollow\" class=\"external\" href=\"https://www.syriahr.com/en/370136/\">(SOHR)</a></li></ul></li></ul>")
	})
})
