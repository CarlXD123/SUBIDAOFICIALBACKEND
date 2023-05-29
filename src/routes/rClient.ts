import { Router } from 'express';
import cClient from '../controllers/cClient'
class ClientRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", cClient.getClientAll);
		this.router.get("/doc/search", cClient.getClientByDOC);
		this.router.get("/name/search", cClient.getClientByName);
		this.router.get("/:id", cClient.getClient);

		this.router.delete("/:user_id", cClient.destroyClient);
		
		this.router.put("/:user_id", cClient.updateClient);
	}
}
const clientRouter = new ClientRouter();
export default clientRouter.router;

