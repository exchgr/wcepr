import { expect, use } from "chai"
import chaiHttp, { request } from "chai-http"
// import { app } from "../src/app.ts"
// import * as pa from "../src/lib/parseArticle.ts"
import esmock from "esmock"
import { stub } from "sinon"

use(chaiHttp)

describe("app", () => {
	describe("/feed.xml", () => {
		it("should render", async () => {
			const articleDate = new Date(2025, 8, 20)
			const todayMidnight = new Date()
			todayMidnight.setHours(0, 0, 0, 0)

			const parseArticle = stub().returns({
				title: "Current Events — 2025 September 20",
				url: "https://en.wikipedia.org/w/index.php?title=Portal:Current_events/2025_September_20",
				publishedAt: articleDate.toISOString(),
				updatedAt: articleDate.toISOString(),
				body: "<p><b>Disasters and accidents</b></p>",
			})

			const {app} = await esmock("../src/app.ts", {
				"../src/lib/parseArticle.ts": {parseArticle},
			})

			const requester = request.execute(app)

			const response = await requester.get("/feed.xml")

			// TODO: change link rel="self"
			expect(response.body.toString()).to.eq(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"
      xml:base="https://en.wikipedia.org/wiki/Portal:Current_events">
  <title>Wikipedia Current Events</title>
  <subtitle>From Wikipedia, the free encyclopedia</subtitle>
  <link href="http://localhost:3000/feed.xml" rel="self"/>
  <link href="https://en.wikipedia.org/wiki/Portal:Current_events"/>
  <updated>${todayMidnight.toISOString()}</updated>
  <id>https://en.wikipedia.org/wiki/Portal:Current_events</id>
      <entry>
        <title>Current Events — 2025 September 20</title>
        <author>
          <name>Wikipedia, the free encyclopedia</name>
        </author>
        <link href="https://en.wikipedia.org/w/index.php?title=Portal:Current_events/2025_September_20"/>
        <published>${articleDate.toISOString()}</published>
        <updated>${articleDate.toISOString()}</updated>
        <id>https://en.wikipedia.org/w/index.php?title=Portal:Current_events/2025_September_20</id>
        <content xml:lang="en" type="html">&lt;p&gt;&lt;b&gt;Disasters and accidents&lt;/b&gt;&lt;/p&gt;</content>
        <category term="news"/>
      </entry>
</feed>
`)
			expect(response).to.have.status(200)
			expect(response).to.have.header(
				"Content-Type",
				"application/rss+xml; charset=utf-8",
			)
		})
	})
})
