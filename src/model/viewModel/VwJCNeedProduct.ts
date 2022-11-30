import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwJCNeedProduct {
    id: string;
    jobCardId: string;
    productId: string;
    productCount: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    productSign: string;
}

export const columnStructure = [
    { key: "productSign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "productCount", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updator", caption: "Updater", type: typeColumn.text, showWhenSelected: true },
] as gridColumns[];
