import { Router } from 'express';
import cService from '../controllers/cService'
class ServiceRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", cService.getPagedService);
		this.router.get("/all", cService.getAllService);
		this.router.get("/:id", cService.getService);

		this.router.post("/", cService.createService);

		this.router.put("/:id", cService.updateService);
		this.router.delete("/:id", cService.deleteService);
	}
}
const serviceRouter = new ServiceRouter();
export default serviceRouter.router;
