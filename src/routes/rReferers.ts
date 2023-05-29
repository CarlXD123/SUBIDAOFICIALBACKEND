import { Router } from 'express';
import cReferer from '../controllers/cReferer'


class RefererRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/all", cReferer.getAllReferers);

		this.router.post("/", cReferer.addReferer);
	}

}
const refererRouter = new RefererRouter();
export default refererRouter.router;

