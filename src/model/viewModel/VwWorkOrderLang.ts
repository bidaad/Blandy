import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwWorkOrderLang {
    id: string;

    workOrderId: string;
    languageId: string;
    name: string;
    detail: string;
    expertDescription: string;
    isActive: boolean;
    description: string;
    creator: string;
    updater: string;
    iSOCode1: string;

}

export const columnStructure = [
    { key: "name", caption: "Name", type: typeColumn.text, showWhenSelected: true },
    { key: "LanguageSign", caption: "LanguageSign", type: typeColumn.text, showWhenSelected: true },
    { key: "detail", caption: "Detail", type: typeColumn.text, showWhenSelected: true },
    { key: "expertDescription", caption: "ExpertDescription", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },
    { key: "iSOCode1", caption: "ISOCode1", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];