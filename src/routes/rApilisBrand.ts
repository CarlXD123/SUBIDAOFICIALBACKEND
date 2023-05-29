import { Router } from 'express';
import cApilisBrand from '../controllers/cApilisBrand'

class ApilisBrandRouter {
    public router: Router;
    constructor() {
      this.router = Router();
      this.routes();
    }

    routes() {
        this.router.get("/", cApilisBrand.getAllBrand);
        this.router.get("/:id", cApilisBrand.getBrand);
        this.router.post("/", cApilisBrand.addBrand);
        this.router.put("/:id", cApilisBrand.updateBrand);
        
        this.router.delete("/:id", cApilisBrand.deleteBrand);
      }
}

const apilisBrandRouter = new ApilisBrandRouter();
export default apilisBrandRouter.router;

