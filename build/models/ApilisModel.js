"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const ApilisModel = config_database_1.default.define("ApilisModels", {
    nameModel: sequelize_1.DataTypes.STRING,
    codBaja: sequelize_1.DataTypes.INTEGER,
    Color: sequelize_1.DataTypes.STRING,
    idBrand: sequelize_1.DataTypes.INTEGER,
});
exports.default = ApilisModel;