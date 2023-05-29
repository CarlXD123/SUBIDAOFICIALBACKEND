"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var db = new sequelize_1.Sequelize('SL_RedLab_Dev', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    port: 5432,
    protocol: 'postgres',
    dialectOptions: {
        ssl: process.env.DB_ENABLE_SSL && {
            require: true
        }
    }
});
exports["default"] = db;
