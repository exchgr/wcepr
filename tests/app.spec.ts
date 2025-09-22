import { expect, use } from "chai"
import chaiHttp, { request } from "chai-http"
import { app } from "../src/app.ts"

use(chaiHttp)

const requester = request.execute(app)

describe("app", () => {
	describe("/feed.xml", () => {
		it("should render", async () => {
			const response = await requester.get("/feed.xml")

			const date = new Date()
			date.setHours(0, 0, 0, 0)

			// TODO: change link rel="self"
			expect(response.body.toString()).to.eq(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"
      xml:base="https://en.wikipedia.org/wiki/Portal:Current_events">
  <title>Wikipedia Current Events</title>
  <subtitle>From Wikipedia, the free encyclopedia</subtitle>
  <link href="http://localhost:3000/feed.xml" rel="self"/>
  <link href="https://en.wikipedia.org/wiki/Portal:Current_events"/>
  <updated>${date.toISOString()}</updated>
  <id>https://en.wikipedia.org/wiki/Portal:Current_events</id>
  <entry>
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
