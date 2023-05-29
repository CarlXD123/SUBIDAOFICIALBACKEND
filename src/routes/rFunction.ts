import { Router } from 'express';
import cFunction from '../controllers/cFunction'
class FunctionRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", cFunction.getAllFunctions);
		this.router.get("/linkable", cFunction.getAllLinkableFunctions);
		this.router.get("/:id", cFunction.getFunction);
		this.router.get("/role/:id", cFunction.getRolesForFunction);
		this.router.get("/action/:id/:role_id", cFunction.getActionsByRole);

		this.router.post("/", cFunction.addFunction);
	
		this.router.put("/:id", cFunction.updateFunction);
		this.router.delete("/:id", cFunction.deleteFunction);
	}
}
const functionRouter = new FunctionRouter();
export default functionRouter.router;