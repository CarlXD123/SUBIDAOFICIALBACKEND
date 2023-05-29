import { Router } from 'express';
import cExamination from '../controllers/cExamination'
class ExaminationRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/filter", cExamination.getFilterExamination);
		this.router.get("/", cExamination.getPagedExamination);
		this.router.get("/all", cExamination.getAllExamination);
		this.router.get("/:id", cExamination.getExamination);

		this.router.put("/edit/values/:id", cExamination.updateExaminationValues);
		this.router.put("/group/edit/:id", cExamination.updateGroupExamination);
		this.router.put("/examn/edit", cExamination.updateGroupExam);

		this.router.put("/:id", cExamination.updateExamination);
		
		this.router.post("/", cExamination.createExamination);
		
		
		this.router.delete("/:id", cExamination.deleteExamination);
	}
}
const examinationRouter = new ExaminationRouter();
export default examinationRouter.router;