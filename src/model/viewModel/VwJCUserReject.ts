import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwJCUserReject {
    id: string;

    userId: string;
    jobCardId: string;
    assetId: string;
    isReject: boolean;
    isActive: boolean;
    description: string;
    nikName: string;
    creator: string;
    updater: string;
    producrSign:string;
    jobcardSign:string;

}

export const columnStructure = [
    { key: "jobcardSign", type: typeColumn.text, showWhenSelected: true },
    { key: "producrSign", type: typeColumn.text, showWhenSelected: true },
    { key: "nikName", caption: "NikName", type: typeColumn.text, showWhenSelected: true },
    { key: "isReject", caption: "IsReject", type: typeColumn.check, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];