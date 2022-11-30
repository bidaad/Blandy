import { gridColumns } from "../general/stateBase";
import { typeColumn } from "../general/typeComponent";

export interface VwAsset {
    id: string;
    productId: string;
    personId: string;
    departmentId: string;
    parentId: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    partNumber: string;
    serialNumberVIN: string;
    year: string;
    type: string;
    barCode: string;
    package: string;
    hCAssetHealthStatusId: string;
    hCAssetQualityId: string;
    hCunitId: string;
    internalFactoryPN: string;
    productCode: string;
    personCode: string;
    departmentCode: string;
    parentCode: string;
    healthStatusCode: string;
    qualityCode: string;
    unitCode: string;
    unitSign: string;
    qualitySign: string;
    healthStatusSign: string;
    model: string;
    name: string;
    brandName: string;
    personName: string;
    departmentName: string;
    assetInPackage: number;
    updator: string;
    creator: string;
    currentStock: number;
    parentName: string;
    categoryName: string;
    pelak1: string;
    pelak2: string;
    pelak3: string;
    pelak: string;
    manufactureDate: string;
    guaranteeStartDate: string;
    priceDifference: number;
    percentDifference: number;
    totalWeight: number;
    hccolorId: string;
    colorSign: string;
    currentPrice:number;
    previousPrice:number;
    pelakSign:string;
    manufactureDatePersian:string;
    guaranteeStartDatePersian: string;
    firstProductPic: string;
    productSign: string;
    code: string;
    hcConfirmSign: string;
    hcConfirmCode: string;
    mainCategory: string;
    hcAssetConfirmStatusId: string;

}

export const columnStructure = [
    { key: "currentPrice",type:typeColumn.number, showWhenSelected: true },
    { key: "currentStock",type:typeColumn.number, showWhenSelected: true },
    { key: "Name", caption: "محصول", showWhenSelected: false },
    { key: "productSign", caption: "محصول", showWhenSelected: true },
    { key: "productCode", showWhenSelected: true },
    { key: "serialNumberVin", caption: "شماره سریال", showWhenSelected: false },
    { key: "personName", showWhenSelected: false },
    { key: "pelakSign", showWhenSelected: false },
    { key: "brandName", showWhenSelected: false },
    { key: "firstProductPic", showWhenSelected: false, type: typeColumn.image },
    // { key: "manufactureDatePersian", showWhenSelected: false },
    // { key: "guaranteeStartDatePersian", showWhenSelected: false },
    { key: "healthStatusSign", caption: "وضعیت سلامت", showWhenSelected: false },
    // { key: "qualitySign", caption: "کیفیت", showWhenSelected: false },
    { key: "year", caption: "سال", showWhenSelected: false },
    { key: "departmentName", showWhenSelected: false },
    // { key: "code", showWhenSelected: false },
 
    // { key: "partNumber", showWhenSelected: false },
    // { key: "model", showWhenSelected: false },
    // { key: "departmentName", showWhenSelected: false },
    { key: "isActive", showWhenSelected: false, type: typeColumn.check },
] as gridColumns[];