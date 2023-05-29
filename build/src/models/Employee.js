"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const Employee = config_database_1.default.define("Employees", {
    dni: {
        type: sequelize_1.DataTypes.STRING,
        unique: {
            name: "dni",
            msg: "DNI ya existe"
        }
    },
    admissionDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        defaultValue: null,
        //   get: function() {
        //     return helper.convertUsToEuDate(this.getDataValue('admissionDate'));
        //   },
        //   set: function(val) {
        //     this.setDataValue('admissionDate', helper.convertEuToUsDate(val));
        //   }
    },
    birthDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        defaultValue: null,
        //   get: function() {
        //     return helper.convertUsToEuDate(this.getDataValue('birthDate'));
        //   },
        //   set: function(val) {
        //     this.setDataValue('birthDate', helper.convertEuToUsDate(val));
        //   }
    },
    name: sequelize_1.DataTypes.STRING,
    lastNameP: sequelize_1.DataTypes.STRING,
    lastNameM: sequelize_1.DataTypes.STRING,
    gender: sequelize_1.DataTypes.STRING(1),
    civilStatus: sequelize_1.DataTypes.STRING(1),
    phoneNumber: sequelize_1.DataTypes.STRING,
    tlfNumber: sequelize_1.DataTypes.STRING,
    digitalSignatureUrl: sequelize_1.DataTypes.STRING(500),
    tuitionNumber: sequelize_1.DataTypes.STRING,
    tuitionNumber2: sequelize_1.DataTypes.STRING,
    address: sequelize_1.DataTypes.STRING(500),
    referencePoint: sequelize_1.DataTypes.STRING(500),
    typeDirection: sequelize_1.DataTypes.STRING(1),
    UserId: sequelize_1.DataTypes.INTEGER,
    CategoryId: sequelize_1.DataTypes.INTEGER,
    TypeDocId: sequelize_1.DataTypes.INTEGER,
    TypeEmployeeId: sequelize_1.DataTypes.INTEGER,
    SpecialityId: sequelize_1.DataTypes.INTEGER,
    ProfessionId: sequelize_1.DataTypes.INTEGER,
    TuitionId: sequelize_1.DataTypes.INTEGER,
    Tuition2Id: sequelize_1.DataTypes.INTEGER,
    HeadquarterId: sequelize_1.DataTypes.INTEGER,
    status: {
        defaultValue: "A",
        type: sequelize_1.DataTypes.STRING(1)
    }
}); //Agregar mas datos
Employee.addScope('defaultScope', {
    where: { status: 'A' },
    order: [['id', 'desc']],
}, { override: true });
exports.default = Employee;
