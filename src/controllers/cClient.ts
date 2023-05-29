import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { ClientMapper } from "../mapper/ClientMApper";
import sClient from '../services/sClient';
const mapper = new ClientMapper();
class ClientController {
    constructor() {
    }
    public getClientAll(_req: Request, _res: Response) {
        try {
            //console.log(_req);
            const range = (_req.query.range as string) || '[0,9]'
            const [start, end] = JSON.parse(range)
            const limit = end - start + 1
            const query = _req.query;
            const client = sClient.getClientAll(start, limit, query);
            client.then((c: any) => {
                let result = {
                    "status": true,
                    ...c
                }
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getClientByDOC(_req: Request, _res: Response) {
        try {
            const query = _req.query;
            const client = sClient.getClientByDOC(query);
            //console.log(client)
            client.then((c: any) => {
                //console.log(c)
                if (!c) {
                    //console.log("error")
                    let res = { "status": false, "message": { "code": "E001", "text": "Usuario - no encontrado!" } }
                    _res.status(200).json(res);
                } else {
                    let result = {
                        "status": true,
                        "data": c
                    }
                    _res.status(200).json(result);
                }
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getClientByName(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,9]'
            const [start, end] = JSON.parse(range)
            const limit = end - start + 1
            const query = _req.query;
            let client = sClient.getClientByName(start, limit, query);
            client.then((c: any) => {
                let result = {
                    "status": true,
                    ...c
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getClient(_req: Request, _res: Response) {
        try {
            const id = _req.params.id;
            const client = sClient.getClient(id);
            client.then((p: any) => {
                let result = {
                    "status": true,
                    "data": p
                }
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public destroyClient(_req: Request, _res: Response) {
        try {
            let id = _req.params.user_id
            sClient.destroyClient(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I002",
                    "text": "Usuario - Elimado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async updateClient(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.user_id
            let body2 = _req.body;
            let id2 = _req.params.user_id
            const client = await sClient.updateClient(id, body);
            await sClient.updateUser(id2, body2);
            let result = {
                "status": true,
                "message": {
                    "code": "I002",
                    "text": "Usuario - Modificado exitosamente!"
                }
            }
            //console.log(result);
            _res.status(200).json(result);

        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const clientController = new ClientController();
export default clientController;