import { gridColumns } from "../general/stateBase";

export interface VwCategoryAttribute {
    id: string;
    categoryId: string;
    hCAttributeTitleId: string;
    value: string;
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
    { key: "value", caption: "نام", showWhenSelected: false },
    { key: "sign", caption: "علامت", showWhenSelected: true }
    ,
] as gridColumns[];
