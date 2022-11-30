import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwQuestion {
    id: string;

    code: string;
    question: string;
    anaswer: string;
    orderBy: number;
    isActive: boolean;
    description: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "question", caption: "Question", type: typeColumn.text, showWhenSelected: true },
    { key: "anaswer", caption: "Anaswer", type: typeColumn.text, showWhenSelected: true },
    { key: "orderBy", caption: "OrderBy", type: typeColumn.number, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];