"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const ProvinceMapper_1 = require("../mapper/ProvinceMapper");
const sProvince_1 = __importDefault(require("../services/sProvince"));
const mapper = new ProvinceMapper_1.ProvinceMapper();
class ProvinceController {
    constructor() {
    }
    getDistrictsForProvince(_req, _res) {
        try {
            let id = _req.params.id;
            let districts = sProvince_1.default.getDistrictsForProvince(id);
            districts.then((p) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                p.forEach((x) => {
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
}
const provinceController = new ProvinceController();
exports.default = provinceController;
