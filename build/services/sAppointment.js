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
const Appointment_1 = __importDefault(require("../models/Appointment"));
const AppointmentDetail_1 = __importDefault(require("../models/AppointmentDetail"));
const Examination_1 = __importDefault(require("../models/Examination"));
const Client_1 = __importDefault(require("../models/Client"));
const sClient_1 = __importDefault(require("../services/sClient"));
const constants_file_1 = __importDefault(require("../config/properties/constants.file"));
let colorStatus = {
    'S': {
        primary: "#E3BC08",
        secondary: "#FDF1BA"
    },
    'C': {
        primary: "#AD2121",
        secondary: "#FAE3E3"
    },
    'E': {
        primary: "#1E90FF",
        secondary: "#D1E8FF"
    }
};
class AppointmentServicios {
    constructor() {
    }
    static buildQuery(query) {
        let where = {
            status: {
                [sequelize_1.Op.ne]: "D",
            },

        };

        if (query.status) {
            where["status"] = query.status;
        }
        // if (query.UserId) {
        //     where["$Client.UserId$"] = query.UserId;
        // }

        if (query.referencia) {
            where['"RefererId"'] = query.referencia;
        }

        if (query.referente2) {
            where['"RefererId"'] = query.referente2;
        }
            
        if (query.status == 'S') {
            if (query.date) {
                where['"dateAppointment"'] = query.date;
            }
        }

        if (query.status == 'E') {
            if (query.date) {
                where['"dateAppointment"'] = query.date;
            }
        }
        return where;
    }
    static parseFechas(fecha) {
        if (fecha != null) {
            return fecha.split('-')[2] + '/' + fecha.split('-')[1] + '/' + fecha.split('-')[0];
        }
        return null;
    }
    static parseFechasUS(fecha) {
        if (fecha != null) {
            return fecha.split('-')[0] + '/' + fecha.split('-')[1] + '/' + fecha.split('-')[2];
        }
        return null;
    }
    static getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    static getAppointmentAll(offset, limit, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = AppointmentServicios.buildQuery(query);
            const { count: total, rows } = yield Appointment_1.default.findAndCountAll({
                where,
                order: [["dateAppointment", "DESC"]],
                distinct: true,
                offset: offset,
                limit: limit
            });
            //console.log(rows)
            let datos = [];
            for (const r of rows) {
                const daton = (yield config_database_1.default.query(`SELECT 
            c.id clientid, c."UserId" clientuserid,u.username clientusername, c.dni clientdni, c."TypeDocId" clienttypedoc,
			c.code clientcode, c."name" clientname, c."lastNameP" clientlastnamep, c."lastNameM" clientlastnamem,
			c.address clientaddress, c."birthDate" clientbirthdate, c.edad clientyears, c."gender" clientgender,
			c."phoneNumber" clientphonenumber, c."tlfNumber" clienttlfnumber, c.nationality clientnationality,
			pl.id pricelistsid, pl."name" pricelistsname,
			r.id referersid, r."refererName" referername,
			d.id doctorsid, d."doctorName" doctorsname,
			
            h.id headquarterid, h."name" headquartername, h.address headquarteraddress
			, h."tlfNumber" headquartertlfnumber, h.email headquarteremail,

            dis.id districtid, dis."name" districtname,
            pr.id provincesid, pr."name" provincename,
            re.id regionid, re."name" regionname,

            price.id pricelistid, price."name" pricelistname,
            conve.id conveid, conve."name" convename
    
            FROM public."Appointments" a
            left join "Clients" c on c.id = a."ClientId"
			left join "Users" u on u.id = c."UserId"
			left join "PriceLists" pl on pl.id = a."PriceListId"
			left join "Referers" r on r.id = a."RefererId"
			left join "Doctors" d on d.id = a."DoctorId"
			left join "Headquarters" h on h.id = a."HeadquarterId"
            left join "Districts" dis on dis.id = c."DistrictId"
            left join "Provinces" pr on pr.id = dis."ProvinceId"
            left join "Regions" re on re.id = pr."RegionId"
            left join "PriceLists" price on price.id = a."PriceListId"
            left join "Agreements" conve on conve.id = price."AgreementId"
			where a.id=${r.get('id')} 
            ${query.UserId ? 'and c."UserId" = ' + query.UserId : ''} 
            ${query.dni ? "and c.dni = '" + query.dni + "'" : ''} 
            ${query.passport ? "and c.dni = '" + query.passport + "' and " + 'c."TypeDocId" = 2' : ''}`, { type: sequelize_1.QueryTypes.SELECT }))[0];

            
        const daton3 = (yield config_database_1.default.query(`SELECT distinct
        ex."name" listaexamen,
        exep.price listaprecios,
        ad."idMuestra" idmuest

        FROM public."AppointmentDetails" as ad
        inner join public."Appointments" as ap on (ad."AppointmentId" = ap."id")
        inner join public."Examinations" as ex on (ex."id" = ad."ExaminationId")
		inner join public."ExaminationPrices" as exep on (exep."ExaminationId" = ad."ExaminationId" and exep."PriceListId" = ap."PriceListId" )
        inner join public."PriceLists" as pl   on (pl."id" = ap."PriceListId")
        inner join public."Agreements" as ag on (ag."id" = pl."AgreementId")
        inner join public."Clients" as cl on (cl."id" = ap."ClientId")
        where ad."AppointmentId"=${r.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }));

            //console.log(daton)
            console.log(daton3)
                let persona = r.get();
                if (!daton)
                    continue;
                persona.dateAppointmentUS = this.parseFechasUS(persona.dateAppointment);
                persona.dateAppointmentEU = this.parseFechas(persona.dateAppointment);
                persona.time12h = this.tConvertHrs24To12(persona.time);
                daton.anios = this.getAge(daton.clientbirthdate);
                persona.statusStr = constants_file_1.default.status[persona.status];
                datos.push(Object.assign(Object.assign({}, persona), { colorStatus: Object.assign({}, colorStatus[persona.status]), client: {
                        id: daton.clientid,
                        userId: daton.clientuserid,
                        username: daton.clientusername,
                        dni: daton.clientdni,
                        code: daton.clientcode,
                        name: daton.clientname,
                        lastNameP: daton.clientlastnamep,
                        lastNameM: daton.clientlastnamem,
                        address: daton.clientaddress,
                        birthDate: daton.clientbirthdate,
                        years: daton.anios,
                        gender: daton.clientgender,
                        genderStr: constants_file_1.default.GENDER_STR[daton.clientgender],
                        phoneNumber: daton.clientphonenumber,
                        tlfNumber: daton.clienttlfnumber,
                        nationality:daton.clientnationality,
                    }, priceList: {
                        id: daton.pricelistsid,
                        name: daton.pricelistsname
                    }, Referer: {
                        id: daton.referersid,
                        name: daton.referername
                    }, District:{
                        id: daton.districtid,
                        name: daton.districtname
                    }, Provinces:{
                        id: daton.provincesid,
                        name: daton.provincename
                    }, Region:{
                        id: daton.regionid,
                        name: daton.regionname
                    }, Doctor: {
                        id: daton.doctorsid,
                        name: daton.doctorsname
                    }, headquarter: {
                        id: daton.headquarterid,
                        name: daton.headquartername,
                        address: daton.headquarteraddress,
                        tlfNumber: daton.headquartertlfnumber,
                        email: daton.headquarteremail
                    },
                    PriceList: {
                        id: daton.pricelistid,
                        name: daton.pricelistname
                    },
                    Exam: {
                        exam: daton3,
                        price: daton3
                    },
                    Convenio: {
                        id: daton.conveid,
                        name: daton.convename
                    }}));

                  
                //     where["$Client.UserId$"] = query.UserId;
                // }
            }
            const result = {
                total,
                count: rows.length,
                data: datos,
            };
            return result;
        });
    }
    static addAppointment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield Appointment_1.default.create(data);
            Appointment_1.default.update({
                code: "C0" + appointment.get().id
            }, {
                where: {
                    id: appointment.get().id
                }
            });
            for (const a of data.examinations) {
                AppointmentDetail_1.default.create({
                    AppointmentId: appointment.get().id,
                    ExaminationId: a
                });
            }
        });
    }
    static tConvertHrs24To12(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) { // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }
    static getAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let appointment = yield Appointment_1.default.findOne({
                where: {
                    id,
                    status: {
                        [sequelize_1.Op.ne]: "D",
                    },
                },
                order: [["id", "asc"]],
            });
            if (!appointment)
                return "";
            const daton = (yield config_database_1.default.query(`SELECT 
            c.id clientid, c."UserId" clientuserid,u.username clientusername, c.dni clientdni,
			c.code clientcode, c."name" clientname, c."lastNameP" clientlastnamep, c."lastNameM" clientlastnamem,
			c.address clientaddress, c."birthDate" clientbirthdate, c.edad clientyears, c."gender" clientgender,
			c."phoneNumber" clientphonenumber, c."tlfNumber" clienttlfnumber,
			pl.id pricelistsid, pl."name" pricelistsname,
			r.id referersid, r."refererName" referername,
			d.id doctorsid, d."doctorName" doctorsname,
			
            h.id headquarterid, h."name" headquartername, h.address headquarteraddress
			, h."tlfNumber" headquartertlfnumber, h.email headquarteremail,
            pl."AgreementId" agreementid, apedta."idMuestra" idmuestra



        
            FROM public."Appointments" a
            left join "AppointmentDetails" apedta on apedta."AppointmentId" = a.id
            left join "Clients" c on c.id = a."ClientId"
			left join "Users" u on u.id = c."UserId"
			left join "PriceLists" pl on pl.id = a."PriceListId"
			left join "Referers" r on r.id = a."RefererId"
			left join "Doctors" d on d.id = a."DoctorId"
			left join "Headquarters" h on h.id = a."HeadquarterId"
			
			where a.id=${appointment.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
            let cita = appointment.get();
            cita.dateAppointmentUS = this.parseFechasUS(cita.dateAppointment);
            cita.dateAppointmentEU = this.parseFechas(cita.dateAppointment);
            cita.time12h = this.tConvertHrs24To12(cita.time);
            daton.anios = this.getAge(daton.clientbirthdate);
            cita.statusStr = constants_file_1.default.status[cita.status];
            cita.createdDate = cita.createdAt;
            //console.log(cita);
            let datos = Object.assign(Object.assign({}, cita), { colorStatus: Object.assign({}, colorStatus[cita.status]), AgreementId: daton.agreementid, PriceListId: daton.pricelistsid, HeadquarterId: daton.headquarterid, client: {
                    id: daton.clientid,
                    userId: daton.clientuserid,
                    username: daton.clientusername,
                    dni: daton.clientdni,
                    code: daton.clientcode,
                    name: daton.clientname,
                    lastNameP: daton.clientlastnamep,
                    lastNameM: daton.clientlastnamem,
                    address: daton.clientaddress,
                    birthDate: daton.clientbirthdate,
                    years: daton.anios,
                    gender: daton.clientgender,
                    genderStr: constants_file_1.default.GENDER_STR[daton.clientgender],
                    phoneNumber: daton.clientphonenumber,
                    tlfNumber: daton.clienttlfnumber,
                    idmuestra:daton.idmuestra,
                }, priceList: {
                    id: daton.pricelistsid,
                    name: daton.pricelistsname
                }, Referer: {
                    id: daton.referersid,
                    name: daton.referername
                }, Doctor: {
                    id: daton.doctorsid,
                    name: daton.doctorsname
                }, headquarter: {
                    id: daton.headquarterid,
                    name: daton.headquartername,
                    address: daton.headquarteraddress,
                    tlfNumber: daton.headquartertlfnumber,
                    email: daton.headquarteremail
                } });
            return datos;
        });
    }




















    


    static getAppointmentByPati(ClientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield Appointment_1.default.findAndCountAll({
                where: {
                    ClientId,
                    status: {
                        [sequelize_1.Op.ne]: "S",
                    },
                },
                order: [["dateAppointment", "DESC"]],
            });


            let datos = [];
            for (const r of rows) {
                const daton = (yield config_database_1.default.query(`SELECT 
            c.id clientid, c."UserId" clientuserid,u.username clientusername, c.dni clientdni, c."TypeDocId" clienttypedoc,
			c.code clientcode, c."name" clientname, c."lastNameP" clientlastnamep, c."lastNameM" clientlastnamem,
			c.address clientaddress, c."birthDate" clientbirthdate, c.edad clientyears, c."gender" clientgender,
			c."phoneNumber" clientphonenumber, c."tlfNumber" clienttlfnumber, c.nationality clientnationality,
			pl.id pricelistsid, pl."name" pricelistsname,
			r.id referersid, r."refererName" referername,
			d.id doctorsid, d."doctorName" doctorsname,
			
            h.id headquarterid, h."name" headquartername, h.address headquarteraddress
			, h."tlfNumber" headquartertlfnumber, h.email headquarteremail,

            dis.id districtid, dis."name" districtname,
            pr.id provincesid, pr."name" provincename,
            re.id regionid, re."name" regionname,

            price.id pricelistid, price."name" pricelistname,
            conve.id conveid, conve."name" convename,
            specia.id speciaid, specia."name" specianame,
            employ.id employid, employ.dni dni, employ."digitalSignatureUrl" url, employ."name" nameemploy,
            employ."lastNameP" lastnamep, employ."lastNameM" lastnamem

            FROM public."Appointments" a
            left join "Clients" c on c.id = a."ClientId"
			left join "Users" u on u.id = c."UserId"
			left join "PriceLists" pl on pl.id = a."PriceListId"
			left join "Referers" r on r.id = a."RefererId"
			left join "Doctors" d on d.id = a."DoctorId"
			left join "Headquarters" h on h.id = a."HeadquarterId"
            left join "Districts" dis on dis.id = c."DistrictId"
            left join "Provinces" pr on pr.id = dis."ProvinceId"
            left join "Regions" re on re.id = pr."RegionId"
            left join "PriceLists" price on price.id = a."PriceListId"
            left join "Agreements" conve on conve.id = price."AgreementId"
            left join "Specialities" specia on specia.id = a."ResponsibleId"
            left join "Employees" employ on employ.id = a."ResponsibleId"
			where a.id=${r.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
                let persona = r.get();
                if (!daton)
                    continue;
                persona.dateAppointmentUS = this.parseFechasUS(persona.dateAppointment);
                persona.dateAppointmentEU = this.parseFechas(persona.dateAppointment);
                persona.time12h = this.tConvertHrs24To12(persona.time);
                daton.anios = this.getAge(daton.clientbirthdate);
                persona.statusStr = constants_file_1.default.status[persona.status];
                datos.push(Object.assign(Object.assign({}, persona), { colorStatus: Object.assign({}, colorStatus[persona.status]), client: {
                        id: daton.clientid,
                        userId: daton.clientuserid,
                        username: daton.clientusername,
                        dni: daton.clientdni,
                        code: daton.clientcode,
                        name: daton.clientname,
                        lastNameP: daton.clientlastnamep,
                        lastNameM: daton.clientlastnamem,
                        address: daton.clientaddress,
                        birthDate: daton.clientbirthdate,
                        years: daton.anios,
                        gender: daton.clientgender,
                        genderStr: constants_file_1.default.GENDER_STR[daton.clientgender],
                        phoneNumber: daton.clientphonenumber,
                        tlfNumber: daton.clienttlfnumber,
                        nationality:daton.clientnationality,
                    }, priceList: {
                        id: daton.pricelistsid,
                        name: daton.pricelistsname
                    }, Referer: {
                        id: daton.referersid,
                        name: daton.referername
                    }, District:{
                        id: daton.districtid,
                        name: daton.districtname
                    }, Provinces:{
                        id: daton.provincesid,
                        name: daton.provincename
                    }, Region:{
                        id: daton.regionid,
                        name: daton.regionname
                    }, Doctor: {
                        id: daton.doctorsid,
                        name: daton.doctorsname
                    }, headquarter: {
                        id: daton.headquarterid,
                        name: daton.headquartername,
                        address: daton.headquarteraddress,
                        tlfNumber: daton.headquartertlfnumber,
                        email: daton.headquarteremail
                    },PriceList: {
                        id: daton.pricelistid,
                        name: daton.pricelistname
                    },Convenio: {
                        id: daton.conveid,
                        name: daton.convename
                    },Especialidad: {
                        id: daton.speciaid,
                        name: daton.specianame
                    },Empleado: {
                        id: daton.employid,
                        dni: daton.dni,
                        url:daton.url,
                        name:daton.nameemploy,
                        lastnamep:daton.lastnamep,
                        lastnamem:daton.lastnamem
                    }}));

                  
                //     where["$Client.UserId$"] = query.UserId;
                // }
            }
            const result = {
                total,
                count: rows.length,
                data: datos,
            };
            return datos;
        });
    }



















    static getAppointmentsByReferer(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = null;
            if (query.refererCode) {
                where = { refererCode: query.refererCode, status: query.status };
            }
            if (query.refererId) {
                where = { RefererId: query.refererId, status: query.status };
            }
            if (query.doctorId) {
                where = { DoctorId: query.doctorId, status: query.status };
            }
            const { count: total, rows } = yield Appointment_1.default.findAndCountAll({
                where,
                // include: [
                //     { model: models.Client, include: models.User },
                //     { model: models.PriceList },
                //     { model: models.Headquarter },
                //     { model: models.Referers, as: "Referer" },
                //     { model: models.Doctors, as: "Doctor" },
                // ],
                order: [["id", "asc"]],
                distinct: true,
            });
            const result = {
                total,
                rows,
                count: rows.length,
            };
            return result;
        });
    }
    static getAppointmentsByPacient(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = null;
            if (query.pacientId) {
                where = { ClientId: query.pacientId, status: query.status };
            }
            const { count: total, rows } = yield Appointment_1.default.findAndCountAll({
                where,
                // include: [
                //     { model: models.Client, where: { id: query.pacientId }, include: models.User },
                //     { model: models.PriceList },
                //     { model: models.Headquarter },
                //     { model: models.Referers, as: "Referer" },
                //     { model: models.Doctors, as: "Doctor" },
                // ],
                order: [["id", "asc"]],
                distinct: true,
            });
            const result = {
                total,
                count: rows.length,
                data: rows
            };
            return result;
        });
    }
    static getAppointmentsByDates(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = null;
            if (query.start && query.end) {
                const start = new Date(query.start);
                const end = new Date(query.end);
                where = { dateAppointment: { [sequelize_1.Op.between]: [start, end] }, status: query.status };
            }
            const { count: total, rows } = yield Appointment_1.default.findAndCountAll({
                where,
                // include: [
                //     { model: models.Client, include: models.User },
                //     { model: models.PriceList },
                //     { model: models.Headquarter },
                //     { model: models.Referers, as: "Referer" },
                //     { model: models.Doctors, as: "Doctor" },
                // ],
                order: [["id", "asc"]],
                distinct: true,
            });
            const result = {
                total,
                count: rows.length,
                data: rows
            };
            return result;
        });
    }
    static getExamValueResult(appointmentDetailId) {
        return __awaiter(this, void 0, void 0, function* () {
            // let result = models.ExaminationDetail.findAll({
            //     where: {
            //         AppointmentDetailId: appointmentDetailId,
            //     },
            // });
            // return result;
        });
    }
    static getExamValues(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield config_database_1.default.query(`SELECT e.name,
            CASE
                WHEN ap."idExamen" IS NOT NULL THEN ad."idMuestra"
                ELSE NULL
            END as "idMuestra",
            ad.*
        FROM public."AppointmentDetails" ad
        LEFT JOIN public."Examinations" e ON e.id = ad."ExaminationId"
        LEFT JOIN public."ApilisMatchDatas" ap ON ap."idExamen" = ad."ExaminationId"
        where ad."AppointmentId"= ${appointmentId} `, { type: sequelize_1.QueryTypes.SELECT });
            return result;
        });
    }
    //Get Examination by id
    static getExaminationByID(examinationid) {
        return __awaiter(this, void 0, void 0, function* () {
            const examination = yield Examination_1.default.findByPk(examinationid);
            return examination.get();
        });
    }
    //Get examinatioGroups by id
    static getExaminationGroupsID(examinationid) {
        return __awaiter(this, void 0, void 0, function* () {
            const examinatioGroups = yield config_database_1.default.query(`SELECT  distinct
        *
    FROM public."ExaminationGroups" e
    where e.status='A' and e."ExaminationId" = ${examinationid} `, { type: sequelize_1.QueryTypes.SELECT });
            return examinatioGroups;
        });
    }
    //Get examinationvalue by examinationgroup id
    static getExaminationValueByExaminationGroupId(examinationgroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const examinationValue = yield config_database_1.default.query(`SELECT  distinct
        e.*,
        u.id idunit,
        u."name" nameunit,
        u."createdAt" createunit ,
        u."updatedAt" updateunit,
        m.id idmethod,
        m."name" namemethod,
        m.description descriptionmethod,
        m."createdAt" createmethod,
        m."updatedAt" updatemethod,
        e."countVR2" result,
        er."name" refvalue

    FROM public."ExaminationValues" e
    left join public."Units" u on u.id = e."UnitId"
    left join public."Methods" m on m.id = e."MethodId"
    left join public."ExaminationReferenceValues" er ON er."ExaminationValueId" = e.id
    
    where e."ExaminationGroupId"=${examinationgroupId} `, { type: sequelize_1.QueryTypes.SELECT });
            return examinationValue;
        });
    }
    static getAppointmentComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield config_database_1.default.query(`SELECT  
		a.result,
		a."ResponsibleId",
		e."name" ||' ' || e."lastNameP" || ' ' || e."lastNameM" as responsible,
		e."SpecialityId",
		s."name",
		e."digitalSignatureUrl"

	FROM public."Appointments" a
	left join public."Employees" e on e.id = a."ResponsibleId"
	left join public."Specialities" s on s.id = e."SpecialityId"
	where a.id= ${id} `, { type: sequelize_1.QueryTypes.SELECT });
            return info;
        });
    }
    static getAppointmentResults(AppointmentId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield config_database_1.default.query(`SELECT  distinct
        s.id as id,
        s."name" as name,
        s.description as  description,
        e.id as examinationid,
        ap.id as apointmentid
    FROM public."Services" s 
    left join public."Examinations" e on s.id = e."ServiceId" 
    left join public."AppointmentDetails" ap on ap."ExaminationId" = e.id
    where e.status ='A' and ap."AppointmentId"= ${AppointmentId} `, { type: sequelize_1.QueryTypes.SELECT });
            const info = (yield config_database_1.default.query(`SELECT  
		a.result result,
		a."ResponsibleId" responid,
		e."name" ||' ' || e."lastNameP" || ' ' || e."lastNameM" as responsible,
		e."SpecialityId" speid,
		s."name" spename,
		e."digitalSignatureUrl" edigi

	FROM public."Appointments" a
	left join public."Employees" e on e.id = a."ResponsibleId"
	left join public."Specialities" s on s.id = e."SpecialityId"
	where a.id= ${AppointmentId} `, { type: sequelize_1.QueryTypes.SELECT }))[0];
            if (info.speid == null) {
                return {
                    services: []
                };
            }
            let data = {
                result: info.result,
                ResponsibleId: info.responid,
                responsible: info.responsible,
                SpecialityId: info.speid,
                specialityName: info.spename,
                digitalSignatureUrl: info.edigi,
                services: []
            };
            for (const service of services) {
                service.examinations = [];
                service.result = [];
                const examination = yield this.getExaminationByID(service.examinationid);
                examination.appointmentDetailId = service.apointmentid;
                const examinatioGroups = yield this.getExaminationGroupsID(service.examinationid);
                examination.examinationGroups = [];
                for (const group of examinatioGroups) {
                    group.examinationValues = [];
                    let resultArray = [];
                    const examinationValue = yield this.getExaminationValueByExaminationGroupId(group.id);
                    for (const value of examinationValue) {
                        let nieto = {
                            "id": value.id,
                            "name": value.name,
                            "countVR2": value.countVR2,
                            "status": value.status,
                            "createdAt": value.createdAt,
                            "updatedAt": value.updatedAt,
                            "ExaminationGroupId": value.ExaminationGroupId,
                            "MethodId": value.MethodId,
                            "UnitId": value.UnitId,
                            "Unit": {
                                "id": value.idunit,
                                "name": value.nameunit,
                                "createdAt": value.createunit,
                                "updatedAt": value.updateunit
                            },
                            "Method": {
                                "id": value.idmethod,
                                "name": value.namemethod,
                                "description": value.descriptionmethod,
                                "createdAt": value.createmethod,
                                "updatedAt": value.updatemethod
                            },
                            "result": value.result
                        };
                        let result = {
                            "examValue": value.name,
                            "method": value.namemethod,
                            "unit": value.nameunit,
                            "result": value.result,
                            "refValue": (_a = value.refvalue) !== null && _a !== void 0 ? _a : ''
                        };
                        group.examinationValues.push(nieto);
                        resultArray.push(result);
                    }
                    examination.examinationGroups.ExaminationId = examination.id;
                    examination.examinationGroups.push(group);
                    service.result.push({
                        id: group.id,
                        examGroup: group.name,
                        dataRows: resultArray
                    });
                }
                service.examinations.push(examination);
                data.services.push(service);
            }
            return data;
        });
    }
    static updateAppointment(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                let appointment = yield Appointment_1.default.findOne({
                    where: {
                        id
                    }
                });
                AppointmentDetail_1.default.destroy({ where: { AppointmentId: id } });
                if (data.examinations) {
                    ////console.log("1",data.examinations)
                    for (const x of data.examinations) {
                        ////console.log("2",id)
                        ////console.log("3",x)
                        AppointmentDetail_1.default.create({ AppointmentId: id, ExaminationId: x });
                    }
                }
                //     await appointment.setExaminations(data.examinations, { transaction });
                yield appointment.update(data);
            }));
        });
    }
    static attendAppointment(AppointmentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // db.transaction(async (transaction) => {
            for (let ex of data.examinations) {
                // await appointmentDetail.setExaminationValues([], { transaction });
                for (let rV of ex.detalleExam) {
                    yield config_database_1.default.query(`UPDATE public."ExaminationValues"
                SET "countVR2"='${rV.valorObtenido}', "updatedAt"=NOW()
                WHERE id = ${rV.id};`, { type: sequelize_1.QueryTypes.UPDATE });
                }
            }
            if (data.hasOwnProperty("ResponsibleId"))
                //If it has ResponsibleId, it means all exams has been set
                yield Appointment_1.default.update({
                    status: "E",
                    ResponsibleId: data.ResponsibleId,
                    result: data.result,
                }, {
                    where: { id: AppointmentId }
                });
            // });
        });
    }
    static destroyAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appoin = yield Appointment_1.default.findByPk(id);
            if (!appoin) {
                //console.log("Error");
            }
            yield appoin.destroy();
        });
    }
}
exports.default = AppointmentServicios;
