"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const Function = config_database_1.default.define("Functions", {
    title: sequelize_1.DataTypes.STRING,
    type: sequelize_1.DataTypes.STRING,
    parent_id: sequelize_1.DataTypes.INTEGER,
    url: sequelize_1.DataTypes.STRING,
    icon: sequelize_1.DataTypes.STRING,
    typeApplication: {
        type: sequelize_1.DataTypes.STRING(1),
        defaultValue: 'I'
    }
});
exports.default = Function;
