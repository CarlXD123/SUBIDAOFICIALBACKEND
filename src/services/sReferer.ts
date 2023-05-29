
import db from "../config/config.database";
import Referer from "../models/Referer"

class sReferer {
    constructor(){

    }

    public static async getAllReferers() {
        return await Referer.findAll();
    }
    public static addReferer(data:any) {

        db.transaction(async (transaction) => {
            const referer = await Referer.create(data, { transaction });
        
            return referer;
        });
    }

}
export default sReferer;