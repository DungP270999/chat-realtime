const Sequelize = require('sequelize');
const db = require('../../../base/mysql/mysql');
const bcrypt = require('bcrypt');

const User = db.sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        // autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    }
});

function generateHash(user) {
    if (!user.changed('password')) return;
    let salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    return user.password;
}

User.beforeCreate(generateHash);

function comparePassword(plaintextPassword) {
    return bcrypt.compareSync(plaintextPassword, User.password);
}

module.exports = {User, comparePassword};
