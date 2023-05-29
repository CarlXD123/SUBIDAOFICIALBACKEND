import { Router } from 'express';
import cApilisMatchData from '../controllers/cApilisMatchData'

class ApilisMatchRouter {
    public router: Router;
    constructor() {
      this.router = Router();
      this.routes();
    }

    routes() {
        this.router.get("/", cApilisMatchData.getAllMatchData);
        this.router.get("/:id", cApilisMatchData.getMatchData);
        this.router.post("/", cApilisMatchData.addMatchData);
        this.router.put("/:id", cApilisMatchData.updateMatchData);
        
        this.router.delete("/:id", cApilisMatchData.deleteMatchData);
      }
}

const apilisMatchRouter = new ApilisMatchRouter();
export default apilisMatchRouter.router;
