import { Op, QueryTypes } from "sequelize";
import db from "../config/config.database";
import constants from "../config/properties/constants.file";
import Client from "../models/Client";
import User from '../models/User';

class ClientServicios {
    constructor() {
    }
    public static buildQuery(query: any) {
        //let where = {status:'A'};
        let where = {};

        if (query.fullname) {
            where = {
                [Op.or]: [
                    {
                        name: { [Op.iLike]: `%${query.fullname}%` }
                    },
                    {
                        lastNameP: { [Op.iLike]: `%${query.fullname}%` }
                    },
                    {
                        lastNameM: { [Op.iLike]: `%${query.fullname}%` }
                    },
                ]
            };
        }
        if (query.dni) { 
            where['dni'] = { [Op.iLike]: `%${query.dni}%` } 
        };

       
        if (query.passport) {
            where['dni'] = query.passport
            where['TypeDocId'] = 2
        };

        return where;
    }
    public static async getClientAll(offset: any, limit: any, query = {}) {
        let where = ClientServicios.buildQuery(query);

        const { count: total, rows } = await Client.findAndCountAll({
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


            const daton = (await db.query<any>(`SELECT 
            u.id userid, u.username userusername, u."urlAvatar" userurlavatar,
            td.id TypeDocsid, e.dni TypeDocsdni, td."name" TypeDocsname,
            d.id districtid, d."name" districtname,
            pr.id Provincesid, pr."name" Provincesname,
            re.id regionid, re."name" regionname,
            natio.id nationid, natio."name" nationname
        
            FROM public."Clients" e
            left join "Users" u on e."UserId" = u.id
            left join "TypeDocs" td on td.id = e."TypeDocId"
            left join "Districts" d on d.id = e."DistrictId"
            left join "Provinces" pr on pr.id = d."ProvinceId"
            left join "Regions" re on re.id = pr."RegionId"
            left join "Nations" natio on natio.id = e."NationId"
            
            where e."id"=${r.get('id')}`, { type: QueryTypes.SELECT }))[0];

            let persona = r.get()

            console.log(r)
            persona.birthDateUS = persona.birthDate;
            persona.birthDate = this.parseFechas(persona.birthDate);
            //AGREGAR CAMPOS DESDE EL CONSTANTS
            persona.genderStr = constants.GENDER_STR[persona.gender];
            persona.civilStatusStr = constants.CIVIL_STATUS_STR[persona.civilStatus];

            const roles = await this.getRoleByUser(daton.userid)
            let rolesid = roles.map(p => p.id)

            datos.push({
                user: {
                    id: daton.userid,
                    username: daton.userusername,
                    urlAvatar: daton.userurlavatar
                },
                person: {
                    ...persona
                },
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
                "nacion": {
                    "id": daton.nationid,
                    "name": daton.nationname,
                    "value": daton.nationid,
                    "label": daton.nationname
                },
                roles: roles,
                rolesId: rolesid
            })
        }


        const result = {
            total,
            count: rows.length,
            data: datos
        }

        return result
    }

    public static parseFechas(fecha: string) {
        if (fecha != null) {
            return fecha.split('-')[2] + '/' + fecha.split('-')[1] + '/' + fecha.split('-')[0]
        }
        return null;
    }
    public static async getClientByID(id: any) {
        const cliente = (await db.query<any>(`SELECT 
        C.*
        FROM public."Clients" C
        left join public."Users" u ON u.id = C."UserId"
        where C.id= ${id}`, { type: QueryTypes.SELECT }))[0];
        return cliente;
    }
    public static async getClientByDOC(query: any) {
        
        let where = { status: 'A' };

        if (query.dni) { 
            where['dni'] = query.dni 
        }
        
        if (query.passport) {
            where['dni'] = query.passport;
            where['TypeDocId'] = 2;
        }

        if (query.other) {
            where['name'] = query.other
        }


        const client = await Client.findOne({
            where,
        });
        
        if (!client) {
            //console.log("Error");
            return ;
        }

        const dato = (await db.query<any>(`SELECT 
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

	    where C.id= ${client.get('id')}`, { type: QueryTypes.SELECT }))[0];

        let persona = client.get();
        persona.birthDateUS = persona.birthDate;
        persona.birthDate = this.parseFechas(persona.birthDate);
        //AGREGAR CAMPOS DESDE EL CONSTANTS
        persona.genderStr = constants.GENDER_STR[persona.gender];
        persona.civilStatusStr = constants.CIVIL_STATUS_STR[persona.civilStatus];

        let datos = {
            user: {
                id: dato.userid,
                username: dato.userusername,
                urlAvatar: dato.userurlavatar
            },
            person: {
                ...persona
            },
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
            roles:{
                id: dato.roleid,
                name:dato.rolename,
                description: dato.rodes
            }

        }
        //console.log(datos)
        return datos;
    }

    public static async getRoleByUser(id: any) {
        return await db.query<any>(`SELECT 
                rf."RoleId" id,
                r."name",
                r.description
            FROM public."UserRole" rf 
            inner join "Roles" r on r.id = rf."RoleId"
            where rf."UserId" = ${id}`, { type: QueryTypes.SELECT })
    }

    public static async getClientByName(offset: any, limit: any, query: any) {
        let where = { status: "A" };
        if (query.name != "" && query.lastNameP != "") {
            where['name'] = query.name,
                where['lastNameP'] = query.lastNameP
            const { count: total, rows } = await Client.findAndCountAll({
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
            }
            return result
        } else if (query.name != "" && query.lastNameP == "") {
            where['name'] = { [Op.iLike]: `%${query.name}%` }
            const { count: total, rows } = await Client.findAndCountAll({
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

            }
            if (result.count == 0) {
                let where = { status: "A" };
                if (query.name) { where['lastNameP'] = { [Op.iLike]: `%${query.name}%` } }
                const { count: total, rows } = await Client.findAndCountAll({
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

                }
                if (result.count == 0) {
                    let where = { status: "A" };
                    if (query.name) { where['lastNameM'] = { [Op.iLike]: `%${query.name}%` } }

                    const { count: total, rows } = await Client.findAndCountAll({
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
                    }
                    return result
                }
                return result
            }
            return result
        }
    }
    public static async getClient(id: any) {
        const client = await Client.findOne({
            where: { id: id, status: "A" },
        });
        if (!client) {
            //console.log("Error");
        }

        const daton = (await db.query<any>(`SELECT 
        u.id userid, u.username userusername, u."urlAvatar" userurlavatar,
        td.id TypeDocsid, e.dni TypeDocsdni, td."name" TypeDocsname,
        d.id districtid, d."name" districtname,
        pr.id Provincesid, pr."name" Provincesname,
        re.id regionid, re."name" regionname,
        natio.id nationid, natio."name" nationname
    
        FROM public."Clients" e
        left join "Users" u on e."UserId" = u.id
        left join "TypeDocs" td on td.id = e."TypeDocId"
        left join "Districts" d on d.id = e."DistrictId"
        left join "Provinces" pr on pr.id = d."ProvinceId"
        left join "Regions" re on re.id = pr."RegionId"
        left join "Nations" natio on natio.id = e."NationId"
        
        where e."id"=${client.get('id')}`, { type: QueryTypes.SELECT }))[0];

        let persona = client.get()

        persona.birthDateUS = persona.birthDate;
        persona.birthDate = this.parseFechas(persona.birthDate);


        const roles = await this.getRoleByUser(daton.userid)
        let rolesid = roles.map(p => p.id)

        let datos = {
            user: {
                id: daton.userid,
                username: daton.userusername,
                urlAvatar: daton.userurlavatar
            },
            person: {
                ...persona
            },
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
            "nacion": {
                "id": daton.nationid,
                "name": daton.nationname,
                "value": daton.nationid,
                "label": daton.nationname
            },
            roles: roles,
            rolesId: rolesid
        }


        return datos;
    }
    public static async getClientByUserId(id: any) {
        const client = await Client.findOne({
            where: { UserId: id, status: "A" },
            //   include: [{model: models.User}]
        });

        if (!client) {
            //console.log("Error");
        }
        return client;
    }
    public static destroyClient(id: any) {
        db.transaction(async transaction => {
            await Client.update(
                {
                    status: "E",
                },
                {
                    where: { UserId: id }
                }
            );

            await User.update(
                {
                    status: "E",
                },
                {
                    where: { id: id }
                }
            );
        });
    }
    public static updateClient(id: any, data: any) {
        db.transaction(async transaction => {
            const client = await ClientServicios.getClientByUserId(id);
            await client.update(data, { transaction });
        });
        
    }


    public static async updateUser(id: any, data: any) {
        const cliente = await User.findOne({ where: { id: id } })
        await cliente.update({
          password: data.name.charAt(0).toUpperCase() + data.dni,
          username: data.username,
        });
      }
}
export default ClientServicios;
