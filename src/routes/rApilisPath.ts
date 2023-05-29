import { Router } from 'express';
import cApilisPath from '../controllers/cApilisPath'

class ApilisPathRouter {
    public router: Router;
    constructor() {
      this.router = Router();
      this.routes();
    }

    routes() {
        this.router.get("/", cApilisPath.getAllPath);
        this.router.get("/:id", cApilisPath.getPath);
        this.router.post("/", cApilisPath.addPath);
        this.router.put("/:id", cApilisPath.updatePath);
        
        this.router.delete("/:id", cApilisPath.deletePath);
      }
}

const apilisPathRouter = new ApilisPathRouter();
export default apilisPathRouter.router;

