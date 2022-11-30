import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwHCPlanTitleLang {
    id: string;

    hCPlanTitleId: string;
    languageId: string;
    name: string;
    isActive: boolean;
    description: string;
    updator: string;
    creator: string;

}

export const columnStructure = [
    { key: "hCPlanTitleId", caption: "HCPlanTitleId", type: typeColumn.text, showWhenSelected: true },
    { key: "languageId", caption: "LanguageId", type: typeColumn.text, showWhenSelected: true },
    { key: "name", caption: "Name", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];