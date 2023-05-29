import { Router } from 'express';
import cRole from '../controllers/cRole'
class RoleRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/all", cRole.getAllRole);
		this.router.get("/", cRole.getPagedRole);
		this.router.get("/function/:id", cRole.getFunctionsForRole);
		this.router.get("/:id", cRole.getRole);

		this.router.post("/", cRole.createRole);
		
		this.router.put("/:id", cRole.updateRole);
		
	}
}
const roleRouter = new RoleRouter();
export default roleRouter.router;