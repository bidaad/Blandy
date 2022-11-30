import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwAssetDefect { 
id:string; 
assetId:string; 
code:string; 
time:Date; 
detail:string; 
hCAssetHealthStatus:string; 
defectStatusTime:Date; 
isActive: boolean;
description:string; 
creator:string; 
updater:string; 
sign:string; 
productSign:string;
} 

export const columnStructure = [
    { key: "productSign",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "code",type:typeColumn.text, caption: "", showWhenSelected:true },
    { key: "defectStatusTime", caption: "", showWhenSelected:false },
    { key: "description",type:typeColumn.text, caption: "", showWhenSelected:false },
    { key: "detail",type:typeColumn.text, caption: "", showWhenSelected:false },
    { key: "sign",type:typeColumn.text, caption: "", showWhenSelected:false },
    { key: "isActive",type:typeColumn.text, caption: "", showWhenSelected:false },
    { key: "time",type:typeColumn.text, caption: "", showWhenSelected:false },
    
    ] as gridColumns[];