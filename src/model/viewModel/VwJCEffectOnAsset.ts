import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwJCEffectOnAsset {
    id: string;

    jobCardId: string;
    assetId: string;
    reference: string;
    isActive: boolean;
    description: string;
    productCode: string;
    creator: string;
    updater: string;
    jobCardName:string;

}

export const columnStructure = [
    { key: "jobCardName", caption: "jobCardName", type: typeColumn.text, showWhenSelected: true },
    { key: "productCode", caption: "ProductCode", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];