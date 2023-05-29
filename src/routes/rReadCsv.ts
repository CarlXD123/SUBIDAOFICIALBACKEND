import { Router } from 'express';
import cReadCsv from '../controllers/cReadCsv'

class ReadCsvRouter {
    public router: Router;
    constructor() {
      this.router = Router();
      this.routes();
    }

    routes() {
        this.router.get("/dymind", cReadCsv.readCsv);
      }
}

const readCsvRouter = new ReadCsvRouter();
export default readCsvRouter.router;