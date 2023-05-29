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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPassword = void 0;
const fs = __importStar(require("fs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const urlLogo = `${process.env.URL}:${process.env.PORT}/public/imgs/logo/logo-redlab.png`;
const baseUrl = `${process.env.URL}:${process.env.PORT}`;
const readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};
const mailOptions = {
    from: "no-reply@sistemaredlabperu.com",
    subject: "Bienvenido!",
    to: "",
    html: "",
};
var transporter = nodemailer_1.default.createTransport({
    service: "mail.sistemaredlabperu.com",
    port: 465,
    auth: {
        user: "no-reply@sistemaredlabperu.com",
        pass: "Redlab2022_",
    },
    tls: {
        rejectUnauthorized: false,
    },
});
function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            //console.log(error);
        }
        else {
            //console.log("Email sent: " + info.response);
        }
    });
}
function sendPassword(mailData) {
    readHTMLFile(__dirname + "/email.html", function (err, html) {
        var template = handlebars_1.default.compile(html);
        var replacements = {
            fullname: mailData.fullname,
            password: mailData.password,
            urlLogo,
            email: mailData.email,
            url: baseUrl,
        };
        var htmlToSend = template(replacements);
        mailOptions.to = mailData.email;
        mailOptions.html = htmlToSend;
        sendEmail(mailOptions);
    });
}
exports.sendPassword = sendPassword;
