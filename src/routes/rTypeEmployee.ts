import { Router } from 'express';
import cTypeEmployee from '../controllers/cTypeEmployee'
class TypeEmployeeRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", cTypeEmployee.getPagedTypeEmployee);
		this.router.get("/all", cTypeEmployee.getAllTypeEmployee);
		this.router.get("/:id", cTypeEmployee.getTypeEmployee);

		this.router.post("/", cTypeEmployee.createTypeEmployee);
		
		this.router.put("/:id", cTypeEmployee.updateTypeEmployee);
		this.router.delete("/:id", cTypeEmployee.deleteTypeEmployee);
	}
}
const typeEmployeeRouter = new TypeEmployeeRouter();
export default typeEmployeeRouter.router;
