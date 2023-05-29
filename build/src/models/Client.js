"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const config = {
    tableName: 'Clients',
    sequelize: config_database_1.default,
};
class Client extends sequelize_1.Model {
}
Client.init({
    dni: {
        type: sequelize_1.DataTypes.STRING,
        unique: {
            name: "dni",
            msg: "DNI ya existe"
        }
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
    code: {
        type: sequelize_1.DataTypes.STRING,
        unique: {
            name: "code",
            msg: "Codigo ya existe"
        }
    },
    historyNumber: {
        type: sequelize_1.DataTypes.STRING,
        unique: {
            name: "historyNumber",
            msg: "Número de historia clínica ya existe"
        }
    },
    name: sequelize_1.DataTypes.STRING,
    lastNameP: sequelize_1.DataTypes.STRING,
    lastNameM: sequelize_1.DataTypes.STRING,
    phoneNumber: sequelize_1.DataTypes.STRING,
    tlfNumber: sequelize_1.DataTypes.STRING,
    gender: sequelize_1.DataTypes.STRING(1),
    civilStatus: sequelize_1.DataTypes.STRING(1),
    nationality: sequelize_1.DataTypes.STRING,
    edad: sequelize_1.DataTypes.INTEGER,
    address: sequelize_1.DataTypes.STRING,
    TypeDocId: sequelize_1.DataTypes.INTEGER,
    UserId: sequelize_1.DataTypes.INTEGER,
    status: {
        defaultValue: "A",
        type: sequelize_1.DataTypes.STRING(1)
    }
}, config);
// const Client: ModelDefined<ClientAtributos, ClientCreateAtributos> = db.define("Clients", {
//     dni: {
//         type: DataTypes.STRING,
//         unique: {
//             name: "dni",
//             msg: "DNI ya existe"
//         }
//     },
//     birthDate: {
//         type: DataTypes.DATEONLY,
//         defaultValue: null,
//         //   get: function() {
//         //     return helper.convertUsToEuDate(this.getDataValue('birthDate'));
//         //   },
//         //   set: function(val) {
//         //     this.setDataValue('birthDate', helper.convertEuToUsDate(val));
//         //   }
//     },
//     code: {
//         type: DataTypes.STRING,
//         unique: {
//             name: "code",
//             msg: "Codigo ya existe"
//         }
//     },
//     historyNumber: {
//         type: DataTypes.STRING,
//         unique: {
//             name: "historyNumber",
//             msg: "Número de historia clínica ya existe"
//         }
//     },
//     name: DataTypes.STRING,
//     lastNameP: DataTypes.STRING,
//     lastNameM: DataTypes.STRING,
//     phoneNumber: DataTypes.STRING,
//     tlfNumber: DataTypes.STRING,
//     gender: DataTypes.STRING(1),
//     civilStatus: DataTypes.STRING(1),
//     nationality: DataTypes.STRING,
//     edad: DataTypes.INTEGER,
//     address: DataTypes.STRING,
//     TypeDocId: DataTypes.INTEGER,
//     UserId: DataTypes.INTEGER,
//     status: {
//         defaultValue: "A",
//         type: DataTypes.STRING(1)
//     }
// });
Client.addScope('defaultScope', {
    where: { status: 'A' },
    order: [['id', 'desc']],
}, { override: true });
exports.default = Client;
