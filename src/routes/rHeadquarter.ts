import { Router } from 'express';
import cHeadquarter from '../controllers/cHeadquarter';
class HeadquarterRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/all", cHeadquarter.getAllHeadquarter);
		this.router.get("/:id", cHeadquarter.getHeadquarter);

		this.router.put("/:id", cHeadquarter.updateHeadquarter);
		
		this.router.post("/", cHeadquarter.createHeadquarter);
	}
}
const headquarterRouter = new HeadquarterRouter();
export default headquarterRouter.router;