import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwAssignment {
    id: string;
    depId: string;
    code: string;
    sign: string;
    date: Date;
    hCWHOperationTypeId: string;
    hCWHOperationStatusId: string;
    hCPriorityId: string;
    bookingId: string;
    isActive: boolean;
    description: string;
    wHOperationTypeSign: string;
    wHOperationStatusSign: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "depSign", caption: "depSign", type: typeColumn.text, showWhenSelected: true },
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },
    { key: "date", caption: "Date", type: typeColumn.text, showWhenSelected: true },
    { key: "whoperationTypeSign", caption: "WHOperationTypeSign", type: typeColumn.text, showWhenSelected: true },
    { key: "whoperationStatusSign", caption: "WHOperationStatusSign", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },

] as gridColumns[];