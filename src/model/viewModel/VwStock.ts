import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwStock {
    id: string;
    depId: string;
    assestId: string;
    time: string;
    persianTime: string;
    assetStock: number;
    isActive: boolean;
    description: string;
    sign: string;
    creator: string;
    updater: string;
    depSign: string;

}

export const columnStructure = [
    { key: "depSign", caption: "depSign", type: typeColumn.text, showWhenSelected: true },
    { key: "productSign", caption: "productSign", type: typeColumn.text, showWhenSelected: true },
    { key: "time", caption: "Time", type: typeColumn.text, showWhenSelected: true },
    { key: "persianTime", caption: "persianTime", type: typeColumn.text, showWhenSelected: true },
    { key: "assetStock", caption: "AssetStock", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];