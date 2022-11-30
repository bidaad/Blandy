import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwCategory {
    id: string;
    parentId: string;
    code: string;
    sign: string;
    icon: string;
    each: string;
    hscode: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    languageId: string;
    name: string;
    creator: string;
    updater: string;
    lang: string;
}

export const columnStructure = [
    { key: "sign", caption: "", showWhenSelected:true },
    { key: "code", caption: "" ,showWhenSelected:true},
    { key: "each", caption: "",type:typeColumn.check ,showWhenSelected:false},
    { key: "hscode", caption: "",type:typeColumn.check ,showWhenSelected:false},
    { key: "icon", caption: "",type:typeColumn.image ,showWhenSelected:false},
    { key: "isActive", caption: "",type:typeColumn.check ,showWhenSelected:false},
] as gridColumns[];