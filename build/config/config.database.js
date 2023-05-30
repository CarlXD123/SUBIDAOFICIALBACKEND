"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('railway', 'postgres', 'i6tn0bPrNldQnxUR5Wen', {
    host: 'containers-us-west-17.railway.app',
    dialect: 'postgres',
    logging: false,
    port: 6161,
    protocol: 'postgres',
    dialectOptions: {
        ssl: process.env.DB_ENABLE_SSL && {
            require: true
        }
    }
});
exports.default = db;
