import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwDepartmentLang { 
id:string; 
departmentId:string; 
languageId:string; 
name:string; 
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
    { key: "name",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "description",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "isActive",type:typeColumn.check, caption: "", showWhenSelected:true },
    
    ] as gridColumns[];