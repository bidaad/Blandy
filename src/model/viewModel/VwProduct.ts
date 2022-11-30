import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";


export interface VwProduct {
    id: string;
    code: string;
    sign: string;
    mainFactoryPn: string;
    icon: string;
    manufactureId: string;
    brandId: string;
    barCode: string;
    model: string;
    machine: string;
    parentId: string;
    prouductParentId:string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    productInPackage: number;
    marketable: string;
    accesory: string;
    internalFactoryPN: string;
    hCUnitId: string;
    creator: string;
    updater: string;
    brandName: string;
    manufactureName: string;
    categoryName: string;
    name: string;
    zoneName: string;
    parentName: string;
    madeInZone: string;
    manufactureSign: string;
    categoryIdies:string;
    attributeIdies:string;
    machineIdies:string;
    netWeight:number;
    packingHeight:number;
    packinglength:number;
    packingWeight:number;
    packingWidth:number;
    mainImage:string;
    dimensionUnitId:string;
    unitSign:string;
    machineSiges:string;
    attributeTitles:string;
}


export const columnStructure = [


    { key: "sign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "code", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "internalFactoryPn", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "categoryName", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "machineSiges", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "attributeTitles", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "name", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "brandName", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "mainImage", type: typeColumn.image, caption: "", showWhenSelected: false },
    { key: "manufactureName", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "machine", type: typeColumn.check, caption: "", showWhenSelected: false },
    { key: "mainFactoryPn", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "zoneName", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "productInPackage", type: typeColumn.number, caption: "", showWhenSelected: false },
    { key: "parentName", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "model", type: typeColumn.text, caption: "", showWhenSelected: false },
    { key: "isActive", type: typeColumn.check, caption: "", showWhenSelected: false },

] as gridColumns[];
