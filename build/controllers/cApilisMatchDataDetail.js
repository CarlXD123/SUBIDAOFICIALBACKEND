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
const sApilisMatchDataDetail_1 = __importDefault(require("../services/sApilisMatchDataDetail"));

class ApilisMatchDataDetailController {
    constructor() {
    }

    getAllMatchDataDetail(_req, _res) {
        try {
            const range = _req.params.range || '[0,5000]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            let matchdetail = sApilisMatchDataDetail_1.default.getAllMatchDataDetail(start, limit);
            matchdetail.then((a) => {
                let result = {
                    "status": true,
                    "data": a
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }

    getExamValueByExamination(_req, _res) {
        try {
            let id = _req.params.id;
            let matchdetail = sApilisMatchDataDetail_1.default.getExamValueByExamination(id);
            matchdetail.then((c) => {
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

    getExamValueByExamination2(_req, _res) {
        try {
            let id = _req.params.id;
            let matchdetail = sApilisMatchDataDetail_1.default.getExamValueByExamination2(id);
            matchdetail.then((c) => {
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


    getMatchDataDetail(_req, _res) {
        try {
            let id = _req.params.id;
            let matchdetail = sApilisMatchDataDetail_1.default.getMatchDataDetail(id);
            matchdetail.then((c) => {
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

    addMatchDataDetail(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = _req.body;
                yield sApilisMatchDataDetail_1.default.addMatchDataDetail(body);
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

    updateMatchDataDetail(_req, _res) {
        try {
            const { priorityid, idvalueexam } = _req.body;
            sApilisMatchDataDetail_1.default.updateMatchDataDetail(priorityid, idvalueexam);
            _res.status(200).json({ message: "Match data detail updated successfully" });
          } catch (error) {
            console.error(error);
            _res.status(500).json({ message: "Error updating match data detail" });
          }
    }

    deleteMatchDataDetail(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                sApilisMatchDataDetail_1.default.destroyMatchDataDetail(id);
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

const apilisMatchDataDetailController = new ApilisMatchDataDetailController();
exports.default = apilisMatchDataDetailController;