"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const Province = config_database_1.default.define("Provinces", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    name: sequelize_1.DataTypes.STRING,
    RegionId: sequelize_1.DataTypes.STRING
});
//Province.belongsTo(Region,{foreignKey:'RegionId'})
//Province.hasMany(District,{as:'Districts',foreignKey:'ProvinceId'})
Province.addScope('defaultScope', {
    order: [['name', 'ASC']],
}, { override: true });
exports.default = Province;
