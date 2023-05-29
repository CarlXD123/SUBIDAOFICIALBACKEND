"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const response_1 = require("../global/response");
const ApilisBrandComplete_1 = require("../mapper/ApilisBrandComplete");
const ApilisBrandMapper_1 = require("../mapper/ApilisBrandMapper");
const sApilisBrand_1 = __importDefault(require("../services/sApilisBrand"));
const mapper = new ApilisBrandMapper_1.ApilisBrandMapper();
const mapperBrand = new ApilisBrandComplete_1.ApilisBrandCompleteMapper();
class ApilisBrandController {
    constructor() {
    }

    getAllBrand(_req, _res) {
        try {
            const range = _req.params.range || '[0,5000]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const query = _req.query;
            const brand = sApilisBrand_1.default.getAllBrand(start, limit, query);
            brand.then((m) => {
                let result = Object.assign({ "status": true }, m);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }

    getBrand(_req, _res) {
        try {
            let id = _req.params.id;
            let brand = sApilisBrand_1.default.getBrand(id);
            brand.then((a) => __awaiter(this, void 0, void 0, function* () {
                let result = {
                    "status": true,
                    "data": a
                };
                result.data = [];
                const bra = yield sApilisBrand_1.default.getModelByBrand(id);
                let mapeado = {};
                mapperBrand.map(a, mapeado);
                if (bra != undefined)
                    mapeado.modelos = bra;
                result.data = mapeado;
                //console.log(result);
                _res.status(200).json(result);
            }));
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }

    addBrand(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = _req.body;
                yield sApilisBrand_1.default.addBrand(body);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I034",
                        "text": "Cita - Creada exitosamente!"
                    }
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }

    updateBrand(_req, _res) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            const brand = sApilisBrand_1.default.updateBrand(id, data);
            brand.then((a) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "Profesión - Modificado exitosamente!"
                    }
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }

    deleteBrand(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                sApilisBrand_1.default.destroyBrand(id);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I028",
                        "text": "Cita - Eliminado exitosamente!"
                    }
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
}

const apilisBrandController = new ApilisBrandController();
exports.default = apilisBrandController;