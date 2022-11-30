import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwAssetAttribute {
    id: string;

    assetId: string;
    hCAttributeTitleId: string;
    value: string;
    isActive: boolean;
    description: string;
    attributeTitleSign: string;
    creator: string;
    updater: string;
    showInList: boolean;
    orderBy: number;
    hCUnitId: string;
    unitSign: string;
    attributeCode: string;

}

export const columnStructure = [
    { key: "unitSign", caption: "UnitSign", type: typeColumn.text, showWhenSelected: true },
    { key: "value", caption: "Value", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "attributeTitleSign", caption: "AttributeTitleSign", type: typeColumn.text, showWhenSelected: true },
    { key: "showInList", caption: "ShowInList", type: typeColumn.check, showWhenSelected: true },
    { key: "orderBy", caption: "OrderBy", type: typeColumn.number, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];