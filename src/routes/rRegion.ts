import { Router } from 'express';
import cRegion from '../controllers/cRegion'
class RegionRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", cRegion.getRegions);
		this.router.get("/province/:id", cRegion.getProvincesForRegion);
	}
}
const regionRouter = new RegionRouter();
export default regionRouter.router;