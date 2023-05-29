import { Router } from 'express';
import cApilisModel from '../controllers/cApilisModel'

class ApilisModelRouter {
    public router: Router;
    constructor() {
      this.router = Router();
      this.routes();
    }

    routes() {
        this.router.get("/brand/:id", cApilisModel.getAllModel);
        this.router.get("/:id", cApilisModel.getModel);
        this.router.post("/", cApilisModel.addModel);
        this.router.put("/:id", cApilisModel.updateModel);
        
        this.router.delete("/:id", cApilisModel.deleteModel);
      }
}

const apilisModelRouter = new ApilisModelRouter();
export default apilisModelRouter.router;
