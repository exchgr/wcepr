import { expect } from "chai"
import { app } from "../src/app.ts"
import request from "supertest"

const requester = request(app)

describe("app", () => {
	describe("/feed.xml", () => {
		it("should render", async () => {
			const feed = await requester.get("/feed.xml")
			expect(feed.text).to.eq('hello world!')
		})
	})
})
