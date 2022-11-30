import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwDepartmentDepType {
    id: string;
    depId: string;
    hCDepTypeId: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    sign: string;
    creator: string;
    updater: string;
    depSign: string;
}

export const columnStructure = [


    { key: "depSign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "sign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "description", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "isActive", type: typeColumn.text, caption: "", showWhenSelected: true },

] as gridColumns[];