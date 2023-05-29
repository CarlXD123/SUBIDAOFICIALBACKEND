import db from '../config/config.database';
import Category from "../models/Category";

class CategoryController {
    constructor() {
    }
    public static async getAllCategory(){
        return await Category.findAll();
    }
    public static createCategory(data:any){
        db.transaction(async (transaction) => {
            const category = await Category.create(data, { transaction });
        
            return category;
        });
    }
    public static async getCategory(id:any){
        const category = await Category.findByPk(id);
        if(!category) {
            //console.log("Error");
        }
        return category;
    }
    public static async updateCategory(id:any, data:any){
        const category = await CategoryController.getCategory(id);
        await category.update(data);
    }
    public static async destroyCategory(id:any){
        const category = await CategoryController.getCategory(id);
        await category.destroy();
    }

}
export default CategoryController;