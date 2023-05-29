import { Request, Response } from 'express';
import db from "../config/config.database";
import path from 'path';
import csvParser from 'csv-parser';
import fs from 'fs';
import sReadCsv from '../services/sReadCsv';

class ReadCsvController {
  constructor() {
  }
    public async readCsv(_req: Request, _res: Response) {
      try {
        const directoryPath = 'C:\\Users\\CARLOS\\Documents\\APILIS\\Dymind\\MSH-3\\02_Procesados';
        const files = fs.readdirSync(directoryPath);
        const columnsToExtract = ['idmuestra']; // Agrega los nombres de las columnas que deseas extraer
      
    
        const processFile = async (file: string): Promise<void> => {
          const filePath = path.join(directoryPath, file);
    
          await new Promise<void>((resolve, reject) => {
            fs.createReadStream(filePath)
              .pipe(csvParser({ separator: ',' }))
              .on('data', async (row: any) => {
                const extractedColumns: { [key: string]: any } = {};
                for (const column of columnsToExtract) {
                  extractedColumns[column] = row[column];
                }
    
                // Agrega el código para insertar en la base de datos aquí
                const idMuestraData = sReadCsv.parseIdMuestra(row.idmuestra);
    
                const arrayidmuestra = [idMuestraData];
                const columnValues = Object.values(row).slice(1,41);   
                const columnNames = Object.keys(row).slice(1, 41);
                const promises2: Promise<any>[] = [];
                
                for (const muestra of arrayidmuestra) {
                  const innerPromises: Promise<any>[] = [];
                  const promises2: Promise<any>[] = [];
                  const promises3: Promise<any>[] = [];

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
                        AND ev.name = '${columnName}'`;
                    const a = db.query(query);
                    innerPromises.push(a);
                  }

                  //await Promise.all(innerPromises).then(async () => {
                    const query2 = `UPDATE public."AppointmentDetails"
                    SET "idMuestra" = '${row.idmuestra}'
                    FROM public."ApilisMatchDatas" AS amc
                    WHERE "ExaminationId" = amc."idExamen" AND amc."idExamen"=${muestra.examenId}`;
  
                  const b = db.query(query2);
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

                const c = db.query(query3);
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
            
      })
    })
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
const readcsvController = new ReadCsvController();
export default readcsvController;