import { Router } from 'express';
import cApilisMonitor from '../controllers/cApilisMonitor'

class ApilisMonitorRouter {
    public router: Router;
    constructor() {
      this.router = Router();
      this.routes();
    }

    routes() {
        this.router.get("/", cApilisMonitor.getAllMonitor);
        this.router.get("/:id", cApilisMonitor.getMonitor);
        this.router.post("/", cApilisMonitor.addMonitor);
        this.router.put("/:id", cApilisMonitor.updateMonitor);
        
        this.router.delete("/:id", cApilisMonitor.deleteMonitor);
      }
}

const apilisMonitorRouter = new ApilisMonitorRouter();
export default apilisMonitorRouter.router;