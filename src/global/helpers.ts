class Helpers {

    public static getFirstPropertyOfObject(obj:any) {
        return obj[Object.keys(obj)[0]];
    }
    
}
export default Helpers;