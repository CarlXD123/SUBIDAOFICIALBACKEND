import { Router } from 'express';
import cAppointment from '../controllers/cAppointment'

class AppointmentRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/", cAppointment.getAppointmentsAll);
    this.router.post("/", cAppointment.addAppointment);
    this.router.get("/:id", cAppointment.getAppointment);
    this.router.get("/pacient/:id", cAppointment.getAppointmentByPati);
    this.router.get("/referer/search", cAppointment.getAppointmentsByReferer);
    this.router.get("/pacient/search", cAppointment.getAppointmentsByPacient);
    this.router.get("/dates/search", cAppointment.getAppointmentsByDates);
    this.router.get("/examvalueresult/:appointmentDetailId/",cAppointment.getExamValueResult);
    this.router.get("/examvalues/:id",cAppointment.getExamValues);
    this.router.get("/result/:id", cAppointment.getAppointmentResults);

    this.router.put("/attend/:id", cAppointment.attendAppointment);
    this.router.put("/:id", cAppointment.updateAppointment);
    
    this.router.delete("/:id", cAppointment.deleteAppointment);
  }
}
const appointmentRouter = new AppointmentRouter();
export default appointmentRouter.router;



