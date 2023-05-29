import { Router } from 'express';
import cAmb from '../controllers/cAmb'
class AmbRouter {
    public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

    routes() {
		this.router.get("/", cAmb.getPagedAmb);
		this.router.get("/all", cAmb.getAllAmb);
		this.router.get("/:id", cAmb.getAmb);

		this.router.post("/", cAmb.createAmb);

		this.router.put("/:id", cAmb.updateAmb);
		this.router.delete("/:id", cAmb.deleteAmb);
	}
}
const ambRouter = new AmbRouter();
export default ambRouter.router;