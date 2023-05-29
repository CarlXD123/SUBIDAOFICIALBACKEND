"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const ExaminationPrice = config_database_1.default.define("ExaminationPrices", {
    price: sequelize_1.DataTypes.FLOAT,
    ExaminationId: sequelize_1.DataTypes.INTEGER,
    PriceListId: sequelize_1.DataTypes.INTEGER
});
//ExaminationPrice.belongsTo(PriceList);
//ExaminationPrice.belongsTo(Examination);
exports.default = ExaminationPrice;
