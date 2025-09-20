import express from 'express'

export const app = express()
const port = parseInt(process.env.EXPRESS_PORT || '3000')

app.use((req, _res, next) => {
	console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`)
	next()
})

app.get('/feed.xml', (req, res) => {
	res.setHeader("Content-Type", "application/rss+xml")
	res.send("hello world!")
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
