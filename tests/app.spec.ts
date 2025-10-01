import { expect, use } from "chai"
import chaiHttp, { request } from "chai-http"
import esmock from "esmock"
import MockDate from "mockdate"
import { stub } from "sinon"
import { arrayRange } from "../src/lib/arrayRange.ts"

use(chaiHttp)

describe("app", () => {
	describe("/feed.xml", () => {
		it("should render the last 14 days of current events", async () => {
			const articleDate = new Date(2025, 8, 30)
			MockDate.set(articleDate)

			const {server} = await esmock("../src/app.ts", {
				"../src/lib/fetchArticle.ts": {
					fetchArticle: stub()
						.callsFake((date: Date) => {
								return ({
									"parse": {
										"title": `Portal:Current events/${
											date.toLocaleDateString("en-US", {year: "numeric"})
										} ${
											date.toLocaleDateString("en-US", {month: "long"})
										} ${
											date.toLocaleDateString("en-US", {day: "numeric"})
										}`,
										"pageid": 81209818,
										"revid": 1314311575,
										"text": {
											"*": "<div class=\"current-events-content description\">hi</div>",
										},
									},
								})
							},
						),
				},
			})

			const requester = request.execute(server)

			const response = await requester.get("/feed.xml")

			const entries = arrayRange(17, 31).reverse().map(
				(day) => {
					const year = 2025
					const date = new Date(year, 8, day)
					const month = date.toLocaleDateString("en-US", {month: "long"})

					return `      <entry>
        <title>Current events – ${year} ${month} ${day}</title>
        <author>
          <name>Wikipedia, the free encyclopedia</name>
        </author>
        <link href="https://en.wikipedia.org/wiki/Portal:Current_events/${year}_${month}_${day}"/>
        <published>${date.toISOString()}</published>
        <updated>${date.toISOString()}</updated>
        <id>https://en.wikipedia.org/wiki/Portal:Current_events/${year}_${month}_${day}</id>
        <content xml:lang="en" type="html">hi</content>
        <category term="news"/>
      </entry>
`
				},
			).join("")

			// TODO: change link rel="self" to depend on an environment variable
			expect(response.body.toString()).to.eq(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"
      xml:base="https://en.wikipedia.org/wiki/Portal:Current_events">
  <title>Wikipedia Current Events</title>
  <subtitle>From Wikipedia, the free encyclopedia</subtitle>
  <link href="http://localhost:3000/feed.xml" rel="self"/>
  <link href="https://en.wikipedia.org/wiki/Portal:Current_events"/>
  <updated>2025-09-30T04:00:00.000Z</updated>
  <id>https://en.wikipedia.org/wiki/Portal:Current_events</id>
${entries}</feed>
`)
			expect(response).to.have.status(200)
			expect(response).to.have.header(
				"Content-Type",
				"application/rss+xml; charset=utf-8",
			)

			await server.close()
		})
	})
})
