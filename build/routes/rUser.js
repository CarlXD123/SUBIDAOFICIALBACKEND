"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Importacion controller user
const cUser_1 = __importDefault(require("../controllers/cUser"));
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/', cUser_1.default.getUsers);
        this.router.get('/menu/:user_id', cUser_1.default.getMenuForUser);
        this.router.get('/:userId', cUser_1.default.getUserById);
        this.router.get('/menu/mobile/:user_id', cUser_1.default.getMenuMobileForUser);
        this.router.get('/role/:user_id', cUser_1.default.getRolesByUser);
        this.router.get('/:user_id/remove_role/:role_id', cUser_1.default.removeUserRole);
        this.router.get('/valid/token/:userId/:token', cUser_1.default.validToken);
        this.router.put('/reset/password', cUser_1.default.resetPasswordUser);
        this.router.put('/:userId', cUser_1.default.updateUser);
        this.router.put('/role/:user_id', cUser_1.default.addUserRoles);
        this.router.post('/forgot/password', cUser_1.default.sendResetPassword);
        this.router.post('/employee', cUser_1.default.addEmployee);
        this.router.post('/client', cUser_1.default.addClient);
    }
}
const userRouter = new UserRouter();
exports.default = userRouter.router;
