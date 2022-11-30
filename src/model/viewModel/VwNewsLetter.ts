import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwNewsLetter {
    id:string;
    code:string;
    publicationDate:Date;
    newsSubject:string;
    newsBody:string;
    isActive:boolean;
    createUserId:string;
    description:string;
    createDate:Date;
    updateUserId:string;
    updateDate:Date;
    creator:string;
    updater:string;
    }
    

    export const columnStructure = [
        { key: "code", showWhenSelected:true },
        { key: "newsSubject" ,showWhenSelected:false},
        { key: "newsBody",type:typeColumn.html,showWhenSelected:false},
        { key: "isActive",type:typeColumn.check,showWhenSelected:false},
    ] as gridColumns[];
    