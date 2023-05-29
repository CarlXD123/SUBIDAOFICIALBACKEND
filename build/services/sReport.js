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
class ReportServicios {
    constructor() {
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
    static parseFechas(fecha) {
        if (fecha != null) {
            return fecha.split('-')[2] + '/' + fecha.split('-')[1] + '/' + fecha.split('-')[0];
        }
        return null;
    }
    static getAppointmentsByMonth(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { month, year, AgreementId, HeadquarterId } = query;
            let acumTotalPriceAppointments = 0;
            let acumTotalPriceExams = 0;
            let conditions = [];
            conditions.push({ status: "E" });
            //let conditions = []
            if (AgreementId)
                conditions.push({ "$PriceList.AgreementId$": AgreementId });
            if (HeadquarterId)
                conditions.push({ HeadquarterId: HeadquarterId });
            const appointments = yield config_database_1.default.query(`select
		a.id,
		a.code,
		a."dateAppointment",
		c."name" ||' ' || c."lastNameP" || ' ' || c."lastNameM"  fullname,
		c."dni",
		c."birthDate",
		a."totalPrice"
	
	from "Appointments" a
	left join public."Clients" c ON c.id = a."ClientId"
	left join public."PriceLists" p on p.id = a."PriceListId"
	where date_part('year', a."dateAppointment") = ${year} and 
	date_part('month', a."dateAppointment") = ${month} and a.status ='E' 
     ${AgreementId ? 'and p."AgreementId" = ' + AgreementId : ''}
     ${HeadquarterId ? 'and a."HeadquarterId" = ' + HeadquarterId : ''} `, { type: sequelize_1.QueryTypes.SELECT });
            if (!appointments || !appointments.length)
                return [];
            for (const ap of appointments) {
                acumTotalPriceAppointments += ap.totalPrice;
                ap.age = this.getAge(ap.birthDate);
                ap.dateAppointment = this.parseFechas(ap.dateAppointment);
                ap.fullName = ap.fullname;
                ap.services = [];
                const servicess = yield config_database_1.default.query(`SELECT distinct e.id,s."name" nameservice, e."name", ed.price
            FROM public."AppointmentDetails" ad
            left join public."Examinations" e ON e.id = ad."ExaminationId"
			left join public."Appointments" a ON a.id = ad."AppointmentId"
			left join public."ExaminationPrices" ed ON ed."ExaminationId" = ad."ExaminationId" and ed."PriceListId" = a."PriceListId"
            left join public."Services" s on s.id = e."ServiceId"
			where ad."AppointmentId"=${ap.id}`, { type: sequelize_1.QueryTypes.SELECT });
                for (const se of servicess) {
                    acumTotalPriceExams += se.price;
                }
                const groups = servicess.reduce((groups, game) => {
                    const date = game.nameservice;
                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(game);
                    return groups;
                }, {});
                const groupArrays = Object.keys(groups).map((date) => {
                    return {
                        name: date,
                        examinations: groups[date]
                    };
                });
                ap.services = groupArrays;
            }
            let appointmentsByDateObj = {};
            let appointmentsByDate = [];
            /*
            appointmentsByDateObj: {
              21/10/2019: [] //array of appointments
              23/10/2019: [] //array of appointments
              .
            }
            */
            /*for (let appoinment of appointments) {
                let ap = appoinment.toJSON();
                if (!appointmentsByDateObj.hasOwnProperty(ap.dateAppointmentEU))
                    appointmentsByDateObj[ap.dateAppointmentEU] = [];
                appointmentsByDateObj[ap.dateAppointmentEU].push(ap);
                acumTotalPriceAppointments += ap.totalPrice;
    
                let examsByServiceObj = {};
                let examsByService = [];
                for (let ex of ap.Examinations) {
                    acumTotalPriceExams += ex.PriceLists[0].ExaminationPrice.price;
                    if (!examsByServiceObj.hasOwnProperty(ex.Service.name))
                        examsByServiceObj[ex.Service.name] = [];
    
                    examsByServiceObj[ex.Service.name].push(ex);
                }
    
                for (let service in examsByServiceObj) {
                    let serviceObk = {
                        service,
                        examinations: examsByServiceObj[service],
                    };
                    examsByService.push(serviceObk);
                }
                ap.Services = examsByService;
                delete ap.Examinations;
            }*/
            //date is a key
            /*for (let date in appointmentsByDateObj) {
                let dateObj = {
                    date,
                    appointments: appointmentsByDateObj[date],
                };
                appointmentsByDate.push(dateObj);
            }*/
            const groups = appointments.reduce((groups, game) => {
                const date = game.dateAppointment.split('T')[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(game);
                return groups;
            }, {});
            const groupArrays = Object.keys(groups).map((date) => {
                return {
                    date,
                    appointments: groups[date]
                };
            });
            return {
                dates: groupArrays,
                acumTotalPriceAppointments,
                acumTotalPriceExams,
            };
        });
    }
    static getAppointmentResultsPDF(AppointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const appoiment = (yield config_database_1.default.query(`select 
		p."AgreementId",
		a."ResponsibleId",
		e."name" ||' ' || e."lastNameP" || ' ' || e."lastNameM" as responsible,
		e."SpecialityId",
		s."name" specialityname
	
	from "Appointments" a
	left join public."Employees" e on e.id = a."ResponsibleId"
	left join public."Specialities" s on s.id = e."SpecialityId"
	left join public."PriceLists" p on p.id = a."PriceListId"
	where a.id =${AppointmentId}  order by a.id asc`, { type: sequelize_1.QueryTypes.SELECT }))[0];
            const examinations = yield config_database_1.default.query(`SELECT "ExaminationId" ids
	FROM public."AppointmentDetails" where "AppointmentId"=${AppointmentId} order by "ExaminationId" asc`, { type: sequelize_1.QueryTypes.SELECT });
            const examinationIds = [];
            for (const ex of examinations) {
                examinationIds.push(ex.ids);
            }
            appoiment.specialityName = appoiment.specialityname;
            return Object.assign(Object.assign({}, appoiment), { examinationIds });
        });
    }
}
exports.default = ReportServicios;
