import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwJCEffectOnCategory {
    id: string;

    jobCardId: string;
    categoryId: string;
    reference: string;
    isActive: boolean;
    description: string;
    creator: string;
    updater: string;
    categoryCode: string;

}

export const columnStructure = [
    { key: "categoryCode", caption: "CategoryCode", type: typeColumn.text, showWhenSelected: true },
    // { key: "reference", caption: "Reference", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];