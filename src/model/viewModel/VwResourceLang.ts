import { gridColumns } from "../general/stateBase";

export interface VwResourceLang {
    id: string;
    resourceId: string;
    languageId: string;
    name: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    sign: string;
}

export const columnStructure = [
    { key: "name", caption: "نام", showWhenSelected: false },
    { key: "sign", caption: "علامت", showWhenSelected: true },

] as gridColumns[];