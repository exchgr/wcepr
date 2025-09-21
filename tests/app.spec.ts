import { expect, use } from "chai"
import { app } from "../src/app.ts"
import chaiHttp, { request } from "chai-http"

use(chaiHttp)

const requester = request.execute(app)

describe("app", () => {
	describe("/feed.xml", () => {
		it("should render", async () => {
			const response = await requester.get("/feed.xml")

			expect(response.body.toString()).to.eq("hello world!\n")
			expect(response).to.have.status(200)
			expect(response).to.have.header(
				"Content-Type",
				"application/rss+xml; charset=utf-8",
			)
		})
	})
})
