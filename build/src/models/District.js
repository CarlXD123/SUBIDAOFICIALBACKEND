"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const Client_1 = __importDefault(require("./Client"));
const Employee_1 = __importDefault(require("./Employee"));
const District = config_database_1.default.define("Districts", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    name: sequelize_1.DataTypes.STRING,
    ProvinceId: sequelize_1.DataTypes.STRING,
});
//District.belongsTo(Province,{foreignKey:'ProvinceId'})
District.hasMany(Employee_1.default);
District.hasMany(Client_1.default);
District.addScope('defaultScope', {
    order: [['name', 'ASC']],
}, { override: true });
exports.default = District;
