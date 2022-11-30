import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwAssetUsage {
    id: string;
    assetId: string;
    hcplanTitle: string;
    hcuniteId: string;
    time: Date;
    isActive: boolean;
    description: string;
    createUserId: string;
    createDate: Date;
    updateUserId: string;
    updateDate: Date;
    value: number;
    averageValue: number;
    averageUniteId: string;
    productSign: string;
    hcunitSign: string;
    creator: string;
    updater: string;
    planTitleSign:string;
}

export const columnStructure = [
    { key: "productSign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "value", type: typeColumn.number, caption: "", showWhenSelected: true },
    { key: "averageValue", type: typeColumn.number, caption: "", showWhenSelected: true },
    { key: "time", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "hcunitSign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "isActive", type: typeColumn.check, caption: "", showWhenSelected: true },
    { key: "description", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "creator", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "updater", type: typeColumn.text, caption: "", showWhenSelected: true },

] as gridColumns[];