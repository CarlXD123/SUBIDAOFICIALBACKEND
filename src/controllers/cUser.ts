import { Request, Response } from "express";
import { UserMapper } from "../mapper/UserMapper";
import { mUser } from "../mapper/user/mUser";
import { UserAtributos } from "../models/User";
import sUser from '../services/sUser'
import { ExecuteResponce } from "../global/response";
import { EmployeeAtributos } from "../models/Employee";
import db from "../config/config.database";
import { QueryTypes } from "sequelize";
import { encode } from 'jwt-simple'
import Headquarter from "../models/Headquarter";
import { sendPassword } from "../global/mailer";
import sEmployee from '../services/sEmployee';

const mapper = new UserMapper();
class UserController {

  constructor() {
  }

  public async login(req: Request, res: Response) {
    if (req.headers.authorization) {
      let base64 = req.headers.authorization.split(' ')[1] // ['Basic', 'amNoaXF1aW46MTIzNDU=']
      let decodedBase64 = Buffer.from(base64, 'base64').toString() // 'jchiquin:12345'
      let [username, password] = decodedBase64.split(':') //['jchiquin', '12345']
      ////console.log(username)
      ////console.log(password)
      username = username.toLowerCase();

      try {
        const user = await sUser.getUserByCredentials(username, password);
        let accessToken = encode(user, process.env.SECRET_KEY);

        let jsondata = {};
        ////console.log(user.get('id'))
        const dataa = await sUser.getDataUser(user.get('id'))
        ////console.log(dataa)
        let role = {};
        if (dataa.a != null) {
          ////console.log(dataa.a)
          const headquarter = await Headquarter.findByPk(dataa.a.HeadquarterId);


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
          }

          role = (await db.query(`	SELECT 
          r.id,
          r."name",
          r.description,
          'employee' as "roleStr"
        FROM public."UserRole" ur
        left join public."Roles" r on ur."RoleId"=r."id"
        where ur."UserId"= ${user.get('id')}`, { type: QueryTypes.SELECT }))[0]
        } else if (dataa.b != undefined) {
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
          }

          role = (await db.query<any>(`SELECT 
          r.id,
          r."name",
          r.description,
          'client' as "roleStr"
        FROM public."UserRole" ur
        left join public."Roles" r on ur."RoleId"=r."id"
        where ur."UserId"=  ${user.get('id')}`, { type: QueryTypes.SELECT }))[0]
        }
        //role


        //mapper
        let mapeado: any = {};
        let mapa = {}
        mapper.map<UserAtributos, mUser>(user.get(), mapa);
        mapeado.user = mapa;
        mapeado.person = jsondata;
        mapeado.accessToken = accessToken;
        mapeado.roles = [role];
        let result = {
          "status": true,
          "data": mapeado
        }
        res.status(200).json(result)
      } catch (err) {
        let datosincorrectos = {
          "status": false,
          "message": {
            "code": "E006",
            "text": "Datos incorrectos!"
          }
        }
        res.status(200).json(datosincorrectos)
        //makeResponseException(res, err);
      }
    } else {
      let datosincorrectos = {
        "status": false,
        "message": {
          "code": "E006",
          "text": "Autorizacion Denegada!"
        }
      }
      res.status(200).json(datosincorrectos)
    }
  }

  public async getUsers(_req: Request, res: Response) {
    try {
      const users = sUser.getUserAll();
      users.then(async (p: any) => {
        let result = {
          "status": true,
          "data": [undefined]
        }
        result.data = [];
        for (const x of p) {
          let jsondata = {};

          const dataa = await sUser.getDataUser(x.id)
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
            }
          } else if (dataa.b != undefined) {
            //console.log("cliente")
            jsondata = {
              id: dataa.b.get("id"),
              identificaction: dataa.b.get("dni"),
              firstName: dataa.b.get("name"),
              lastName: dataa.b.get("lastNameP") + " " + dataa.b.get("lastNameM"),
              gender: dataa.b.get("gender"),
              phoneNumber: dataa.b.get("phoneNumber")
            }
          }


          //mapper
          let mapeado: any = {};
          mapper.map<UserAtributos, mUser>(x, mapeado);
          mapeado.person = jsondata;
          result.data.push(mapeado);
        }
        //console.log(result);

        res.status(200).json(result)
      })

    } catch (error) {
      ExecuteResponce.makeResponseException(res, error);
    }
  }
  public async getUserById(_req: Request, _res: Response) {
    try {
      const userId = _req.params.userId;
      const user = (await sUser.getUserById(userId)).get();
      if(user != undefined){
        let result = {
          "status": true,
          "data": {
            'user': {},
            person: {},
            roles:{}
          }
        }
        let jsondata = {};

        const dataa = await sUser.getDataUser(user.id);
        let role = {};

        ////console.log(dataa)
        if (dataa.a != undefined) {
          const headquarter = await Headquarter.findByPk(dataa.a.HeadquarterId);
          //console.log("empleado")
          jsondata = {
            id: dataa.a.id,
            dni: dataa.a.dni,
            name: dataa.a.name,
            lastNameP: dataa.a.lastNameP,
            lastNameM: dataa.a.lastNameM,
            displayName: dataa.a.name + " " + dataa.a.lastNameP,
            birthDate:dataa.a.birthDate ? (dataa.a.birthDate.split('-')[2] + '/' + dataa.a.birthDate.split('-')[1] + '/' + dataa.a.birthDate.split('-')[0]) :null,
            gender: dataa.a.gender,
            phoneNumber: dataa.a.phoneNumber,
            tlfNumber: dataa.a.tlfNumber,
            address: dataa.a.address,
            headquarter: headquarter.get()
          }

        } else if (dataa.b != undefined) {
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
            birthDate: cliente.birthDate ? (cliente.birthDate.split('-')[2] + '/' + cliente.birthDate.split('-')[1] + '/' + cliente.birthDate.split('-')[0]): null,
            gender: cliente.gender,
            phoneNumber: cliente.phoneNumber,
            tlfNumber: cliente.tlfNumber,
            address:   cliente.address,
            headquarter: headquarter
          }
        }
        
        role = (await db.query(`	SELECT 
        r.id,
        r."name",
        r.description,
        'employee' as "roleStr"
      FROM public."UserRole" ur
      left join public."Roles" r on ur."RoleId"=r."id"
      where ur."UserId"= ${user.id}`, { type: QueryTypes.SELECT }))[0]

        let mapeado: any = {};
        mapper.map<UserAtributos, mUser>(user, mapeado);
        result.data.user = mapeado;
        result.data.roles= role
        result.data.person = jsondata;
        _res.status(200).json(result)
      }else{
        ExecuteResponce.makeResponseException(_res, "Usuario bloqueado");  
      }
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }
  public getMenuForUser(_req: Request, _res: Response) {
    try {
      const userId = _req.params.user_id;
      const functions = sUser.getMenuForUser(userId);
      functions.then((p: any) => {
        let result = {
          "status": true,
          "data": p
        }
        _res.status(200).json(result)

      })
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }

  public getMenuMobileForUser(_req: Request, _res: Response) {
    try {
      const userId = _req.params.user_id;
      const functions = sUser.getMenuForUser(userId, 'M');
      functions.then((p: any) => {
        let result = {
          "status": true,
          "data": p
        }
        _res.status(200).json(result)

      })
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }
  public async getRolesByUser(_req: Request, _res: Response) {
    try {
      const userId = _req.params.user_id;
      const roles = await sUser.getRolesByUser(userId);


      for (const rol of roles) {
        const funcio = await db.query(`SELECT  distinct *
       FROM public."Functions" f
       inner join "RoleFunctions" rf on rf."FunctionId"= f.id
       where rf."RoleId" = ${(rol as any).RoleId}`, { type: QueryTypes.SELECT });

        (rol as any).functions = funcio
      }
      let result = {
        "status": true,
        "data": roles
      }
      _res.status(200).json(result)
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }
  public removeUserRole(_req: Request, _res: Response) {
    try {
      const user_id = _req.params.user_id;
      const role_id = _req.params.role_id;
      sUser.takeOffRole(role_id, user_id);
      let result = {
        "status": true,
        "message": {
          "code": "I010",
          "text": "UserRol - Eliminado exitosamente!"
        }
      }
      _res.status(200).json(result)
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }
  public async validToken(_req: Request, _res: Response) {
    try {
      const { userId, token } = _req.params;
      const tokenValid = await sUser.validToken(token, userId);
      const user = tokenValid;
      let jsondata = {};

      const dataa = await sUser.getDataUser(user.id)
      if (dataa.a != undefined) {
        //console.log("empleado")
        jsondata = {
          id: dataa.a.id,
          identificaction: dataa.a.dni,
          firstName: dataa.a.name,
          lastName: dataa.a.lastNameP + " " + dataa.a.lastNameM,
          gender: dataa.a.gender,
          phoneNumber: dataa.a.phoneNumber,
        }
      } else if (dataa.b != undefined) {
        //console.log("cliente")
        jsondata = {
          id: dataa.b.get("id"),
          identificaction: dataa.b.get("dni"),
          firstName: dataa.b.get("name"),
          lastName: dataa.b.get("lastNameP") + " " + dataa.b.get("lastNameM"),
          gender: dataa.b.get("gender"),
          phoneNumber: dataa.b.get("phoneNumber")
        }
      }
      let mapeado: any = {};
      mapper.map<UserAtributos, mUser>(user, mapeado);
      mapeado.person = jsondata;
      let result = {
        "status": true,
        "data": mapeado
      }
      _res.status(200).json(result)
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }
  public resetPasswordUser(_req: Request, _res: Response) {
    try {
      //const { newPassword, userId } = _req.fields;
      //await sUser.resetPasswordUser(userId, newPassword);
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }
  public async updateUser(_req: Request, _res: Response) {
    try {
      const userId = _req.params.userId;
      const body = _req.body;
      await sUser.updateUser(userId,body);
      let result = {
        "status": true,
        "message": {
          "code": "I010",
          "text": "La contraseña se actualizó correctamente"
        }
      }
      _res.status(200).json(result)
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }
  public addUserRoles(_req: Request, _res: Response) {
    try {
      const user_id = _req.params.user_id;
      const body = _req.body;
      //sUser.assignRoles(body, user_id);
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }
  public sendResetPassword(_req: Request, _res: Response) {
    try {
      // const { email } = _req.fields;
      // const user = await sUser.getUserByEmail(email);
      // const token = await sUser.createToken(user);
      // const url = `${config.urlFront}:${config.portFront}/reset/${user.id}/${token.hash}`;
      // const emailData = { email: user.username, url };
      // //res.status(200).json(emailData);
      // // Send email with password
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }
  public async addEmployee(_req: Request, _res: Response) {
    try {
      const fields = _req.body;
      const file = _req.body.file;
      const employee = await sUser.createUserEmployee(fields, file);
      await UserController.sendCredentials(employee, _res)
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }
  public async addClient(_req: Request, _res: Response) {
    try {
      const fields = _req.body;
      const client = await sUser.createUserCliente(fields);
      await UserController.sendCredentials(client, _res)
    } catch (error) {
      ExecuteResponce.makeResponseException(_res, error);
    }
  }

  public static async sendCredentials(userExtension: any, res: Response) {
    try {
      const user = await sUser.getUserById(userExtension.UserId);
      const { username, password } = user.get();
      const { name, lastNameP } = userExtension;
      const emailData = { email: username, password: password, fullname: `${name} ${lastNameP}` }
      // Send email with password
      sendPassword(emailData);
      let result = {
        "status": true,
        "message": {
          "code": "I001",
          "text": "Usuario - Creado exitosamente!"
        }
      }
      res.status(200).json(result);
    } catch (err) {
      ExecuteResponce.makeResponseException(res, err);
    }
  }
}

const userController = new UserController();
export default userController;

