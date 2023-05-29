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
const PriceListComplete_1 = require("../mapper/PriceListComplete");
const PriceListMapper_1 = require("../mapper/PriceListMapper");
const sPriceList_1 = __importDefault(require("../services/sPriceList"));
const mapper = new PriceListMapper_1.PriceListMapper();
const mappercomplete = new PriceListComplete_1.PriceListCompleteMapper();
class PriceListController {
    constructor() {
    }
    getAllPriceList(_req, _res) {
        try {
            const query = _req.query;
            const pricesList = sPriceList_1.default.getAllPriceList(query);
            pricesList.then((p) => __awaiter(this, void 0, void 0, function* () {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                //console.log(p);
                for (const x of p) {
                    const ex = yield sPriceList_1.default.getExaminationsByPriceList(x.id);
                    let mapeado = {};
                    mapper.map(x, mapeado);
                    if (ex != undefined)
                        mapeado.examinations = ex;
                    result.data.push(mapeado);
                }
                //console.log(result);
                _res.status(200).json(result);
            }));
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    createPriceList(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = _req.body;
                yield sPriceList_1.default.createPriceList(body);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I040",
                        "text": "PriceList - Creado exitosamente!"
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
    getPriceList(_req, _res) {
        try {
            let id = _req.params.id;
            let priceList = sPriceList_1.default.getPriceList(id);
            priceList.then((p) => __awaiter(this, void 0, void 0, function* () {
                let result = {
                    "status": true,
                    "data": p
                };
                const price = yield sPriceList_1.default.getPriceListByExamination(id);
                let mapeado = {};
                mappercomplete.map(p, mapeado);
                if (price != undefined)
                    mapeado.examinations = price;
                result.data = mapeado;
                _res.status(200).json(result);
            }));
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updatePriceList(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = _req.body;
                let id = _req.params.id;
                yield sPriceList_1.default.updatePriceList(id, body);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I042",
                        "text": "PriceList - Modificado exitosamente!"
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
    deletePriceList(_req, _res) {
        try {
            let id = _req.params.id;
            sPriceList_1.default.destroyPriceList(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I044",
                    "text": "PriceList - Elminado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const priceListController = new PriceListController();
exports.default = priceListController;
