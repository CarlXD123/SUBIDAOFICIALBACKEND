import { Router } from 'express';
import cCategory from '../controllers/cCategory'
class CategoryRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}
	routes() {
		this.router.get("/", cCategory.getAllCategory);
		this.router.get("/:id", cCategory.getCategory);

		this.router.post("/", cCategory.createCategory);

		this.router.put("/:id", cCategory.updateCategory);
		this.router.delete("/:id", cCategory.deleteCategory);
	}
}
const categoryRouter = new CategoryRouter();
export default categoryRouter.router;