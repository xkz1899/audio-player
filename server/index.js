require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")
const fileUpload = require("express-fileupload")

require("./models/models")
const sequelize = require("./db")
const ErrorMiddleware = require("./middleware/errorMiddleware")
const router = require("./router")

const app = express()

const PORT = process.env.PORT || 5000

app.use(fileUpload({}))
app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
)
app.use(express.static(path.resolve(__dirname, "audio")))
app.use("/api", router)
app.use(ErrorMiddleware)

const start = async () => {
	try {
		sequelize.authenticate()
		sequelize.sync({ alter: true })
		app.listen(PORT, () =>
			console.log(`Server started and work at port ${PORT}...`)
		)
	} catch (err) {
		console.log(err)
	}
}
start()
