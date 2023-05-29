import { TypeMapper } from "ts-mapper";
import { ApilisMonitorAtributos } from "../models/ApilisMonitor";
import { mApilisMonitor } from "./apilisMonitor/mApilisMonitor";

export class ApilisMonitorMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<ApilisMonitorAtributos, mApilisMonitor>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.codBaja, dest => dest.codBaja)
            .map(src => src.codeApi, dest => dest.codeApi)
            .map(src => src.idPatient, dest => dest.idPatient)
            .map(src => src.idExam, dest => dest.idExam)
    }
}