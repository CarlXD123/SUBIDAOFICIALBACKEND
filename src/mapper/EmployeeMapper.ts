import { TypeMapper } from "ts-mapper";
import { EmployeeAtributos } from "../models/Employee";
import { mEmployee } from "./employee/mEmployee";

export class EmployeeMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<EmployeeAtributos, mEmployee>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.dni, dest => dest.dni)
            .map(src => src.admissionDate, dest => dest.admissionDate)
            .map(src => src.birthDate, dest => dest.birthDate)
            .map(src => src.admissionDate, dest => dest.admissionDate)
            .map(src => src.name, dest => dest.name)
            .map(src => src.lastNameP, dest => dest.lastNameP)
            .map(src => src.lastNameM, dest => dest.lastNameM)
            .map(src => src.gender, dest => dest.gender)
            .map(src => src.civilStatus, dest => dest.civilStatus)
            .map(src => src.tlfNumber, dest => dest.tlfNumber)
            .map(src => src.digitalSignatureUrl, dest => dest.digitalSignatureUrl)
            .map(src => src.tuitionNumber, dest => dest.tuitionNumber)
            .map(src => src.tuitionNumber2, dest => dest.tuitionNumber2)
            .map(src => src.address, dest => dest.address)
            .map(src => src.referencePoint, dest => dest.referencePoint)
            .map(src => src.typeDirection, dest => dest.typeDirection)
            .map(src => src.status, dest => dest.status)
    }
}