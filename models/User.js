const { Model, DataTypes } = require('sequelize');
const brcypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {

}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5],
            }
        },
    },
    {
        hooks: {
            beforeCreate: async (userData) => {
                userData.password = await brcypt.hash(userData.password, 10);
                return userData;
            },
        },
        sequelize,
        underscored: true,
        freezeTableName: true,
        modelName: 'user',
    }
);
module.exports = User;