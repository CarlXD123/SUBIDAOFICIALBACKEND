import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type EmployeeAtributos = {
    fullName: string;
    typeDirectionStr: any;
    civilStatusStr: any;
    genderStr: any;
    admissionDateUS: string;
    birthDateUS: any;
    id: number,
    dni: string,
    admissionDate: string,
    birthDate: string,
    name: string,
    lastNameP: string,
    lastNameM: string,
    gender: string,
    civilStatus: string,
    phoneNumber: string,
    tlfNumber: string,
    digitalSignatureUrl: string,
    tuitionNumber: string,
    tuitionNumber2: string,
    address: string,
    referencePoint: string,
    typeDirection: string,
    status: string,
    UserId:number
}
type EmployeeCreateAtributos = Optional<EmployeeAtributos, 'id'>;
const Employee: ModelDefined<EmployeeAtributos, EmployeeCreateAtributos> = db.define("Employees", {
    dni: {
        type: DataTypes.STRING,
        unique: {
            name: "dni",
            msg: "DNI ya existe"
        }
    },
    admissionDate: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
        //   get: function() {
        //     return helper.convertUsToEuDate(this.getDataValue('admissionDate'));
        //   },
        //   set: function(val) {
        //     this.setDataValue('admissionDate', helper.convertEuToUsDate(val));
        //   }
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
    name: DataTypes.STRING,
    lastNameP: DataTypes.STRING,
    lastNameM: DataTypes.STRING,
    gender: DataTypes.STRING(1),
    civilStatus: DataTypes.STRING(1),
    phoneNumber: DataTypes.STRING,
    tlfNumber: DataTypes.STRING,
    digitalSignatureUrl: DataTypes.STRING(500),
    tuitionNumber: DataTypes.STRING,
    tuitionNumber2: DataTypes.STRING,
    address: DataTypes.STRING(500),
    referencePoint: DataTypes.STRING(500),
    typeDirection: DataTypes.STRING(1),
    UserId: DataTypes.INTEGER,
    CategoryId : DataTypes.INTEGER,
    TypeDocId : DataTypes.INTEGER,
    TypeEmployeeId : DataTypes.INTEGER,
    SpecialityId : DataTypes.INTEGER,
    ProfessionId : DataTypes.INTEGER,
    TuitionId : DataTypes.INTEGER,
    Tuition2Id : DataTypes.INTEGER,
    HeadquarterId : DataTypes.INTEGER,
    status: {
        defaultValue: "A",
        type: DataTypes.STRING(1)
    }
})//Agregar mas datos
Employee.addScope('defaultScope', {
    where: { status: 'A' },
    order: [['id', 'desc']],
}, { override: true })


export default Employee;