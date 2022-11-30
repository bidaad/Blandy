import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwAssetOperStatus {
    id: string;

    assetId: string;
    hCOperationStatusId: string;
    fromDate: Date;
    toDate: Date;
    reason: string;
    isActive: boolean;
    description: string;
    operationStatusSign: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "operationStatusSign", caption: "operationStatusSign", type: typeColumn.text, showWhenSelected: true },
    { key: "fromDate", caption: "FromDate", type: typeColumn.text, showWhenSelected: true },
    { key: "toDate", caption: "ToDate", type: typeColumn.text, showWhenSelected: true },
    { key: "reason", caption: "Reason", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];