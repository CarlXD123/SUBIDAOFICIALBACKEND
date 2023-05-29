"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const config = {
    tableName: 'Appointments',
    sequelize: config_database_1.default,
};
class Appointment extends sequelize_1.Model {
}
Appointment.init({
    code: sequelize_1.DataTypes.STRING,
    time: sequelize_1.DataTypes.STRING,
    dateAppointment: sequelize_1.DataTypes.DATE,
    totalPrice: sequelize_1.DataTypes.DOUBLE,
    discount: sequelize_1.DataTypes.DOUBLE,
    finalPrice: sequelize_1.DataTypes.DOUBLE,
    result: sequelize_1.DataTypes.STRING,
    status: sequelize_1.DataTypes.STRING,
    refererCode: sequelize_1.DataTypes.STRING,
    ResponsibleId: sequelize_1.DataTypes.INTEGER,
    ClientId: sequelize_1.DataTypes.INTEGER,
    PriceListId: sequelize_1.DataTypes.INTEGER,
    HeadquarterId: sequelize_1.DataTypes.INTEGER,
    RefererId: sequelize_1.DataTypes.INTEGER,
    DoctorId: sequelize_1.DataTypes.INTEGER,
    doctorNotes: sequelize_1.DataTypes.STRING
}, config);
/*const Appointment: ModelDefined<AppointmentAtributos, AppointmentCreateAtributos> = db.define("Appointments", {
    code: DataTypes.STRING,
    time: DataTypes.STRING,
    dateAppointment: DataTypes.DATE,
    totalPrice: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE,
    finalPrice: DataTypes.DOUBLE,
    result: DataTypes.STRING,
    status: DataTypes.STRING
})*/
exports.default = Appointment;
