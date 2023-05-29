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
const fileSystem_1 = require("../global/fileSystem");
const Employee_1 = __importDefault(require("../models/Employee"));
const constants_file_1 = __importDefault(require("../config/properties/constants.file"));
const User_1 = __importDefault(require("../models/User"));

class EmployeeServicios {
    constructor() {
    }
    static buildQuery(query) {
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
            where['dni'] = query.dni;
        }
        ;
        if (query.passport) {
            where['dni'] = query.passport;
            where['TypeDocId'] = 2;
        }
        ;
        if (query.SpecialityId && query.SpecialityId != 'null') {
            where['SpecialityId'] = query.SpecialityId;
        }
        return where;
    }
    static parseFechas(fecha) {
        if (fecha != null) {
            return fecha.split('-')[2] + '/' + fecha.split('-')[1] + '/' + fecha.split('-')[0];
        }
        return null;
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
    static getPagedEmployee(offset, limit, query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = EmployeeServicios.buildQuery(query);
            const { count: total, rows } = yield Employee_1.default.findAndCountAll({
                where,
                offset,
                limit,
                distinct: true
            });
            //console.log(rows)
            let datos = [];
            for (const r of rows) {
                const daton = (yield config_database_1.default.query(`SELECT 
            u.id userid, u.username userusername, u."urlAvatar" userurlavatar,
            td.id TypeDocsid, e.dni TypeDocsdni, td."name" TypeDocsname,
            tu1.id Tuitionsid, e."tuitionNumber"  tuitionNumber, tu1."name" tuitionname,
            tu2.id Tuitions2id, e."tuitionNumber2"  tuitionNumber2, tu2."name" tuitionname2,
            c.id categoryid, c."name" categoryname,
            s.id specialityid, s."name" specialityname,
            te.id typeEmployeeid, te."name" typeEmployeename,
            h.id headquarterid, h."name" headquartername,
            p.id professionid, p."name" professionname,
            d.id districtid, d."name" districtname,
            pr.id Provincesid, pr."name" Provincesname,
            re.id regionid, re."name" regionname
        
            FROM public."Employees" e
            left join "Users" u on e."UserId" = u.id
            left join "TypeDocs" td on td.id = e."TypeDocId"
            left join "Tuitions" tu1 on tu1.id = e."TuitionId"
            left join "Tuitions" tu2 on tu2.id = e."Tuition2Id"
            left join "Categories" c on c.id = e."CategoryId"
            left join "Specialities" s on s.id = e."SpecialityId"
            left join "TypeEmployees" te on te.id = e."TypeEmployeeId"
            left join "Headquarters" h on h.id = e."HeadquarterId"
            left join "Professions" p on p.id = e."ProfessionId"
            left join "Districts" d on d.id = e."DistrictId"
            left join "Provinces" pr on pr.id = d."ProvinceId"
            left join "Regions" re on re.id = pr."RegionId"
            
            where e.id=${r.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
                let persona = r.get();
                //agregar fechas formateadas
                persona.birthDateUS = persona.birthDate;
                persona.admissionDateUS = persona.admissionDate;
                persona.birthDate = this.parseFechas(persona.birthDate);
                persona.admissionDate = this.parseFechas(persona.admissionDate);
                //Obtener valores genericos desde el archivo de constans
                persona.genderStr = constants_file_1.default.GENDER_STR[persona.gender];
                persona.civilStatusStr = constants_file_1.default.CIVIL_STATUS_STR[persona.civilStatus];
                persona.typeDirectionStr = constants_file_1.default.TYPE_DIRECTION_STR[persona.typeDirection];
                //obtener roles del usuario por el id
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
                    "tuition": {
                        "id": daton.tuitionsid,
                        "tuitionNumber": daton.tuitionnumber,
                        "name": daton.tuitionname
                    },
                    "tuition2": {
                        "id": daton.tuitions2id,
                        "tuitionNumber": daton.tuitionnumber2,
                        "name": daton.tuitionname2
                    },
                    "category": {
                        "id": daton.categoryid,
                        "name": daton.categoryname
                    },
                    "speciality": {
                        "id": daton.specialityid,
                        "name": daton.specialityname
                    },
                    "typeEmployee": {
                        "id": daton.typeemployeeid,
                        "name": daton.typeemployeename
                    },
                    "headquarter": {
                        "id": daton.headquarterid,
                        "name": daton.headquartername
                    },
                    "profession": {
                        "id": daton.professionid,
                        "name": daton.professionname
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
    static getAllEmployee(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = EmployeeServicios.buildQuery(query);
            const employee = yield Employee_1.default.findAll({ where });
            let listapersona = [];
            for (const iterator of employee) {
                let persona = iterator.get();
                persona.birthDateUS = persona.birthDate;
                persona.admissionDateUS = persona.admissionDate;
                persona.birthDate = this.parseFechas(persona.birthDate);
                persona.admissionDate = this.parseFechas(persona.admissionDate);
                persona.fullName = (persona.name + ' ' + persona.lastNameP + ' ' + persona.lastNameM);
                persona.genderStr = constants_file_1.default.GENDER_STR[persona.gender];
                persona.civilStatusStr = constants_file_1.default.CIVIL_STATUS_STR[persona.civilStatus];
                persona.typeDirectionStr = constants_file_1.default.TYPE_DIRECTION_STR[persona.typeDirection];
                listapersona.push(Object.assign({}, persona));
            }
            return listapersona;
        });
    }
    static getEmployee(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield Employee_1.default.findOne({
                where: { id: employeeId }
            });
            if (!employee) {
                //console.log("Error");
            }
            const daton = (yield config_database_1.default.query(`SELECT 
        u.id userid, u.username userusername, u."urlAvatar" userurlavatar,
        td.id TypeDocsid, e.dni TypeDocsdni, td."name" TypeDocsname,
        tu1.id Tuitionsid, e."tuitionNumber"  tuitionNumber, tu1."name" tuitionname,
        tu2.id Tuitions2id, e."tuitionNumber2"  tuitionNumber2, tu2."name" tuitionname2,
        c.id categoryid, c."name" categoryname,
        s.id specialityid, s."name" specialityname,
        te.id typeEmployeeid, te."name" typeEmployeename,
        h.id headquarterid, h."name" headquartername,
        p.id professionid, p."name" professionname,
        d.id districtid, d."name" districtname,
        pr.id Provincesid, pr."name" Provincesname,
        re.id regionid, re."name" regionname
    
        FROM public."Employees" e
        left join "Users" u on e."UserId" = u.id
        left join "TypeDocs" td on td.id = e."TypeDocId"
        left join "Tuitions" tu1 on tu1.id = e."TuitionId"
        left join "Tuitions" tu2 on tu2.id = e."Tuition2Id"
        left join "Categories" c on c.id = e."CategoryId"
        left join "Specialities" s on s.id = e."SpecialityId"
        left join "TypeEmployees" te on te.id = e."TypeEmployeeId"
        left join "Headquarters" h on h.id = e."HeadquarterId"
        left join "Professions" p on p.id = e."ProfessionId"
        left join "Districts" d on d.id = e."DistrictId"
        left join "Provinces" pr on pr.id = d."ProvinceId"
        left join "Regions" re on re.id = pr."RegionId"
        
        where e.id=${employee.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
            let persona = employee.get();
            //agregar fechas formateadas
            persona.birthDateUS = persona.birthDate;
            persona.admissionDateUS = persona.admissionDate;
            persona.birthDate = this.parseFechas(persona.birthDate);
            persona.admissionDate = this.parseFechas(persona.admissionDate);
            //Obtener valores genericos desde el archivo de constans
            persona.genderStr = constants_file_1.default.GENDER_STR[persona.gender];
            persona.civilStatusStr = constants_file_1.default.CIVIL_STATUS_STR[persona.civilStatus];
            persona.typeDirectionStr = constants_file_1.default.TYPE_DIRECTION_STR[persona.typeDirection];
            //obtener roles del usuario por el id
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
                "tuition": {
                    "id": daton.tuitionsid,
                    "tuitionNumber": daton.tuitionnumber,
                    "name": daton.tuitionname
                },
                "tuition2": {
                    "id": daton.tuitions2id,
                    "tuitionNumber": daton.tuitionnumber2,
                    "name": daton.tuitionname2
                },
                "category": {
                    "id": daton.categoryid,
                    "name": daton.categoryname
                },
                "speciality": {
                    "id": daton.specialityid,
                    "name": daton.specialityname
                },
                "typeEmployee": {
                    "id": daton.typeemployeeid,
                    "name": daton.typeemployeename
                },
                "headquarter": {
                    "id": daton.headquarterid,
                    "name": daton.headquartername
                },
                "profession": {
                    "id": daton.professionid,
                    "name": daton.professionname
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
    static getEmployeeByTypeEmployeeId(TypeEmployeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Employee_1.default.findAll({
            //where: { TypeEmployeeId },
            //include: [{ model: models.TypeEmployee }]
            });
        });
    }
    static getEmployeeByUserId(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield Employee_1.default.findOne({
                where: { UserId: UserId }
            });
            if (!employee) {
                //console.log("Error");
            }
            return employee;
        });
    }
    static getEmployeeByUserIdquery(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = (yield config_database_1.default.query(`SELECT *
    FROM public."Employees"
    where "UserId"=${UserId}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
            if (!employee) {
                //console.log("Error");
            }
            return employee;
        });
    }
    static destroyEmployee(UserId) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            yield Employee_1.default.update({
                status: "E",
            }, {
                where: { UserId: UserId }
            });

            yield User_1.default.update({
                status: "E",
            }, {
                where: { id: UserId }
            });
        }));
    }

    //Agregar update
    static updateEmployee(id, data, digitalSignatureFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.getEmployeeByUserIdquery(id);
            if (data.roles) {
                //Take off the [] if user has many multiple roles
                //await employee.User.setRoles([data.roles], { transaction })
                yield config_database_1.default.query(`DELETE FROM public."UserRole"
        WHERE "UserId"= ${employee.UserId};`, { type: sequelize_1.QueryTypes.DELETE });
                yield config_database_1.default.query(`INSERT INTO public."UserRole"
      ("createdAt", "updatedAt", "RoleId","UserId")
        VALUES (NOW(),NOW(),${data.roles},${employee.UserId});`, { type: sequelize_1.QueryTypes.INSERT });
            }
            if (digitalSignatureFile) {
                const digitalSignatureUrl = (0, fileSystem_1.saveFile)(digitalSignatureFile, "digitalSignature");
                data.digitalSignatureUrl = digitalSignatureUrl;
            }
            if (!data.Tuition2Id) //Because Tuition2Id is not required, then it could be ""
                delete data.Tuition2Id;
            //await employee.User.update(data, { transaction })
            yield Employee_1.default.update(data, { where: { id: employee.id } });
            console.log(employee)
        });
    }


    static updateUser(id, data) {
     return __awaiter(this, void 0, void 0, function* () {
      const cliente = yield User_1.default.findOne({ where: { id: id } });
      yield cliente.update({
        password: data.name.charAt(0).toUpperCase() + data.dni,
        username: data.username,
      });
     });
    }
}
exports.default = EmployeeServicios;

