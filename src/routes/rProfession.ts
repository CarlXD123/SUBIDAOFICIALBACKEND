import { Router } from "express";
import cProfession from '../controllers/cProfession'

class ProfessionRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}
	routes() {
		this.router.get("/", cProfession.getPagedProfession);
		this.router.get("/all", cProfession.getAllProfession);
		this.router.get("/:id", cProfession.getProfession);

		this.router.post("/", cProfession.createProfession);

		this.router.put("/:id", cProfession.updateProfession);
		this.router.delete("/:id", cProfession.deleteProfession);
	}
}
const professionRouter = new ProfessionRouter();
export default professionRouter.router;

