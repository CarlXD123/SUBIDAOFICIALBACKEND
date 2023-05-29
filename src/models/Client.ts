import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";
import Appointment from "./Appointment";

export type ClientAtributos = {
    civilStatusStr: any;
    genderStr: any;
    birthDateUS: string;
    id: number,
    dni: string,
    birthDate: string,
    code: string,
    historyNumber: string,
    name: string,
    lastNameP: string,
    lastNameM: string,
    phoneNumber: string,
    tlfNumber: string,
    gender: string,
    civilStatus: string,
    nationality: string,
    address: string,
    status: string,
    edad: string,
    UserId: number,
}
const config = {
    tableName: 'Clients',
    sequelize: db,
};
class Client extends Model {
    public civilStatusStr: any;
    public genderStr: any;
    public birthDateUS: string;
    public id: number;
    public dni: string;
    public birthDate: string;
    public code: string;
    public historyNumber: string;
    public name: string;
    public lastNameP: string;
    public lastNameM: string;
    public phoneNumber: string;
    public tlfNumber: string;
    public gender: string;
    public civilStatus: string;
    public nationality: string;
    public address: string;
    public status: string;
    public edad: string;
    public UserId: number;
}
Client.init(
    {
        dni: {
            type: DataTypes.STRING,
            unique: {
                name: "dni",
                msg: "DNI ya existe"
            }
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            defaultValue: null,
            //   get: function() {
            //     return helper.convertUsToEuDate(this.getDataValue('birthDate'));
            //   },
            //   set: function(val) {
            //     this.setDataValue('birthDate', helper.convertEuToUsDate(val));
            //   }
        },
        code: {
            type: DataTypes.STRING,
            unique: {
                name: "code",
                msg: "Codigo ya existe"
            }
        },
        historyNumber: {
            type: DataTypes.STRING,
            unique: {
                name: "historyNumber",
                msg: "Número de historia clínica ya existe"
            }
        },
        name: DataTypes.STRING,
        lastNameP: DataTypes.STRING,
        lastNameM: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        tlfNumber: DataTypes.STRING,
        gender: DataTypes.STRING(1),
        civilStatus: DataTypes.STRING(1),
        nationality: DataTypes.STRING,
        edad: DataTypes.INTEGER,
        address: DataTypes.STRING,
        TypeDocId: DataTypes.INTEGER,
        NationId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER,
        status: {
            defaultValue: "A",
            type: DataTypes.STRING(1)
        }
    },
    config
)
type ClientCreateAtributos = Optional<ClientAtributos, 'id'>;
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
}, { override: true })
export default Client;