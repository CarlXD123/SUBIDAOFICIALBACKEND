"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const ExaminationValue = config_database_1.default.define("ExaminationValues", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: sequelize_1.DataTypes.STRING,
    countVR: sequelize_1.DataTypes.INTEGER,
    status: {
        defaultValue: "A",
        type: sequelize_1.DataTypes.STRING(1),
    },
    ExaminationGroupId: sequelize_1.DataTypes.INTEGER,
    MethodId: sequelize_1.DataTypes.INTEGER,
    UnitId: sequelize_1.DataTypes.INTEGER,
    countVR2: sequelize_1.DataTypes.STRING,
});
ExaminationValue.addScope("defaultScope", {
    order: [["id", "ASC"]],
    where: { status: "A" },
}, { override: true });
exports.default = ExaminationValue;
