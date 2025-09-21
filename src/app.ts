import express from "express"

export const app = express()
const port = parseInt(process.env.EXPRESS_PORT || "3000")

app.set("view engine", "hbs")
app.set("views", "src/views")

app.use((req, _res, next) => {
	console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`)
	next()
})

app.get("/feed.xml", (req, res) => {
	res.setHeader("Content-Type", "application/rss+xml")
	res.render("feed.xml.hbs")
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
