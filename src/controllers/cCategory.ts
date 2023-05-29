import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mCategory } from "../mapper/category/mCategory";
import { CategoryMapper } from "../mapper/CategoryMapper";
import { CategoryAtributos } from "../models/Category";
import sCategory from '../services/sCategory'
const mapper = new CategoryMapper();
class CategoryController {
    constructor() {
    }
    public getAllCategory(_req: Request, _res: Response) {
        try {
            const Categories = sCategory.getAllCategory();
            Categories.then((c: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                c.forEach((x: any) => {
                    let mapeado: any = {};
                    mapper.map<CategoryAtributos, mCategory>(x, mapeado);
                    result.data.push(mapeado);
                });
                //console.log(result);
                _res.status(200).json(result);
            });


        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public createCategory(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sCategory.createCategory(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I015",
                    "text": "Categoría - Creado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getCategory(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let category = sCategory.getCategory(id);
            category.then((c: any) => {
                let result = {
                    "status": true,
                    "data": c
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateCategory(_req: Request, _res: Response) {
        try {
            let body = _req.body
            let id = _req.params.id
            const category = sCategory.updateCategory(id, body);
            category.then((c: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I017",
                        "text": "Categoría - Modificado exitosamente!"
                    }
                }
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteCategory(_req: Request, _res: Response) {
        try {
            let id = _req.params.id
            sCategory.destroyCategory(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I019",
                    "text": "Categoría - Eliminado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const categoryController = new CategoryController();
export default categoryController;