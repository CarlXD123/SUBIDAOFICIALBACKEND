import db from '../config/config.database';
import Service from '../models/Service';

class ServiceServicios {
    constructor() {
    }
    public static async getAllService() {
        return await Service.findAll({
            order: [["name", "ASC"]],
        });
        
    }
    public static async getPagedService(offset: any, limit: any) {
        const { count: total, rows } = await Service.findAndCountAll({
            offset,
            limit,
        });
        const result = {
            total,
            count: rows.length,
            data: rows
        };

        return result
    }
    public static async createService(data: any) {
        const profession = await Service.create(data);
        return profession;

    }
    public static async getService(id: any) {
        const service = await Service.findByPk(id);
        if (!service) {
            //console.log("Error");
        }
        return service;
    }
    public static async updateService(id: any, data: any) {
        const service = await Service.findByPk(id);
        if (!service) {
            //console.log("Error");
        }
        return service.update(data);
    }
    public static async destroyService(id: any) {
        const service = await Service.findByPk(id);
        if (!service) {
            //console.log("Error");
        }
        return service.destroy();
    }

}
export default ServiceServicios;