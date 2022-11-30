import { VwAssetAttribute } from "./VwAssetAttribute";
import { VwProductAttribute } from "./VwProductAttribute";
import { VwCategoryAttribute } from "./VwCategoryAttribute";
import { VwDocument } from "./VwDocument";

import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";
import { VwGuarantee } from "./VwGuarantee";

export interface VwAssetDetail {
    assetId: string;
    productId: string;
    code: string;
    sign: string;
    mainFactoryPN: string;
    icon: string;
    manufactureId: string;
    brandId: string;
    barCode: string;
    model: string;
    machine: string;
    parentId: string;
    isActive: string;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    internalFactoryPN: string;
    hCUnitId: string;
    currentPrice: number;
    isFavourite: boolean;
    mainImage: string;
    currentStock: number;
    deliveryTime: number;
    hcAssetConfirmStatusId: string;
    maxInBasket: number;

    netWeight: number;
    packingWeight: number;
    packinglength: number;
    packingWidth: number;
    packingHeight: number;
    productLength: number;
    productWidth: number;
    productHeight: number;
    assetCode?: number;
    star?: number;
}

export interface AssetInfo{
    detail: VwAssetDetail;
    assetAttributes: VwAssetAttribute[];
    productAttributes: VwProductAttribute[];
    categoryAttributes: VwCategoryAttribute[];
    documents: VwDocument[];
    guarantees: VwGuarantee[];
    breadCrumbs: string
}