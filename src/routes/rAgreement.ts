import { Router } from 'express';
import cAgreement from '../controllers/cAgreement';
class AgreementRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}
	routes() {
		
		this.router.get("/filter", cAgreement.getFilterAgreement);
		
		this.router.get("/", cAgreement.getPagedAgreement);
		this.router.get("/all", cAgreement.getAllAgreement);
		this.router.get("/:id", cAgreement.getAgreement);


		this.router.post("/", cAgreement.createAgreement);

		this.router.put("/:id", cAgreement.updateAgreement);
		this.router.delete("/:id", cAgreement.deleteAgreement);
	}
}
const agreementRouter = new AgreementRouter();
export default agreementRouter.router;


