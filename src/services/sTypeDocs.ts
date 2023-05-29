import db from "../config/config.database";
import TypeDocs from "../models/TypeDocs";

class TypeDocsServicios {
    constructor() {
    }
    public static async getPagedTypeDoc(offset: any, limit: any) {
        const { count: total, rows } = await TypeDocs.findAndCountAll({
            offset,
            limit
        });

        const result = {
            total,
            count: rows.length,
            data: rows
        }

        return result
    }
    public static async getAllTypeDoc() {
        return await TypeDocs.findAll();
    }
    public static createTypeDoc(data: any) {
        db.transaction(async (transaction) => {
            const typeDoc = await TypeDocs.create(data, { transaction });
            return typeDoc;
        });
    }
    public static async getTypeDocs(id: any) {
        const typeDoc = await TypeDocs.findByPk(id);
        if (!typeDoc) {
            //console.log("Error");
        }
        return typeDoc;
    }
    public static async updateProfession(id: any, data: any) {
        const typeDoc = await TypeDocsServicios.getTypeDocs(id);
        if (!typeDoc) {
            //console.log("Error");
        }
        await typeDoc.update(data);
    }
    public static async destroyProfession(id: any) {
        const typeDoc = await TypeDocsServicios.getTypeDocs(id);
        if (!typeDoc) {
            //console.log("Error");
        }
        await typeDoc.destroy();
    }
}
export default TypeDocsServicios;