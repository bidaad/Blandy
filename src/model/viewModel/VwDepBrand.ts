import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwDepBrand { 
id:string; 
depId:string; 
brandId:string; 
isDefault:string; 
isActive: boolean;
description:string; 
createUserID:string; 
createDate:Date; 
updateUserID:string; 
updateDate:Date; 
sign:string; 
} 


export const columnStructure = [
    { key: "sign",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "description",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "isActive",type:typeColumn.check, caption: "", showWhenSelected:true },
    { key: "isDefault",type:typeColumn.check, caption: "", showWhenSelected:true },
    
    ] as gridColumns[];