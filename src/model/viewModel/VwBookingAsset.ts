import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwBookingAsset {
    id: string;

    bookingId: string;
    assetId: string;
    priceId: string;
    currentStock: string;
    currentPrice: string;
    assetCount: string;
    hCCurrencyId: string;
    isActive: boolean;
    description: string;
    productSign: string;
    creator: string;
    updater: string;
    currencySign: string;
    mainImage: string

}

export const columnStructure = [
    { key: "productSign", caption: "ProductSign", type: typeColumn.text, showWhenSelected: true },
    { key: "currentPrice", caption: "CurrentPrice", type: typeColumn.text, showWhenSelected: true },
    { key: "currencySign", caption: "CurrencySign", type: typeColumn.text, showWhenSelected: true },
    { key: "currentStock", caption: "CurrentStock", type: typeColumn.text, showWhenSelected: true },
    { key: "assetCount", caption: "AssetCount", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];