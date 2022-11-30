import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwBookingWork { 
id:string; 
bookingId:string; 
workOrderId:string; 
workDescription:string; 
workPrice:string; 
hCCurrencyId:string; 
isActive: boolean;
description:string; 
createUserID:string; 
createDate:Date; 
updateUserID:string; 
updateDate:Date; 
code:string; 
internalCode:string; 
creator:string; 
updater:string; 
currencySign:string;
} 

export const columnStructure = [
    { key: "bookingId",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "description",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "code",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "currencySign",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "workDescription",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "workPrice",type:typeColumn.number, caption: "", showWhenSelected:true },
    { key: "isActive",type:typeColumn.check, caption: "", showWhenSelected:true },
    
    ] as gridColumns[];