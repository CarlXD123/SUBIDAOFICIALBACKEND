"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const sReadCsv = __importDefault(require('../services/sReadsCsv'));
const config_database_1 = __importDefault(require("../config/config.database"));
const path =  require('path');
const csvParser = require('csv-parser');
const fs =  require('fs');

class ReadCsvController {
    constructor() {
    }

    readCsv(_req, _res) {
      try {
        const directoryPath = 'C:\\Users\\CARLOS\\Documents\\APILIS\\Dymind\\MSH-3\\02_Procesados';
        const files = fs.readdirSync(directoryPath);
        const columnsToExtract = ['idmuestra']; // Agrega los nombres de las columnas que deseas extraer

    
        const processFile = async (file) => { // Modifica esta línea para que la función sea async
          const filePath = path.join(directoryPath, file);
    
          await new Promise((resolve, reject) => { // Añade el await aquí
            fs.createReadStream(filePath)
              .pipe(csvParser({ separator: ',' }))
              .on('data', async (row) => { // Añade async aquí
                const extractedColumns = {};
                for (const column of columnsToExtract) {
                  extractedColumns[column] = row[column];
                }
              
                // Agrega el código para insertar en la base de datos aquí
                const idMuestraData = sReadCsv.default.parseIdMuestra(row.idmuestra);

                const arrayidmuestra = [idMuestraData]
                const columnValues = Object.values(row).slice(1,41).map(column => column.trim());
                const columnNames = Object.keys(row).slice(1, 41).map(column => column.trim());
                const promises2 = [];
            
               
               // for (const value of columnValues) {
                  //console.log(value)
                  
                  for (const muestra of arrayidmuestra) {
                    const innerPromises = [];
                    const promises2 = [];
                    const promises3 = [];
                    //columnNames.forEach((columnName, index) => {
                      
                    for (let i = 0; i < columnNames.length; i++) {
                      const value = columnValues[i];
                      const columnName = columnNames[i];
                      
                        const query = `UPDATE public."ExaminationDetails" AS deta SET value = '${value}'
                          FROM public."ExaminationValues" AS ev
                          INNER JOIN public."ExaminationGroups" AS eg ON (eg.id = ev."ExaminationGroupId")
                          INNER JOIN public."Examinations" AS ex ON (ex."id" = eg."ExaminationId")
                          INNER JOIN public."AppointmentDetails" AS ad ON (ad."ExaminationId" = eg."ExaminationId")
                          INNER JOIN public."Appointments" AS af ON (af.id = ad."AppointmentId")
                          WHERE af.id = ${muestra.idCita}
                            AND ad.id = ${muestra.idExamCita}
                            AND ad."ExaminationId" = ${muestra.examenId}
                            AND deta."AppointmentDetailId" = ${muestra.idExamCita}
                            AND deta."ExaminationValueId" = ev.id
                            AND ex."id" = ${muestra.examenId}
                            AND ev.name = '${columnName}';
                        `;
                        const a = config_database_1.default.query(query);
                        innerPromises.push(a);
                      
                    }
                    //});
                    await Promise.all(innerPromises);
                    //await Promise.all(innerPromises).then(async () => {
                      const query2 = `UPDATE public."AppointmentDetails"
                        SET "idMuestra" = '${row.idmuestra}'
                        FROM public."ApilisMatchDatas" AS amc
                        WHERE "ExaminationId" = amc."idExamen" AND amc."idExamen"=${muestra.examenId} AND "AppointmentId"=${muestra.idCita}`;
      
                      const b = config_database_1.default.query(query2);
                      b.then(() => console.log('Consulta ejecutada correctamente')).catch((error) => console.log(error));
                      promises2.push(b);


                      const totalColumns = 40;

                      // Obtén la cantidad de valores que tienes
                      const numberOfValues = columnValues.length;

                      // Calcula cuántos valores faltan
                      const missingValues = totalColumns - numberOfValues;

                      // Completa los valores faltantes con NULL (o algún otro valor por defecto)
                      for (let i = 0; i < missingValues; i++) {
                        columnValues.push(null);
                      }
                      const valuesString = columnValues.map(value => value === null ? 'NULL' : `'${value}'`).join(", ");
                      const query3 = `INSERT INTO public."ApilisMonitors" 
                      ("createdAt","updatedAt","codeApi", "idPatient", "idExam","processedAt", field01, val01, val02, val03, val04, 
                      val05, val06, val07, val08, val09, val10, val11, val12, val13, val14, val15, val16, val17, 
                      val18, val19, val20, val21, val22, val23, val24, val25, val26, val27, val28, val29, val30, 
                      val31, val32, val33, val34, val35, val36, val37, val38, val39, val40)
                      
                      VALUES (NOW(),NOW(),'${row.idmuestra}', (SELECT id FROM public."Clients" WHERE code = '${muestra.codigoPaciente}'), ${muestra.examenId},NOW(), 'A', ${valuesString})`;
    
                    const c = config_database_1.default.query(query3);
                    c.then(() => console.log('Consulta ejecutada correctamente')).catch((error) => console.log(error));
                    promises3.push(b);
                    //});
                  }

                  await Promise.all(promises2)

                  




                  .then(() => {
                    console.log('Todas las consultas se han ejecutado correctamente');
                    resolve();
                  })
                  .catch((error) => {
                    console.log('Error al ejecutar las consultas:', error);
                    reject(error);
                  });
              //}
              })
          });
        };
    
        const promises = files
          .filter((file) => path.extname(file) === '.csv')
          .map((file) => processFile(file));
    
         return Promise.all(promises); // Añade await aquí
        //console.log(data);
    
      } catch (error) {
        _res.status(500).json({ message: 'Error al leer los archivos CSV' });
      }
    }
}


const readCsvController = new ReadCsvController();
exports.default = readCsvController;