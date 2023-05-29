"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const User = config_database_1.default.define("User", {
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: {
            name: 'username',
            msg: "Correo ya existe",
        },
        validate: {
            isEmail: {
                msg: "Correo no valido",
            },
            notEmpty: {
                msg: "Correo obligatorio",
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "Contraseña no puede ser vacía",
            },
            len: {
                args: [4, 12],
                msg: "Contraseña debe tener entre 4 y 12 caracteres",
            },
        },
    },
    urlAvatar: {
        type: sequelize_1.DataTypes.STRING(2000),
        defaultValue: "src/public/imgs/avatar/avatardefault.png",
    },
    status: {
        defaultValue: "A",
        type: sequelize_1.DataTypes.STRING(1),
    },
});
/* User.hasOne(models.Client);
 User.hasOne(models.Employee);
 User.hasMany(models.Token);
 User.belongsToMany(models.Role, {
   through: "UserRole",
 });
*/
User.addScope("defaultScope", {
    where: { status: "A" },
    order: [["id", "ASC"]],
}, { override: true });
exports.default = User;
