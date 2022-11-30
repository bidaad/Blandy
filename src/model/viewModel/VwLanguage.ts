import { gridColumns } from "../general/stateBase";

export interface VwLanguage {
    id: string;
    iSOCode1: string;
    iSOCode2: string;
    sign: string;
    icon: string;
    orderBy: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    nameFa: string;
    nameEn: string;
    localName: string;
    rightToLeft: string;
    creator: string;
    updater: string;
    name: string;
}

export const columnStructure = [
    { key: "nameFa", caption: "نام انگلیسی", showWhenSelected:true },
    { key: "nameEn", caption: "نام فارسی" ,showWhenSelected:true},
    { key: "localName", caption: "نام محلی" ,showWhenSelected:false},
    { key: "isocode1", caption: "کد ایزو 1" ,showWhenSelected:false},
    { key: "isocode2", caption: "کد ایزو 2" ,showWhenSelected:false},
    { key: "sign", caption: "علامت" ,showWhenSelected:false},
] as gridColumns[];