import db from '../config/config.database';
import Doctors from '../models/Doctors';
class DoctorServicios {
    constructor() {
    }

    public static async getAllDoctors() {
        return await Doctors.findAll();
    }
    public static addDoctor(data: any) {
        db.transaction(async (transaction) => {
            const doctor = await Doctors.create(data, { transaction });
            return doctor;
        })
    }
}
export default DoctorServicios;