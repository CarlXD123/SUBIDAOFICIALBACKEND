"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const config_database_1 = __importDefault(require("./config/config.database"));
//Importaciones de rutas del sistema
const rProfession_1 = __importDefault(require("./routes/rProfession"));
const rTuition_1 = __importDefault(require("./routes/rTuition"));
const rTypeAgreement_1 = __importDefault(require("./routes/rTypeAgreement"));
const rUnit_1 = __importDefault(require("./routes/rUnit"));
const rMethod_1 = __importDefault(require("./routes/rMethod"));
const rService_1 = __importDefault(require("./routes/rService"));
const rCategory_1 = __importDefault(require("./routes/rCategory"));
const rSpeciality_1 = __importDefault(require("./routes/rSpeciality"));
const rTypeDoc_1 = __importDefault(require("./routes/rTypeDoc"));
const rProvince_1 = __importDefault(require("./routes/rProvince"));
const rRegion_1 = __importDefault(require("./routes/rRegion"));
const rTypeEmployee_1 = __importDefault(require("./routes/rTypeEmployee"));
const rDoctors_1 = __importDefault(require("./routes/rDoctors"));
const rReferers_1 = __importDefault(require("./routes/rReferers"));
const rAgreement_1 = __importDefault(require("./routes/rAgreement"));
const rHeadquarter_1 = __importDefault(require("./routes/rHeadquarter"));
const rPriceList_1 = __importDefault(require("./routes/rPriceList"));
const rRole_1 = __importDefault(require("./routes/rRole"));
const rFunction_1 = __importDefault(require("./routes/rFunction"));
const rEmployee_1 = __importDefault(require("./routes/rEmployee"));
const rAppointment_1 = __importDefault(require("./routes/rAppointment"));
const rReport_1 = __importDefault(require("./routes/rReport"));
const rUser_1 = __importDefault(require("./routes/rUser"));
const cUser_1 = __importDefault(require("./controllers/cUser"));
const rClient_1 = __importDefault(require("./routes/rClient"));
const rReferenceValue_1 = __importDefault(require("./routes/rReferenceValue"));
const rExamination_1 = __importDefault(require("./routes/rExamination"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use((0, cors_1.default)());
        this.app.use((0, express_1.json)({ limit: '50mb' }));
        this.app.use(`/${process.env.PATH_ROOT_STATIC_FILES}`, express_1.default.static(__dirname + `/${process.env.PATH_ROOT_STATIC_FILES}`));
    }
    routes() {
        this.app.use("/api/profession", rProfession_1.default);
        this.app.use("/api/tuition", rTuition_1.default);
        this.app.use("/api/typeAgreement", rTypeAgreement_1.default);
        this.app.use("/api/unit", rUnit_1.default);
        this.app.use("/api/method", rMethod_1.default);
        this.app.use("/api/service", rService_1.default);
        this.app.use("/api/category", rCategory_1.default);
        this.app.use("/api/speciality", rSpeciality_1.default);
        this.app.use("/api/province", rProvince_1.default);
        this.app.use("/api/region", rRegion_1.default);
        this.app.use("/api/typeEmployee", rTypeEmployee_1.default);
        this.app.use("/api/doctor", rDoctors_1.default);
        this.app.use("/api/referer", rReferers_1.default);
        this.app.use("/api/agreement", rAgreement_1.default);
        this.app.use("/api/headquarter", rHeadquarter_1.default);
        this.app.use("/api/priceList", rPriceList_1.default);
        this.app.use("/api/role", rRole_1.default);
        this.app.use("/api/function", rFunction_1.default);
        this.app.use("/api/typeDoc", rTypeDoc_1.default);
        this.app.use('/api/user', rUser_1.default);
        this.app.use("/api/client", rClient_1.default);
        this.app.use("/api/employee", rEmployee_1.default);
        this.app.use("/api/appointment", rAppointment_1.default);
        this.app.use("/api/report", rReport_1.default);
        this.app.get("/api/login", cUser_1.default.login);
        this.app.use("/api/referenceValue", rReferenceValue_1.default);
        this.app.use("/api/examination", rExamination_1.default);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_database_1.default.authenticate();
                this.app.listen(this.app.get('port'), () => {
                    console.log(`Server on port ${this.app.get('port')}`);
                });
            }
            catch (ex) {
                console.log(ex);
            }
        });
    }
}
const server = new Server();
server.start();
