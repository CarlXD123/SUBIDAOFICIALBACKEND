import { Router } from 'express';
import cTypeAgreement from '../controllers/cTypeAgreement'
class TypeAgreementRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/all", cTypeAgreement.getAllTypeAgreement);
	}
}
const typeAgreementRouter = new TypeAgreementRouter();
export default typeAgreementRouter.router;