import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwShipRule {
    id: string;

    depId: string;
    code: string;
    sign: string;
    fromDate: Date;
    toDate: Date;
    fromDistance: string;
    toDistance: string;
    fromLoadWeight: string;
    toLoadWeight: string;
    fromLoadPrice: string;
    toLoadPrice: string;
    fromLoadVolume: string;
    toLoadVolume: string;
    hCShipTypeId: string;
    categoryId: string;
    productId: string;
    assetId: string;
    zoneId: string;
    fixPrice: string;
    loadPricePercent: string;
    isActive: boolean;
    description: string;
    assetSign:string;
    creator:string;
    updater:string;
}

export const columnStructure = [
    { key: "departmentSign", caption: "departmentSign", type: typeColumn.text, showWhenSelected: true },
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },
    { key: "fromDate", caption: "FromDate", type: typeColumn.date, showWhenSelected: true },
    { key: "toDate", caption: "ToDate", type: typeColumn.date, showWhenSelected: true },
    { key: "fromDistance", caption: "FromDistance", type: typeColumn.text, showWhenSelected: true },
    { key: "toDistance", caption: "ToDistance", type: typeColumn.text, showWhenSelected: true },
    { key: "fromLoadWeight", caption: "FromLoadWeight", type: typeColumn.text, showWhenSelected: true },
    { key: "toLoadWeight", caption: "ToLoadWeight", type: typeColumn.text, showWhenSelected: true },
    { key: "fromLoadPrice", caption: "FromLoadPrice", type: typeColumn.text, showWhenSelected: true },
    { key: "toLoadPrice", caption: "ToLoadPrice", type: typeColumn.text, showWhenSelected: true },
    { key: "fromLoadVolume", caption: "FromLoadVolume", type: typeColumn.text, showWhenSelected: true },
    { key: "toLoadVolume", caption: "ToLoadVolume", type: typeColumn.text, showWhenSelected: true },
    { key: "fixPrice", caption: "FixPrice", type: typeColumn.text, showWhenSelected: true },
    { key: "loadPricePercent", caption: "LoadPricePercent", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },

] as gridColumns[];