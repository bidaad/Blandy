import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwWorkOrder {
    id: string;

    parentIdWorkOrder: string;
    assetId: string;
    code: string;
    internalCode: string;
    issueTime: Date;
    issuePersonId: string;
    assetDefectId: string;
    jobCardId: string;
    detail: string;
    issueDepId: string;
    shopId: string;
    schStart: Date;
    schFinish: Date;
    duration: number;
    actualStart: Date;
    actualFinish: Date;
    percentComplete: string;
    hCWOStatusId: string;
    wOStatusTime: Date;
    expertDescription: string;
    expertPersonId: string;
    wBSCode: string;
    deadLine: Date;
    isActive: boolean;
    description: string;
    productSign: string;
    wOStatusSign: string;
    barCode: string;
    creator:string;
    updater:string;

}

export const columnStructure = [
    { key: "productSign", caption: "ProductSign", type: typeColumn.text, showWhenSelected: true },
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "internalCode", caption: "InternalCode", type: typeColumn.text, showWhenSelected: false },
    { key: "issueTime", caption: "IssueTime", type: typeColumn.text, showWhenSelected: false },
    { key: "detail", caption: "Detail", type: typeColumn.text, showWhenSelected: false },
    { key: "shopId", caption: "ShopId", type: typeColumn.text, showWhenSelected: false },
    { key: "schStart", caption: "SchStart", type: typeColumn.text, showWhenSelected: false },
    { key: "schFinish", caption: "SchFinish", type: typeColumn.text, showWhenSelected: false },
    { key: "duration", caption: "Duration", type: typeColumn.number, showWhenSelected: false },
    { key: "actualStart", caption: "ActualStart", type: typeColumn.text, showWhenSelected: false },
    { key: "actualFinish", caption: "ActualFinish", type: typeColumn.text, showWhenSelected: false },
    { key: "percentComplete", caption: "PercentComplete", type: typeColumn.text, showWhenSelected: false },
    { key: "wOStatusTime", caption: "WOStatusTime", type: typeColumn.text, showWhenSelected: false },
    { key: "expertDescription", caption: "ExpertDescription", type: typeColumn.text, showWhenSelected: false },
    { key: "wBSCode", caption: "WBSCode", type: typeColumn.text, showWhenSelected: false },
    { key: "deadLine", caption: "DeadLine", type: typeColumn.text, showWhenSelected: false },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: false },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: false },

    { key: "wOStatusSign", caption: "WOStatusSign", type: typeColumn.text, showWhenSelected: false },
    { key: "barCode", caption: "BarCode", type: typeColumn.text, showWhenSelected: false },

] as gridColumns[];