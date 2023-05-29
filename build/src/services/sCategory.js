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
const config_database_1 = __importDefault(require("../config/config.database"));
const Category_1 = __importDefault(require("../models/Category"));
class CategoryController {
    constructor() {
    }
    static getAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.default.findAll();
        });
    }
    static createCategory(data) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_1.default.create(data, { transaction });
            return category;
        }));
    }
    static getCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_1.default.findByPk(id);
            if (!category) {
                //console.log("Error");
            }
            return category;
        });
    }
    static updateCategory(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield CategoryController.getCategory(id);
            yield category.update(data);
        });
    }
    static destroyCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield CategoryController.getCategory(id);
            yield category.destroy();
        });
    }
}
exports.default = CategoryController;
