const jwt = require("jsonwebtoken")

const { Token } = require("../models/models")

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS, {expiresIn: "2h"})
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {expiresIn: "30d"})
    return { accessToken, refreshToken }
  }

  verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, process.env.SECRET_KEY_ACCESS)
  }

  verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH)
  }

  async saveToken(refresh_token, userId) {
    const token = await Token.findOne({ where: { userId } })
    if (token) {
      return await Token.update({ refresh_token }, { where: { userId } })
    }
    return +
    await Token.create({ userId, refresh_token })
  }

  async removeToken(refresh_token) {
    await Token.destroy({ where: { refresh_token } })
  }

  async findToken(refresh_token) {
    return Token.findOne({ where: { refresh_token } })
  }
}

module.exports = new TokenService()
