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
const UserMapper_1 = require("../mapper/UserMapper");
const sUser_1 = __importDefault(require("../services/sUser"));
const sEmployee_1 = __importDefault(require("../services/sEmployee"));
const response_1 = require("../global/response");
const config_database_1 = __importDefault(require("../config/config.database"));
const sequelize_1 = require("sequelize");
const jwt_simple_1 = require("jwt-simple");
const Headquarter_1 = __importDefault(require("../models/Headquarter"));
const mailer_1 = require("../global/mailer");
const mapper = new UserMapper_1.UserMapper();
class UserController {
    constructor() {
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers.authorization) {
                let base64 = req.headers.authorization.split(' ')[1]; // ['Basic', 'amNoaXF1aW46MTIzNDU=']
                let decodedBase64 = Buffer.from(base64, 'base64').toString(); // 'jchiquin:12345'
                let [username, password] = decodedBase64.split(':'); //['jchiquin', '12345']
                ////console.log(username)
                ////console.log(password)
                username = username.toLowerCase();
                try {
                    const user = yield sUser_1.default.getUserByCredentials(username, password);
                    let accessToken = (0, jwt_simple_1.encode)(user, process.env.SECRET_KEY);
                    let jsondata = {};
                    ////console.log(user.get('id'))
                    const dataa = yield sUser_1.default.getDataUser(user.get('id'));
                    ////console.log(dataa)
                    let role = {};
                    if (dataa.a != null) {
                        ////console.log(dataa.a)
                        const headquarter = yield Headquarter_1.default.findByPk(dataa.a.HeadquarterId);
                        //console.log("empleado")
                        jsondata = {
                            id: dataa.a.id,
                            dni: dataa.a.dni,
                            name: dataa.a.name,
                            lastNameP: dataa.a.lastNameP,
                            lastNameM: dataa.a.lastNameM,
                            displayName: dataa.a.name + " " + dataa.a.lastNameP,
                            birthDate: (dataa.a.birthDate.split('-')[2] + '/' + dataa.a.birthDate.split('-')[1] + '/' + dataa.a.birthDate.split('-')[0]),
                            gender: dataa.a.gender,
                            phoneNumber: dataa.a.phoneNumber,
                            tlfNumber: dataa.a.tlfNumber,
                            address: dataa.a.address,
                            headquarter: headquarter.get()
                        };
                        role = (yield config_database_1.default.query(`	SELECT 
          r.id,
          r."name",
          r.description,
          'employee' as "roleStr"
        FROM public."UserRole" ur
        left join public."Roles" r on ur."RoleId"=r."id"
        where ur."UserId"= ${user.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
                    }
                    else if (dataa.b != undefined) {
                        const headquarter = {};
                        const cliente = dataa.b;
                        //console.log("cliente")
                        jsondata = {
                            id: cliente.id,
                            dni: cliente.dni,
                            code: cliente.code,
                            name: cliente.name,
                            lastNameP: cliente.lastNameP,
                            lastNameM: cliente.lastNameM,
                            displayName: cliente.name + " " + cliente.lastNameP,
                            birthDate: (cliente.birthDate.split('-')[2] + '/' + cliente.birthDate.split('-')[1] + '/' + cliente.birthDate.split('-')[0]),
                            gender: cliente.gender,
                            headquarter: headquarter
                        };
                        role = (yield config_database_1.default.query(`SELECT 
          r.id,
          r."name",
          r.description,
          'client' as "roleStr"
        FROM public."UserRole" ur
        left join public."Roles" r on ur."RoleId"=r."id"
        where ur."UserId"=  ${user.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
                    }
                    //role
                    //mapper
                    let mapeado = {};
                    let mapa = {};
                    mapper.map(user.get(), mapa);
                    mapeado.user = mapa;
                    mapeado.person = jsondata;
                    mapeado.accessToken = accessToken;
                    mapeado.roles = [role];
                    let result = {
                        "status": true,
                        "data": mapeado
                    };
                    res.status(200).json(result);
                }
                catch (err) {
                    let datosincorrectos = {
                        "status": false,
                        "message": {
                            "code": "E006",
                            "text": "Datos incorrectos!"
                        }
                    };
                    res.status(200).json(datosincorrectos);
                    //makeResponseException(res, err);
                }
            }
            else {
                let datosincorrectos = {
                    "status": false,
                    "message": {
                        "code": "E006",
                        "text": "Autorizacion Denegada!"
                    }
                };
                res.status(200).json(datosincorrectos);
            }
        });
    }
    getUsers(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = sUser_1.default.getUserAll();
                users.then((p) => __awaiter(this, void 0, void 0, function* () {
                    let result = {
                        "status": true,
                        "data": [undefined]
                    };
                    result.data = [];
                    for (const x of p) {
                        let jsondata = {};
                        const dataa = yield sUser_1.default.getDataUser(x.id);
                        ////console.log(dataa)
                        if (dataa.a != undefined) {
                            //console.log("empleado")
                            jsondata = {
                                id: dataa.a.id,
                                identificaction: dataa.a.dni,
                                firstName: dataa.a.name,
                                lastName: dataa.a.lastNameP + " " + dataa.a.lastNameM,
                                gender: dataa.a.gender,
                                phoneNumber: dataa.a.phoneNumber,
                            };
                        }
                        else if (dataa.b != undefined) {
                            //console.log("cliente")
                            jsondata = {
                                id: dataa.b.get("id"),
                                identificaction: dataa.b.get("dni"),
                                firstName: dataa.b.get("name"),
                                lastName: dataa.b.get("lastNameP") + " " + dataa.b.get("lastNameM"),
                                gender: dataa.b.get("gender"),
                                phoneNumber: dataa.b.get("phoneNumber")
                            };
                        }
                        //mapper
                        let mapeado = {};
                        mapper.map(x, mapeado);
                        mapeado.person = jsondata;
                        result.data.push(mapeado);
                    }
                    //console.log(result);
                    res.status(200).json(result);
                }));
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(res, error);
            }
        });
    }
    getUserById(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = _req.params.userId;
                const user = (yield sUser_1.default.getUserById(userId)).get();
                if (user != undefined) {
                    let result = {
                        "status": true,
                        "data": {
                            'user': {},
                            person: {},
                            roles: {}
                        }
                    };
                    let jsondata = {};
                    const dataa = yield sUser_1.default.getDataUser(user.id);
                    let role = {};
                    ////console.log(dataa)
                    if (dataa.a != undefined) {
                        const headquarter = yield Headquarter_1.default.findByPk(dataa.a.HeadquarterId);
                        //console.log("empleado")
                        jsondata = {
                            id: dataa.a.id,
                            dni: dataa.a.dni,
                            name: dataa.a.name,
                            lastNameP: dataa.a.lastNameP,
                            lastNameM: dataa.a.lastNameM,
                            displayName: dataa.a.name + " " + dataa.a.lastNameP,
                            birthDate: dataa.a.birthDate ? (dataa.a.birthDate.split('-')[2] + '/' + dataa.a.birthDate.split('-')[1] + '/' + dataa.a.birthDate.split('-')[0]) : null,
                            gender: dataa.a.gender,
                            phoneNumber: dataa.a.phoneNumber,
                            tlfNumber: dataa.a.tlfNumber,
                            address: dataa.a.address,
                            headquarter: headquarter.get()
                        };
                    }
                    else if (dataa.b != undefined) {
                        const headquarter = {};
                        const cliente = dataa.b;
                        //console.log("cliente")
                        jsondata = {
                            id: cliente.id,
                            dni: cliente.dni,
                            name: cliente.name,
                            lastNameP: cliente.lastNameP,
                            lastNameM: cliente.lastNameM,
                            displayName: cliente.name + " " + cliente.lastNameP,
                            birthDate: cliente.birthDate ? (cliente.birthDate.split('-')[2] + '/' + cliente.birthDate.split('-')[1] + '/' + cliente.birthDate.split('-')[0]) : null,
                            gender: cliente.gender,
                            phoneNumber: cliente.phoneNumber,
                            tlfNumber: cliente.tlfNumber,
                            address: cliente.address,
                            headquarter: headquarter
                        };
                    }
                    role = (yield config_database_1.default.query(`	SELECT 
        r.id,
        r."name",
        r.description,
        'employee' as "roleStr"
      FROM public."UserRole" ur
      left join public."Roles" r on ur."RoleId"=r."id"
      where ur."UserId"= ${user.id}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
                    let mapeado = {};
                    mapper.map(user, mapeado);
                    result.data.user = mapeado;
                    result.data.roles = role;
                    result.data.person = jsondata;
                    _res.status(200).json(result);
                }
                else {
                    response_1.ExecuteResponce.makeResponseException(_res, "Usuario bloqueado");
                }
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    getMenuForUser(_req, _res) {
        try {
            const userId = _req.params.user_id;
            const functions = sUser_1.default.getMenuForUser(userId);
            functions.then((p) => {
                let result = {
                    "status": true,
                    "data": p
                };
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getMenuMobileForUser(_req, _res) {
        try {
            const userId = _req.params.user_id;
            const functions = sUser_1.default.getMenuForUser(userId, 'M');
            functions.then((p) => {
                let result = {
                    "status": true,
                    "data": p
                };
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getRolesByUser(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = _req.params.user_id;
                const roles = yield sUser_1.default.getRolesByUser(userId);
                for (const rol of roles) {
                    const funcio = yield config_database_1.default.query(`SELECT  distinct *
       FROM public."Functions" f
       inner join "RoleFunctions" rf on rf."FunctionId"= f.id
       where rf."RoleId" = ${rol.RoleId}`, { type: sequelize_1.QueryTypes.SELECT });
                    rol.functions = funcio;
                }
                let result = {
                    "status": true,
                    "data": roles
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    removeUserRole(_req, _res) {
        try {
            const user_id = _req.params.user_id;
            const role_id = _req.params.role_id;
            sUser_1.default.takeOffRole(role_id, user_id);
            let result = {
                "status": true,
                "message": {
                    "code": "I010",
                    "text": "UserRol - Eliminado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    validToken(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, token } = _req.params;
                const tokenValid = yield sUser_1.default.validToken(token, userId);
                const user = tokenValid;
                let jsondata = {};
                const dataa = yield sUser_1.default.getDataUser(user.id);
                if (dataa.a != undefined) {
                    //console.log("empleado")
                    jsondata = {
                        id: dataa.a.id,
                        identificaction: dataa.a.dni,
                        firstName: dataa.a.name,
                        lastName: dataa.a.lastNameP + " " + dataa.a.lastNameM,
                        gender: dataa.a.gender,
                        phoneNumber: dataa.a.phoneNumber,
                    };
                }
                else if (dataa.b != undefined) {
                    //console.log("cliente")
                    jsondata = {
                        id: dataa.b.get("id"),
                        identificaction: dataa.b.get("dni"),
                        firstName: dataa.b.get("name"),
                        lastName: dataa.b.get("lastNameP") + " " + dataa.b.get("lastNameM"),
                        gender: dataa.b.get("gender"),
                        phoneNumber: dataa.b.get("phoneNumber")
                    };
                }
                let mapeado = {};
                mapper.map(user, mapeado);
                mapeado.person = jsondata;
                let result = {
                    "status": true,
                    "data": mapeado
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    resetPasswordUser(_req, _res) {
        try {
            //const { newPassword, userId } = _req.fields;
            //await sUser.resetPasswordUser(userId, newPassword);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateUser(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = _req.params.userId;
                const body = _req.body;
                yield sUser_1.default.updateUser(userId, body);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I010",
                        "text": "La contraseña se actualizó correctamente"
                    }
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    addUserRoles(_req, _res) {
        try {
            const user_id = _req.params.user_id;
            const body = _req.body;
            //sUser.assignRoles(body, user_id);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    sendResetPassword(_req, _res) {
        try {
            // const { email } = _req.fields;
            // const user = await sUser.getUserByEmail(email);
            // const token = await sUser.createToken(user);
            // const url = `${config.urlFront}:${config.portFront}/reset/${user.id}/${token.hash}`;
            // const emailData = { email: user.username, url };
            // //res.status(200).json(emailData);
            // // Send email with password
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    addEmployee(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fields = _req.body;
                const file = _req.body.file;
                const employee = yield sUser_1.default.createUserEmployee(fields, file);
                yield UserController.sendCredentials(employee, _res);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    addClient(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fields = _req.body;
                const client = yield sUser_1.default.createUserCliente(fields);
                yield UserController.sendCredentials(client, _res);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }

    static sendCredentials(userExtension, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield sUser_1.default.getUserById(userExtension.UserId);
                const { username, password } = user.get();
                const { name, lastNameP } = userExtension;
                const emailData = { email: username, password: password, fullname: `${name} ${lastNameP}` };
                // Send email with password
                (0, mailer_1.sendPassword)(emailData);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I001",
                        "text": "Usuario - Creado exitosamente!"
                    }
                };
                res.status(200).json(result);  
            }
            catch (err) {
                response_1.ExecuteResponce.makeResponseException(res, err);
            }
        });
    }   
}
const userController = new UserController();
exports.default = userController;
