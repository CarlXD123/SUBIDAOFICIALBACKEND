"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const CategoryMapper_1 = require("../mapper/CategoryMapper");
const sCategory_1 = __importDefault(require("../services/sCategory"));
const mapper = new CategoryMapper_1.CategoryMapper();
class CategoryController {
    constructor() {
    }
    getAllCategory(_req, _res) {
        try {
            const Categories = sCategory_1.default.getAllCategory();
            Categories.then((c) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                c.forEach((x) => {
                    let mapeado = {};
                    mapper.map(x, mapeado);
                    result.data.push(mapeado);
                });
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    createCategory(_req, _res) {
        try {
            let body = _req.body;
            sCategory_1.default.createCategory(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I015",
                    "text": "Categoría - Creado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getCategory(_req, _res) {
        try {
            let id = _req.params.id;
            let category = sCategory_1.default.getCategory(id);
            category.then((c) => {
                let result = {
                    "status": true,
                    "data": c
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateCategory(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const category = sCategory_1.default.updateCategory(id, body);
            category.then((c) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I017",
                        "text": "Categoría - Modificado exitosamente!"
                    }
                };
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    deleteCategory(_req, _res) {
        try {
            let id = _req.params.id;
            sCategory_1.default.destroyCategory(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I019",
                    "text": "Categoría - Eliminado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const categoryController = new CategoryController();
exports.default = categoryController;
