"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const ExaminationGroup = config_database_1.default.define("ExaminationGroups", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: sequelize_1.DataTypes.STRING,
    countEV: sequelize_1.DataTypes.INTEGER,
    status: {
        defaultValue: "A",
        type: sequelize_1.DataTypes.STRING(1),
    },
    ExaminationId: sequelize_1.DataTypes.INTEGER
});
ExaminationGroup.addScope("defaultScope", {
    where: { status: "A" },
}, { override: true });
exports.default = ExaminationGroup;
