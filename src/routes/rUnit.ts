import { Router } from 'express';
import cUnit from '../controllers/cUnit'
class UnitRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/all", cUnit.getAllUnit);
    this.router.get("/", cUnit.getPagedUnit);
    this.router.get("/:id", cUnit.getUnit);

    this.router.post("/", cUnit.createUnit);

    this.router.put("/:id", cUnit.updateUnit);
    this.router.delete("/:id", cUnit.deleteUnit);
  }
}
const unitRouter = new UnitRouter();
export default unitRouter.router;
