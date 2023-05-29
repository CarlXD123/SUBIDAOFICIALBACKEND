"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const ApilisMatchDataDetail = config_database_1.default.define("ApilisMatchDataDetails", {
    codBaja: sequelize_1.DataTypes.INTEGER,
    idApilisMatchData: sequelize_1.DataTypes.INTEGER,
    idExamenValue: sequelize_1.DataTypes.INTEGER,
    fields: sequelize_1.DataTypes.STRING,
    priority: sequelize_1.DataTypes.INTEGER,
    createdBy: sequelize_1.DataTypes.STRING,
    modifiedBy: sequelize_1.DataTypes.STRING,
});
exports.default = ApilisMatchDataDetail;