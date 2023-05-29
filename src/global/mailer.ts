import * as fs from 'fs'
import nodemailer from 'nodemailer'
import handlebars from 'handlebars'

const urlLogo = `http://${process.env.URL}:${process.env.PORT}/public/imgs/logo/logo-redlab.png`;
const baseUrl = `http://${process.env.URL}:${process.env.PORT}`;

const readHTMLFile = function (path: any, callback: any) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};
const mailOptions = {
    from: "cdx15287@gmail.com",
    subject: "Bienvenido!",
    to: "",
    html: "",
};

const mailOptions2 = {
    from: "cdx15287@gmail.com",
    subject: "Actualizacion de usuario",
    to: "",
    html: "",
};

var transporter = nodemailer.createTransport({
    service: "smtp@gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "cdx15287@gmail.com",
        pass: "gzmyxocigcomdtwh",
    },
    tls: {
        rejectUnauthorized: false,
    },
});
function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

function sendEmail2(mailOptions) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}


export function sendPassword(mailData: any) {
    readHTMLFile(__dirname + "/email.html", function (err, html) {
        var template = handlebars.compile(html);
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

export function sendPassword2(mailData: any) {
    readHTMLFile(__dirname + "/email2.html", function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            fullname: mailData.fullname,
            password: mailData.password,
            urlLogo,
            email: mailData.email,
            url: baseUrl,
        };

        var htmlToSend = template(replacements);

        mailOptions2.to = mailData.email;
        mailOptions2.html = htmlToSend;
        sendEmail2(mailOptions2);
    });
}