import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwGuarantee {
    id: string;

    code: string;
    sign: string;
    guaranteeDepId: string;
    hCGuaranteeTypeId: string;
    productId: string;
    assetId: string;
    fromDate: Date;
    toDate: Date;
    toUsage: string;
    unitId: string;
    isActive: boolean;
    description: string;
    productSign: string;
    assetSign: string;
    guaranteeTypeSign: string;
    unitSign: string;
    departmentSign: string;
    creator:string;
    updater:string;

}

export const columnStructure = [
    // { key: "productSign", caption: "ProductSign", type: typeColumn.text, showWhenSelected: true },
    // { key: "assetSign", caption: "AssetSign", type: typeColumn.text, showWhenSelected: true },
    { key: "guaranteeTypeSign", caption: "GuaranteeTypeSign", type: typeColumn.text, showWhenSelected: true },
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },
    { key: "unitSign", caption: "UnitSign", type: typeColumn.text, showWhenSelected: true },
    { key: "toUsage", caption: "ToUsage", type: typeColumn.text, showWhenSelected: true },
    { key: "fromDate", caption: "FromDate", type: typeColumn.text, showWhenSelected: true },
    { key: "toDate", caption: "ToDate", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },


] as gridColumns[];