import { Router } from 'express'
import cDoctor from '../controllers/cDoctor'

class DoctorRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/all", cDoctor.getAllDoctors);

		this.router.post("/", cDoctor.addDoctor);
	}
}
const doctorRouter = new DoctorRouter();
export default doctorRouter.router;

