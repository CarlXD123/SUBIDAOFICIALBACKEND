import { Router } from 'express';
import cPriceList from '../controllers/cPriceList'
class PriceListRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", cPriceList.getAllPriceList);
		this.router.get("/:id", cPriceList.getPriceList);

		this.router.post("/", cPriceList.createPriceList);

		this.router.put("/:id", cPriceList.updatePriceList);
		this.router.delete("/:id", cPriceList.deletePriceList);
	}
}
const priceListRouter = new PriceListRouter();
export default priceListRouter.router;