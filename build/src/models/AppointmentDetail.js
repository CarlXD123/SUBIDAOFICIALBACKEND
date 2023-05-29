"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const AppointmentDetail = config_database_1.default.define("AppointmentDetails", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    AppointmentId: sequelize_1.DataTypes.INTEGER,
    ExaminationId: sequelize_1.DataTypes.INTEGER,
});
exports.default = AppointmentDetail;
