const audioService = require("../service/audioService")

class AudioController {
	async upload(req, res, next) {
		try {
			const { audio, img } = req.files
			const { name } = req.body
			const result = await audioService.upload(req.user.id, name, audio, img)
			res.json(result)
		} catch (err) {
			next(err)
		}
	}

	async addGenre(req, res, next) {
		try {
			const { name, audioId } = req.body
			const result = await audioService.addGenre(name, audioId)
			res.json(result)
		} catch (err) {
			next(err)
		}
	}

	async deleteGenre(req, res, next) {
		try {
			const { id, name } = req.params
			await audioService.deleteGenre(id, name)
			res.json({ message: `Genre ${name} was delete.` })
		} catch (err) {
			next(err)
		}
	}

	async changeAudioName(req, res, next) {
		try {
			const { id, name } = req.body
			const result = await audioService.changeAudioName(id, req.user.id, name)
			res.json(result)
		} catch (err) {
			next(err)
		}
	}

	async changeAudioImage(req, res, next) {
		try {
			const { image } = req.files
			const { id } = req.body
			const result = await audioService.changeAudioImage(image, id, req.user.id)
			res.json(result)
		} catch (err) {
			next(err)
		}
	}

	async getAudio(req, res, next) {
		try {
			const { limit = 5, page = 1, sort = `createdAt:DESC` } = req.query
			const offset = page * limit - limit
			const result = await audioService.getAudio(
				req.user.id,
				limit,
				offset,
				sort
			)
			res.json(result)
		} catch (err) {
			next(err)
		}
	}

	async searchAudio(req, res, next) {
		try {
			const { search, limit = 5, page = 1, sort = `createdAt:DESC` } = req.query
			const offset = page * limit - limit
			const result = await audioService.searchAudio(
				search,
				req.user.id,
				limit,
				offset,
				sort
			)
			res.json(result)
		} catch (err) {
			next(err)
		}
	}

	async deleteAudio(req, res, next) {
		try {
			const { id } = req.params
			const result = await audioService.deleteAudio(req.user.id, id)
			res.json(result)
		} catch (err) {
			next(err)
		}
	}
}

module.exports = new AudioController()
