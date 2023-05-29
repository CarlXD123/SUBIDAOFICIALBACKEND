"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const Examination = config_database_1.default.define("Examinations", {
    name: sequelize_1.DataTypes.STRING,
    code: sequelize_1.DataTypes.STRING,
    indications: sequelize_1.DataTypes.STRING(3000),
    typeSample: sequelize_1.DataTypes.STRING,
    volume: sequelize_1.DataTypes.STRING,
    supplies: sequelize_1.DataTypes.STRING,
    storageTemperature: sequelize_1.DataTypes.STRING,
    fastingConditions: sequelize_1.DataTypes.STRING,
    runFrequency: sequelize_1.DataTypes.STRING,
    processTime: sequelize_1.DataTypes.STRING,
    reportTime: sequelize_1.DataTypes.STRING,
    countEG: sequelize_1.DataTypes.STRING,
    status: {
        defaultValue: "A",
        type: sequelize_1.DataTypes.STRING(1),
    },
    ServiceId: sequelize_1.DataTypes.INTEGER
});
//ExaminationPrice.belongsTo(PriceList);
//ExaminationPrice.belongsTo(Examination);
Examination.addScope("defaultScope", {
    order: [["id", "DESC"]],
    where: { status: "A" },
}, { override: true });
exports.default = Examination;
