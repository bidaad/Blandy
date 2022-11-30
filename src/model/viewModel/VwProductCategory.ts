import { gridColumns } from "../general/stateBase";

export interface VwProductCategory {
    id: string;
    parentId: string;
    categoryId: string;
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
    { key: "sign", caption: "علامت", showWhenSelected:true },
    { key: "description", caption: "نام" ,showWhenSelected:true},
    { key: "isActive", caption: "فعال" ,showWhenSelected:true},

] as gridColumns[];
