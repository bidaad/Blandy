import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwLoginHistory { 
id:string; 
userId:string; 
loginTime:Date; 
loginIP:string; 
oS:string; 
version:string; 
browser:string; 
isActive: boolean;
description:string; 
createUserID:string; 
createDate:Date; 
updateUserID:string; 
updateDate:Date; 
expr1:string; 
username:string; 
creator:string;
updater:string;
} 

export const columnStructure = [
    { key: "browser",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "description",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "isActive",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "loginIP",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "loginTime",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "oS",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "userId",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "version",type:typeColumn.text, caption: "", showWhenSelected:true },
    
    ] as gridColumns[];