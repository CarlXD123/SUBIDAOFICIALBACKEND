"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const Agreement = config_database_1.default.define("Agreements", {
    name: sequelize_1.DataTypes.STRING,
    address: sequelize_1.DataTypes.STRING,
    ruc: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    tlfNumber: sequelize_1.DataTypes.STRING,
    description: sequelize_1.DataTypes.STRING,
    TypeAgreementId: sequelize_1.DataTypes.INTEGER,
});
Agreement.addScope('defaultScope', {
    order: [['id', 'desc']],
}, { override: true });
//Agreement.hasMany(PriceList);
//Agreement.belongsTo(TypeAgreement);
exports.default = Agreement;
