import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwJCEffectOnProduct {
    id: string;

    jobCardId: string;
    productId: string;
    reference: string;
    isActive: boolean;
    description: string;
    productCode: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "productCode", caption: "ProductCode", type: typeColumn.text, showWhenSelected: true },
    // { key: "reference", caption: "Reference", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];