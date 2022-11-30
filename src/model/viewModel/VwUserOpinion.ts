import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwUserOpinion {
    id: string;
    userId: string;
    assetId: string;
    depId: string;
    star: number;
    subject: string;
    opinion: string;
    opinionParentId: string;
    expertComment: string;
    showIt: boolean;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: string;
    updateUserID: string;
    updateDate: string;
    senderFullName: string;
    creator: string;
    updater: string;
    productSign:string;
    parentName:string;
}
export const columnStructure = [
    { key: "senderFullName", type: typeColumn.text, showWhenSelected: false },
    { key: "subject", type: typeColumn.number, showWhenSelected: true },
    { key: "opinion", type: typeColumn.text, showWhenSelected: true },
    { key: "expertComment", type: typeColumn.text, showWhenSelected: false },
    { key: "star", type: typeColumn.number, showWhenSelected: false },
    { key: "isActive", type: typeColumn.check, showWhenSelected: false },
    { key: "description", type: typeColumn.text, showWhenSelected: false },
    { key: "creator", type: typeColumn.text, showWhenSelected: false },
    { key: "updater", type: typeColumn.check, showWhenSelected: false },


] as gridColumns[];