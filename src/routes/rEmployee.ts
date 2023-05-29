import { Router } from 'express';
import cEmployee from '../controllers/cEmployee'
class EmployeeRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", cEmployee.getPagedEmployee);
		this.router.get("/all", cEmployee.getAllEmployee);
		this.router.get("/:id", cEmployee.getEmployee);
		this.router.get("/type/:typeEmployeeId", cEmployee.getEmployeeByTypeEmployee);

		this.router.delete("/:user_id", cEmployee.destroyEmployee);

		this.router.put("/:user_id", cEmployee.updateEmployee);
	}
}
const employeeRouter = new EmployeeRouter();
export default employeeRouter.router;

