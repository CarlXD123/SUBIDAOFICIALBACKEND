import { Op, QueryTypes, where } from "sequelize";
import db from "../config/config.database";
import { saveFile } from "../global/fileSystem";
import { ExecuteResponce } from "../global/response";
import Employee from "../models/Employee";
import constants from "../config/properties/constants.file"
import User from '../models/User';
import { sendPassword2 } from "../global/mailer";

class EmployeeServicios {
  constructor() {
  }
  public static buildQuery(query: any) {
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

    if (query.dni) { where['dni'] = query.dni };
    if (query.passport) {
      where['dni'] = query.passport
      where['TypeDocId'] = 2
    };

    if (query.SpecialityId && query.SpecialityId!='null') {
      where['SpecialityId'] = query.SpecialityId
    }

    return where;
  }

  public static parseFechas(fecha: string) {
    if (fecha != null) {
      return fecha.split('-')[2] + '/' + fecha.split('-')[1] + '/' + fecha.split('-')[0]
    }
    return null;
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

  public static async getPagedEmployee(offset: any, limit: any, query = {}) {
    let where = EmployeeServicios.buildQuery(query);
    const { count: total, rows } = await Employee.findAndCountAll({
      where,
      offset,
      limit,
      distinct: true
    });

    //console.log(rows)

    let datos = []

    for (const r of rows) {
      const daton = (await db.query<any>(`SELECT 
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
            
            where e.id=${r.get('id')}`, { type: QueryTypes.SELECT }))[0]

      let persona = r.get()

      //agregar fechas formateadas
      persona.birthDateUS = persona.birthDate;
      persona.admissionDateUS = persona.admissionDate;
      persona.birthDate = this.parseFechas(persona.birthDate);
      persona.admissionDate = this.parseFechas(persona.admissionDate);
      //Obtener valores genericos desde el archivo de constans
      persona.genderStr = constants.GENDER_STR[persona.gender];
      persona.civilStatusStr = constants.CIVIL_STATUS_STR[persona.civilStatus];
      persona.typeDirectionStr = constants.TYPE_DIRECTION_STR[persona.typeDirection];

      //obtener roles del usuario por el id
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
    }

    return result
  }
  public static async getAllEmployee(query = {}) {
    let where = EmployeeServicios.buildQuery(query);
    const employee = await Employee.findAll({ where });
    let listapersona = []
    for (const iterator of employee) {
      let persona = iterator.get();

      persona.birthDateUS = persona.birthDate;
      persona.admissionDateUS = persona.admissionDate;
      persona.birthDate = this.parseFechas(persona.birthDate);
      persona.admissionDate = this.parseFechas(persona.admissionDate);
      persona.fullName =  (persona.name +' '+persona.lastNameP + ' ' + persona.lastNameM)


      persona.genderStr = constants.GENDER_STR[persona.gender];
      persona.civilStatusStr = constants.CIVIL_STATUS_STR[persona.civilStatus];
      persona.typeDirectionStr = constants.TYPE_DIRECTION_STR[persona.typeDirection];

      listapersona.push({
        ...persona
      })
    }

    return listapersona
  }


  public static async getEmployee(employeeId: any) {
    const employee = await Employee.findOne({
      where: { id: employeeId }
    });
    if (!employee) {
      //console.log("Error");
    }

    const daton = (await db.query<any>(`SELECT 
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
        
        where e.id=${employee.get('id')}`, { type: QueryTypes.SELECT }))[0]

    let persona = employee.get()

    //agregar fechas formateadas
    persona.birthDateUS = persona.birthDate;
    persona.admissionDateUS = persona.admissionDate;
    persona.birthDate = this.parseFechas(persona.birthDate);
    persona.admissionDate = this.parseFechas(persona.admissionDate);
    //Obtener valores genericos desde el archivo de constans
    persona.genderStr = constants.GENDER_STR[persona.gender];
    persona.civilStatusStr = constants.CIVIL_STATUS_STR[persona.civilStatus];
    persona.typeDirectionStr = constants.TYPE_DIRECTION_STR[persona.typeDirection];

    //obtener roles del usuario por el id
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
  }
  public static async getEmployeeByTypeEmployeeId(TypeEmployeeId: any) {
    return await Employee.findAll({
      //where: { TypeEmployeeId },
      //include: [{ model: models.TypeEmployee }]
    });
  }
  public static async getEmployeeByUserId(UserId: any) {
    const employee = await Employee.findOne({
      where: { UserId: UserId }
    });
    if (!employee) {
      //console.log("Error");
    }
    return employee;
  }

  public static async getEmployeeByUserIdquery(UserId: any) {
    let employee = (await db.query<any>(`SELECT *
    FROM public."Employees"
    where "UserId"=${UserId}`, { type: QueryTypes.SELECT }))[0];
    if (!employee) {
      //console.log("Error");
    }
    return employee;
  }

  public static destroyEmployee(UserId: any) {
    db.transaction(async (transaction) => {
      await Employee.update(
        {
            status: "E",
        },
        {
            where: { UserId: UserId }
        }
      );

      await User.update(
        {
            status: "E",
        },
        {
            where: { id: UserId }
        }
      );

    });
  }
  
  
  //Agregar update
  public static async updateEmployee(id: any, data: any, digitalSignatureFile: any) {
    const employee = await this.getEmployeeByUserIdquery(id); 
    if (data.roles) {
      //Take off the [] if user has many multiple roles
      //await employee.User.setRoles([data.roles], { transaction })
      await db.query(`DELETE FROM public."UserRole"
        WHERE "UserId"= ${employee.UserId};`, { type: QueryTypes.DELETE })
      await db.query(`INSERT INTO public."UserRole"
      ("createdAt", "updatedAt", "RoleId","UserId")
        VALUES (NOW(),NOW(),${data.roles},${employee.UserId});`, { type: QueryTypes.INSERT })
    }

    if (digitalSignatureFile) {
      const digitalSignatureUrl = saveFile(digitalSignatureFile, "digitalSignature");
      data.digitalSignatureUrl = digitalSignatureUrl;
    }

    if (!data.Tuition2Id)//Because Tuition2Id is not required, then it could be ""
      delete data.Tuition2Id
    //await employee.User.update(data, { transaction })
    await Employee.update(data, { where: { id: employee.id } });
    console.log(employee)
   
  }

  public static async updateUser(id: any, data: any) {
    const cliente = await User.findOne({ where: { id: id } })
    await cliente.update({
      password: data.name.charAt(0).toUpperCase() + data.dni,
      username: data.username,
    });
  }
}
export default EmployeeServicios;