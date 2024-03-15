const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define(`user`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
})

const Token = sequelize.define(`token`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	refresh_token: { type: DataTypes.TEXT, allowNull: false },
})

const Audio = sequelize.define(`audio`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	img: { type: DataTypes.TEXT },
	name: { type: DataTypes.TEXT }
})

const Genre = sequelize.define(`genre`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	name: { type: DataTypes.TEXT }
})

User.hasOne(Token)
Token.belongsTo(User)

User.hasOne(Audio)
Audio.belongsTo(User)

Audio.hasMany(Genre)
Genre.belongsTo(Audio)

module.exports = {
	User,
	Token,
	Audio,
	Genre
}
