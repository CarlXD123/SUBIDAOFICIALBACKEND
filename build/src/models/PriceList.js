"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const PriceList = config_database_1.default.define("PriceLists", {
    name: sequelize_1.DataTypes.STRING,
    status: {
        type: sequelize_1.DataTypes.STRING(1),
        defaultValue: 'A'
    },
    AgreementId: sequelize_1.DataTypes.NUMBER,
});
//PriceList.belongsTo(Agreement);
PriceList.addScope('defaultScope', {
    order: [['id', 'asc']],
}, { override: true });
exports.default = PriceList;
