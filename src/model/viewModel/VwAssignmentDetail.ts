import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwAssignmentDetail {
    id: string;
    assignmentId: string;
    productId: string;
    assetId: string;
    qTY: string;
    amount: string;
    hCCurrencyId: string;
    hCAssetHealthStatusId: string;
    hCPriorityId: string;
    workOrderId: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    creator: string;
    updater: string;
    currencySign: string;
    prioritySign: string;
    assetHealthStatus: string;
    productSign:string;
}

export const columnStructure = [
    // { key: "amount", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "qty", type: typeColumn.number, caption: "", showWhenSelected: true },
    { key: "productSign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "assetHealthStatusSign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "prioritySign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "isActive", type: typeColumn.check, caption: "", showWhenSelected: true },

] as gridColumns[];
