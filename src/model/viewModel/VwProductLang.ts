import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwProductLang {
    id: string;
    parentId: string;
    languageId: string;
    name: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    sign: string;
    creator:string;
    updator:string;
}

export const columnStructure = [
    { key: "name", caption: "نام", showWhenSelected: false },
    { key: "sign", caption: "علامت", showWhenSelected: true },
    { key: "isActive", type: typeColumn.check, caption: "", showWhenSelected: false },

] as gridColumns[];