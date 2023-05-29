import { Router } from 'express';
import cReferenceValue from '../controllers/cReferenceValue'
class ReferenceValueRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", cReferenceValue.getPagedReferenceValue);
    this.router.get("/all", cReferenceValue.getAllReferenceValue);
    this.router.post("/", cReferenceValue.createReferenceValue);
    this.router.get("/:id", cReferenceValue.getReferenceValue);
    this.router.put("/exam/edit/:id/", cReferenceValue.updateExaminationReferenceValue);
    this.router.get("/exam/examinationValues/", cReferenceValue.getExaminationValues);
    this.router.get("/exam/:id/", cReferenceValue.getExamValuebyExamId);
    this.router.put("/:id", cReferenceValue.updateReferenceValue);
    this.router.delete("/:id", cReferenceValue.deleteReferenceValue);
  }
}
const referenceValueRouter = new ReferenceValueRouter();
export default referenceValueRouter.router;