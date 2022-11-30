import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwBrandLang {
    id: string;
    brandId: string;
    languageId: string;
    name: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    creator: string;
    updater: string;
    lang: string;
}

export const columnStructure = [
    { key: "name", caption: "نام" ,showWhenSelected:false},
    { key: "lang", caption: "علامت", showWhenSelected:true },
    { key: "isActive",type:typeColumn.check, showWhenSelected:true },

] as gridColumns[];

