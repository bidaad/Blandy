import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwJCNeedCategory {
    id: string;

    jobCardId: string;
    categoryId: string;
    categoryCount: string;
    isActive: boolean;
    description: string;
    categorySign: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "categorySign", caption: "categorySign", type: typeColumn.text, showWhenSelected: true },
    { key: "categoryCount", caption: "CategoryCount", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];