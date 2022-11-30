import { gridColumns } from "../general/stateBase";

export interface VwMessageLang {
    id:string;
    parentId:string;
    languageId:string;
    name:string;
    isActive:boolean;
    description:string;
    createUserID:string;
    createDate:Date;
    updateUserID:string;
    updateDate:Date;
    sign:string;
    }
    
    export const columnStructure = [
        { key: "name", caption: "نام" ,showWhenSelected:false},
        { key: "sign" ,showWhenSelected:false}
    
    ] as gridColumns[];