"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const TypeAgreementMapper_1 = require("../mapper/TypeAgreementMapper");
const sTypeAgreement_1 = __importDefault(require("../services/sTypeAgreement"));
const mapper = new TypeAgreementMapper_1.TypeAgreementMapper();
class TypeAgreementController {
    constructor() {
    }
    getAllTypeAgreement(_req, _res) {
        try {
            const typeAgreements = sTypeAgreement_1.default.getAllTypeAgreement();
            typeAgreements.then((t) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                t.forEach((x) => {
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
const typeAgreementController = new TypeAgreementController();
exports.default = typeAgreementController;
