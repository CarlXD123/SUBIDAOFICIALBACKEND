"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const ApilisMatchData = config_database_1.default.define("ApilisMatchDatas", {
    codBaja: sequelize_1.DataTypes.INTEGER,
    idExamen: sequelize_1.DataTypes.INTEGER,
    idModel: sequelize_1.DataTypes.INTEGER,
    Color: sequelize_1.DataTypes.STRING,
    ColorAle: sequelize_1.DataTypes.STRING,
});
exports.default = ApilisMatchData;