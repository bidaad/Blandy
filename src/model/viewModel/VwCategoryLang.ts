import { gridColumns } from "../general/stateBase";

export interface VwCategoryLang {
    id: string;
    categoryId: string;
    languageId: string;
    name: string;
    categoryDescription: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    lang: string;
    creator: string;
    updater: string;
}

export const columnStructure = [
    { key: "name", caption: "نام", showWhenSelected: false },
    { key: "sign", caption: "علامت", showWhenSelected: true },

] as gridColumns[];
