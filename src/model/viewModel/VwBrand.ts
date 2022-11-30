import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwBrand {
    id: string;
    code: string;
    sign: string;
    logo: string;
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
    { key: "sign", caption: "نام", type:typeColumn.text, showWhenSelected:true },
    { key: "code", caption: "کد" ,type:typeColumn.text ,showWhenSelected:true},
    { key: "logo", caption: "لوگو" ,type:typeColumn.image ,showWhenSelected:false},
    { key: "isActive", caption: "فعال" ,type:typeColumn.check ,showWhenSelected:false},
] as gridColumns[];