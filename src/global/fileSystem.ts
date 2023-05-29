import * as fs from 'fs'
import * as path from 'path'

let PathsStaticFiles: {[key:string]:string}={
    logo : "imgs/logo",
    avatar : "imgs/avatar",
    digitalSignature : "documents/digitalSignature",
    headquarter : "imgs/headquarter"
}

export function saveFile(originalAbsolutePath: any, typeFile: string) {
    const data = originalAbsolutePath;

    const pathStaticFile = PathsStaticFiles[typeFile];
    const uniqueNameFile = data.path;
    const rootAbsolutePath = path.resolve("."); //dinamico
    const pathUrl = `build/${process.env.PATH_ROOT_STATIC_FILES}/${pathStaticFile}/${uniqueNameFile}`;//quitar src al publicar
    const url = `${process.env.PATH_ROOT_STATIC_FILES}/${pathStaticFile}/${uniqueNameFile}`;
    const newAbsolutePath = `${rootAbsolutePath}/${pathUrl}`;
    //console.log("hereee");
    //console.log(uniqueNameFile);
    //console.log(rootAbsolutePath);
    //console.log(pathUrl);
    //console.log(newAbsolutePath);

    var base64Data = originalAbsolutePath.base64.split(',')[1];

    fs.writeFileSync(newAbsolutePath, base64Data,'base64');

    const publicUrl = `http://${process.env.URL}:${process.env.PORT}/${url}`;
    return publicUrl;
}