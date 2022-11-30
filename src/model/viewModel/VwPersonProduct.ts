import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwPersonProduct {
    id: string;

    personId: string;
    productId: string;
    isDefault: boolean;
    isActive: boolean;
    description: string;
    sign: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "sign", caption: "sign", type: typeColumn.text, showWhenSelected: true },
    { key: "isDefault", caption: "IsDefault", type: typeColumn.check, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },


] as gridColumns[];