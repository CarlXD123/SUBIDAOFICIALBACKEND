"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const Headquarter = config_database_1.default.define("Headquarters", {
    name: sequelize_1.DataTypes.STRING,
    address: sequelize_1.DataTypes.STRING,
    tlfNumber: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    urlImage: {
        type: sequelize_1.DataTypes.STRING(2000),
        defaultValue: `localhost:3000/public/imgs/headquarter/dark-material-bg.jpg`
    }
});
Headquarter.addScope('defaultScope', {
    order: [['id', 'ASC']]
}, { override: true });
exports.default = Headquarter;
