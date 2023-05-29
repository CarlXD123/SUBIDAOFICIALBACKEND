import { Router } from 'express';
import cProvince from '../controllers/cProvince'
class ProvinceRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/district/:id", cProvince.getDistrictsForProvince);
	}
}
const provinceRouter = new ProvinceRouter();
export default provinceRouter.router;