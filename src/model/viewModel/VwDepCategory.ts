import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwDepCategory { 
id:string; 
depId:string; 
categoryId:string; 
isActive: boolean;
description:string; 
createUserID:string; 
createDate:Date; 
updateUserID:string; 
updateDate:Date; 
sign:string; 
creator:string; 
updater:string; 
} 

export const columnStructure = [
    { key: "sign",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "description",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "isActive",type:typeColumn.check, caption: "", showWhenSelected:true },
    
    ] as gridColumns[];