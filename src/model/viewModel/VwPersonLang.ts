import { gridColumns } from "../general/stateBase";

export interface VwPersonLang {
    id: string;
    personId: string;
    languageId: string;
    firstName: string;
    midName: string;
    lastName: string;
    fatherName: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    sign: string;
    creator: string;
    updater: string;
}

export const columnStructure = [
    { key: "firstName", caption: "نام" ,showWhenSelected:false},
    { key: "lastName", caption: "نام خانوادگی" ,showWhenSelected:false},
    { key: "fatherName", caption: "نام پدر" ,showWhenSelected:false},
    { key: "sign", caption: "زبان" ,showWhenSelected:false},

] as gridColumns[];