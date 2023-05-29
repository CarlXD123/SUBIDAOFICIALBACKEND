"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const ReferenceValues = config_database_1.default.define("ReferenceValues", {
    name: sequelize_1.DataTypes.STRING,
    unit: sequelize_1.DataTypes.STRING,
});
ReferenceValues.addScope("defaultScope", {
    order: [["name", "ASC"]],
}, { override: true });
exports.default = ReferenceValues;
