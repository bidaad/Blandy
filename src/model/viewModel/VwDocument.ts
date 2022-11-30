import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwDocument {
    lang:string;
    entityName:string;
    code:string;
    sign:string;
    name:string;
    version:string;
    filePath:string;
    keyWords:string;
    abstract:string;
    iSBN:string;
    isActive:boolean;
    creator:string;
    updater:string;
    createUserID:string;
    updateUserID:string;
    updateDate:string;
    createDate:string;
    documentCode:string;
    description:string;
    entityDocId:string;
    size:number;
    extention:string;
    id:string;
    parentId:string;
    image:any;
    hCDocTypeId:string;
    type:string;
    mainDoc:boolean;
    }

    export const columnStructure = [
        { key: "sign", caption: "علامت", showWhenSelected:true },
        { key: "code", caption: "علامت", showWhenSelected:true },
        { key: "size", caption: "علامت", showWhenSelected:true },
        { key: "filePath", type:typeColumn.image,caption: "علامت", showWhenSelected:true },
        { key: "mainDoc", type:typeColumn.check,caption: "", showWhenSelected:true },
        { key: "isActive", type:typeColumn.check,caption: "علامت", showWhenSelected:true },
    ] as gridColumns[];
    
    
    