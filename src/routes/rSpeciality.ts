import { Router } from 'express';
import cSpeciality from '../controllers/cSpeciality'
class SpecialityRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", cSpeciality.getPagedSpeciality);
		this.router.get("/all", cSpeciality.getAllSpeciality);
		this.router.get("/:id", cSpeciality.getSpeciality);

		this.router.post("/", cSpeciality.createSpeciality);

		this.router.put("/:id", cSpeciality.updateSpeciality);
		this.router.delete("/:id", cSpeciality.deleteSpeciality);
	}
}
const specialityRouter = new SpecialityRouter();
export default specialityRouter.router;
