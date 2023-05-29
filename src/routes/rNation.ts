import { Router } from 'express';
import cNation from '../controllers/cNation'
class NationRouter {
    public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

    routes() {
		this.router.get("/", cNation.getPagedNation);
		this.router.get("/all", cNation.getAllNation);
		this.router.get("/:id", cNation.getNation);

		this.router.post("/", cNation.createNation);

		this.router.put("/:id", cNation.updateNation);
		this.router.delete("/:id", cNation.deleteNation);
	}
}
const nationRouter = new NationRouter();
export default nationRouter.router;