const bcrypt = require("bcrypt")
const path = require("path")
const fs = require("fs")

const ApiError = require("../middleware/ApiError")
const tokenService = require("./tokenService")
const userDto = require("../dto/userDto")
const { UnauthorizedError } = require("../middleware/ApiError")
const { User } = require("../models/models")

class AuthService {
	async tokenHandler(user) {
		const dtoUser = await new userDto(user)
		const tokens = await tokenService.generateTokens({ ...dtoUser })
		await tokenService.saveToken(tokens.refreshToken, dtoUser.id)
		return { ...tokens, user: dtoUser }
	}

	async registration(email, password) {
		const candidate = await User.findOne({ where: { email } })
		if (candidate) {
			throw ApiError.BadRequest(`User ${email} exist in database.`)
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({ email, password: hashPassword })
		fs.mkdir(path.resolve(__dirname, "..", "audio"), err => {
			if (err) throw ApiError.BadRequest(err)
		})
		const userPath = path.resolve(__dirname, "..", "audio", user.id + "")
		fs.mkdir(userPath, err => {
			if (err) throw ApiError.BadRequest(err)
		})

		return this.tokenHandler(user)
	}

	async login(email, password) {
		const user = await User.findOne({ where: { email } })
		if (!user) {
			throw ApiError.BadRequest("Incorrect email.")
		}
		const passwordCompare = await bcrypt.compare(password, user.password)
		if (!passwordCompare) {
			throw ApiError.BadRequest("Incorrect password.")
		}
		return this.tokenHandler(user)
	}

	async logout(refreshToken) {
		await tokenService.removeToken(refreshToken)
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw UnauthorizedError()
		}
		const userData = await tokenService.verifyRefreshToken(refreshToken)
		const dbToken = await tokenService.findToken(refreshToken)
		if (!userData || !dbToken) {
			throw UnauthorizedError()
		}
		const user = await User.findOne({ where: { id: userData.id } })
		return this.tokenHandler(user)
	}
}

module.exports = new AuthService()
