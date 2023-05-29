"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const ExaminationReferenceValue = config_database_1.default.define("ExaminationReferenceValues", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: sequelize_1.DataTypes.STRING,
    ExaminationValueId: sequelize_1.DataTypes.INTEGER,
    ExaminationId: sequelize_1.DataTypes.INTEGER
});
ExaminationReferenceValue.addScope("defaultScope", {
    order: [["id", "ASC"]]
}, { override: true });
exports.default = ExaminationReferenceValue;
