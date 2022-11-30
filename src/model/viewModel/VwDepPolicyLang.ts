import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwDepPolicyLang {
    id: string;

    depPolicyId: string;
    languageId: string;
    title: string;
    isActive: boolean;
    description: string;
    lang: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "lang", caption: "lang", type: typeColumn.text, showWhenSelected: true },
    { key: "title", caption: "Title", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];