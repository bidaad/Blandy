import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwHCBookingStatusLang {
    id: string;

    hCBookingStatusId: string;
    name: string;
    isActive: boolean;
    description: string;
    languageId: string;
    creator: string;
    updater: string;
    sign: string;

}

export const columnStructure = [
    { key: "sign", caption: "sign", type: typeColumn.text, showWhenSelected: true },
    { key: "name", caption: "Name", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "languageId", caption: "LanguageId", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];