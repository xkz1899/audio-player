const Router = require("express").Router
const router = new Router()

const audioController = require("../controllers/audioController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/upload", authMiddleware, audioController.upload)
router.patch("/name", authMiddleware, audioController.changeAudioName)
router.patch("/image", authMiddleware, audioController.changeAudioImage)
router.delete("/:id", authMiddleware, audioController.deleteAudio)
router.delete("/genre/:name/:id", authMiddleware, audioController.deleteGenre)
router.post("/add-genre", authMiddleware, audioController.addGenre)
router.get("/", authMiddleware, audioController.getAudio)
router.get("/search", authMiddleware, audioController.searchAudio)

module.exports = router
