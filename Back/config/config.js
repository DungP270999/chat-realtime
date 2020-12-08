/**
 * Module:    Quản lý cấu hình
 * Author:    Dung Phung
 * Create:    11/9/2020
 * Modified:  dd/mm/yyyy    by @someone
 *
 */
const mysql = require('./mysql_config');
const jwtConfig = require('./jwt_config');

module.exports = {
    mysql,
    jwtConfig
};
