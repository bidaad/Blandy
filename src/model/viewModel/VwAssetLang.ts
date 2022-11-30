import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwAssetLang {
    id: string;

    assetId: string;
    languageId: string;
    package: string;
    detailComment: string;
    isActive: boolean;
    description: string;
    lang: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "lang", caption: "lang", type: typeColumn.text, showWhenSelected: true },
    { key: "package", caption: "Package", type: typeColumn.text, showWhenSelected: true },
    { key: "detailComment", caption: "DetailComment", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];