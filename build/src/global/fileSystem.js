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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let PathsStaticFiles = {
    logo: "imgs/logo",
    avatar: "imgs/avatar",
    digitalSignature: "documents/digitalSignature",
    headquarter: "imgs/headquarter"
};
function saveFile(originalAbsolutePath, typeFile) {
    const data = originalAbsolutePath;
    const pathStaticFile = PathsStaticFiles[typeFile];
    const uniqueNameFile = data.path;
    const rootAbsolutePath = path.resolve("."); //dinamico
    const pathUrl = `build/${process.env.PATH_ROOT_STATIC_FILES}/${pathStaticFile}/${uniqueNameFile}`; //quitar src al publicar
    const url = `${process.env.PATH_ROOT_STATIC_FILES}/${pathStaticFile}/${uniqueNameFile}`;
    const newAbsolutePath = `${rootAbsolutePath}/${pathUrl}`;
    //console.log("hereee");
    //console.log(uniqueNameFile);
    //console.log(rootAbsolutePath);
    //console.log(pathUrl);
    //console.log(newAbsolutePath);
    var base64Data = originalAbsolutePath.base64.split(',')[1];
    fs.writeFileSync(newAbsolutePath, base64Data, 'base64');
    const publicUrl = `${process.env.URL}:${process.env.PORT}/${url}`;
    return publicUrl;
}
exports.saveFile = saveFile;
