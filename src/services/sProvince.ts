import District from '../models/District';
class ProvinceServicios {
    constructor() {
    }
    public static async getDistrictsForProvince(id: any) {
        const districts = await District.findAll({
            where:{
               ProvinceId:id 
            }
        })
        return districts;
    }
}
export default ProvinceServicios;