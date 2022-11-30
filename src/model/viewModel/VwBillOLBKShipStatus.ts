import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwBillOLBKShipStatus { 
id:string; 
billOLBookingId:string; 
time:Date; 
hCShippingStatusId:string; 
shippingStatusDetail:string; 
isActive: boolean;
description:string; 
createUserID:string; 
createDate:Date; 
updateUserID:string; 
updateDate:Date; 
shipStatus:string; 
} 

export const columnStructure = [
    { key: "billOLBookingId",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "description",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "hcshippingStatusId",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "isActive",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "shippingStatusDetail",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "time",type:typeColumn.text, caption: "", showWhenSelected:true },
    
    ] as gridColumns[];