const fs = require("fs")
const path = require("path")
const uuid = require("uuid")
const { Op } = require("sequelize")

const ApiError = require("../middleware/ApiError")
const { Audio, Genre } = require("../models/models")

class AudioService {
	async upload(id, name, audio, img) {
		if (!id && !audio) throw ApiError.BadRequest(`No data received.`)

		let imgName = null
		const imgFolder = path.resolve(__dirname, "..", "audio", id + "", "img")
		const dbAudio = await Audio.findOne({
			where: { name: name, userId: id },
		})

		if (img) {
			const imgType = img.name.split(".").at(-1)
			imgName = uuid.v4() + "." + imgType
		}

		if (fs.existsSync(this.getAudioPath(id, name)) || dbAudio) {
			throw ApiError.BadRequest(`File exist.`)
		}
		if (!fs.existsSync(imgFolder)) {
			fs.mkdirSync(imgFolder)
		}
		if (img) {
			img.mv(path.resolve(__dirname, "..", "audio", id + "", "img", imgName))
		}
		audio.mv(this.getAudioPath(id, name))
		return await Audio.create({ name, userId: id, img: imgName })
	}

	async addGenre(name, audioId) {
		if (!name && !audioId) {
			throw ApiError.BadRequest(`No data received.`)
		}
		const genre = await Genre.findOne({ where: { name, audioId } })
		if (!genre) {
			await Genre.create({ name, audioId })
		}
		return
	}

	async deleteAudio(userId, id) {
		const audio = await Audio.findOne({ where: { id } })
		if (audio) {
			fs.unlinkSync(
				path.resolve(__dirname, "..", "audio", userId + "", audio.name)
			)
			if (audio.img) {
				fs.unlinkSync(
					path.resolve(__dirname, "..", "audio", userId + "", "img", audio.img)
				)
			}
			await Genre.destroy({ where: { audioId: id } })
			await Audio.destroy({ where: { id } })
		}
		return audio
	}

	async changeAudioName(id, userId, name) {
		const audio = await Audio.findOne({ where: { id } })
		if (name && audio.name !== name) {
			fs.renameSync(
				this.getAudioPath(userId, audio.name),
				this.getAudioPath(userId, name)
			)
			await Audio.update({ name }, { where: { id } })
		}
		return await Audio.findOne({ where: { id } })
	}

	async changeAudioImage(img, id, userId) {
		const audio = await Audio.findOne({ where: { id } })
		if (img) {
			if (audio.img && fs.existsSync(this.geImgPath(userId, audio.img))) {
				fs.unlinkSync(this.geImgPath(userId, audio.img))
			}
			const imgType = img.name.split(".").at(-1)
			const imgName = uuid.v4() + "." + imgType
			await Audio.update({ img: imgName }, { where: { id } })
			img.mv(this.geImgPath(userId, imgName))
		}
		return await Audio.findOne({ where: { id } })
	}

	async getAudio(userId, limit, offset, sort) {
		const [sortOption, sortOrder] = sort.split(`:`)

		return await Audio.findAndCountAll({
			attributes: { exclude: ["userId"] },
			include: {
				model: Genre,
				attributes: ["id", "name"],
			},
			where: { userId },
			distinct: true,
			limit,
			offset,
			order: [[sortOption, sortOrder]],
		})
	}
	async searchAudio(search, userId, limit, offset, sort) {
		const [sortOption, sortOrder] = sort.split(`:`)

		return await Audio.findAndCountAll({
			attributes: { exclude: ["userId"] },
			include: {
				model: Genre,
				attributes: ["id", "name"],
			},
			where: { name: { [Op.iLike]: "%" + search + "%" }, userId },
			distinct: true,
			limit,
			offset,
			order: [[sortOption, sortOrder]],
		})
	}

	async deleteGenre(audioId, name) {
		const genre = await Genre.findOne({ where: { audioId, name } })
		if (genre) {
			await genre.destroy()
		}
		return
	}

	getAudioPath(id, audio) {
		return path.resolve(__dirname, "..", "audio", id + "", audio)
	}
	geImgPath(id, img) {
		return path.resolve(__dirname, "..", "audio", id + "", "img", img)
	}
}

module.exports = new AudioService()
