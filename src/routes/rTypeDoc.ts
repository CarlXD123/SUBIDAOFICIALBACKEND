import { Router } from 'express';
import cTypeDoc from '../controllers/cTypeDoc'
class TypeDocRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", cTypeDoc.getPagedTypeDoc);
		this.router.get("/all", cTypeDoc.getAllTypeDoc);
		this.router.get("/:id", cTypeDoc.getTypeDoc);

		this.router.post("/", cTypeDoc.createTypeDoc);

		this.router.put("/:id", cTypeDoc.updateTypeDoc);
		this.router.delete("/:id", cTypeDoc.deleteTypeDoc);
	}
}
const typeDocRouter = new TypeDocRouter();
export default typeDocRouter.router;