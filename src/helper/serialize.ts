import moment from "moment";
import { correctPersian } from "./correctPersian";

export const convertToObject = (sendData: any) => {

    var values = sendData.split('&');
    var objVariables: any = {};
    for (var x = 0; x < values.length; x++) {
        var splitted = values[x].split("=");
        // if(Number(splitted[1]))
        // {
        //     objVariables[splitted[0]] =Number(splitted[1]) ;
        // }else 
        if (splitted[1]) {
            if (splitted[1].toLowerCase() === "true") {
                objVariables[splitted[0]] = true;
            }
            else if (splitted[1].toLowerCase() === "false") {
                objVariables[splitted[0]] = false;
            }
            else if (splitted[0].toLowerCase().indexOf('__number') >= 0) {
                objVariables[splitted[0].toLowerCase().replace('__number', '')] = Number(splitted[1]);
            }
            else if (splitted[0].toLowerCase().indexOf('__date') >= 0) {
                if (splitted[1] !== null && splitted[1] !== undefined) {
                    
                    let dt = new Date(decodeURIComponent(splitted[1]).split("+").join(" "));
                    if (dt.toString().toUpperCase() !== "Invalid Date".toUpperCase()) {
                        dt.setUTCHours(dt.getHours(), dt.getMinutes(), dt.getSeconds());
                        dt.setUTCDate(dt.getDate()+1);
                        objVariables[splitted[0].toLowerCase().replace('__date', '')] = dt;
                    }
                }
            }
            else if (splitted[0].toLowerCase().indexOf('__time') >= 0) {
                if (splitted[1] !== null && splitted[1] !== undefined) {
                    //let tm = moment.duration(decodeURIComponent(splitted[1])).clone().toISOString();
                    objVariables[splitted[0].toLowerCase().replace('__time', '')] = decodeURIComponent(splitted[1]);
                }
            }
            else if (splitted[0].toLowerCase().indexOf('__htmleditor') >= 0){
                if (splitted[1] !== null && splitted[1] !== undefined) {
                    objVariables[splitted[0].toLowerCase().replace('__htmleditor', '')] = splitted[1];
                    // objVariables[splitted[0].toLowerCase().replace('__htmleditor', '')] = splitted[1];
                }
            }
            else {
                objVariables[splitted[0]] = correctPersian(decodeURIComponent(splitted[1]));
            }
        }

    }
    return objVariables;
}
export const serialize = (e: any) => {
    var serialize = require('form-serialize');
    return serialize(e);
}