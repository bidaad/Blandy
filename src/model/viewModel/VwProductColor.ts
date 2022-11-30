import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwProductColor {
    id: string;

    productId: string;
    colorSign: string;
    hCColorId: string;
    isActive: boolean;
    description: string;
    creator: string;
    updater: string;
}

export const columnStructure = [
    { key: "colorSign", caption: "colorSign", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];