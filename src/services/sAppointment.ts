import { Op, QueryTypes } from 'sequelize';
import db from '../config/config.database';
import Appointment from '../models/Appointment';
import AppointmentDetail from '../models/AppointmentDetail';
import Examination from '../models/Examination';
import ExaminationValue from '../models/ExaminationValue';
import constants from "../config/properties/constants.file"
import sClient from '../services/sClient'
import Client from '../models/Client';
import { type } from 'os';

let colorStatus: { [key: string]: any } = {
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
}


class AppointmentServicios {
    constructor() {
    }
    public static buildQuery(query: any) {
        let where = {
            status: {
                [Op.ne]: "D",
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

    public static parseFechas(fecha: string) {
        if (fecha != null) {
            return fecha.split('-')[2] + '/' + fecha.split('-')[1] + '/' + fecha.split('-')[0]
        }
        return null;
    }

    public static parseFechasUS(fecha: string) {
        if (fecha != null) {
            return fecha.split('-')[0] + '/' + fecha.split('-')[1] + '/' + fecha.split('-')[2]
        }
        return null;
    }
    public static getAge(dateString: string) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    public static async getAppointmentAll(offset: any, limit: any, query: any) {
        let where = AppointmentServicios.buildQuery(query);
        const { count: total, rows } = await Appointment.findAndCountAll({
            where,
            order: [["dateAppointment", "DESC"]],
            distinct: true,
            offset: offset,
            limit: limit
        });

        //console.log(rows)

        let datos = []

        for (const r of rows) {
            const daton = (await db.query<any>(`SELECT 
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
            ${(query as any).UserId ? 'and c."UserId" = ' + (query as any).UserId : ''} 
            ${(query as any).dni ? "and c.dni = '" + (query as any).dni + "'" : ''} 
            ${(query as any).passport ? "and c.dni = '" + (query as any).passport + "' and " + 'c."TypeDocId" = 2' : ''}`, { type: QueryTypes.SELECT }))[0];


        const daton3 = (await db.query<any>(`SELECT distinct
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
        where ad."AppointmentId"=${r.get('id')}`, { type: QueryTypes.SELECT }));

           //console.log(daton)
           console.log(daton3)
            let persona = r.get()

            if (!daton)
                continue
            persona.dateAppointmentUS = this.parseFechasUS(persona.dateAppointment);
            persona.dateAppointmentEU = this.parseFechas(persona.dateAppointment);
            persona.time12h = this.tConvertHrs24To12(persona.time);
            daton.anios = this.getAge(daton.clientbirthdate);
            persona.statusStr = constants.status[persona.status];
            
            
            datos.push({
                ...persona,
                colorStatus: {
                    ...colorStatus[persona.status]
                },
                client: {
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
                    genderStr: constants.GENDER_STR[daton.clientgender],
                    phoneNumber: daton.clientphonenumber,
                    tlfNumber: daton.clienttlfnumber,
                    nationality:daton.clientnationality

                },
                priceList: {
                    id: daton.pricelistsid,
                    name: daton.pricelistsname
                },
                Referer: {
                    id: daton.referersid,
                    name: daton.referername
                },
                District:{
                    id: daton.districtid,
                    name: daton.districtname
                },
                Provinces:{
                    id: daton.provincesid,
                    name: daton.provincename
                },
                Region:{
                    id: daton.regionid,
                    name: daton.regionname
                },
                Doctor: {
                    id: daton.doctorsid,
                    name: daton.doctorsname
                },
                headquarter: {
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
                }
            });
          
            //     where["$Client.UserId$"] = query.UserId;
            // }

        }

        const result = {
            total,
            count: rows.length,
            data: datos,
        };

        return result;
    }

    public static async addAppointment(data: any) {
        const appointment = await Appointment.create(data);
        Appointment.update(
            {
                code: "C0" + appointment.get().id
            },
            {
                where: {
                    id: appointment.get().id
                }
            }
        );
        for (const a of data.examinations) {
            AppointmentDetail.create({
                AppointmentId: appointment.get().id,
                ExaminationId: a
            })
        }


    }
    public static tConvertHrs24To12(time: any) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }


    public static async getAppointment(id: any) {
        let appointment = await Appointment.findOne({
            where: {
                id,
                status: {
                    [Op.ne]: "D",
                },
            },
            order: [["id", "asc"]],
        });
        if (!appointment) return "";

        const daton = (await db.query<any>(`SELECT 
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
			
			where a.id=${appointment.get('id')}`, { type: QueryTypes.SELECT }))[0]

        let cita = appointment.get()

        cita.dateAppointmentUS = this.parseFechasUS(cita.dateAppointment);
        cita.dateAppointmentEU = this.parseFechas(cita.dateAppointment);
        cita.time12h = this.tConvertHrs24To12(cita.time);
        daton.anios = this.getAge(daton.clientbirthdate);
        cita.statusStr = constants.status[cita.status];
        cita.createdDate = cita.createdAt;

        //console.log(cita);

        let datos = {
            ...cita,
            colorStatus: {
                ...colorStatus[cita.status]
            },
            AgreementId: daton.agreementid,
            PriceListId: daton.pricelistsid,
            HeadquarterId: daton.headquarterid,
            client: {
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
                genderStr: constants.GENDER_STR[daton.clientgender],
                phoneNumber: daton.clientphonenumber,
                tlfNumber: daton.clienttlfnumber,
                idmuestra:daton.idmuestra,
            },
            priceList: {
                id: daton.pricelistsid,
                name: daton.pricelistsname
            },
            Referer: {
                id: daton.referersid,
                name: daton.referername
            },
            Doctor: {
                id: daton.doctorsid,
                name: daton.doctorsname
            },
            headquarter: {
                id: daton.headquarterid,
                name: daton.headquartername,
                address: daton.headquarteraddress,
                tlfNumber: daton.headquartertlfnumber,
                email: daton.headquarteremail
            }
        };

        return datos;
    }

























    





    public static async getAppointmentByPati(ClientId: any) {
        const { count: total, rows } = await Appointment.findAndCountAll({
            where: {
                ClientId,
                status: {
                    [Op.ne]: "S",
                },
            },
            order: [["dateAppointment", "DESC"]],
        });
        
        let datos = []

        for (const r of rows) {
            const daton = (await db.query<any>(`SELECT 
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
			where a.id=${r.get('id')}`, { type: QueryTypes.SELECT }))[0]

            let persona = r.get()

            if (!daton)
                continue

            persona.dateAppointmentUS = this.parseFechasUS(persona.dateAppointment);
            persona.dateAppointmentEU = this.parseFechas(persona.dateAppointment);
            persona.time12h = this.tConvertHrs24To12(persona.time);
            daton.anios = this.getAge(daton.clientbirthdate);
            persona.statusStr = constants.status[persona.status];

            
            datos.push({
                ...persona,
                colorStatus: {
                    ...colorStatus[persona.status]
                },
                client: {
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
                    genderStr: constants.GENDER_STR[daton.clientgender],
                    phoneNumber: daton.clientphonenumber,
                    tlfNumber: daton.clienttlfnumber,
                    nationality:daton.clientnationality

                },
                priceList: {
                    id: daton.pricelistsid,
                    name: daton.pricelistsname
                },
                Referer: {
                    id: daton.referersid,
                    name: daton.referername
                },
                District:{
                    id: daton.districtid,
                    name: daton.districtname
                },
                Provinces:{
                    id: daton.provincesid,
                    name: daton.provincename
                },
                Region:{
                    id: daton.regionid,
                    name: daton.regionname
                },
                Doctor: {
                    id: daton.doctorsid,
                    name: daton.doctorsname
                },
                headquarter: {
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
                Convenio: {
                    id: daton.conveid,
                    name: daton.convename
                },
                Especialidad: {
                    id: daton.speciaid,
                    name: daton.specianame
                },Empleado: {
                    id: daton.employid,
                    dni: daton.dni,
                    url:daton.url,
                    name:daton.nameEmploy,
                    lastnamep:daton.lastnamep,
                    lastnamem:daton.lastnamem
                }
            });
          
            //     where["$Client.UserId$"] = query.UserId;
            // }

        }

        const result = {
            total,
            count: rows.length,
            data: datos,
        };

        return datos;
    }























    public static async getAppointmentsByReferer(query: any) {
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

        const { count: total, rows } = await Appointment.findAndCountAll({
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
    }
    public static async getAppointmentsByPacient(query: any) {

        let where = null;

        if (query.pacientId) {
            where = { ClientId: query.pacientId, status: query.status };
        }

        const { count: total, rows } = await Appointment.findAndCountAll({
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
    }
    public static async getAppointmentsByDates(query: any) {
        let where = null;

        if (query.start && query.end) {
            const start = new Date(query.start);
            const end = new Date(query.end);

            where = { dateAppointment: { [Op.between]: [start, end] }, status: query.status };
        }

        const { count: total, rows } = await Appointment.findAndCountAll({
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
    }
    public static async getExamValueResult(appointmentDetailId: any) {
        // let result = models.ExaminationDetail.findAll({
        //     where: {
        //         AppointmentDetailId: appointmentDetailId,
        //     },
        // });

        // return result;
    }
    public static async getExamValues(appointmentId: any) {
        const result = await db.query<any>(`SELECT e.name,
        CASE
            WHEN ap."idExamen" IS NOT NULL THEN ad."idMuestra"
            ELSE NULL
        END as "idMuestra",
        ad.*
    FROM public."AppointmentDetails" ad
    LEFT JOIN public."Examinations" e ON e.id = ad."ExaminationId"
    LEFT JOIN public."ApilisMatchDatas" ap ON ap."idExamen" = ad."ExaminationId"
    where ad."AppointmentId"= ${appointmentId} `, { type: QueryTypes.SELECT });
        return result;
    }
    //Get Examination by id
    public static async getExaminationByID(examinationid: any) {
        const examination = await Examination.findByPk(examinationid);
        return examination.get();
    }
    //Get examinatioGroups by id
    public static async getExaminationGroupsID(examinationid: any) {
        const examinatioGroups = await db.query<any>(`SELECT  distinct
        *
    FROM public."ExaminationGroups" e
    where e.status='A' and e."ExaminationId" = ${examinationid} `, { type: QueryTypes.SELECT });
        return examinatioGroups;
    }
    //Get examinationvalue by examinationgroup id
    public static async getExaminationValueByExaminationGroupId(examinationgroupId: any) {
        const examinationValue = await db.query<any>(`SELECT  distinct
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
    
    where e."ExaminationGroupId"=${examinationgroupId} `, { type: QueryTypes.SELECT });
        return examinationValue;
    }
    public static async getAppointmentComplete(id: any) {
        const info = await db.query<any>(`SELECT  
		a.result,
		a."ResponsibleId",
		e."name" ||' ' || e."lastNameP" || ' ' || e."lastNameM" as responsible,
		e."SpecialityId",
		s."name",
		e."digitalSignatureUrl"

	FROM public."Appointments" a
	left join public."Employees" e on e.id = a."ResponsibleId"
	left join public."Specialities" s on s.id = e."SpecialityId"
	where a.id= ${id} `, { type: QueryTypes.SELECT })
        return info;
    }

    public static async getAppointmentResults(AppointmentId: any) {
        const services = await db.query<any>(`SELECT  distinct
        s.id as id,
        s."name" as name,
        s.description as  description,
        e.id as examinationid,
        ap.id as apointmentid
    FROM public."Services" s 
    left join public."Examinations" e on s.id = e."ServiceId" 
    left join public."AppointmentDetails" ap on ap."ExaminationId" = e.id
    where e.status ='A' and ap."AppointmentId"= ${AppointmentId} `, { type: QueryTypes.SELECT })

        const info = (await db.query<any>(`SELECT  
		a.result result,
		a."ResponsibleId" responid,
		e."name" ||' ' || e."lastNameP" || ' ' || e."lastNameM" as responsible,
		e."SpecialityId" speid,
		s."name" spename,
		e."digitalSignatureUrl" edigi

	FROM public."Appointments" a
	left join public."Employees" e on e.id = a."ResponsibleId"
	left join public."Specialities" s on s.id = e."SpecialityId"
	where a.id= ${AppointmentId} `, { type: QueryTypes.SELECT }))[0];
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
        }
        for (const service of services) {
            service.examinations = [];
            service.result = [];
            const examination = await this.getExaminationByID(service.examinationid);
            examination.appointmentDetailId = service.apointmentid
            const examinatioGroups = await this.getExaminationGroupsID(service.examinationid);
            examination.examinationGroups = [];
            for (const group of examinatioGroups) {
                group.examinationValues = [];
                let resultArray = []
                const examinationValue = await this.getExaminationValueByExaminationGroupId(group.id);
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
                    }
                    let result = {
                        "examValue": value.name,
                        "method": value.namemethod,
                        "unit": value.nameunit,
                        "result": value.result,
                        "refValue": value.refvalue ?? ''
                    }
                    group.examinationValues.push(nieto);
                    resultArray.push(result);
                }
                examination.examinationGroups.ExaminationId = examination.id;
                examination.examinationGroups.push(group);
                service.result.push({
                    id: group.id,
                    examGroup: group.name,
                    dataRows: resultArray
                })
            }
            service.examinations.push(examination)
            data.services.push(service)
        }
        return data;

    }
    public static async updateAppointment(id: any, data: any) {
        db.transaction(async (transaction) => {
            let appointment = await Appointment.findOne({
                where: {
                    id
                }
            });
            AppointmentDetail.destroy({ where: { AppointmentId: id } });
            if (data.examinations) {
                ////console.log("1",data.examinations)
                for (const x of data.examinations) {
                    ////console.log("2",id)
                    ////console.log("3",x)
                    AppointmentDetail.create({ AppointmentId: id, ExaminationId: x });

                }
            }
            //     await appointment.setExaminations(data.examinations, { transaction });
            await appointment.update(data);
        });
    }
    public static async attendAppointment(AppointmentId: any, data: any) {
        // db.transaction(async (transaction) => {
        for (let ex of data.examinations) {
            // await appointmentDetail.setExaminationValues([], { transaction });
            for (let rV of ex.detalleExam) {
                await db.query(`UPDATE public."ExaminationValues"
                SET "countVR2"='${rV.valorObtenido}', "updatedAt"=NOW()
                WHERE id = ${rV.id};`, { type: QueryTypes.UPDATE })
            }
        }

        if (data.hasOwnProperty("ResponsibleId"))
            //If it has ResponsibleId, it means all exams has been set
            await Appointment.update(
                {
                    status: "E",
                    ResponsibleId: data.ResponsibleId,
                    result: data.result,
                },
                {
                    where: { id: AppointmentId }
                }
            );
        // });
    }
    public static async destroyAppointment(id: any) {
        const appoin = await Appointment.findByPk(id);
        if (!appoin) {
            //console.log("Error");
        }
        await appoin.destroy();
    }

}
export default AppointmentServicios; 