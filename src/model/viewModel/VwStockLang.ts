import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwStockLang {
    id: string;

    parentId: string;
    languageId: string;
    package: string;
    packageUnit: string;
    assetUnit: string;
    warranty: string;
    isActive: boolean;
    description: string;
    sign: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "package", caption: "Package", type: typeColumn.text, showWhenSelected: true },
    { key: "packageUnit", caption: "PackageUnit", type: typeColumn.text, showWhenSelected: true },
    { key: "assetUnit", caption: "AssetUnit", type: typeColumn.text, showWhenSelected: true },
    { key: "warranty", caption: "Warranty", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];