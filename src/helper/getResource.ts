import { baseResource } from "../model/general/baseAccess";

export const getResource = (title:string,jsonAccess:baseResource[]) => {
    var item:any = jsonAccess.find( c => c.name === title);
    if(item !== undefined)
        return item as baseResource;
    else
    {
        var newRecord:baseResource = {};
        return newRecord;
    }
}