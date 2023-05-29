import { Router } from 'express';
import cTuition from '../controllers/cTuition'
class TuitionRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", cTuition.getPagedTuition);
		this.router.get("/all", cTuition.getAllTuition);
		this.router.get("/:id", cTuition.getTuition);

		this.router.post("/", cTuition.createTuition);

		this.router.put("/:id", cTuition.updateTuition);
		this.router.delete("/:id", cTuition.deleteTuition);
	}
}
const tuitionRouter = new TuitionRouter();
export default tuitionRouter.router;