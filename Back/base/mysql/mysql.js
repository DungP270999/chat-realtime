const {mysql} = require('../../config/config');
const Sequelize = require('sequelize');
const database = mysql.database;
const userMysql = mysql.user;
const host = mysql.host;
const port = mysql.port;
const passwordMysql = mysql.password;

const sequelize = new Sequelize(database, userMysql, passwordMysql, {
    host: mysql.host,
    port: mysql.port,
    logging: false,
    dialect: 'mysql',
});

function authenticate() {
    let connection = setInterval(() => {
        authenticate();
    }, 1000 * 60 * 1);
    sequelize.authenticate()
        .then(function (conn) {
            clearInterval(connection);
            console.log(`Database connected: ` + `${host}:${port}`);
        })
        .catch(e => {
            console.log(`ERROR: NOT CONNECTED TO DATABASE | ${e}`);
        });
    sequelize.sync()
        .then((res) => {
            console.log(`Đã đồng bộ model.`);
        })
        .catch(err => {
            debug('ERROR: Chưa đồng bộ model: ');
            debug(err);
        });
}

authenticate();

module.exports = {
    sequelize
};
