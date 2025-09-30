import express from "express"
import hbs from "hbs"
import path from "path"
import { fileURLToPath } from "url"
import { fetchArticle } from "./lib/fetchArticle.ts"
import { parseArticle } from "./lib/parseArticle.ts"

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export const app = express()
const port = parseInt(process.env.EXPRESS_PORT || "3000")

hbs.registerPartials("src/views/partials")

app.set("view engine", "hbs")
app.set("views", `${__dirname}/views`)

app.use((req, _res, next) => {
	console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`)
	next()
})

app.get("/feed.xml", async (req, res) => {
	const updatedAt = new Date()
	updatedAt.setHours(0, 0, 0, 0)

	res.setHeader("Content-Type", "application/rss+xml")
	res.render(
		"feed.xml.hbs",
		{
			updatedAt: updatedAt.toISOString(),
			hostname: "http://localhost:3000",
			articles: [
				parseArticle(await fetchArticle(updatedAt)),
			],
		},
	)
})

app.listen(port, (error) => {
	if (error) {
		console.error(error)
	}

	console.log(`Listening on port ${port}`)
})
