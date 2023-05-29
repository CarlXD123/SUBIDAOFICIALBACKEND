import { Router } from 'express';
import cReport from '../controllers/cReport'
class ReportRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/appointments", cReport.getAppointmentsByMonth);
		this.router.get("/appointments/date", cReport.getAppointmentsByDate);
		this.router.get("/result/:id", cReport.getAppointmentResultsPDF);

	}
}
const reportRouter = new ReportRouter();
export default reportRouter.router;