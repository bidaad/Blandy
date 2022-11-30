import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwPersonCategory {
    id: string;

    personId: string;
    categoryId: string;
    isDefault: boolean;
    isActive: boolean;
    description: string;
    categorySign: string;
    creator: string;
    updater: string;
}

export const columnStructure = [
    { key: "categorySign", caption: "CategorySign", type: typeColumn.text, showWhenSelected: true },
    { key: "isDefault", caption: "IsDefault", type: typeColumn.check, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },


] as gridColumns[];