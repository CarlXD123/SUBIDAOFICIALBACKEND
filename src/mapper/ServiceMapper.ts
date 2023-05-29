import { TypeMapper } from "ts-mapper";
import { ServiceAtributos } from "../models/Service";
import { mService } from "./service/mService";

export class ServiceMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<ServiceAtributos, mService>()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)
    }
}