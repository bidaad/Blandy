import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwBillOfLadingPayment { 
id:string; 
billOfLadingId:string; 
paymentId:string; 
isActive: boolean;
description:string; 
createUserID:string; 
createDate:Date; 
updateUserID:string; 
updateDate:Date; 
creator:string; 
updater:string; 
referenceCode:string; 
} 

export const columnStructure = [
    { key: "billOfLadingId",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "description",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "isActive",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "paymentId",type:typeColumn.text, caption: "", showWhenSelected:true },
    
    ] as gridColumns[];
    