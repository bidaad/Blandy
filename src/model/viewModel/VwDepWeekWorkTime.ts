import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwDepWeekWorkTime { 
id:string; 
depId:string; 
hCWeekDayId:string; 
fromDateTime:Date; 
toDateTime:Date; 
fromTime:string; 
toTime:string; 
noneWorkingDay:string; 
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
    { key: "fromDateTime",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "toDateTime",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "fromTime",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "toTime",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "description",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "noneWorkingDay",type:typeColumn.check, caption: "", showWhenSelected:true },
    { key: "isActive",type:typeColumn.text, caption: "", showWhenSelected:true },
    ] as gridColumns[];