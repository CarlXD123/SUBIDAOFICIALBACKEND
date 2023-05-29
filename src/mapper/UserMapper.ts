import { TypeMapper } from "ts-mapper";
import { RefererAtributos } from "../models/Referer";
import { UserAtributos } from "../models/User";
import { mReferer } from "./referer/mReferer";
import { mUser } from "./user/mUser";

export class UserMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }

    private config(): void {
        // put here your mapping configurations
        this.createMap<UserAtributos, mUser>()
        .map(src => src.id, dest => dest.id)
        .map(src => src.username, dest => dest.email)
        .map(src => src.urlAvatar, dest => dest.urlAvatar)
        
        this.createMap<RefererAtributos, mReferer>()
        .map(src => src.id, dest => dest.id)
        .map(src => src.refererName, dest => dest.refererName)
    
    }
}

