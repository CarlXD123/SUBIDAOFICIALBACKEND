import { Router } from 'express';
import cApilisMatchDataDetail from '../controllers/cApilisMatchDataDetail'

class ApilisMatchDataDetailRouter {
    public router: Router;
    constructor() {
      this.router = Router();
      this.routes();
    }

    routes() {
        this.router.get("/", cApilisMatchDataDetail.getAllMatchDataDetail);
        this.router.get("/:id", cApilisMatchDataDetail.getMatchDataDetail);
        this.router.get("/value/exam/:id", cApilisMatchDataDetail.getExamValueByExamination);
        this.router.get("/value/exam2/:id", cApilisMatchDataDetail.getExamValueByExamination2);
        this.router.post("/", cApilisMatchDataDetail.addMatchDataDetail);
        this.router.put("/:id", cApilisMatchDataDetail.updateMatchDataDetail);
        
        this.router.delete("/:id", cApilisMatchDataDetail.deleteMatchDataDetail);
      }
}

const apilisMatchDataDetailRouter = new ApilisMatchDataDetailRouter();
export default apilisMatchDataDetailRouter.router;
