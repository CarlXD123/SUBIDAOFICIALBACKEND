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
const HeadquarterMapper_1 = require("../mapper/HeadquarterMapper");
const sHeadquarter_1 = __importDefault(require("../services/sHeadquarter"));
const mapper = new HeadquarterMapper_1.HeadquarterMapper();
class HeadQuarterController {
    constructor() {
    }
    getAllHeadquarter(_req, _res) {
        try {
            const headquarters = sHeadquarter_1.default.getAllHeadquarter();
            headquarters.then((h) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                h.forEach((x) => {
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
    getHeadquarter(_req, _res) {
        try {
            const id = _req.params.id;
            const headquarter = sHeadquarter_1.default.getHeadquarter(id);
            headquarter.then((h) => {
                let result = {
                    "status": true,
                    "data": h
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateHeadquarter(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = _req.body;
                //let data = JSON.parse(Helpers.getFirstPropertyOfObject(_req.body));
                //let image = Helpers.getFirstPropertyOfObject(_req.body);
                let image = _req.body.file;
                let id = _req.params.id;
                yield sHeadquarter_1.default.updateHeadquarter(id, data, image);
                let result = {
                    "status": true,
                    "message": {
                        "code": "H002",
                        "text": "Sede - Modificada exitosamente!"
                    }
                };
                //console.log(result);
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    createHeadquarter(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //let image = Helpers.getFirstPropertyOfObject(_req.params);
                let image = _req.body.file;
                //console.log(_req.body)
                //let data = JSON.parse(Helpers.getFirstPropertyOfObject(_req.body));
                let data = _req.body;
                yield sHeadquarter_1.default.createHeadquarter(data, image);
                let result = {
                    "status": true,
                    "message": {
                        "code": "H002",
                        "text": "Sede - Creada exitosamente!"
                    }
                };
                //console.log(result);
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
}
const headQuarterController = new HeadQuarterController();
exports.default = headQuarterController;
