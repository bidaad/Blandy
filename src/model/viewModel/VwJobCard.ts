import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwJobCard {
    id: string;
    jobcardParentId: string;
    code: string;
    sign: string;
    effectiveDate: Date;
    expireDate: Date;
    duration: string;
    version: string;
    hCJobCardTypeId: string;
    durationUnitId: string;
    jCWork: string;
    hCJCOperationTypeId: string;
    hCAssetHealthStatusId: string;
    hCPriorityId: string;
    hCOperationStatusId: string;
    prioritySign: string;
    operationStatusSign: string;
    userDescription: string;
    technicalDescription: string;
    saftyInstruction: string;
    referenceNo: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    jobCardTypeSign: string;
    jCOperationTypeSign: string;
    assetHealthStatusSign: string;
    creator: string;
    updater: string;
    jobcardParent: string;
    productJobcard: string;
    unitSign: string;
}

export const columnStructure = [
    { key: "sign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "code", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "effectiveDate", type: typeColumn.text, caption: "", showWhenSelected: false },
     { key: "productJobcard",type:typeColumn.text, caption: "", showWhenSelected:false },
    { key: "isActive", type: typeColumn.check, caption: "", showWhenSelected: false },
    { key: "prioritySign", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "operationStatusSign", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "description", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "duration", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "jCWork", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "expireDate", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "referenceNo", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "version", type: typeColumn.text, caption: "", showWhenSelected: false },

] as gridColumns[];