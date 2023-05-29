import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";
import Client from "./Client";

export type AppointmentAtributos = {
    time12h: any;
    status: string;
    dateAppointmentEU: string;
    dateAppointmentUS: string;
    id: number,
    code: string,
    time: string,
    dateAppointment: string,
    totalPrice: string,
    discount: string,
    finalPrice: string,
    result: string
    ResponsibleId: number
}
const config = {
    tableName: 'Appointments',
    sequelize: db,
};
class Appointment extends Model {
    public time12h: any;
    public status: string;
    public dateAppointmentEU: string;
    public dateAppointmentUS: string;
    public id: number;
    public code: string;
    public time: string;
    public dateAppointment: string;
    public totalPrice: string;
    public discount: string;
    public finalPrice: string;
    public result: string;
    public ClientId: number;
    public refererCode: string;
    public ResponsibleId: number;
    public statusStr: string;
    public PriceListId: number;
    public HeadquarterId: number;
    public RefererId: number;
    public DoctorId:number;
    public doctorNotes: string;

}
Appointment.init(
    {
        code: DataTypes.STRING,
        time: DataTypes.STRING,
        dateAppointment: DataTypes.DATE,
        totalPrice: DataTypes.DOUBLE,
        discount: DataTypes.DOUBLE,
        finalPrice: DataTypes.DOUBLE,
        result: DataTypes.STRING,
        status: DataTypes.STRING,
        refererCode: DataTypes.STRING,
        ResponsibleId: DataTypes.INTEGER,
        ClientId: DataTypes.INTEGER,
        PriceListId: DataTypes.INTEGER,
        HeadquarterId: DataTypes.INTEGER,
        RefererId: DataTypes.INTEGER,
        DoctorId: DataTypes.INTEGER,
        doctorNotes: DataTypes.STRING
    },
    config
)
type AppointmentCreateAtributos = Optional<AppointmentAtributos, 'id'>;
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



export default Appointment;