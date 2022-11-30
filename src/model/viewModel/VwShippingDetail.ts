import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwShippingDetail { 
id:string; 
bookingId:string; 
contactId:string; 
zoneId:string; 
address:string; 
buildingLicensePlate:string; 
apartmentLicensePlate:string; 
recipientName:string; 
recipientMobile:string; 
latitude:string; 
longitude:string; 
isActive: boolean;
description:string; 
createUserID:string; 
createDate:Date; 
updateUserID:string; 
updateDate:Date; 
name:string; 
nationalCode:string; 
} 


export const columnStructure = [
    { key: "address",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "apartmentLicensePlate",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "bookingId",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "buildingLicensePlate",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "contactId",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "description",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "isActive",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "latitude",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "longitude",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "recipientMobile",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "recipientName",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "zoneId",type:typeColumn.text, caption: "", showWhenSelected:true },
    
    ] as gridColumns[];
    
