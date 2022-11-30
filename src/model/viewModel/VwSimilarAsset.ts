import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwSimilarAsset {
    mainAssetId: string;
    similarAssetId: string;
    id: string;
    productId: string;
    languageId: string;
    name: string;
    description: string;
    curLangName: string;
    categoryId: string;
    currentPrice: string;
    manufactureId: string;
    brandId: string;
    parentId: string;
    isActive: string;
    model: string;
    machine: string;
    mainFactoryPN: string;
    star: string;
}