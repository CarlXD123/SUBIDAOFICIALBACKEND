import csv from 'csv-parser';
import fs from 'fs';

class ReadCsvServicios {
    constructor() {
    }

    public static parseIdMuestra(idMuestra: string): {
        codigoCita: string,
        codigoPaciente: string,
        idCita: number,
        idExamCita: number,
        examenId: number
    } {
        const parts = idMuestra.split('_');
        return {
        codigoCita: parts[0],
        codigoPaciente: parts[1],
        idCita: parseInt(parts[2], 10),
        idExamCita: parseInt(parts[3], 10),
        examenId: parseInt(parts[4], 10),
        };
    }
        
}
export default ReadCsvServicios; 
