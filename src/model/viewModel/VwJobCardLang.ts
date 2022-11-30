import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwJobCardLang {
    id: string;
    jobCardId: string;
    languageId: string;
    name: string;
    detailDesc: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    sign: string;
    creator: string;
    updater: string;
    lang:string;
}

export const columnStructure = [

    { key: "name", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "lang", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "isActive", type: typeColumn.check, caption: "", showWhenSelected: true },
    { key: "description", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "detailDesc", type: typeColumn.text, caption: "", showWhenSelected: true },




] as gridColumns[];