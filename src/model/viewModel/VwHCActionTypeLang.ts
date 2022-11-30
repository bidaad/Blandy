import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwHCActionTypeLang {
    id: string;

    hCActionTypeId: string;
    languageId: string;
    name: string;
    categoryDescription: string;
    isActive: boolean;
    description: string;
    updator: string;
    creator: string;

}

export const columnStructure = [
    { key: "sign", caption: "sign", type: typeColumn.text, showWhenSelected: true },
    { key: "name", caption: "Name", type: typeColumn.text, showWhenSelected: true },
    { key: "categoryDescription", caption: "CategoryDescription", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];