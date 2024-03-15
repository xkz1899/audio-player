const Router = require("express").Router
const authRouter = require("./authRouter")
const audioRouter = require("./audioRouter")

const router = new Router()

router.use(`/auth`, authRouter)
router.use(`/audio`, audioRouter)

module.exports = router
