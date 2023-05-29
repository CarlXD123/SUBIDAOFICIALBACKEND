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
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const constants_file_1 = __importDefault(require("../config/properties/constants.file"));
const Client_1 = __importDefault(require("../models/Client"));
class ClientServicios {
    constructor() {
    }
    static buildQuery(query) {
        //let where = {status:'A'};
        let where = {};
        if (query.fullname) {
            where = {
                [sequelize_1.Op.or]: [
                    {
                        name: { [sequelize_1.Op.iLike]: `%${query.fullname}%` }
                    },
                    {
                        lastNameP: { [sequelize_1.Op.iLike]: `%${query.fullname}%` }
                    },
                    {
                        lastNameM: { [sequelize_1.Op.iLike]: `%${query.fullname}%` }
                    },
                ]
            };
        }
        if (query.dni) {
            where['dni'] = { [sequelize_1.Op.iLike]: `%${query.dni}%` };
        }
        ;
        if (query.passport) {
            where['dni'] = query.passport;
            where['TypeDocId'] = 2;
        }
        ;
        return where;
    }
    static getClientAll(offset, limit, query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = ClientServicios.buildQuery(query);
            const { count: total, rows } = yield Client_1.default.findAndCountAll({
                where,
                offset: offset,
                limit: limit,
                distinct: true
            });
            //console.log("offset : ", offset);
            //console.log("limit : ", limit);
            //console.log("filas : ", rows.length);
            let datos = [];
            for (const r of rows) {
                const daton = (yield config_database_1.default.query(`SELECT 
            u.id userid, u.username userusername, u."urlAvatar" userurlavatar,
            td.id TypeDocsid, e.dni TypeDocsdni, td."name" TypeDocsname,
            d.id districtid, d."name" districtname,
            pr.id Provincesid, pr."name" Provincesname,
            re.id regionid, re."name" regionname
        
            FROM public."Clients" e
            left join "Users" u on e."UserId" = u.id
            left join "TypeDocs" td on td.id = e."TypeDocId"
            left join "Districts" d on d.id = e."DistrictId"
            left join "Provinces" pr on pr.id = d."ProvinceId"
            left join "Regions" re on re.id = pr."RegionId"
            
            where e."id"=${r.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
                let persona = r.get();
                persona.birthDateUS = persona.birthDate;
                persona.birthDate = this.parseFechas(persona.birthDate);
                //AGREGAR CAMPOS DESDE EL CONSTANTS
                persona.genderStr = constants_file_1.default.GENDER_STR[persona.gender];
                persona.civilStatusStr = constants_file_1.default.CIVIL_STATUS_STR[persona.civilStatus];
                const roles = yield this.getRoleByUser(daton.userid);
                let rolesid = roles.map(p => p.id);
                datos.push({
                    user: {
                        id: daton.userid,
                        username: daton.userusername,
                        urlAvatar: daton.userurlavatar
                    },
                    person: Object.assign({}, persona),
                    "typeDoc": {
                        "id": daton.typedocsid,
                        "dni": daton.typedocsdni,
                        "name": daton.typedocsname
                    },
                    "district": {
                        "id": daton.districtid,
                        "name": daton.districtname,
                        "value": daton.districtid,
                        "label": daton.districtname
                    },
                    "province": {
                        "id": daton.provincesid,
                        "name": daton.provincesname,
                        "value": daton.provincesid,
                        "label": daton.provincesname
                    },
                    "region": {
                        "id": daton.regionid,
                        "name": daton.regionname,
                        "value": daton.regionid,
                        "label": daton.regionname
                    },
                    roles: roles,
                    rolesId: rolesid
                });
            }
            const result = {
                total,
                count: rows.length,
                data: datos
            };
            return result;
        });
    }
    static parseFechas(fecha) {
        if (fecha != null) {
            return fecha.split('-')[2] + '/' + fecha.split('-')[1] + '/' + fecha.split('-')[0];
        }
        return null;
    }
    static getClientByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = (yield config_database_1.default.query(`SELECT 
        C.*
        FROM public."Clients" C
        left join public."Users" u ON u.id = C."UserId"
        where C.id= ${id}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
            return cliente;
        });
    }
    static getClientByDOC(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = { status: 'A' };
            if (query.dni) {
                where['dni'] = query.dni;
            }
            if (query.passport) {
                where['dni'] = query.passport;
                where['TypeDocId'] = 2;
            }
            const client = yield Client_1.default.findOne({
                where,
            });
            if (!client) {
                //console.log("Error");
                return;
            }
            const dato = (yield config_database_1.default.query(`SELECT 
	    u.id userid,
	    u.username userusername,
	    u."urlAvatar" userurlavatar,
        d.id districtid,
	    d."name" districtname,
        p.id provincesid,
        p."name" provincesname,
        r.id regionid,
	    r."name" regionname,
        t.id typedocsid,
	    t."name" typedocsname,
	    t.description typedocsname,
        rl.id roleid,
	    rl."name" rolename,
	    rl.description rodes
        


	    FROM public."Clients" C
	    left join public."Users" u ON u.id = C."UserId"
        left join public."Districts" d on d.id = C."DistrictId"
        left join public."Provinces" p on p.id = d."ProvinceId"
        left join public."Regions" r on r.id = d.id
        left join public."TypeDocs" t on t.id = C."TypeDocId"
        left join public."UserRole" ur on ur."UserId" = C."UserId"
        left join public."Roles" rl on rl.id = C.id

	    where C.id= ${client.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
            let persona = client.get();
            persona.birthDateUS = persona.birthDate;
            persona.birthDate = this.parseFechas(persona.birthDate);
            //AGREGAR CAMPOS DESDE EL CONSTANTS
            persona.genderStr = constants_file_1.default.GENDER_STR[persona.gender];
            persona.civilStatusStr = constants_file_1.default.CIVIL_STATUS_STR[persona.civilStatus];
            let datos = {
                user: {
                    id: dato.userid,
                    username: dato.userusername,
                    urlAvatar: dato.userurlavatar
                },
                person: Object.assign({}, persona),
                district: {
                    id: dato.districtid,
                    name: dato.districtname,
                    value: dato.districtid,
                    label: dato.districtname
                },
                province: {
                    id: dato.provincesid,
                    name: dato.provincesname,
                    value: dato.provincesid,
                    label: dato.provincesname
                },
                region: {
                    id: dato.regionid,
                    name: dato.regionname,
                    value: dato.regionid,
                    label: dato.regionname
                },
                typeDoc: {
                    id: dato.typedocsid,
                    dni: persona.dni,
                    name: dato.typedocsname
                },
                roles: {
                    id: dato.roleid,
                    name: dato.rolename,
                    description: dato.rodes
                }
            };
            //console.log(datos)
            return datos;
        });
    }
    static getRoleByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield config_database_1.default.query(`SELECT 
                rf."RoleId" id,
                r."name",
                r.description
            FROM public."UserRole" rf 
            inner join "Roles" r on r.id = rf."RoleId"
            where rf."UserId" = ${id}`, { type: sequelize_1.QueryTypes.SELECT });
        });
    }
    static getClientByName(offset, limit, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = { status: "A" };
            if (query.name != "" && query.lastNameP != "") {
                where['name'] = query.name,
                    where['lastNameP'] = query.lastNameP;
                const { count: total, rows } = yield Client_1.default.findAndCountAll({
                    where,
                    // include: [{
                    //     model: models.User,
                    //     include: [{ model: models.Client }]
                    // }, {
                    //     model: models.TypeDoc
                    // }, {
                    //     model: models.District,
                    //     include: [{ model: models.Province, include: [{ model: models.Region }] }]
                    // }],
                    offset,
                    limit,
                    distinct: true
                });
                const result = {
                    total,
                    rows,
                    count: rows.length
                };
                return result;
            }
            else if (query.name != "" && query.lastNameP == "") {
                where['name'] = { [sequelize_1.Op.iLike]: `%${query.name}%` };
                const { count: total, rows } = yield Client_1.default.findAndCountAll({
                    where,
                    // include: [{
                    //     model: models.User,
                    //     include: [{ model: models.Client }]
                    // }, {
                    //     model: models.TypeDoc
                    // }, {
                    //     model: models.District,
                    //     include: [{ model: models.Province, include: [{ model: models.Region }] }]
                    // }],
                    offset,
                    limit,
                    distinct: true
                });
                const result = {
                    total,
                    rows,
                    count: rows.length
                };
                if (result.count == 0) {
                    let where = { status: "A" };
                    if (query.name) {
                        where['lastNameP'] = { [sequelize_1.Op.iLike]: `%${query.name}%` };
                    }
                    const { count: total, rows } = yield Client_1.default.findAndCountAll({
                        where,
                        // include: [{
                        //     model: models.User,
                        //     include: [{ model: models.Client }]
                        // }, {
                        //     model: models.TypeDoc
                        // }, {
                        //     model: models.District,
                        //     include: [{ model: models.Province, include: [{ model: models.Region }] }]
                        // }],
                        offset,
                        limit,
                        distinct: true
                    });
                    const result = {
                        total,
                        rows,
                        count: rows.length
                    };
                    if (result.count == 0) {
                        let where = { status: "A" };
                        if (query.name) {
                            where['lastNameM'] = { [sequelize_1.Op.iLike]: `%${query.name}%` };
                        }
                        const { count: total, rows } = yield Client_1.default.findAndCountAll({
                            where,
                            // include: [{
                            //     model: models.User,
                            //     include: [{ model: models.Client }]
                            // }, {
                            //     model: models.TypeDoc
                            // }, {
                            //     model: models.District,
                            //     include: [{ model: models.Province, include: [{ model: models.Region }] }]
                            // }],
                            offset,
                            limit,
                            distinct: true
                        });
                        const result = {
                            total,
                            rows,
                            count: rows.length
                        };
                        return result;
                    }
                    return result;
                }
                return result;
            }
        });
    }
    static getClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.default.findOne({
                where: { id: id, status: "A" },
            });
            if (!client) {
                //console.log("Error");
            }
            const daton = (yield config_database_1.default.query(`SELECT 
        u.id userid, u.username userusername, u."urlAvatar" userurlavatar,
        td.id TypeDocsid, e.dni TypeDocsdni, td."name" TypeDocsname,
        d.id districtid, d."name" districtname,
        pr.id Provincesid, pr."name" Provincesname,
        re.id regionid, re."name" regionname
    
        FROM public."Clients" e
        left join "Users" u on e."UserId" = u.id
        left join "TypeDocs" td on td.id = e."TypeDocId"
        left join "Districts" d on d.id = e."DistrictId"
        left join "Provinces" pr on pr.id = d."ProvinceId"
        left join "Regions" re on re.id = pr."RegionId"
        
        where e."id"=${client.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
            let persona = client.get();
            persona.birthDateUS = persona.birthDate;
            persona.birthDate = this.parseFechas(persona.birthDate);
            const roles = yield this.getRoleByUser(daton.userid);
            let rolesid = roles.map(p => p.id);
            let datos = {
                user: {
                    id: daton.userid,
                    username: daton.userusername,
                    urlAvatar: daton.userurlavatar
                },
                person: Object.assign({}, persona),
                "typeDoc": {
                    "id": daton.typedocsid,
                    "dni": daton.typedocsdni,
                    "name": daton.typedocsname
                },
                "district": {
                    "id": daton.districtid,
                    "name": daton.districtname,
                    "value": daton.districtid,
                    "label": daton.districtname
                },
                "province": {
                    "id": daton.provincesid,
                    "name": daton.provincesname,
                    "value": daton.provincesid,
                    "label": daton.provincesname
                },
                "region": {
                    "id": daton.regionid,
                    "name": daton.regionname,
                    "value": daton.regionid,
                    "label": daton.regionname
                },
                roles: roles,
                rolesId: rolesid
            };
            return datos;
        });
    }
    static getClientByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.default.findOne({
                where: { UserId: id, status: "A" },
                //   include: [{model: models.User}]
            });
            if (!client) {
                //console.log("Error");
            }
            return client;
        });
    }
    static destroyClient(id) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            const client = yield ClientServicios.getClientByUserId(id);
            yield client.update({ status: 'E' }, { transaction });
        }));
    }
    static updateClient(id, data) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            const client = yield ClientServicios.getClientByUserId(id);
            yield client.update(data, { transaction });
        }));
    }
}
exports.default = ClientServicios;
