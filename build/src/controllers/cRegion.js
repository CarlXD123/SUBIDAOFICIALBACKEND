"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const ProvinceMapper_1 = require("../mapper/ProvinceMapper");
const RegionMapper_1 = require("../mapper/RegionMapper");
const sRegion_1 = __importDefault(require("../services/sRegion"));
const mapper = new RegionMapper_1.RegionMapper();
const mapperProvincia = new ProvinceMapper_1.ProvinceMapper();
class RegionController {
    constructor() {
    }
    getRegions(_req, _res) {
        try {
            let regions = sRegion_1.default.getRegionsAll();
            regions.then((r) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                r.forEach((x) => {
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
    getProvincesForRegion(_req, _res) {
        try {
            let id = _req.params.id;
            let provinces = sRegion_1.default.getProvincesForRegion(id);
            provinces.then((p) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                p.forEach((x) => {
                    let mapeado = {};
                    mapperProvincia.map(x, mapeado);
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
const regionController = new RegionController();
exports.default = regionController;
