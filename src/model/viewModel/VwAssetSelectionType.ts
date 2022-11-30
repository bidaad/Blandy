import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwAssetSelectionType {
    id: string;

    assetId: string;
    hCSelectionTypeId: string;
    orderBy: number;
    isActive: boolean;
    description: string;
    selectionTypeSign: string;
    creator:string;
    updater:string;

}

export const columnStructure = [
    { key: "selectionTypeSign", caption: "SelectionTypeSign", type: typeColumn.text, showWhenSelected: true },
    { key: "productSign", caption: "ProductSign", type: typeColumn.text, showWhenSelected: true },
    { key: "orderBy", caption: "OrderBy", type: typeColumn.number, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];