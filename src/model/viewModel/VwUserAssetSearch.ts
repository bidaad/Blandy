import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwUserProductSearch {
    // id: string;
    productId: string;
    assetId: string;
    languageId: string;
    sign: string;
    description: string;
    curLangName: string;
    categoryId: string;
    currentPrice: string;
    manufactureId: string;
    brandId: string;
    machineIdies:string;
    currentStock:number;
    // parentId: string;
    // isActive: string;
    // model: string;
    machine: string;
    // mainFactoryPN: string;
    star: number;
    mainPic: string;
    selectionTypes: string;
    catCode: string;
    previousPrice:number;
    discountPercent:number;
}
