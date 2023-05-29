"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const ApilisPath = config_database_1.default.define("ApilisPaths", {
    env: sequelize_1.DataTypes.STRING,
    Api: sequelize_1.DataTypes.STRING,
    codBaja: sequelize_1.DataTypes.INTEGER,
    user: sequelize_1.DataTypes.STRING,
    passw: sequelize_1.DataTypes.STRING,
    idModel: sequelize_1.DataTypes.INTEGER,
});
exports.default = ApilisPath;