import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwDepWorkDate { 
id:string; 
depId:string; 
fromDateTime:Date; 
toDateTime:Date; 
noneWorkingDate:string; 
isActive: boolean;
description:string; 
createUserID:string; 
createDate:Date; 
updateUserID:string; 
updateDate:Date; 
creator:string; 
updater:string; 
} 


export const columnStructure = [

    { key: "description",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "fromDateTime",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "toDateTime",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "isActive",type:typeColumn.check, caption: "", showWhenSelected:true },
    { key: "noneWorkingDate",type:typeColumn.check, caption: "", showWhenSelected:true },

    
    ] as gridColumns[];
    