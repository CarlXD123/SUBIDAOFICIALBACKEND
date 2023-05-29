"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const RoleFunction = config_database_1.default.define("RoleFunctions", {
    canView: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    canEdit: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    canDelete: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    canCreate: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
});
exports.default = RoleFunction;
