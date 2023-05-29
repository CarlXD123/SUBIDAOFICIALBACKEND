import { QueryTypes, where } from 'sequelize';
import db from '../config/config.database';
import Examination from '../models/Examination';
import ExaminationPrice from '../models/ExaminationPrice';
import PriceList from '../models/PriceList';

class PriceListServicios {
    constructor() {
    }
    public static buildQuery(query) {
        let where = { status: 'A' };

        if (query.agreementId) {
            where['AgreementId'] = query.agreementId
        }

        return where;
    }
    public static async getAllPriceList(query = {}) {
        let where = PriceListServicios.buildQuery(query);
        return await PriceList.findAll({
            where,
            order: [
                ['id', 'ASC']
            ]
        });
    }
    public static async getExaminationsByPriceList(id: any) {
        return await db.query(`SELECT 
        e.id,
        e."name",
        ep.price
    FROM 
    public."ExaminationPrices" ep 
    inner join public."Examinations" e on e.id = ep."ExaminationId"
    where  e.status='A' and ep."PriceListId" = ${id}`, { type: QueryTypes.SELECT })
    }
    public static async createPriceList(data: any) {

        const priceList = (await PriceList.create(data)).get();

        await this.CreateExaminationPrice(data, priceList.id);

    }
    public static async CreateExaminationPrice(data: any, id: any) {
        if (data.examinations)
            for (let examination of data.examinations) {
                await db.query(`INSERT INTO public."ExaminationPrices"(
                    price, "createdAt", "updatedAt", "ExaminationId", "PriceListId")
                    VALUES (${examination.discountPrice}, NOW(), NOW(), ${examination.id}, ${id});`,{type:QueryTypes.INSERT});
            }
    }
    public static async DeleteExaminationPrice(id: any) {
        await ExaminationPrice.destroy({ where: { PriceListId: id } });
    }
    public static async getPriceList(id: any) {
        const priceList = await PriceList.findOne({
            where: { id:id }
        });

        if (!priceList) {
            //console.log("Error");
        }
        return priceList;
    }
    
    //buscar examination
    public static async getPriceListByExamination(id: any) {
        const listaprecios = await db.query<any>(`select id,"name",discountprice from (
	select xp."id" ,xp."name", ex.price as discountprice, xp."status"
	from public."Examinations" as xp
	inner join public."ExaminationPrices" as ex on (ex."ExaminationId" = xp."id")
	where ex."PriceListId" = ${id}
union all
	select  xp."id",xp."name" , 0 as discountprice, xp."status"
	from public."Examinations" as xp
	left  join public."ExaminationPrices" as ex on (ex."ExaminationId" = xp."id")
	where ex."PriceListId" is null
union all
	select distinct xp."id", xp."name", 0 , xp."status"
	from public."Examinations" as xp
	inner join public."ExaminationPrices" as ex on (ex."ExaminationId" = xp."id")
	where xp."id" not in (select xp."id" 
							from public."Examinations" as xp
							inner join public."ExaminationPrices" as ex on (ex."ExaminationId" = xp."id")
							where ex."PriceListId" = ${id})		   		  
) as tb
where tb."status" = 'A'
order by tb."name"`, { type: QueryTypes.SELECT })

        let listaParseada = []
        for (const lista of listaprecios) {
            listaParseada.push({
                id: lista.id,
                name: lista.name,
                discountPrice: lista.discountprice,
            })
        }
        console.log(listaprecios);
        return listaParseada;

    }


    public static async updatePriceList(id: any, data: any) {
        const priceList = await this.getPriceList(id);
        await priceList.update(data);
        if (data.examinations) {
            await ExaminationPrice.destroy({ where: { PriceListId: id } });
            for (let examination of data.examinations){
                await db.query(`INSERT INTO public."ExaminationPrices"(
                    price, "createdAt", "updatedAt", "ExaminationId", "PriceListId")
                    VALUES (${examination.discountPrice}, NOW(), NOW(), ${examination.id}, ${id});`,{type:QueryTypes.INSERT});
            }
        }
        return priceList;
    }
    public static async destroyPriceList(id: any) {
        const priceList = await PriceList.findByPk(id);
        if (!priceList)
            //console.log("Error");

        return priceList.update({ status: 'E' });
    }
}
export default PriceListServicios;