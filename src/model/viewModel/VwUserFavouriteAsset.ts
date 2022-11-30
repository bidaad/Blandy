import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwUserFavouriteAsset {
    id: string;

    userId: string;
    assetId: string;
    isActive: boolean;
    description: string;
    creator: string;
    updater: string;
    favUser: string;
    productCode: string;
    productSign:string;
}

export const columnStructure = [
    { key: "favUser", caption: "FavUser", type: typeColumn.text, showWhenSelected: true },
    { key: "productSign", type: typeColumn.text, showWhenSelected: true },
    { key: "productCode", caption: "ProductCode", type: typeColumn.text, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },




] as gridColumns[];