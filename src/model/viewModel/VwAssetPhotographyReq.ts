import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwAssetPhotographyReq {
    id: string;

    code: string;
    userId: string;
    assetId: string;
    time: Date;
    doneDate: Date;
    expertComment: string;
    canceled: boolean;
    isActive: boolean;
    description: string;
    productSign: string;
    creator: string;
    updater: string;
}

export const columnStructure = [
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "userId", caption: "UserId", type: typeColumn.text, showWhenSelected: true },
    { key: "assetId", caption: "AssetId", type: typeColumn.text, showWhenSelected: true },
    { key: "time", caption: "Time", type: typeColumn.text, showWhenSelected: true },
    { key: "doneDate", caption: "DoneDate", type: typeColumn.text, showWhenSelected: true },
    { key: "expertComment", caption: "ExpertComment", type: typeColumn.text, showWhenSelected: true },
    { key: "canceled", caption: "Canceled", type: typeColumn.check, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "productSign", caption: "ProductSign", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];