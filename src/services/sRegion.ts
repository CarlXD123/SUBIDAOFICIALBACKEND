import Province from '../models/Province';
import Region from '../models/Region';

class RegionServicios {
    constructor() {
    }
    public static async getRegionsAll() {
        return await Region.findAll();
    }

    public static async getProvincesForRegion(id: any) {
        const province = await Province.findAll({
            where:{
               RegionId:id 
            }
        })
        return province;
    }
}
export default RegionServicios;