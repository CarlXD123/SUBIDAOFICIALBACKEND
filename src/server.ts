import Express, { json } from 'express'
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import db from './config/config.database';

//Importaciones de rutas del sistema
import rProfession from './routes/rProfession';
import rTuition from './routes/rTuition';
import rTypeAgreement from './routes/rTypeAgreement';
import rUnit from './routes/rUnit';
import rMethod from './routes/rMethod';
import rService from './routes/rService';
import rCategory from './routes/rCategory';
import rSpeciality from './routes/rSpeciality';
import rTypeDoc from './routes/rTypeDoc';
import rProvince from './routes/rProvince';
import rRegion from './routes/rRegion';
import rTypeEmployee from './routes/rTypeEmployee';
import rDoctors from './routes/rDoctors';
import rReferers from './routes/rReferers';
import rAgreement from './routes/rAgreement';
import rHeadquarter from './routes/rHeadquarter';
import rPriceList from './routes/rPriceList';
import rRole from './routes/rRole';
import rFunction from './routes/rFunction';
import rEmployee from './routes/rEmployee';
import rAppointment from './routes/rAppointment';
import rReport from './routes/rReport';
import rUser from './routes/rUser';
import UserController from './controllers/cUser'
import rClient from './routes/rClient';
import rReferenceValue from './routes/rReferenceValue';
import rExamination from './routes/rExamination';
import rNation from './routes/rNation';
import rApilisBrand from './routes/rApilisBrand';
import rApilisModel from './routes/rApilisModel';
import rApilisPath from './routes/rApilisPath';
import rAmb from './routes/rAmb';
import rMatchData from './routes/rApilisMatchData';
import rMatchDataDetail from './routes/rApilisMatchDataDetail';
import rMonitor from './routes/rApilisMonitor';
import rReadCsv from './routes/rReadCsv';

class Server {
    public app: Express.Application
    constructor() {
        this.app = Express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(cors());
        this.app.use(json({ limit: '50mb' }));
        this.app.use(
            `/${process.env.PATH_ROOT_STATIC_FILES}`,
            Express.static( __dirname+`/${process.env.PATH_ROOT_STATIC_FILES}`)
           
        );
    }

    routes() {
        this.app.use("/api/profession", rProfession);
        this.app.use("/api/tuition", rTuition);
        this.app.use("/api/typeAgreement", rTypeAgreement);
        this.app.use("/api/unit", rUnit);
        this.app.use("/api/method", rMethod);
        this.app.use("/api/service", rService);
        this.app.use("/api/category", rCategory);
        this.app.use("/api/speciality", rSpeciality);
        this.app.use("/api/province", rProvince);
        this.app.use("/api/region", rRegion);
        this.app.use("/api/typeEmployee", rTypeEmployee);
        this.app.use("/api/doctor", rDoctors);
        this.app.use("/api/referer", rReferers);
        this.app.use("/api/agreement", rAgreement);
        this.app.use("/api/headquarter", rHeadquarter);
        this.app.use("/api/priceList", rPriceList);
        this.app.use("/api/role", rRole);
        this.app.use("/api/function", rFunction);
        this.app.use("/api/typeDoc", rTypeDoc);

        this.app.use('/api/user', rUser);
        this.app.use("/api/client", rClient);
        this.app.use("/api/employee", rEmployee);
        this.app.use("/api/appointment", rAppointment);
        this.app.use("/api/report", rReport);

        this.app.get("/api/login", UserController.login);

        this.app.use("/api/referenceValue", rReferenceValue);
        this.app.use("/api/examination", rExamination);
        this.app.use("/api/nation", rNation);
        this.app.use("/api/brand", rApilisBrand);
        this.app.use("/api/model", rApilisModel);
        this.app.use("/api/path", rApilisPath);
        this.app.use("/api/amb", rAmb);
        this.app.use("/api/match", rMatchData);
        this.app.use("/api/matchdetail", rMatchDataDetail);
        this.app.use("/api/monitor", rMonitor);
        this.app.use("/api/dymind", rReadCsv);
    }
    public async start() {
        try {
            await db.authenticate();
            this.app.listen(this.app.get('port'), () => {
                console.log(`Server on port ${this.app.get('port')}`);
            });
        } catch (ex) {
            console.log(ex)
        }
    }
}
const server = new Server();
server.start();

