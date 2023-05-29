import { Router } from 'express';
import cMethod from '../controllers/cMethod'
class MethodRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", cMethod.getPagedMethod);
		this.router.get("/all", cMethod.getAllMethod);
		this.router.get("/:id", cMethod.getMethod);

		this.router.post("/", cMethod.createMethod);

		this.router.put("/:id", cMethod.updateMethod);
		this.router.delete("/:id", cMethod.deleteMethod);
	}
}
const methodRouter = new MethodRouter();
export default methodRouter.router;