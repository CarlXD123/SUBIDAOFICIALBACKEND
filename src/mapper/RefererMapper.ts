import { TypeMapper } from "ts-mapper";
import { RefererAtributos } from "../models/Referer";
import { mReferer } from "./referer/mReferer";

export class RefererMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }

    private config(): void {
        this.createMap<RefererAtributos, mReferer>()
        .map(src => src.id, dest => dest.id)
        .map(src => src.refererName, dest => dest.refererName)
    
    }
}

