import { Response } from 'express';
import  * as msg from "../config/properties/string.config";


export class ExecuteResponce{
    
    static makeResponseOkMessage(res:Response, code:any) {
        let message = {code: code, text: msg.alertas[code]}
        let json = {
            "status": true,
            "message" : { 
                  "code" : message.code,
                  "text" : message.text
              }
          
          }
        res.status(200).json(json);
    }
    
    static makeResponseException(res:Response,error:any){
        if(!error.hasOwnProperty('code'))
            error.code = "E000";
        let json = {
            "status": false,
            "message": {
                "code": error.code,
                "text": error.message
            }
        }
        res.status(200).json(json);
    }

}
