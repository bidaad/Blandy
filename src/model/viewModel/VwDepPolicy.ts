import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwDepPolicy { 
id:string; 
depId:string; 
hCPolicyTitleId:string; 
isActive: boolean;
description:string; 
createUserID:string; 
createDate:Date; 
updateUserID:string; 
updateDate:Date; 
policyTitleSign:string; 
} 


export const columnStructure = [
{ key: "policyTitleSign",type:typeColumn.text, caption: "", showWhenSelected:true },
{ key: "description",type:typeColumn.text, caption: "", showWhenSelected:true },
{ key: "isActive",type:typeColumn.text, caption: "", showWhenSelected:true },

] as gridColumns[];